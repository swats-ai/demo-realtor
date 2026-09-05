import { img } from "./images";

export type GalleryPhoto = {
  src: string;
  alt: string;
  /** Proporción para el ritmo masonry. */
  aspect?: string;
  caption?: string;
};

export type GalleryCategory = {
  slug: string;
  name: string;
  intro: string;
  photos: GalleryPhoto[];
};

export const galleries: GalleryCategory[] = [
  {
    slug: "exteriors",
    name: "Exteriors",
    intro: "Porches, gables and glass. The first thing you see, and the thing you remember.",
    photos: [
      { src: img.modernWhite, alt: "White modern home with a covered terrace", aspect: "aspect-[4/5]", caption: "Bouldin Creek" },
      { src: img.craftsman, alt: "Craftsman bungalow with a deep front porch", aspect: "aspect-[4/3]", caption: "Bouldin Creek" },
      { src: img.glassHouse, alt: "Glass and stone hillside home", aspect: "aspect-[3/4]", caption: "Westlake Hills" },
      { src: img.brickColonial, alt: "Brick colonial under oak trees", aspect: "aspect-[4/3]", caption: "Tarrytown" },
      { src: img.darkModern, alt: "Black modern home at dusk", aspect: "aspect-[4/5]", caption: "East Austin" },
      { src: img.cottage, alt: "White cottage with a picket fence", aspect: "aspect-square", caption: "Clarksville" },
      { src: img.hillside, alt: "Limestone ranch house on a hill", aspect: "aspect-[4/3]", caption: "Dripping Springs" },
      { src: img.bungalow, alt: "Blue bungalow on a hillside street", aspect: "aspect-[3/4]", caption: "Travis Heights" },
      { src: img.twilightModern, alt: "Modern home lit at twilight", aspect: "aspect-[4/3]", caption: "Westlake Hills" },
      { src: img.farmhouse, alt: "Modern farmhouse with a metal roof", aspect: "aspect-[4/5]", caption: "Dripping Springs" },
      { src: img.stoneHouse, alt: "Stone house with a red door", aspect: "aspect-square", caption: "Hyde Park" },
      { src: img.midcentury, alt: "Mid-century home with a flat roof", aspect: "aspect-[4/3]", caption: "Barton Hills" },
    ],
  },
  {
    slug: "living-spaces",
    name: "Living spaces",
    intro: "Rooms that hold a Tuesday night as well as they hold a party.",
    photos: [
      { src: img.livingBright, alt: "Double-height living room with oak floors", aspect: "aspect-[4/5]" },
      { src: img.livingWarm, alt: "Living room with pine floors and a leather sofa", aspect: "aspect-[4/3]" },
      { src: img.livingStone, alt: "Living room with a limestone fireplace wall", aspect: "aspect-[3/4]" },
      { src: img.livingSofa, alt: "Living room with built-in shelving", aspect: "aspect-[4/3]" },
      { src: img.livingArch, alt: "Living room with arched doorways", aspect: "aspect-[4/5]" },
      { src: img.livingMinimal, alt: "Minimal living room with a linen sofa", aspect: "aspect-square" },
      { src: img.livingBeam, alt: "Great room with reclaimed beams", aspect: "aspect-[4/3]" },
      { src: img.livingLinen, alt: "Living room with linen curtains", aspect: "aspect-[3/4]" },
      { src: img.livingPlants, alt: "Living room with plants and courtyard light", aspect: "aspect-[4/3]" },
      { src: img.livingFire, alt: "Formal living room with a marble fireplace", aspect: "aspect-[4/5]" },
      { src: img.livingRug, alt: "Living room with a woven rug and daylight", aspect: "aspect-square" },
      { src: img.diningModern, alt: "Modern dining room with pendant lights", aspect: "aspect-[4/3]" },
    ],
  },
  {
    slug: "kitchens-and-baths",
    name: "Kitchens and baths",
    intro: "The rooms that decide a sale. We photograph them at ten in the morning, when the light is honest.",
    photos: [
      { src: img.kitchenWhite, alt: "White kitchen with a quartz island", aspect: "aspect-[4/3]" },
      { src: img.kitchenIsland, alt: "Kitchen with a marble island", aspect: "aspect-[4/5]" },
      { src: img.kitchenWood, alt: "Oak kitchen with a farmhouse sink", aspect: "aspect-[3/4]" },
      { src: img.kitchenDark, alt: "Walnut kitchen with a stone island", aspect: "aspect-[4/3]" },
      { src: img.kitchenGreen, alt: "Sage green kitchen with brass fixtures", aspect: "aspect-square" },
      { src: img.kitchenMarble, alt: "Marble kitchen with a breakfast bay", aspect: "aspect-[4/5]" },
      { src: img.kitchenOak, alt: "White oak kitchen with a steel range hood", aspect: "aspect-[4/3]" },
      { src: img.kitchenBlue, alt: "Blue kitchen with open shelving", aspect: "aspect-[3/4]" },
      { src: img.bathMarble, alt: "Marble bath with a freestanding tub", aspect: "aspect-[4/5]" },
      { src: img.bathTub, alt: "Spa bath with a soaking tub", aspect: "aspect-[4/3]" },
      { src: img.bathWhite, alt: "White tiled bath with a walk-in shower", aspect: "aspect-square" },
      { src: img.bathBrass, alt: "Bath with brass fixtures and green tile", aspect: "aspect-[3/4]" },
    ],
  },
  {
    slug: "outdoor-living",
    name: "Outdoor living",
    intro: "Austin has ten months of porch weather. Our clients use every one of them.",
    photos: [
      { src: img.poolTwilight, alt: "Infinity pool at twilight", aspect: "aspect-[4/3]" },
      { src: img.patio, alt: "Covered terrace with an outdoor kitchen", aspect: "aspect-[4/5]" },
      { src: img.poolHouse, alt: "Pool and pool house in a back garden", aspect: "aspect-[4/3]" },
      { src: img.courtyard, alt: "Private courtyard with a dining table", aspect: "aspect-square" },
      { src: img.porchHouse, alt: "Deep front porch with a swing", aspect: "aspect-[3/4]" },
      { src: img.poolNight, alt: "Pool lit at night", aspect: "aspect-[4/3]" },
      { src: img.lakeDock, alt: "Boat dock on Lake Austin", aspect: "aspect-[4/5]" },
      { src: img.hillCountry, alt: "Hill Country sunset over oaks", aspect: "aspect-[4/3]" },
      { src: img.creek, alt: "Spring-fed creek under trees", aspect: "aspect-[3/4]" },
      { src: img.oakTree, alt: "A single live oak in a field", aspect: "aspect-square" },
    ],
  },
  {
    slug: "the-city",
    name: "The city",
    intro: "The reason people come, and the reason they stay.",
    photos: [
      { src: img.austinSkyline, alt: "Austin skyline across Lady Bird Lake", aspect: "aspect-[4/3]" },
      { src: img.austinBridge, alt: "A downtown street at dusk", aspect: "aspect-[4/5]" },
      { src: img.austinRiver, alt: "The river at first light", aspect: "aspect-[3/4]" },
      { src: img.streetOaks, alt: "Street lined with oak trees", aspect: "aspect-[4/3]" },
      { src: img.coffee, alt: "Coffee on a café table", aspect: "aspect-square" },
      { src: img.aerial, alt: "Sunset over a Hill Country field", aspect: "aspect-[4/3]" },
    ],
  },
];

/** Selección para la galería de la home. */
export const homeGallery: GalleryPhoto[] = [
  galleries[0].photos[0],
  galleries[1].photos[1],
  galleries[2].photos[2],
  galleries[3].photos[0],
  galleries[0].photos[4],
  galleries[1].photos[5],
  galleries[3].photos[3],
  galleries[2].photos[5],
  galleries[0].photos[7],
  galleries[4].photos[0],
  galleries[1].photos[8],
  galleries[3].photos[5],
];
