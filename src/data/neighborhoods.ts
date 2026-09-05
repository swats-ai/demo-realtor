import { img } from "./images";

export type Neighborhood = {
  slug: string;
  name: string;
  /** Una línea que captura el carácter del barrio. */
  hook: string;
  description: string;
  image: string;
  alt: string;
  medianPrice: string;
  vibe: string[];
  commute: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "bouldin-creek",
    name: "Bouldin Creek",
    hook: "Walk to South Congress. Sleep under century oaks.",
    description:
      "Bouldin sits on the quiet side of South First, ten minutes on foot from the tacos, the vintage shops and the murals everyone photographs. The streets curve, the lots are deep, and new-build moderns share fences with 1930s bungalows that refuse to leave.",
    image: img.craftsman,
    alt: "Renovated craftsman bungalow with a deep front porch shaded by oak trees",
    medianPrice: "$1.4M",
    vibe: ["Walkable", "Tree canopy", "Bungalows and moderns"],
    commute: "8 minutes to downtown",
  },
  {
    slug: "travis-heights",
    name: "Travis Heights",
    hook: "Rolling streets, Stacy Park and a river view on the way home.",
    description:
      "Travis Heights is what people picture when they say old Austin: hills that actually roll, a creek-side park with a spring-fed pool, and houses with real stories. It is minutes from the lake trail and Rainey Street, yet you hear owls at night.",
    image: img.bungalow,
    alt: "Historic bungalow on a tree-lined hillside street",
    medianPrice: "$1.6M",
    vibe: ["Historic", "Hilly", "Parks and trail"],
    commute: "6 minutes to downtown",
  },
  {
    slug: "clarksville",
    name: "Clarksville",
    hook: "Austin's oldest neighborhood, and still its best-kept secret.",
    description:
      "A pocket of narrow streets west of downtown where cottages have been cared for by the same families for generations. Coffee at the corner, the Blanton a bike ride away, and a level of quiet you cannot find this close to the Capitol anywhere else.",
    image: img.cottage,
    alt: "White cottage with a picket fence and mature landscaping",
    medianPrice: "$1.9M",
    vibe: ["Historic", "Central", "Cottages"],
    commute: "5 minutes to downtown",
  },
  {
    slug: "mueller",
    name: "Mueller",
    hook: "A planned neighborhood that finally feels lived-in.",
    description:
      "Built on the old airport, Mueller was designed around front porches, pocket parks and a lake you can loop before breakfast. Every third door is a neighbor you actually know. The farmers market and the children's museum are on foot.",
    image: img.townhouse,
    alt: "Row of contemporary townhomes with front porches on a green street",
    medianPrice: "$850K",
    vibe: ["Family", "Porches", "Parks and market"],
    commute: "12 minutes to downtown",
  },
  {
    slug: "east-austin",
    name: "East Austin",
    hook: "Where the city's next chapter is being written, block by block.",
    description:
      "East of I-35 is a grid of taquerías, galleries, breweries and studios stitched together by bike lanes. Lofts and modern duplexes sit beside shotgun houses with a fresh coat of paint. It is the most alive part of town, and still the best value close in.",
    image: img.darkModern,
    alt: "Contemporary black-clad home lit at dusk on an East Austin street",
    medianPrice: "$720K",
    vibe: ["Creative", "Bikeable", "Lofts and duplexes"],
    commute: "7 minutes to downtown",
  },
  {
    slug: "tarrytown",
    name: "Tarrytown",
    hook: "Lake Austin light, legacy lots and the shade of Pemberton oaks.",
    description:
      "Tarrytown is old money that does not need to mention it. Wide lots, brick colonials and Hill Country moderns sit under a canopy that predates the city, minutes from the lake, Casis Elementary and the Lions golf course.",
    image: img.brickColonial,
    alt: "Brick colonial home with a manicured lawn under mature oak trees",
    medianPrice: "$2.8M",
    vibe: ["Established", "Lakeside", "Top schools"],
    commute: "9 minutes to downtown",
  },
  {
    slug: "westlake-hills",
    name: "Westlake Hills",
    hook: "Views over the lake, and a school district people move for.",
    description:
      "Across the river the terrain climbs, and so do the sightlines. Westlake is glass, limestone and canyon views, with Eanes ISD as the anchor. Homes here are private, generous and ten minutes from the Zilker lawn.",
    image: img.glassHouse,
    alt: "Modern glass and stone home on a wooded hillside overlooking the lake",
    medianPrice: "$3.2M",
    vibe: ["Views", "Privacy", "Eanes schools"],
    commute: "14 minutes to downtown",
  },
  {
    slug: "hill-country",
    name: "The Hill Country",
    hook: "Acreage, dark skies and a forty-minute drive back to the city.",
    description:
      "Dripping Springs, Wimberley and the ranch roads in between. Limestone creeks, live oaks that take three people to hug, and enough land to keep a garden, a horse or simply the quiet. Fiber internet has arrived, so the office comes with you.",
    image: img.hillCountry,
    alt: "Rolling Hill Country landscape with oak trees and a golden field at sunset",
    medianPrice: "$1.7M",
    vibe: ["Acreage", "Dark skies", "Creeks and oaks"],
    commute: "40 minutes to downtown",
  },
];

export const getNeighborhood = (slug: string) => neighborhoods.find((n) => n.slug === slug);
