import { img } from "./images";

/*
  Posts del Journal. El cuerpo es una lista de bloques tipados: los h2/h3
  alimentan el índice lateral del post (y llevan id para el scroll).
*/

export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Buying" | "Selling" | "Neighborhoods" | "Market" | "Living";
  date: string;
  readingTime: string;
  image: string;
  alt: string;
  authorSlug: string;
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-to-read-an-austin-listing",
    title: "How to read an Austin listing like an agent",
    excerpt:
      "The photos are the least important part. Here is what we look at in the first ninety seconds, and what we ignore entirely.",
    category: "Buying",
    date: "2026-08-21",
    readingTime: "7 min read",
    image: img.livingArch,
    alt: "Living room with arched doorways and afternoon light",
    authorSlug: "marisol-reyes",
    blocks: [
      { type: "p", text: "Every listing is a small argument. The seller's agent is making a case, in photographs and adjectives, for a number. Your job is to read the argument the way an editor would: quickly, skeptically, and with an eye for what was left out." },
      { type: "h2", id: "start-with-the-lot", text: "Start with the lot, not the house" },
      { type: "p", text: "Houses change. Lots do not. Before we look at a single interior photo we pull the lot up on the county map and answer three questions: which way does it face, what is behind it, and where does the water go. A south-facing backyard in Austin means shade on the porch in the evening and a cooler house in August. A lot that backs to a creek is lovely until the hundred-year rain, which now arrives every seven or eight." },
      { type: "ul", items: ["Orientation: north-south lots get gentler afternoon sun.", "What is behind the fence: a park, an alley or a future five-story building.", "Slope and drainage: look at the grade in the street photos, not the description."] },
      { type: "h2", id: "the-square-footage-trap", text: "The square footage trap" },
      { type: "p", text: "Price per square foot is the most quoted and least useful number in real estate. A 2,400-square-foot house with an efficient plan can feel larger than a 3,000-square-foot house that spends five hundred feet on hallways. We look at the floor plan first, and if there is no floor plan in the listing, that itself is information." },
      { type: "h3", id: "what-the-year-built-tells-you", text: "What the year built actually tells you" },
      { type: "p", text: "In Central Austin, year built is a shorthand for a whole set of risks. A 1940s house probably has cast iron drains; a 1970s house may have aluminum wiring; a 2006 house was built during a boom by crews that were stretched thin. None of these is a reason to walk away. All of them are reasons to budget for the inspection you would otherwise skip." },
      { type: "image", src: img.kitchenWood, alt: "Renovated oak kitchen in a 1920s cottage", caption: "A 1926 kitchen, rebuilt in 2023. The listing said updated. The permits said everything." },
      { type: "h2", id: "the-adjectives-to-ignore", text: "The adjectives to ignore" },
      { type: "p", text: "Charming means small. Cozy means smaller. Bring your vision means the kitchen is from 1988. Rare opportunity means the seller's agent ran out of things to say. None of this is dishonest, exactly. It is just a dialect, and once you speak it you stop being impressed by it." },
      { type: "quote", text: "The best listing description we ever wrote was four sentences long. The house sold in a weekend, because the house did the talking.", cite: "Marisol Reyes" },
      { type: "h2", id: "what-we-look-for-instead", text: "What we look for instead" },
      { type: "p", text: "Days on market and price history, first. Then the seller's disclosure, which in Texas is a legally required document and the single most honest thing in the whole packet. Then the HOA documents if there are any. Then, and only then, the photos, mostly to see what the photographer chose not to shoot." },
      { type: "p", text: "If this sounds like more work than scrolling, it is. It is also how you stop paying for the argument and start paying for the house." },
    ],
  },
  {
    slug: "pricing-a-home-in-a-shifting-market",
    title: "Pricing a home when the market will not sit still",
    excerpt:
      "The comps are three months old and the rate just moved again. Here is how we set a number that holds.",
    category: "Selling",
    date: "2026-07-30",
    readingTime: "6 min read",
    image: img.brickColonial,
    alt: "Brick colonial home under oak trees",
    authorSlug: "theo-lindqvist",
    blocks: [
      { type: "p", text: "A price is not a guess about what a house is worth. It is a strategy about how a house will be sold. Those are different things, and confusing them is how good homes end up sitting for ninety days with two price cuts and a stale listing." },
      { type: "h2", id: "comps-are-a-starting-point", text: "Comps are a starting point, not an answer" },
      { type: "p", text: "Comparable sales tell you what buyers agreed to pay for something similar, in the past, under conditions that may no longer exist. We use them to draw a range, not a number. Inside that range, the decision depends on three things the comps cannot see: the current buyer pool for this specific house, the rate environment this month, and how much patience the seller actually has." },
      { type: "h2", id: "the-first-ten-days", text: "The first ten days decide everything" },
      { type: "p", text: "Every serious buyer for your price band will see your listing within ten days of it going live. If the number is right, they show up. If it is high, they wait, and the house begins to carry the faint smell of a problem. Reducing the price later rarely recovers the energy of the launch. This is why we would rather list slightly under a hopeful number and let competition find the ceiling." },
      { type: "image", src: img.poolHouse, alt: "Pool and pool house in a Tarrytown garden", caption: "Listed at $2.95M, sold at $3.1M in eleven days with four offers. The number invited a contest." },
      { type: "h3", id: "when-under-pricing-is-wrong", text: "When under-pricing is wrong" },
      { type: "p", text: "Unique properties, small buyer pools, and anything over four million. In those cases there may only be a handful of buyers in the country, and a low number does not create competition, it just creates a discount. Those homes are priced on story, and marketed one conversation at a time." },
      { type: "h2", id: "what-a-rate-move-does", text: "What a rate move does to your buyer" },
      { type: "ul", items: ["A half-point rate increase cuts roughly five percent from what a financed buyer can afford.", "Cash buyers do not care about rates, but they care very much about what everyone else can afford.", "Rate drops bring buyers off the fence quickly, often within two weeks."] },
      { type: "p", text: "We watch the ten-year Treasury more closely than the Fed, because that is what mortgage rates actually follow. When it moves, our pricing conversations move with it, sometimes the same afternoon." },
      { type: "quote", text: "The right price is the one that makes the best buyer afraid of losing the house." },
      { type: "h2", id: "the-conversation-we-have", text: "The conversation we have with every seller" },
      { type: "p", text: "We show the range, we explain the strategy, and we ask one question: would you rather have the highest possible number in the listing, or the highest possible number in the contract? Everyone says the second. Not everyone means it. The ones who do tend to close in under three weeks." },
    ],
  },
  {
    slug: "a-saturday-in-bouldin-creek",
    title: "A Saturday in Bouldin Creek",
    excerpt:
      "Coffee at seven, the market at nine, a porch by four. One day in the neighborhood our clients ask about most.",
    category: "Neighborhoods",
    date: "2026-07-12",
    readingTime: "5 min read",
    image: img.craftsman,
    alt: "Craftsman bungalow in Bouldin Creek with a porch and oak shade",
    authorSlug: "priya-anand",
    blocks: [
      { type: "p", text: "We get asked about Bouldin more than any other neighborhood in the city, usually by people who have walked South Congress on a visit and wondered what it would be like to live two streets over. The honest answer is: quieter than you expect, and greener." },
      { type: "h2", id: "seven-am", text: "Seven in the morning" },
      { type: "p", text: "The streets are empty except for runners and dogs. Bouldin is hilly enough that a two-mile loop is a workout, and shaded enough that you can do it in July. Coffee is at the corner of South First, where the line is the neighborhood's informal town hall." },
      { type: "h2", id: "nine-am", text: "Nine, the market" },
      { type: "p", text: "The farmers market at the edge of the neighborhood is the reason half our clients bought here. Peaches in June, tomatoes in July, the same faces every week. Bring a bag; bring cash for the tamale stand, which does not take cards on principle." },
      { type: "image", src: img.streetOaks, alt: "Street lined with mature oak trees", caption: "Bouldin's oaks are protected by ordinance. Any tree over nineteen inches needs a permit to touch." },
      { type: "h2", id: "noon", text: "Noon, South Congress" },
      { type: "p", text: "Ten minutes on foot and you are in the postcard: the boot store, the costume shop, the taco truck that has become a building. Locals go on weekday mornings. On Saturdays we send visiting clients and then meet them for a late lunch on the quiet side of the street." },
      { type: "h3", id: "the-houses", text: "The houses" },
      { type: "p", text: "Bouldin is a mix that should not work and does: 1930s bungalows, 1960s ranches, and new moderns built by people who want to be a ten-minute walk from everything. Prices run from just under a million for a bungalow that needs love to three and a half for a new build with a pool." },
      { type: "ul", items: ["Bungalows: $950K to $1.6M, most needing some work.", "Renovated bungalows and ranches: $1.4M to $2.2M.", "New construction: $2M to $3.6M."] },
      { type: "h2", id: "four-pm", text: "Four, the porch" },
      { type: "p", text: "By late afternoon the neighborhood retreats to its porches. This is the Bouldin hour: neighbors walking past, someone's music, the oaks doing their work. If you visit a house here, ask to see it at four. That is when you will know." },
      { type: "quote", text: "People do not buy in Bouldin for the house. They buy for the walk home." },
    ],
  },
  {
    slug: "austin-market-summer-2026",
    title: "The Austin market, summer 2026: what actually changed",
    excerpt:
      "Inventory is up, prices are flat, and the buyers who waited are back. Six numbers that explain the season.",
    category: "Market",
    date: "2026-06-25",
    readingTime: "8 min read",
    image: img.austinSkyline,
    alt: "Austin skyline across Lady Bird Lake at dusk",
    authorSlug: "theo-lindqvist",
    blocks: [
      { type: "p", text: "Austin has spent three years correcting from a market that could not last, and this summer it finally feels like a market again: enough inventory to choose from, enough buyers to keep sellers honest, and prices that move for reasons you can explain. Here is what we are seeing on the ground." },
      { type: "h2", id: "inventory", text: "Inventory is back to 2019 levels" },
      { type: "p", text: "Roughly four months of supply across the metro, which most economists consider balanced. Close in, it is tighter: Central Austin neighborhoods are sitting around two and a half months. The suburbs north and east are where the choice is." },
      { type: "h2", id: "prices", text: "Prices are flat, and that is good news" },
      { type: "p", text: "Median close price is within two percent of last summer. The froth is gone, the panic is gone, and what remains is a market where a well-priced home sells in three weeks and an over-priced one teaches its owner a lesson. We prefer this to either of the previous two summers." },
      { type: "image", src: img.austinBridge, alt: "A downtown street at dusk", caption: "Downtown condo inventory is the one segment still working through oversupply." },
      { type: "h2", id: "rates", text: "Rates moved, buyers moved with them" },
      { type: "p", text: "The spring dip in mortgage rates pulled a wave of waiting buyers off the fence, and we saw multiple-offer situations return on the best-prepared listings. Not everywhere, and not on everything, but the buyers are there and they are decisive when the house is right." },
      { type: "h3", id: "cash", text: "Cash is still a third of the market" },
      { type: "p", text: "Relocation buyers from California and the Northeast continue to arrive with equity from a prior sale, and they are winning contests on speed rather than price. If you are financing, a strong pre-approval and a flexible close date matter more than they did a year ago." },
      { type: "h2", id: "where-value-is", text: "Where the value is" },
      { type: "ul", items: ["East Austin duplexes and small lofts under $750K.", "Mueller and Windsor Park for families who want walkability without the Central Austin price.", "Dripping Springs acreage, where the fiber build-out quietly changed who can live there."] },
      { type: "h2", id: "what-we-expect", text: "What we expect this fall" },
      { type: "p", text: "More of the same, with a seasonal slowdown in October and a short, sharp window after Thanksgiving when serious buyers face little competition. If you are selling, list before mid-September or after the first of the year. If you are buying, December is your friend." },
      { type: "quote", text: "A balanced market is boring to write about and wonderful to work in." },
    ],
  },
  {
    slug: "the-inspection-you-should-not-skip",
    title: "The inspection you should not skip, and the two you can",
    excerpt:
      "Foundation, sewer scope and a roof that is older than your car. What actually matters in Central Texas soil.",
    category: "Buying",
    date: "2026-05-30",
    readingTime: "6 min read",
    image: img.frontDoor,
    alt: "A lit front entrance of a house at dusk",
    authorSlug: "jordan-blake",
    blocks: [
      { type: "p", text: "The option period in Texas is short, usually seven to ten days, and it is the only window in which you can walk away for any reason and keep most of your money. Spending it well is the most valuable thing a buyer does. Spending it on the wrong inspections is one of the most common mistakes." },
      { type: "h2", id: "foundation", text: "Foundation, always" },
      { type: "p", text: "Central Texas sits on expansive clay. It swells when wet and shrinks when dry, and it moves houses a little every year. A general inspector will note cracks; a structural engineer will tell you whether they matter. On any slab house older than fifteen years, we recommend the engineer. It costs a few hundred dollars and it is the difference between a cosmetic repair and a forty-thousand-dollar pier job." },
      { type: "h2", id: "sewer-scope", text: "The sewer scope" },
      { type: "p", text: "A camera down the main drain line. On any house built before 1975, this is not optional. Cast iron pipes corrode from the inside, oak roots find every joint, and replacing a line under a slab is a project measured in weeks. The scope takes an hour." },
      { type: "image", src: img.oakTree, alt: "A single live oak in a field", caption: "Beautiful above ground. Below ground, an oak's roots travel two to three times the width of its canopy." },
      { type: "h3", id: "roof", text: "Roof and hail" },
      { type: "p", text: "Ask for the roof's age and the last insurance claim. A roof over fifteen years old will raise your premium and may be uninsurable with some carriers. Hail is a fact of life here; a good inspector will tell you whether the last storm was already claimed." },
      { type: "h2", id: "what-you-can-skip", text: "What you can usually skip" },
      { type: "ul", items: ["A separate HVAC inspection, if the general inspector runs the system and reports temperature splits.", "A pool inspection on a pool under ten years old with maintenance records. Ask for the records instead."] },
      { type: "p", text: "Everything else, from termites to the septic on acreage, depends on the house. Your agent's job is to tell you which ones matter for this specific property, and to say so before the option period starts ticking." },
      { type: "quote", text: "The cheapest inspection is the one you did not need. The most expensive one is the one you skipped.", cite: "Jordan Blake" },
    ],
  },
  {
    slug: "porch-season",
    title: "Porch season: how Austin homes are designed around weather",
    excerpt:
      "Deep overhangs, screened rooms and the shade of a live oak. The architecture of living outside for ten months a year.",
    category: "Living",
    date: "2026-05-08",
    readingTime: "5 min read",
    image: img.porchHouse,
    alt: "Deep front porch with a swing and shade",
    authorSlug: "marisol-reyes",
    blocks: [
      { type: "p", text: "Ask an Austin architect what the most important room in a house is and you will get the same answer from the modernists and the traditionalists: the one without walls. The porch, the terrace, the screened room. Here is why, and what to look for." },
      { type: "h2", id: "the-overhang", text: "The overhang" },
      { type: "p", text: "The single most useful feature of an Austin house is a deep roof overhang on the south and west. It keeps summer sun off the glass, lets winter sun in, and shades the porch in the evening. New moderns get this right with cantilevers; old bungalows got it right with a hip roof that runs past the wall." },
      { type: "h2", id: "the-oak", text: "The oak" },
      { type: "p", text: "A mature live oak on the west side of a lot is worth, by our rough estimate, somewhere between fifty and a hundred thousand dollars at resale. It cools the house, it cools the yard, and it cannot be bought or built. When we walk a lot, we look at the trees before the house." },
      { type: "image", src: img.patio, alt: "Covered terrace with an outdoor kitchen", caption: "A covered terrace with a ceiling fan extends the season by two months on either end." },
      { type: "h3", id: "screens", text: "Screens, fans and the mosquito question" },
      { type: "p", text: "A screened porch is the difference between using the space in May and using it in August. Add a ceiling fan, which mosquitoes cannot fly through, and you have the most used room in the house." },
      { type: "h2", id: "what-to-ask-for", text: "What to ask for in a new build" },
      { type: "ul", items: ["Overhangs of at least four feet on south and west elevations.", "A covered outdoor room with power, water and a gas line.", "Windows that open, which sounds obvious until you tour a house where none of them do."] },
      { type: "p", text: "Austin's climate is not gentle, but it is generous: ten months of evenings you can spend outside. The best houses here are the ones that were built to take the invitation." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
