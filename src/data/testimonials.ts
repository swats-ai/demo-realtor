import { img } from "./images";

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We toured eleven houses in two weekends. Marisol said no to nine of them before we could. When she finally said yes, so did we.",
    name: "Ana and Luis Ortega",
    detail: "Bought in Travis Heights",
    image: img.clientAna,
  },
  {
    quote:
      "Theo priced our house eighty thousand above what two other brokers suggested and got it in nine days. I still do not know how, and I have stopped asking.",
    name: "Marcus Whitfield",
    detail: "Sold in Westlake Hills",
    image: img.clientMarcus,
  },
  {
    quote:
      "Priya answered a text at 10pm about a school boundary. Then she sent a map. We moved from Denver without ever feeling like strangers.",
    name: "Elena Sørensen",
    detail: "Relocated to Mueller",
    image: img.clientElena,
  },
  {
    quote:
      "Jordan walked our five acres in the rain to show us where the water goes. Nobody else even got out of the truck.",
    name: "Sam and Devi Raghavan",
    detail: "Bought near Dripping Springs",
    image: img.clientSam,
  },
  {
    quote:
      "They talked us out of the first offer we wanted to make. Six months later that house sold for less than we would have paid. That is the whole review.",
    name: "Nora Kim",
    detail: "Bought in Bouldin Creek",
    image: img.clientNora,
  },
  {
    quote:
      "Patient, precise, and refreshingly unsalesy. Our condo sold above ask with a plan that took forty minutes to explain and worked exactly as described.",
    name: "Lee Tanaka",
    detail: "Sold in East Austin",
    image: img.clientLee,
  },
];
