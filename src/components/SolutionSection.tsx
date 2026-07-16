"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const ACCENT = "#246A73";

const features = [
  "Automated data collection — no manual spreadsheets",
  "Scope 1, 2 & 3 emissions coverage",
  "Audit-ready reports, always current",
  "Clear dashboards your whole team can read",
];

function ScopeChart() {
  const scopeData = [
    { label: "Scope 1", value: 18, color: ACCENT },
    { label: "Scope 2", value: 34, color: "#5B9AA5" },
    { label: "Scope 3", value: 48, color: "#A3C8CF" },
  ];

  const total = scopeData.reduce((s, d) => s + d.value, 0);
  const radius = 70;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  const arcs = scopeData.map((d) => {
    const pct = d.value / total;
    const dashLen = circumference * pct;
    const dashOffset = circumference * (1 - cumulative / total);
    cumulative += d.value;
    return { ...d, dashLen, dashOffset };
  });

  const barH = 22;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAEAEA",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-6 py-4"
        style={{ borderBottom: "1px solid #EAEAEA" }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: ACCENT }}
        />
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>
          Emissions by Scope
        </span>
        <span
          className="ml-auto"
          style={{ fontSize: "12px", color: "#5A5A5A" }}
        >
          tCO₂e
        </span>
      </div>

      {/* Donut + legend */}
      <div className="flex flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
        <svg
          viewBox="0 0 200 200"
          width="160"
          height="160"
          role="img"
          aria-label="Donut chart showing emissions breakdown: Scope 1 18 percent, Scope 2 34 percent, Scope 3 48 percent"
        >
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={a.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${a.dashLen} ${circumference - a.dashLen}`}
              strokeDashoffset={a.dashOffset}
              strokeLinecap="butt"
              style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
          ))}
          <text
            x="100"
            y="94"
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="26"
            fontWeight="700"
          >
            {total.toLocaleString()}
          </text>
          <text
            x="100"
            y="116"
            textAnchor="middle"
            fill="#5A5A5A"
            fontSize="11"
          >
            total tCO₂e
          </text>
        </svg>

        <div className="flex flex-col gap-3 min-w-0">
          {scopeData.map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <span
                className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                style={{ background: d.color }}
              />
              <span
                style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }}
              >
                {d.label}
              </span>
              <span style={{ fontSize: "14px", color: "#5A5A5A" }}>
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal bar breakdown */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        {scopeData.map((d) => (
          <div key={d.label}>
            <div
              className="flex justify-between mb-1"
              style={{ fontSize: "12px" }}
            >
              <span style={{ fontWeight: 500, color: "#1A1A1A" }}>
                {d.label}
              </span>
              <span style={{ color: "#5A5A5A" }}>{d.value}%</span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: barH, background: "#F0F0F0" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.value}%`,
                  background: d.color,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section
      className="w-full bg-white px-[5%]"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center gap-12">
          {/* Left — text */}
          <div className="flex flex-col">
            <h2
              className="tracking-tight leading-tight"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.25,
                marginBottom: "16px",
              }}
            >
              One platform. Full-scope emissions accounting.
            </h2>

            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.6,
                color: "#5A5A5A",
                marginBottom: "32px",
                maxWidth: 480,
              }}
            >
              Connect your data once — CarbonSynq automatically calculates and
              organizes your emissions across every scope.
            </p>

            <ul className="flex flex-col" style={{ marginBottom: "36px" }}>
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start"
                  style={{ gap: "12px", marginBottom: "16px" }}
                >
                  <span
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 2,
                      color: ACCENT,
                    }}
                    aria-hidden="true"
                  >
                    <Check size={18} strokeWidth={2.4} />
                  </span>
                  <span style={{ fontSize: "16px", color: "#1A1A1A" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center transition-all duration-200 focus:outline-none"
                style={{
                  background: ACCENT,
                  color: "#FFFFFF",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1D555C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = ACCENT;
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${ACCENT}`;
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
              >
                See it in action
              </Link>
            </div>
          </div>

          {/* Right — visual */}
          <div className="w-full">
            <ScopeChart />
          </div>
        </div>
      </div>
    </section>
  );
}
