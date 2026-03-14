import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageHeader from "../components/PageHeader";
import { markdownToHtml } from "../lib/markdownToHtml";

const year5Targets = [
  { name: "Members", value: 25000 },
  { name: "MSMEs Financed", value: 3000 },
  { name: "Jobs Created", value: 10000 },
  { name: "Partnerships", value: 15 },
  { name: "Women Members", value: 10000 },
  { name: "Rural Members", value: 7500 },
];

const barColors = [
  "#2d8a4e",
  "#1a6b3a",
  "#3daa62",
  "#0f4d2a",
  "#4caf6b",
  "#5bc87e",
];

const formatNumber = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-green-200 rounded-lg px-3 py-2 shadow text-sm">
        <p className="font-semibold text-green-900">{label}</p>
        <p className="text-green-700">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function StrategyResultsPage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/docs/strategy-results.md")
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
        title="Strategy & Expected Results"
        subtitle="Strategic Pillars & Year 5 Targets by 2031"
      />
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
        className="content-padding"
      >
        <div className="bg-white border border-green-200 rounded-xl shadow-sm mb-8 overflow-hidden">
          <div
            className="px-6 py-4 border-b border-green-100"
            style={{ background: "#2d8a4e" }}
          >
            <h2 className="text-white font-bold text-lg">
              Year 5 Targets by 2031
            </h2>
            <p className="text-green-100 text-sm mt-0.5">
              Key impact indicators at project completion
            </p>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={year5Targets}
                margin={{ top: 24, right: 24, left: 16, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8f5ee"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#1a3d2a" }}
                  tickLine={false}
                  axisLine={{ stroke: "#d1fae5" }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(45,138,78,0.07)" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {year5Targets.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={barColors[i % barColors.length]}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(v: number) => v.toLocaleString()}
                    style={{ fontSize: 11, fill: "#1a3d2a", fontWeight: 600 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {loading && (
          <div
            data-ocid="strategy.loading_state"
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
            data-ocid="strategy.error_state"
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
