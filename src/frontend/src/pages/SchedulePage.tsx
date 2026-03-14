import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageHeader from "../components/PageHeader";
import { markdownToHtml } from "../lib/markdownToHtml";

const activities = [
  { name: "SACCO Legal Formation", start: 0, duration: 4, color: "#2d8a4e" },
  { name: "Digital Platform Dev", start: 0, duration: 8, color: "#3daa62" },
  { name: "Member Recruitment", start: 4, duration: 16, color: "#1a6b3a" },
  {
    name: "Financial Products Design",
    start: 0,
    duration: 4,
    color: "#4caf6b",
  },
  { name: "Capital Mobilization", start: 0, duration: 20, color: "#0f4d2a" },
  { name: "Mentorship Programs", start: 4, duration: 16, color: "#5bc87e" },
  { name: "Networking & Innovation", start: 4, duration: 16, color: "#6dd491" },
  {
    name: "Financial Literacy Training",
    start: 4,
    duration: 16,
    color: "#22774a",
  },
  { name: "Monitoring & Evaluation", start: 0, duration: 20, color: "#8be0a8" },
  { name: "Policy Advocacy", start: 2, duration: 18, color: "#a8ebbf" },
];

const yearTicks = [0, 4, 8, 12, 16, 20];
const yearLabels: Record<number, string> = {
  0: "Y1",
  4: "Y2",
  8: "Y3",
  12: "Y4",
  16: "Y5",
  20: "End",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const spacer = payload[0]?.value ?? 0;
    const dur = payload[1]?.value ?? 0;
    const startQ = spacer + 1;
    const endQ = spacer + dur;
    const startYear = Math.floor(spacer / 4) + 1;
    const endYear = Math.min(Math.ceil(endQ / 4), 5);
    return (
      <div className="bg-white border border-green-200 rounded-lg px-3 py-2 shadow text-sm">
        <p className="font-semibold text-green-900">{label}</p>
        <p className="text-green-700">
          Q{startQ} – Q{endQ} &nbsp;·&nbsp; Year {startYear}–{endYear}
        </p>
        <p className="text-green-600">
          {dur} quarter{dur !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

export default function SchedulePage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/docs/implementation-schedule.md")
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
        title="Implementation Schedule"
        subtitle="20 Quarterly Periods · January 2026 – December 2031"
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
              Implementation Schedule
            </h2>
            <p className="text-green-100 text-sm mt-0.5">
              20 Quarterly Periods · 2026 – 2031
            </p>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                layout="vertical"
                data={activities}
                margin={{ top: 8, right: 24, left: 170, bottom: 8 }}
                barSize={18}
              >
                <XAxis
                  type="number"
                  domain={[0, 20]}
                  ticks={yearTicks}
                  tickFormatter={(v) => yearLabels[v] ?? ""}
                  tick={{ fontSize: 12, fill: "#2d8a4e", fontWeight: 600 }}
                  tickLine={false}
                  axisLine={{ stroke: "#d1fae5" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={165}
                  tick={{ fontSize: 11.5, fill: "#1a3d2a" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(45,138,78,0.06)" }}
                />
                <Bar
                  dataKey="start"
                  stackId="gantt"
                  fill="transparent"
                  radius={0}
                  isAnimationActive={false}
                >
                  {activities.map((a) => (
                    <Cell key={`spacer-${a.name}`} fill="transparent" />
                  ))}
                </Bar>
                <Bar
                  dataKey="duration"
                  stackId="gantt"
                  radius={[4, 4, 4, 4]}
                  isAnimationActive={true}
                >
                  {activities.map((a) => (
                    <Cell key={`dur-${a.name}`} fill={a.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 px-2">
              {activities.map((a) => (
                <span
                  key={a.name}
                  className="flex items-center gap-1.5 text-xs text-gray-600"
                >
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ background: a.color }}
                  />
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div
            data-ocid="schedule.loading_state"
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
            data-ocid="schedule.error_state"
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
