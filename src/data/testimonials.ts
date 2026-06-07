export interface Testimonial {
  quote: string;
  name: string;
  position: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "CarbonSync's intelligence platform revolutionized our approach to sustainability. Their automated data ingestion and user-friendly reporting streamlined our ESG processes, enabling us to make confident, data-driven decisions.",
    name: "Arjun Mehta",
    position: "Chief Sustainability Officer, Vertex Innovations",
  },
  {
    quote: "We were struggling with fragmented data across 14 facilities. CarbonSync brought everything into a single source of truth, cutting our audit preparation time by over 60% in the first quarter alone.",
    name: "Sarah Jenkins",
    position: "VP of Operations, BlueShift Logistics",
  },
  {
    quote: "The predictive AI capabilities are unmatched. We can now accurately forecast our emission hotspots and test reduction scenarios before committing capital to net-zero initiatives.",
    name: "David Chen",
    position: "Director of ESG, Nexus Global",
  },
];
