import { Phase } from '../core/constants/other.js';
import * as PresetUtils from '../core/preset_utils.js';
import {
	AttackPowerBuff,
	Consumes,
	Debuffs,
	EnchantedSigil,
	FirePowerBuff,
	Flask,
	Food,
	IndividualBuffs,
	ManaRegenElixir,
	Potions,
	Profession,
	RaidBuffs,
	SaygesFortune,
	SpellPowerBuff,
	StrengthBuff,
	TristateEffect,
	WeaponImbue,
	ZanzaBuff,
} from '../core/proto/common.js';
import { ElementalShaman_Options as ElementalShamanOptions } from '../core/proto/shaman.js';
import { SavedTalents } from '../core/proto/ui.js';
import Phase1APL from './apls/phase_1.apl.json';
import Phase2APL from './apls/phase_2.apl.json';
import Phase3APL from './apls/phase_3.apl.json';
import Phase4APL from './apls/phase_4.apl.json';
import Phase5APL from './apls/phase_5.apl.json';
import Phase6APL from './apls/phase_6.apl.json';
import Phase1Gear from './gear_sets/phase_1.gear.json';
import Phase2Gear from './gear_sets/phase_2.gear.json';
import Phase3Gear from './gear_sets/phase_3.gear.json';
import Phase4Gear from './gear_sets/phase_4.gear.json';
import Phase5Gear from './gear_sets/phase_5.gear.json';
import Phase6Gear from './gear_sets/phase_6.gear.json';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

///////////////////////////////////////////////////////////////////////////
//                                 Gear Presets
///////////////////////////////////////////////////////////////////////////

export const GearPhase1 = PresetUtils.makePresetGear('Phase 1', Phase1Gear);
export const GearPhase2 = PresetUtils.makePresetGear('Phase 2', Phase2Gear);
export const GearPhase3 = PresetUtils.makePresetGear('Phase 3', Phase3Gear);
export const GearPhase4 = PresetUtils.makePresetGear('Phase 4', Phase4Gear);
export const GearPhase5 = PresetUtils.makePresetGear('Phase 5', Phase5Gear);
export const GearPhase6 = PresetUtils.makePresetGear('Phase 6', Phase6Gear);

export const GearPresets = {
	[Phase.Phase1]: [GearPhase1],
	[Phase.Phase2]: [GearPhase2],
	[Phase.Phase3]: [GearPhase3],
	[Phase.Phase4]: [GearPhase4],
	[Phase.Phase5]: [GearPhase5],
	[Phase.Phase6]: [GearPhase6],
};

export const DefaultGear = GearPresets[Phase.Phase6][0];

///////////////////////////////////////////////////////////////////////////
//                                 APL Presets
///////////////////////////////////////////////////////////////////////////

export const APLPhase1 = PresetUtils.makePresetAPLRotation('Phase 1', Phase1APL);
export const APLPhase2 = PresetUtils.makePresetAPLRotation('Phase 2', Phase2APL);
export const APLPhase3 = PresetUtils.makePresetAPLRotation('Phase 3', Phase3APL);
export const APLPhase4 = PresetUtils.makePresetAPLRotation('Phase 4', Phase4APL);
export const APLPhase5 = PresetUtils.makePresetAPLRotation('Phase 5', Phase5APL);
export const APLPhase6 = PresetUtils.makePresetAPLRotation('Phase 6', Phase6APL);

export const APLPresets = {
	[Phase.Phase1]: [APLPhase1],
	[Phase.Phase2]: [APLPhase2],
	[Phase.Phase3]: [APLPhase3],
	[Phase.Phase4]: [APLPhase4],
	[Phase.Phase5]: [APLPhase5],
	[Phase.Phase6]: [APLPhase6],
};

export const DefaultAPLs: Record<number, PresetUtils.PresetRotation> = {
	25: APLPresets[Phase.Phase1][0],
	40: APLPresets[Phase.Phase2][0],
	50: APLPresets[Phase.Phase3][0],
	60: APLPresets[Phase.Phase6][0],
};

///////////////////////////////////////////////////////////////////////////
//                                 Talent Presets
///////////////////////////////////////////////////////////////////////////

export const TalentsPhase1 = PresetUtils.makePresetTalents('Level 25', SavedTalents.create({ talentsString: '25003105' }));
export const TalentsPhase2 = PresetUtils.makePresetTalents('Level 40', SavedTalents.create({ talentsString: '550031550000151' }));
export const TalentsPhase3 = PresetUtils.makePresetTalents('Level 50', SavedTalents.create({ talentsString: '550031550000151-500203' }));
export const TalentsPhase4 = PresetUtils.makePresetTalents('Level 60', SavedTalents.create({ talentsString: '050331552000151--50105301005' }));

export const TalentPresets = {
	[Phase.Phase1]: [TalentsPhase1],
	[Phase.Phase2]: [TalentsPhase2],
	[Phase.Phase3]: [TalentsPhase3],
	[Phase.Phase4]: [TalentsPhase4],
	[Phase.Phase5]: [],
	[Phase.Phase6]: [],
};

export const DefaultTalents = TalentPresets[Phase.Phase4][0];

///////////////////////////////////////////////////////////////////////////
//                                 Build Presets
///////////////////////////////////////////////////////////////////////////

export const PresetBuildPhase4 = PresetUtils.makePresetBuild('Phase 4', {
	gear: GearPhase4,
	talents: TalentsPhase4,
	rotation: APLPhase4,
});
export const PresetBuildPhase5 = PresetUtils.makePresetBuild('Phase 5', {
	gear: GearPhase5,
	talents: TalentsPhase4,
	rotation: APLPhase5,
});
export const PresetBuildPhase6 = PresetUtils.makePresetBuild('Phase 6', {
	gear: GearPhase6,
	talents: TalentsPhase4,
	rotation: APLPhase6,
});

///////////////////////////////////////////////////////////////////////////
//                                 Options
///////////////////////////////////////////////////////////////////////////

export const DefaultOptions = ElementalShamanOptions.create({});

export const DefaultConsumes = Consumes.create({
	attackPowerBuff: AttackPowerBuff.JujuMight,
	defaultPotion: Potions.MajorManaPotion,
	enchantedSigil: EnchantedSigil.WrathOfTheStormSigil,
	firePowerBuff: FirePowerBuff.ElixirOfGreaterFirepower,
	flask: Flask.FlaskOfAncientKnowledge,
	food: Food.FoodRunnTumTuberSurprise,
	mainHandImbue: WeaponImbue.FlametongueWeapon,
	manaRegenElixir: ManaRegenElixir.MagebloodPotion,
	mildlyIrradiatedRejuvPot: true,
	offHandImbue: WeaponImbue.EnchantedRepellent,
	spellPowerBuff: SpellPowerBuff.ElixirOfTheMageLord,
	strengthBuff: StrengthBuff.JujuPower,
	zanzaBuff: ZanzaBuff.CerebralCortexCompound,
});

export const DefaultRaidBuffs = RaidBuffs.create({
	arcaneBrilliance: true,
	aspectOfTheLion: true,
	demonicPact: 120,
	divineSpirit: true,
	giftOfTheWild: TristateEffect.TristateEffectImproved,
	manaSpringTotem: TristateEffect.TristateEffectRegular,
	moonkinAura: true,
	strengthOfEarthTotem: TristateEffect.TristateEffectImproved,
	vampiricTouch: 300,
});

export const DefaultIndividualBuffs = IndividualBuffs.create({
	fengusFerocity: true,
	mightOfStormwind: true,
	rallyingCryOfTheDragonslayer: true,
	saygesFortune: SaygesFortune.SaygesDamage,
	slipkiksSavvy: true,
	songflowerSerenade: true,
	spiritOfZandalar: true,
	valorOfAzeroth: true,
	warchiefsBlessing: true,
});

export const DefaultDebuffs = Debuffs.create({
	curseOfRecklessness: true,
	faerieFire: true,
	homunculi: 70, // 70% average uptime default
	improvedScorch: true,
	markOfChaos: true,
	occultPoison: true,
	stormstrike: true,
});

export const OtherDefaults = {
	distanceFromTarget: 15,
	profession2: Profession.Alchemy,
	profession1: Profession.Enchanting,
};
