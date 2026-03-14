import { useState } from "react";
import { useRouter } from "../lib/router";

export const PAGE_ORDER = [
  { label: "Home", path: "/" },
  { label: "Company Profile", path: "/about/company-profile" },
  { label: "Vision & Mission", path: "/about/vision-mission" },
  { label: "Core Services", path: "/about/core-services" },
  { label: "Strategic Objectives", path: "/about/strategic-objectives" },
  { label: "Contact", path: "/about/contact" },
  { label: "Introduction", path: "/project/introduction" },
  { label: "Problem Statement", path: "/project/problem-statement" },
  { label: "Concept Note", path: "/project/concept-note" },
  { label: "Literature Review", path: "/methodology/literature-review" },
  { label: "Feasibility Study", path: "/methodology/feasibility-study" },
  { label: "Needs Assessment", path: "/methodology/needs-assessment" },
  { label: "Stakeholder Analysis", path: "/methodology/stakeholder-analysis" },
  { label: "Data Collection", path: "/methodology/data-collection" },
  { label: "Implementation Phases", path: "/implementation/phases" },
  { label: "Key Activities", path: "/implementation/key-activities" },
  { label: "Deliverables", path: "/implementation/deliverables" },
  { label: "Implementation Schedule", path: "/implementation/schedule" },
  { label: "Beneficiaries", path: "/beneficiaries" },
  { label: "Financial Products", path: "/products/financial-products" },
  { label: "Strategy & Expected Results", path: "/strategy-results" },
  { label: "Risk Management", path: "/risk-management" },
  { label: "Staffing", path: "/hr/staffing" },
  { label: "Organogram", path: "/hr/organogram" },
  { label: "Staff Motivation", path: "/hr/motivation-plan" },
  { label: "Budget", path: "/budget" },
  { label: "Sustainability Strategy", path: "/sustainability" },
  { label: "References", path: "/references" },
];

function NavButton({
  label,
  pageName,
  direction,
  onClick,
  ocid,
}: {
  label: string;
  pageName: string;
  direction: "prev" | "next";
  onClick: () => void;
  ocid: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "10px",
        padding: "16px 28px",
        background: "white",
        border: hovered ? "2px solid #2E7D32" : "2px solid #E0EDE0",
        boxShadow: hovered
          ? "0 4px 16px rgba(27,94,32,0.15)"
          : "0 2px 8px rgba(27,94,32,0.07)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        minWidth: "220px",
        cursor: "pointer",
        textAlign: isPrev ? "left" : "right",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        alignItems: isPrev ? "flex-start" : "flex-end",
      }}
    >
      <span
        style={{
          fontSize: "1.1rem",
          color: "#2E7D32",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {isPrev ? "←" : "→"}
      </span>
      <span
        style={{
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: "2px",
          color: "#4A4A6A",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#1A1A2E",
        }}
      >
        {pageName}
      </span>
    </button>
  );
}

export default function PageNav() {
  const { pathname, navigate } = useRouter();
  const currentIndex = PAGE_ORDER.findIndex((p) => p.path === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const next =
    currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;
  const progressPct = ((currentIndex + 1) / PAGE_ORDER.length) * 100;

  return (
    <div className="page-nav-wrapper">
      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#E0EDE0",
          marginBottom: "32px",
        }}
      />

      {/* Nav row */}
      <div className="page-nav-row">
        {/* Previous */}
        <div className="page-nav-prev">
          {prev && (
            <NavButton
              label="Previous"
              pageName={prev.label}
              direction="prev"
              onClick={() => navigate(prev.path)}
              ocid="page_nav.pagination_prev"
            />
          )}
        </div>

        {/* Progress */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "#4A4A6A",
              fontSize: "0.8rem",
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Page {currentIndex + 1} of {PAGE_ORDER.length}
          </span>
          <div
            style={{
              width: "120px",
              height: "4px",
              borderRadius: "2px",
              background: "#E0EDE0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "2px",
                background: "linear-gradient(to right, #1B5E20, #FFD600)",
                width: `${progressPct}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Next */}
        <div className="page-nav-next">
          {next && (
            <NavButton
              label="Next"
              pageName={next.label}
              direction="next"
              onClick={() => navigate(next.path)}
              ocid="page_nav.pagination_next"
            />
          )}
        </div>
      </div>

      <style>{`
        .page-nav-wrapper {
          padding: 0 0 48px 0;
        }
        .page-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .page-nav-prev {
          flex: 1;
          display: flex;
          justify-content: flex-start;
        }
        .page-nav-next {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        @media (max-width: 768px) {
          .page-nav-row {
            flex-direction: column-reverse;
            align-items: stretch;
          }
          .page-nav-prev,
          .page-nav-next {
            flex: none;
            justify-content: stretch;
          }
          .page-nav-prev button,
          .page-nav-next button {
            width: 100% !important;
            min-width: unset !important;
            text-align: center !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
