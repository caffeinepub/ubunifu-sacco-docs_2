import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const departments = [
  {
    head: "Head of Finance & Accounting",
    roles: [
      "Finance Manager",
      "Accountants (3–5)",
      "Treasury Officer",
      "Payroll Officer",
    ],
  },
  {
    head: "Head of Technology & Innovation",
    roles: [
      "IT Manager",
      "Software Developers (2–3)",
      "MIS Officer",
      "Cybersecurity Specialist",
    ],
  },
  {
    head: "Head of Credit / Loans",
    roles: [
      "Credit Manager",
      "Loan Officers (10–15)",
      "Credit Analysts (5–8)",
      "Collections Officers (3–5)",
    ],
  },
  {
    head: "Head of Business Dev & Partnerships",
    roles: [
      "Business Dev Manager",
      "Partnership Officers (2–3)",
      "Innovation Program Coordinator",
      "Grants Specialist",
    ],
  },
  {
    head: "Head of Member Services",
    roles: [
      "Member Services Manager",
      "Onboarding Officers (4–6)",
      "Customer Support Reps (5–8)",
      "Training Coordinators (2–3)",
    ],
  },
  {
    head: "Head of Operations & Compliance",
    roles: [
      "Operations Manager",
      "Compliance Officer",
      "Internal Auditor",
      "Risk Officer",
      "Legal Officer",
    ],
  },
];

const deptPositions = [100, 268, 436, 604, 732, 860];
const deptLabels = [
  "Finance &\nAccounting",
  "Technology &\nInnovation",
  "Credit /\nLoans",
  "Business Dev &\nPartnerships",
  "Member\nServices",
  "Operations &\nCompliance",
];

const mdComponents: Components = {
  table: ({ children }) => (
    <div className="md-table-scroll">
      <table>{children}</table>
    </div>
  ),
};

function DeptCard({ head, roles }: { head: string; roles: string[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-green-200 rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm text-white"
        style={{ background: "#3daa62" }}
      >
        <span>{head}</span>
        {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
      </button>
      {open && (
        <ul className="divide-y divide-green-50">
          {roles.map((r) => (
            <li
              key={r}
              className="px-4 py-2 text-sm text-green-900 bg-white hover:bg-green-50 transition-colors"
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OrganogramPage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/docs/hr-organogram.md")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load (${r.status})`);
        return r.text();
      })
      .then((t) => {
        setContent(t);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Governance SVG Chart */}
      <div className="bg-white border border-green-200 rounded-xl shadow-sm mb-6 overflow-hidden">
        <div
          className="px-6 py-4 border-b border-green-100"
          style={{ background: "#2d8a4e" }}
        >
          <h2 className="text-white font-bold text-lg">Organisational Chart</h2>
          <p className="text-green-100 text-sm mt-0.5">
            UBUNIFU SACCO Ltd. — Governance & Management Structure
          </p>
        </div>
        <div className="overflow-x-auto p-4">
          <svg
            width="900"
            height="340"
            viewBox="0 0 900 340"
            className="mx-auto"
            role="img"
            aria-labelledby="org-chart-title"
          >
            <title id="org-chart-title">
              UBUNIFU SACCO Ltd. Organisational Chart
            </title>
            {/* Lines */}
            <line
              x1="450"
              y1="52"
              x2="450"
              y2="88"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="450"
              y1="120"
              x2="200"
              y2="120"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="120"
              x2="200"
              y2="158"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="450"
              y1="120"
              x2="420"
              y2="120"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="420"
              y1="120"
              x2="420"
              y2="158"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="450"
              y1="120"
              x2="680"
              y2="120"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="680"
              y1="120"
              x2="680"
              y2="158"
              stroke="#2d8a4e"
              strokeWidth="2"
            />
            <line
              x1="680"
              y1="192"
              x2="680"
              y2="230"
              stroke="#3daa62"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="230"
              x2="860"
              y2="230"
              stroke="#3daa62"
              strokeWidth="2"
            />
            {deptPositions.map((x) => (
              <line
                key={`tick-${x}`}
                x1={x}
                y1="230"
                x2={x}
                y2="260"
                stroke="#3daa62"
                strokeWidth="2"
              />
            ))}
            {/* General Meeting */}
            <rect
              x="310"
              y="10"
              width="280"
              height="42"
              rx="8"
              fill="#0f4d2a"
            />
            <text
              x="450"
              y="27"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
            >
              General Meeting of Members
            </text>
            <text
              x="450"
              y="44"
              textAnchor="middle"
              fill="#a8ebbf"
              fontSize="10"
            >
              Supreme Authority
            </text>
            {/* Board */}
            <rect
              x="310"
              y="88"
              width="280"
              height="32"
              rx="8"
              fill="#2d8a4e"
            />
            <text
              x="450"
              y="108"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
            >
              Board of Directors
            </text>
            {/* Supervisory */}
            <rect
              x="100"
              y="158"
              width="200"
              height="34"
              rx="8"
              fill="#e8f5ee"
              stroke="#2d8a4e"
              strokeWidth="1.5"
            />
            <text
              x="200"
              y="171"
              textAnchor="middle"
              fill="#0f4d2a"
              fontSize="11"
              fontWeight="600"
            >
              Supervisory Committee
            </text>
            <text
              x="200"
              y="185"
              textAnchor="middle"
              fill="#2d8a4e"
              fontSize="9.5"
            >
              Independent Oversight
            </text>
            {/* Credit */}
            <rect
              x="320"
              y="158"
              width="200"
              height="34"
              rx="8"
              fill="#e8f5ee"
              stroke="#2d8a4e"
              strokeWidth="1.5"
            />
            <text
              x="420"
              y="171"
              textAnchor="middle"
              fill="#0f4d2a"
              fontSize="11"
              fontWeight="600"
            >
              Credit Committee
            </text>
            <text
              x="420"
              y="185"
              textAnchor="middle"
              fill="#2d8a4e"
              fontSize="9.5"
            >
              Loan Decisions
            </text>
            {/* CEO */}
            <rect
              x="580"
              y="158"
              width="200"
              height="34"
              rx="8"
              fill="#1a6b3a"
            />
            <text
              x="680"
              y="171"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
            >
              CEO / SACCO Manager
            </text>
            <text
              x="680"
              y="185"
              textAnchor="middle"
              fill="#a8ebbf"
              fontSize="9.5"
            >
              Chief Executive
            </text>
            {/* Department Heads */}
            {deptPositions.map((x, idx) => {
              const lines = deptLabels[idx].split("\n");
              return (
                <g key={`dept-${x}`}>
                  <rect
                    x={x - 76}
                    y={260}
                    width={152}
                    height={44}
                    rx="7"
                    fill="#3daa62"
                  />
                  {lines.map((line, li) => (
                    <text
                      key={`${x}-${line}`}
                      x={x}
                      y={li === 0 ? (lines.length === 1 ? 286 : 275) : 290}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Management Cards */}
      <div className="bg-white border border-green-200 rounded-xl shadow-sm mb-8 overflow-hidden">
        <div
          className="px-6 py-4 border-b border-green-100"
          style={{ background: "#1a6b3a" }}
        >
          <h3 className="text-white font-bold">Management Structure</h3>
          <p className="text-green-100 text-xs mt-0.5">
            Click any department to expand/collapse sub-roles
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div
              className="px-6 py-2.5 rounded-xl text-white font-bold text-sm"
              style={{ background: "#1a6b3a" }}
            >
              CEO / SACCO Manager
            </div>
          </div>
          <div className="w-px h-5 bg-green-400 mx-auto mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {departments.map((d) => (
              <DeptCard key={d.head} head={d.head} roles={d.roles} />
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div
          data-ocid="organogram.loading_state"
          className="flex items-center gap-3 py-10 text-muted-foreground"
        >
          <Loader2
            size={18}
            className="animate-spin"
            style={{ color: "#2d8a4e" }}
          />
          <span className="text-sm">Loading content…</span>
        </div>
      )}
      {error && (
        <div
          data-ocid="organogram.error_state"
          className="flex items-start gap-3 py-10 text-sm text-red-600"
        >
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {content && (
        <article className="md-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={mdComponents}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}
