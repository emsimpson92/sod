package druid

import (
	"github.com/wowsims/sod/sim/core"
)

func (druid *Druid) registerMaulSpell(realismICD *core.Cooldown) {
	flatBaseDamage := 128.0
	rageCost := 15 - float64(druid.Talents.Ferocity)

	switch druid.Ranged().ID {
	case IdolOfBrutality:
		rageCost -= 3
	}

	druid.Maul = druid.RegisterSpell(Bear, core.SpellConfig{
		ActionID:    core.ActionID{SpellID: 9881},
		SpellSchool: core.SpellSchoolPhysical,
		DefenseType: core.DefenseTypeMelee,
		ProcMask:    core.ProcMaskMeleeMHSpecial | core.ProcMaskMeleeMHAuto,
		Flags:       SpellFlagOmen | core.SpellFlagMeleeMetrics | core.SpellFlagNoOnCastComplete,

		RageCost: core.RageCostOptions{
			Cost:   rageCost,
			Refund: 0.8,
		},

		DamageMultiplier: 1 + .1*float64(druid.Talents.SavageFury),
		ThreatMultiplier: 1,

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			// Need to specially deactivate CC here in case maul is cast simultaneously with another spell.
			if druid.ClearcastingAura != nil {
				druid.ClearcastingAura.Deactivate(sim)
			}

			baseDamage := flatBaseDamage + spell.Unit.MHWeaponDamage(sim, spell.MeleeAttackPower())

			result := spell.CalcAndDealDamage(sim, target, baseDamage, spell.OutcomeMeleeSpecialHitAndCrit)

			if !result.Landed() {
				spell.IssueRefund(sim)
			}

			spell.DealDamage(sim, result)
			if druid.curQueueAura != nil {
				druid.curQueueAura.Deactivate(sim)
			}
		},
	})
	druid.MaulQueue = druid.makeQueueSpellsAndAura(druid.Maul, realismICD)
}

func (druid *Druid) makeQueueSpellsAndAura(srcSpell *DruidSpell, realismICD *core.Cooldown) *DruidSpell {
	queueAura := druid.RegisterAura(core.Aura{
		Label:    "Maul Queue Aura-" + srcSpell.ActionID.String(),
		ActionID: srcSpell.ActionID.WithTag(1),
		Duration: core.NeverExpires,
		OnGain: func(aura *core.Aura, sim *core.Simulation) {
			if druid.curQueueAura != nil {
				druid.curQueueAura.Deactivate(sim)
			}
			druid.curQueueAura = aura
			druid.curQueuedAutoSpell = srcSpell
		},
		OnExpire: func(aura *core.Aura, sim *core.Simulation) {
			druid.curQueueAura = nil
			druid.curQueuedAutoSpell = nil
		},
	})

	queueSpell := druid.RegisterSpell(Bear, core.SpellConfig{
		ActionID: srcSpell.ActionID.WithTag(1),
		Flags:    core.SpellFlagMeleeMetrics | core.SpellFlagAPL | core.SpellFlagCastTimeNoGCD,

		ExtraCastCondition: func(sim *core.Simulation, target *core.Unit) bool {
			return druid.curQueueAura == nil &&
				druid.CurrentRage() >= srcSpell.DefaultCast.Cost &&
				!druid.IsCasting(sim) &&
				realismICD.IsReady(sim)
		},

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			if realismICD.IsReady(sim) {
				realismICD.Use(sim)
				sim.AddPendingAction(&core.PendingAction{
					NextActionAt: sim.CurrentTime + realismICD.Duration,
					OnAction: func(sim *core.Simulation) {
						queueAura.Activate(sim)
					},
				})
			}
		},
	})

	return queueSpell
}
