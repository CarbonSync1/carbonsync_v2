"use client";

import { Copy, TreePine, FileSearch } from "lucide-react";

const ACCENT = "#246A73";

const problems = [
  {
    icon: <Copy size={28} strokeWidth={1.8} />,
    headline: "Tracking emissions takes months",
    subline:
      "Spreadsheets, disconnected data sources, and manual entry make reporting slow and error-prone",
  },
  {
    icon: <TreePine size={28} strokeWidth={1.8} />,
    headline: "Most companies can't see their full footprint",
    subline:
      "Value chain emissions (Scope 3) are the hardest to estimate — so most reports leave them out entirely",
  },
  {
    icon: <FileSearch size={28} strokeWidth={1.8} />,
    headline: "No two reports use the same method",
    subline:
      "Without a standard process, emissions numbers shift depending on who's calculating them",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="w-full bg-white py-[100px] md:py-[100px] px-[5%]"
      style={{ paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <h2
            className="font-semibold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 600,
              color: "#1A1A1A",
              marginBottom: "56px",
            }}
          >
            The problem with carbon credits today
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((card) => (
            <div
              key={card.headline}
              className="group rounded-xl p-8 transition-all duration-200 ease-out cursor-default"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAEAEA",
                borderRadius: "12px",
                padding: "32px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = ACCENT;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 8px 30px rgba(36, 106, 115, 0.10)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#EAEAEA";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{ width: 48, height: 48, color: ACCENT }}
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <h3
                className="mb-3 leading-snug"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "12px",
                }}
              >
                {card.headline}
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.5,
                  color: "#5A5A5A",
                }}
              >
                {card.subline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
