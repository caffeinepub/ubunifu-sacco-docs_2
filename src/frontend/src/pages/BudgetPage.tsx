import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import PageHeader from "../components/PageHeader";
import { markdownToHtml } from "../lib/markdownToHtml";

const fixedCapitalData = [
  { name: "Financial Products Design", value: 810 },
  { name: "Branches Setup", value: 760 },
  { name: "Member Recruitment", value: 300 },
  { name: "Marketing & Promotion", value: 280 },
  { name: "Mentorship Programs", value: 200 },
  { name: "Registration & Legal", value: 180 },
];

const operationalData = [
  { name: "Loan Capital (Revolving)", value: 900 },
  { name: "Staff Salaries", value: 400 },
  { name: "Training & Capacity", value: 80 },
  { name: "Operational Costs", value: 70 },
  { name: "Digital Platform", value: 70 },
  { name: "Policy Engagement", value: 50 },
  { name: "Marketing & Outreach", value: 50 },
  { name: "Feasibility Study", value: 48 },
  { name: "Maintenance", value: 45 },
  { name: "Mentorship Programs", value: 35 },
  { name: "Innovation Events", value: 20 },
  { name: "Audit Costs", value: 12 },
];

const FIXED_COLORS = [
  "#0f4d2a",
  "#1a6b3a",
  "#2d8a4e",
  "#3daa62",
  "#4caf6b",
  "#5bc87e",
];
const OP_COLORS = [
  "#0a3d20",
  "#0f4d2a",
  "#1a6b3a",
  "#2d8a4e",
  "#3daa62",
  "#4caf6b",
  "#5bc87e",
  "#6dd491",
  "#8be0a8",
  "#a8ebbf",
  "#c5f5d4",
  "#e2fded",
];

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-green-200 rounded-lg px-3 py-2 shadow text-sm">
        <p className="font-semibold text-green-900">{payload[0].name}</p>
        <p className="text-green-700">UGX {payload[0].value}M</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieCard({
  title,
  subtitle,
  data,
  colors,
}: {
  title: string;
  subtitle: string;
  data: { name: string; value: number }[];
  colors: string[];
}) {
  return (
    <div className="bg-white border border-green-200 rounded-xl shadow-sm overflow-hidden">
      <div
        className="px-5 py-3 border-b border-green-100"
        style={{ background: "#2d8a4e" }}
      >
        <h3 className="text-white font-bold">{title}</h3>
        <p className="text-green-100 text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="p-2">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={90}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              iconType="circle"
              iconSize={9}
              formatter={(value) => (
                <span style={{ fontSize: 11, color: "#1a3d2a" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function BudgetPage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/docs/budget.md")
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
      <PageHeader
        title="Budget"
        subtitle="Fixed Capital & Operational Budget Projections"
      />
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
        className="content-padding"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <PieCard
            title="Fixed Capital Budget"
            subtitle="Top 6 categories (UGX Millions)"
            data={fixedCapitalData}
            colors={FIXED_COLORS}
          />
          <PieCard
            title="Operational Budget — Year 1"
            subtitle="Breakdown by category (UGX Millions)"
            data={operationalData}
            colors={OP_COLORS}
          />
        </div>

        {loading && (
          <div
            data-ocid="budget.loading_state"
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
            data-ocid="budget.error_state"
            className="flex items-start gap-3 py-10 text-sm text-red-600"
          >
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {content && (
          <article
            className="md-content"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />
        )}
      </div>
      <style>
        {
          "@media (max-width: 768px) { .content-padding { padding: 24px !important; } }"
        }
      </style>
    </div>
  );
}
