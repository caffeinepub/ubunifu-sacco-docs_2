import { Leaf } from "lucide-react";
import { NavLink } from "../lib/router";

interface NavItem {
  label: string;
  path?: string;
  sectionHeader?: boolean;
}

const navTree: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", sectionHeader: true },
  { label: "Company Profile", path: "/about/company-profile" },
  { label: "Vision & Mission", path: "/about/vision-mission" },
  { label: "Core Services", path: "/about/core-services" },
  { label: "Strategic Objectives", path: "/about/strategic-objectives" },
  { label: "Contact", path: "/about/contact" },
  { label: "Project Overview", sectionHeader: true },
  { label: "Introduction", path: "/project/introduction" },
  { label: "Problem Statement", path: "/project/problem-statement" },
  { label: "Concept Note", path: "/project/concept-note" },
  { label: "Methodology", sectionHeader: true },
  { label: "Literature Review", path: "/methodology/literature-review" },
  { label: "Feasibility Study", path: "/methodology/feasibility-study" },
  { label: "Needs Assessment", path: "/methodology/needs-assessment" },
  { label: "Stakeholder Analysis", path: "/methodology/stakeholder-analysis" },
  { label: "Data Collection", path: "/methodology/data-collection" },
  { label: "Implementation", sectionHeader: true },
  { label: "Phases", path: "/implementation/phases" },
  { label: "Key Activities", path: "/implementation/key-activities" },
  { label: "Deliverables", path: "/implementation/deliverables" },
  { label: "Schedule", path: "/implementation/schedule" },
  { label: "Beneficiaries & Products", sectionHeader: true },
  { label: "Beneficiaries", path: "/beneficiaries" },
  { label: "Financial Products", path: "/products/financial-products" },
  { label: "Value Proposition", path: "/products/value-proposition" },
  { label: "Customer Segments", path: "/products/customer-segments" },
  { label: "Channels", path: "/products/channels" },
  { label: "Revenue Streams", path: "/products/revenue-streams" },
  { label: "Key Resources", path: "/products/key-resources" },
  { label: "Impact Metrics", path: "/products/impact-metrics" },
  { label: "Results & Governance", sectionHeader: true },
  { label: "Strategy & Results", path: "/strategy-results" },
  { label: "Risk Management", path: "/risk-management" },
  { label: "Staffing", path: "/hr/staffing" },
  { label: "Organogram", path: "/hr/organogram" },
  { label: "Motivation Plan", path: "/hr/motivation-plan" },
  { label: "Budget", path: "/budget" },
  { label: "Sustainability", path: "/sustainability" },
  { label: "References", path: "/references" },
];

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/g, "");
}

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <nav
      data-ocid="sidebar.nav"
      className="w-full h-full overflow-y-auto flex flex-col"
    >
      {/* Logo area */}
      <div style={{ padding: "24px 20px 16px" }}>
        <div className="flex items-center gap-2 mb-1">
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            UBUNIFU SACCO
          </span>
        </div>
        <p
          style={{
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.6)",
            paddingLeft: "34px",
            margin: 0,
          }}
        >
          Documentation Portal
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          margin: "0 20px 8px",
        }}
      />

      {/* Nav items */}
      <div style={{ padding: "0 12px 24px", flex: 1 }}>
        {navTree.map((item) => {
          if (item.sectionHeader) {
            return (
              <div
                key={`section-${item.label}`}
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "rgba(255,214,0,0.6)",
                  padding: "12px 8px 4px",
                  marginTop: "4px",
                  userSelect: "none",
                }}
              >
                {item.label}
              </div>
            );
          }

          if (!item.path) return null;
          const key = slugify(item.label);
          const isHome = item.path === "/";
          const ocid = isHome ? "nav.home.link" : `nav.${key}.link`;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={isHome}
              data-ocid={ocid}
              onClick={onClose}
              style={({ isActive }) => ({
                display: "block",
                padding: "9px 12px",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontFamily: "'Inter', sans-serif",
                color: isActive ? "#1B5E20" : "white",
                background: isActive ? "#FFD600" : "transparent",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s ease",
                textDecoration: "none",
                marginBottom: "2px",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (!el.getAttribute("aria-current")) {
                  el.style.background = "rgba(255,255,255,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (!el.getAttribute("aria-current")) {
                  el.style.background = "transparent";
                }
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
