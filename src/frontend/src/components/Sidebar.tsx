import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavChild {
  label: string;
  path: string;
}
interface NavGroup {
  label: string;
  children: NavChild[];
}
interface NavItem {
  label: string;
  path?: string;
  children?: NavChild[];
}

const navTree: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About",
    children: [
      { label: "Company Profile", path: "/about/company-profile" },
      { label: "Vision & Mission", path: "/about/vision-mission" },
      { label: "Core Services", path: "/about/core-services" },
      { label: "Strategic Objectives", path: "/about/strategic-objectives" },
      { label: "Contact", path: "/about/contact" },
    ],
  },
  {
    label: "Project Overview",
    children: [
      { label: "Introduction", path: "/project/introduction" },
      { label: "Problem Statement", path: "/project/problem-statement" },
      { label: "Concept Note", path: "/project/concept-note" },
    ],
  },
  {
    label: "Methodology",
    children: [
      { label: "Literature Review", path: "/methodology/literature-review" },
      { label: "Feasibility Study", path: "/methodology/feasibility-study" },
      { label: "Needs Assessment", path: "/methodology/needs-assessment" },
      {
        label: "Stakeholder Analysis",
        path: "/methodology/stakeholder-analysis",
      },
      { label: "Data Collection", path: "/methodology/data-collection" },
    ],
  },
  {
    label: "Implementation",
    children: [
      { label: "Phases", path: "/implementation/phases" },
      { label: "Key Activities", path: "/implementation/key-activities" },
      { label: "Deliverables", path: "/implementation/deliverables" },
      { label: "Schedule", path: "/implementation/schedule" },
    ],
  },
  { label: "Beneficiaries", path: "/beneficiaries" },
  {
    label: "Products & Business Model",
    children: [
      { label: "Financial Products", path: "/products/financial-products" },
      { label: "Value Proposition", path: "/products/value-proposition" },
      { label: "Customer Segments", path: "/products/customer-segments" },
      { label: "Channels", path: "/products/channels" },
      { label: "Revenue Streams", path: "/products/revenue-streams" },
      { label: "Key Resources", path: "/products/key-resources" },
      { label: "Impact Metrics", path: "/products/impact-metrics" },
    ],
  },
  { label: "Strategy & Results", path: "/strategy-results" },
  { label: "Risk Management", path: "/risk-management" },
  {
    label: "Human Resources",
    children: [
      { label: "Staffing", path: "/hr/staffing" },
      { label: "Organogram", path: "/hr/organogram" },
      { label: "Motivation Plan", path: "/hr/motivation-plan" },
    ],
  },
  { label: "Budget", path: "/budget" },
  { label: "Sustainability", path: "/sustainability" },
  { label: "References", path: "/references" },
];

function groupKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/g, "");
}

const GREEN = "oklch(0.52 0.155 150)";
const GREEN_BG = "oklch(0.94 0.04 150)";
const HOVER_BG = "oklch(0.96 0.025 150)";
const TEXT_DEFAULT = "oklch(0.35 0.02 150)";
const TEXT_HOVER = "oklch(0.45 0.12 150)";

function NavGroupItem({
  item,
  onClose,
}: { item: NavGroup; onClose: () => void }) {
  const location = useLocation();
  const isChildActive = item.children.some((c) => location.pathname === c.path);
  const [open, setOpen] = useState(isChildActive);
  const key = groupKey(item.label);

  return (
    <div>
      <button
        type="button"
        data-ocid={`nav.${key}.toggle`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors"
        style={{
          color: isChildActive ? GREEN : TEXT_DEFAULT,
          background: isChildActive ? GREEN_BG : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isChildActive) {
            (e.currentTarget as HTMLElement).style.background = HOVER_BG;
            (e.currentTarget as HTMLElement).style.color = TEXT_HOVER;
          }
        }}
        onMouseLeave={(e) => {
          if (!isChildActive) {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = TEXT_DEFAULT;
          }
        }}
      >
        <span className="truncate text-left">{item.label}</span>
        {open ? (
          <ChevronDown size={14} className="flex-shrink-0 ml-1" />
        ) : (
          <ChevronRight size={14} className="flex-shrink-0 ml-1" />
        )}
      </button>

      {open && (
        <div
          className="ml-3 mt-0.5 border-l-2 pl-2"
          style={{ borderColor: "oklch(0.85 0.06 150)" }}
        >
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              data-ocid={`nav.${key}.${groupKey(child.label)}.link`}
              onClick={onClose}
              className="block px-2 py-1.5 text-sm rounded-md transition-colors"
              style={({ isActive }) => ({
                color: isActive ? GREEN : "oklch(0.4 0.015 155)",
                background: isActive ? GREEN_BG : undefined,
                fontWeight: isActive ? 600 : 400,
              })}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <nav
      data-ocid="sidebar.nav"
      className="w-full h-full bg-white border-r overflow-y-auto"
      style={{ borderColor: "oklch(0.91 0.015 150)" }}
    >
      <div className="p-3 space-y-0.5">
        {navTree.map((item) => {
          if (item.path) {
            const key = groupKey(item.label);
            const ocid =
              item.path === "/" ? "nav.home.link" : `nav.${key}.link`;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                data-ocid={ocid}
                end={item.path === "/"}
                onClick={onClose}
                className="block px-3 py-2 text-sm font-medium rounded-md transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? GREEN : TEXT_DEFAULT,
                  background: isActive ? GREEN_BG : undefined,
                })}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!el.getAttribute("aria-current")) {
                    el.style.background = HOVER_BG;
                    el.style.color = TEXT_HOVER;
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!el.getAttribute("aria-current")) {
                    el.style.background = "";
                    el.style.color = "";
                  }
                }}
              >
                {item.label}
              </NavLink>
            );
          }
          return (
            <NavGroupItem
              key={item.label}
              item={item as NavGroup}
              onClose={onClose}
            />
          );
        })}
      </div>
    </nav>
  );
}
