import * as PresetUtils from '../core/preset_utils.js';
import { Consumes, Debuffs, Flask, Food, IndividualBuffs, PartyBuffs, RaidBuffs, TristateEffect, UnitReference } from '../core/proto/common.js';
import { RestorationDruid_Options as RestorationDruidOptions } from '../core/proto/druid.js';
import { SavedTalents } from '../core/proto/ui.js';
import BlankGear from './gear_sets/blank.gear.json';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

export const DefaultGear = PresetUtils.makePresetGear('Blank', BlankGear);

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/classic/talent-calc and copy the numbers in the url.
export const CelestialFocusTalents = {
	name: 'Celestial Focus',
	data: SavedTalents.create({
		talentsString: '05320031103--230023312131502331050313051',
	}),
};
export const ThiccRestoTalents = {
	name: 'Thicc Resto',
	data: SavedTalents.create({
		talentsString: '05320001--230023312331502531053313051',
	}),
};

export const DefaultOptions = RestorationDruidOptions.create({
	innervateTarget: UnitReference.create(),
});

export const DefaultConsumes = Consumes.create({
	flask: Flask.FlaskUnknown,
	food: Food.FoodUnknown,
});

export const DefaultRaidBuffs = RaidBuffs.create({
	arcaneBrilliance: true,
	divineSpirit: true,
	giftOfTheWild: TristateEffect.TristateEffectImproved,
	moonkinAura: true,
	powerWordFortitude: TristateEffect.TristateEffectImproved,
	strengthOfEarthTotem: TristateEffect.TristateEffectRegular,
});

export const DefaultIndividualBuffs = IndividualBuffs.create({
	blessingOfKings: true,
	blessingOfMight: TristateEffect.TristateEffectImproved,
	blessingOfWisdom: TristateEffect.TristateEffectImproved,
});

export const DefaultPartyBuffs = PartyBuffs.create({});

export const DefaultDebuffs = Debuffs.create({
	faerieFire: true,
});

export const OtherDefaults = {
	distanceFromTarget: 18,
};
