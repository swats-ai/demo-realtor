import { img } from "./images";

export type Agent = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  phone: string;
  email: string;
  focus: string[];
};

export const agents: Agent[] = [
  {
    slug: "marisol-reyes",
    name: "Marisol Reyes",
    role: "Broker and founder",
    bio: "Marisol grew up three blocks from the office, on a street that has since been renamed twice. Twenty-one years and roughly six hundred closings later, she still walks every listing before she prices it.",
    image: img.marisol,
    phone: "(512) 555-0148",
    email: "marisol@sabineandoak.com",
    focus: ["Central Austin", "Historic homes", "Negotiation"],
  },
  {
    slug: "theo-lindqvist",
    name: "Theo Lindqvist",
    role: "Partner, luxury and lakefront",
    bio: "A former architect, Theo reads a floor plan the way most of us read a menu. He represents most of our Westlake and Lake Austin sellers and has a quiet gift for finding the buyer nobody else knew was looking.",
    image: "/team/theo-lindqvist.jpg",
    phone: "(512) 555-0152",
    email: "theo@sabineandoak.com",
    focus: ["Westlake", "Lake Austin", "New construction"],
  },
  {
    slug: "priya-anand",
    name: "Priya Anand",
    role: "Agent, first-time and relocation",
    bio: "Priya moved to Austin from Chicago with two suitcases and a spreadsheet. She now runs our relocation practice and has helped more than two hundred households make the same jump with far less anxiety.",
    image: img.priya,
    phone: "(512) 555-0161",
    email: "priya@sabineandoak.com",
    focus: ["Relocation", "Mueller and East Austin", "First-time buyers"],
  },
  {
    slug: "jordan-blake",
    name: "Jordan Blake",
    role: "Agent, Hill Country and land",
    bio: "Jordan spent a decade ranching outside Wimberley before getting licensed. If you want to know how a well is drilled, where a creek floods or which fence line the deer use, ask Jordan.",
    image: img.jordan,
    phone: "(512) 555-0177",
    email: "jordan@sabineandoak.com",
    focus: ["Acreage", "Dripping Springs", "Wimberley"],
  },
];

export const getAgent = (slug: string) => agents.find((a) => a.slug === slug);
