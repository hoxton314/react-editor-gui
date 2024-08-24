// Defaults
import Bearded_MilkshakeRaspberry from './templates/bearded-theme-milkshake-raspberry.json'
import Bearded_BlackRubySoft from './templates/bearded-theme-black-&-ruby-soft.json'
// Rest
import Bearded_Altica from './templates/bearded-theme-altica.json'
import Bearded_AquarelleCymbidium from './templates/bearded-theme-aquarelle-cymbidium.json'
import Bearded_AquarelleHydrangea from './templates/bearded-theme-aquarelle-hydrangea.json'
import Bearded_AquarelleLilac from './templates/bearded-theme-aquarelle-lilac.json'
import Bearded_AquerelleHydrangea from './templates/bearded-theme-aquerelle-hydrangea.json'
import Bearded_ArcBlueberry from './templates/bearded-theme-arc-blueberry.json'
import Bearded_ArcEggplant from './templates/bearded-theme-arc-eggplant.json'
import Bearded_ArcEolstorm from './templates/bearded-theme-arc-eolstorm.json'
import Bearded_ArcReversed from './templates/bearded-theme-arc-reversed.json'
import Bearded_Arc from './templates/bearded-theme-arc.json'
import Bearded_BlackAmethystSoft from './templates/bearded-theme-black-&-amethyst-soft.json'
import Bearded_BlackAmethyst from './templates/bearded-theme-black-&-amethyst.json'
import Bearded_BlackDiamondSoft from './templates/bearded-theme-black-&-diamond-soft.json'
import Bearded_BlackDiamond from './templates/bearded-theme-black-&-diamond.json'
import Bearded_BlackEmeraldSoft from './templates/bearded-theme-black-&-emerald-soft.json'
import Bearded_BlackEmerald from './templates/bearded-theme-black-&-emerald.json'
import Bearded_BlackGoldSoft from './templates/bearded-theme-black-&-gold-soft.json'
import Bearded_BlackGold from './templates/bearded-theme-black-&-gold.json'
import Bearded_BlackRuby from './templates/bearded-theme-black-&-ruby.json'
import Bearded_ClassicsAnthracite from './templates/bearded-theme-classics-anthracite.json'
import Bearded_ClassicsLight from './templates/bearded-theme-classics-light.json'
import Bearded_CoffeeCream from './templates/bearded-theme-coffee-cream.json'
import Bearded_CoffeeReversed from './templates/bearded-theme-coffee-reversed.json'
import Bearded_Coffee from './templates/bearded-theme-coffee.json'
import Bearded_Earth from './templates/bearded-theme-earth.json'
import Bearded_FeatGoldDRaynhLight from './templates/bearded-theme-feat-gold-d-raynh-light.json'
import Bearded_FeatGoldDRaynh from './templates/bearded-theme-feat-gold-d-raynh.json'
import Bearded_FeatMellejulieLight from './templates/bearded-theme-feat-mellejulie-light.json'
import Bearded_FeatMellejulie from './templates/bearded-theme-feat-mellejulie.json'
import Bearded_FeatWebDevCody from './templates/bearded-theme-feat-webDevCody.json'
import Bearded_FeatWill from './templates/bearded-theme-feat-will.json'
import Bearded_HCBrewingStorm from './templates/bearded-theme-hc-brewing-storm.json'
import Bearded_HCChocolateEspresso from './templates/bearded-theme-hc-chocolate-espresso.json'
import Bearded_HCEbony from './templates/bearded-theme-hc-ebony.json'
import Bearded_HCFlurry from './templates/bearded-theme-hc-flurry.json'
import Bearded_HCMidnightvoid from './templates/bearded-theme-hc-midnightvoid.json'
import Bearded_HCMinuit from './templates/bearded-theme-hc-minuit.json'
import Bearded_HCWonderlandWood from './templates/bearded-theme-hc-wonderland-wood.json'
import Bearded_MilkshakeBlueberry from './templates/bearded-theme-milkshake-blueberry.json'
import Bearded_MilkshakeMango from './templates/bearded-theme-milkshake-mango.json'
import Bearded_MilkshakeMint from './templates/bearded-theme-milkshake-mint.json'
import Bearded_MilkshakeVanilla from './templates/bearded-theme-milkshake-vanilla.json'
import Bearded_MonokaiBlack from './templates/bearded-theme-monokai-black.json'
import Bearded_MonokaiMetallian from './templates/bearded-theme-monokai-metallian.json'
import Bearded_MonokaiReversed from './templates/bearded-theme-monokai-reversed.json'
import Bearded_MonokaiStone from './templates/bearded-theme-monokai-stone.json'
import Bearded_MonokaiTerra from './templates/bearded-theme-monokai-terra.json'
import Bearded_OceanicReversed from './templates/bearded-theme-oceanic-reversed.json'
import Bearded_Oceanic from './templates/bearded-theme-oceanic.json'
import Bearded_SolarizedDark from './templates/bearded-theme-solarized-dark.json'
import Bearded_SolarizedLight from './templates/bearded-theme-solarized-light.json'
import Bearded_SolarizedReversed from './templates/bearded-theme-solarized-reversed.json'
import Bearded_StainedBlue from './templates/bearded-theme-stained-blue.json'
import Bearded_StainedPurple from './templates/bearded-theme-stained-purple.json'
import Bearded_SurprisingBlueberry from './templates/bearded-theme-surprising-blueberry.json'
import Bearded_SurprisingEggplant from './templates/bearded-theme-surprising-eggplant.json'
import Bearded_SurprisingWatermelon from './templates/bearded-theme-surprising-watermelon.json'
import Bearded_Themanopia from './templates/bearded-theme-Themanopia.json'
import Bearded_VividBlack from './templates/bearded-theme-vivid-black.json'
import Bearded_VividLight from './templates/bearded-theme-vivid-light.json'
import Bearded_VividPurple from './templates/bearded-theme-vivid-purple.json'
import Bearded_Void from './templates/bearded-theme-void.json'
import UIKeyTester from './templates/ui-key-tester.json'
// Types
import { VSCodeThemeJSON } from './theme'

type ThemeMap = {
  [key: string]: VSCodeThemeJSON
}

export const themeMap: ThemeMap = {
  [Bearded_MilkshakeRaspberry.name]: Bearded_MilkshakeRaspberry,
  [Bearded_BlackRubySoft.name]: Bearded_BlackRubySoft,
  [Bearded_Altica.name]: Bearded_Altica,
  [Bearded_AquarelleCymbidium.name]: Bearded_AquarelleCymbidium,
  [Bearded_AquarelleHydrangea.name]: Bearded_AquarelleHydrangea,
  [Bearded_AquarelleLilac.name]: Bearded_AquarelleLilac,
  [Bearded_AquerelleHydrangea.name]: Bearded_AquerelleHydrangea,
  [Bearded_ArcBlueberry.name]: Bearded_ArcBlueberry,
  [Bearded_ArcEggplant.name]: Bearded_ArcEggplant,
  [Bearded_ArcEolstorm.name]: Bearded_ArcEolstorm,
  [Bearded_ArcReversed.name]: Bearded_ArcReversed,
  [Bearded_Arc.name]: Bearded_Arc,
  [Bearded_BlackAmethystSoft.name]: Bearded_BlackAmethystSoft,
  [Bearded_BlackAmethyst.name]: Bearded_BlackAmethyst,
  [Bearded_BlackDiamondSoft.name]: Bearded_BlackDiamondSoft,
  [Bearded_BlackDiamond.name]: Bearded_BlackDiamond,
  [Bearded_BlackEmeraldSoft.name]: Bearded_BlackEmeraldSoft,
  [Bearded_BlackEmerald.name]: Bearded_BlackEmerald,
  [Bearded_BlackGoldSoft.name]: Bearded_BlackGoldSoft,
  [Bearded_BlackGold.name]: Bearded_BlackGold,
  [Bearded_BlackRuby.name]: Bearded_BlackRuby,
  [Bearded_ClassicsAnthracite.name]: Bearded_ClassicsAnthracite,
  [Bearded_ClassicsLight.name]: Bearded_ClassicsLight,
  [Bearded_CoffeeCream.name]: Bearded_CoffeeCream,
  [Bearded_CoffeeReversed.name]: Bearded_CoffeeReversed,
  [Bearded_Coffee.name]: Bearded_Coffee,
  [Bearded_Earth.name]: Bearded_Earth,
  [Bearded_FeatGoldDRaynhLight.name]: Bearded_FeatGoldDRaynhLight,
  [Bearded_FeatGoldDRaynh.name]: Bearded_FeatGoldDRaynh,
  [Bearded_FeatMellejulieLight.name]: Bearded_FeatMellejulieLight,
  [Bearded_FeatMellejulie.name]: Bearded_FeatMellejulie,
  [Bearded_FeatWebDevCody.name]: Bearded_FeatWebDevCody,
  [Bearded_FeatWill.name]: Bearded_FeatWill,
  [Bearded_HCBrewingStorm.name]: Bearded_HCBrewingStorm,
  [Bearded_HCChocolateEspresso.name]: Bearded_HCChocolateEspresso,
  [Bearded_HCEbony.name]: Bearded_HCEbony,
  [Bearded_HCFlurry.name]: Bearded_HCFlurry,
  [Bearded_HCMidnightvoid.name]: Bearded_HCMidnightvoid,
  [Bearded_HCMinuit.name]: Bearded_HCMinuit,
  [Bearded_HCWonderlandWood.name]: Bearded_HCWonderlandWood,
  [Bearded_MilkshakeBlueberry.name]: Bearded_MilkshakeBlueberry,
  [Bearded_MilkshakeMango.name]: Bearded_MilkshakeMango,
  [Bearded_MilkshakeMint.name]: Bearded_MilkshakeMint,
  [Bearded_MilkshakeVanilla.name]: Bearded_MilkshakeVanilla,
  [Bearded_MonokaiBlack.name]: Bearded_MonokaiBlack,
  [Bearded_MonokaiMetallian.name]: Bearded_MonokaiMetallian,
  [Bearded_MonokaiReversed.name]: Bearded_MonokaiReversed,
  [Bearded_MonokaiStone.name]: Bearded_MonokaiStone,
  [Bearded_MonokaiTerra.name]: Bearded_MonokaiTerra,
  [Bearded_OceanicReversed.name]: Bearded_OceanicReversed,
  [Bearded_Oceanic.name]: Bearded_Oceanic,
  [Bearded_SolarizedDark.name]: Bearded_SolarizedDark,
  [Bearded_SolarizedLight.name]: Bearded_SolarizedLight,
  [Bearded_SolarizedReversed.name]: Bearded_SolarizedReversed,
  [Bearded_StainedBlue.name]: Bearded_StainedBlue,
  [Bearded_StainedPurple.name]: Bearded_StainedPurple,
  [Bearded_SurprisingBlueberry.name]: Bearded_SurprisingBlueberry,
  [Bearded_SurprisingEggplant.name]: Bearded_SurprisingEggplant,
  [Bearded_SurprisingWatermelon.name]: Bearded_SurprisingWatermelon,
  [Bearded_Themanopia.name]: Bearded_Themanopia,
  [Bearded_VividBlack.name]: Bearded_VividBlack,
  [Bearded_VividLight.name]: Bearded_VividLight,
  [Bearded_VividPurple.name]: Bearded_VividPurple,
  [Bearded_Void.name]: Bearded_Void,
  [UIKeyTester.name]: UIKeyTester,
}
