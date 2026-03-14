import PageHeader from "../components/PageHeader";
import PageNav from "../components/PageNav";

const QUARTERS = Array.from({ length: 20 }, (_, i) => {
  const year = 2026 + Math.floor(i / 4);
  const q = (i % 4) + 1;
  return `Q${q} ${year}`;
});

type ActivityType =
  | "legal"
  | "tech"
  | "members"
  | "financial"
  | "programs"
  | "monitoring";

const TYPE_COLORS: Record<ActivityType, string> = {
  legal: "#1B5E20",
  tech: "#1565C0",
  members: "#6A1B9A",
  financial: "#E65100",
  programs: "#2E7D32",
  monitoring: "#AD1457",
};

const TYPE_LABELS: Record<ActivityType, string> = {
  legal: "Legal / Governance",
  tech: "Technology",
  members: "Members / Recruitment",
  financial: "Financial / Capital",
  programs: "Programs / Training",
  monitoring: "Monitoring",
};

const activities: {
  name: string;
  type: ActivityType;
  start: number;
  end: number;
}[] = [
  {
    name: "SACCO Legal Formation & Compliance",
    type: "legal",
    start: 0,
    end: 3,
  },
  { name: "Digital Platform Development", type: "tech", start: 0, end: 7 },
  {
    name: "Member Recruitment & Onboarding",
    type: "members",
    start: 4,
    end: 19,
  },
  { name: "Financial Products Design", type: "financial", start: 0, end: 3 },
  {
    name: "Capital Mobilization & Fundraising",
    type: "financial",
    start: 0,
    end: 19,
  },
  { name: "Mentorship Programs", type: "programs", start: 4, end: 19 },
  {
    name: "Networking & Innovation Events",
    type: "programs",
    start: 4,
    end: 19,
  },
  { name: "Financial Literacy Training", type: "programs", start: 4, end: 19 },
  { name: "Monitoring & Evaluation", type: "monitoring", start: 0, end: 19 },
  { name: "Policy Advocacy", type: "legal", start: 2, end: 19 },
];

const CELL_W = 52;
const ROW_H = 42;
const LABEL_W = 230;
const HEADER_H = 48;
const PADDING = 4;

export default function SchedulePage() {
  const totalW = LABEL_W + QUARTERS.length * CELL_W;
  const totalH = HEADER_H + activities.length * ROW_H + PADDING * 2;

  // Year markers for the header
  const years = [2026, 2027, 2028, 2029, 2030, 2031];

  return (
    <div>
      <PageHeader
        title="Implementation Schedule"
        subtitle="20 Quarterly Periods · January 2026 – December 2031"
      />
      <div
        style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 40px" }}
        className="content-padding"
      >
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#2E7D32",
            borderBottom: "2px solid #FFD600",
            display: "inline-block",
            paddingBottom: "6px",
            marginBottom: "24px",
          }}
        >
          Gantt Chart — 5-Year Activity Timeline
        </h2>

        {/* Scrollable Gantt container */}
        <div
          data-ocid="schedule.panel"
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(27,94,32,0.10)",
            border: "1px solid #E0EDE0",
            background: "#fff",
          }}
        >
          <svg
            width={totalW}
            height={totalH}
            style={{ display: "block", minWidth: totalW }}
            role="img"
            aria-label="Gantt chart showing 10 activities across 20 quarters from 2026 to 2031"
          >
            {/* Background stripes per year */}
            {years.map((yr, yi) => (
              <rect
                key={yr}
                x={LABEL_W + yi * 4 * CELL_W}
                y={0}
                width={4 * CELL_W}
                height={totalH}
                fill={yi % 2 === 0 ? "#F8FAF8" : "#fff"}
              />
            ))}

            {/* Year header band */}
            <rect x={0} y={0} width={totalW} height={26} fill="#1B5E20" />
            <text
              x={LABEL_W / 2}
              y={17}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize={11}
              fontFamily="'Inter', sans-serif"
            >
              Activity
            </text>
            {years.map((yr, yi) => (
              <text
                key={yr}
                x={LABEL_W + yi * 4 * CELL_W + 2 * CELL_W}
                y={17}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight={700}
                fontFamily="'Sora', sans-serif"
              >
                {yr}
              </text>
            ))}

            {/* Quarter header row */}
            <rect x={0} y={26} width={totalW} height={22} fill="#2E7D32" />
            {QUARTERS.map((q, qi) => (
              <text
                key={q}
                x={LABEL_W + qi * CELL_W + CELL_W / 2}
                y={41}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize={9.5}
                fontFamily="'Inter', sans-serif"
              >
                {q.split(" ")[0]}
              </text>
            ))}

            {/* Vertical quarter dividers */}
            {QUARTERS.map((q, qi) => (
              <line
                key={`vline-${q}`}
                x1={LABEL_W + qi * CELL_W}
                y1={26}
                x2={LABEL_W + qi * CELL_W}
                y2={totalH}
                stroke="#E0EDE0"
                strokeWidth={qi % 4 === 0 ? 1.5 : 0.5}
              />
            ))}
            {/* Final right border */}
            <line
              x1={LABEL_W + 20 * CELL_W}
              y1={26}
              x2={LABEL_W + 20 * CELL_W}
              y2={totalH}
              stroke="#E0EDE0"
              strokeWidth={1.5}
            />

            {/* Label column separator */}
            <line
              x1={LABEL_W}
              y1={0}
              x2={LABEL_W}
              y2={totalH}
              stroke="#C8DCC8"
              strokeWidth={1.5}
            />

            {/* Activity rows */}
            {activities.map((act, ai) => {
              const y = HEADER_H + ai * ROW_H;
              const barX = LABEL_W + act.start * CELL_W + 3;
              const barW = (act.end - act.start + 1) * CELL_W - 6;
              const barY = y + (ROW_H - 22) / 2;
              const color = TYPE_COLORS[act.type];
              const isEven = ai % 2 === 0;

              return (
                <g key={act.name}>
                  {/* Row bg */}
                  <rect
                    x={0}
                    y={y}
                    width={LABEL_W}
                    height={ROW_H}
                    fill={isEven ? "#F8FAF8" : "#fff"}
                  />
                  {/* Row hover area (full width) */}
                  <rect
                    x={0}
                    y={y}
                    width={totalW}
                    height={ROW_H}
                    fill="transparent"
                    style={{ cursor: "default" }}
                  />
                  {/* Row separator */}
                  <line
                    x1={0}
                    y1={y + ROW_H}
                    x2={totalW}
                    y2={y + ROW_H}
                    stroke="#E0EDE0"
                    strokeWidth={0.5}
                  />

                  {/* Activity label */}
                  <text
                    x={12}
                    y={y + ROW_H / 2 + 4}
                    fill="#1A1A2E"
                    fontSize={11}
                    fontFamily="'Inter', sans-serif"
                    fontWeight={500}
                  >
                    {act.name}
                  </text>

                  {/* Bar */}
                  <rect
                    x={barX}
                    y={barY}
                    width={barW}
                    height={22}
                    rx={5}
                    ry={5}
                    fill={color}
                    opacity={0.88}
                  />

                  {/* Bar label if wide enough */}
                  {barW > 60 && (
                    <text
                      x={barX + barW / 2}
                      y={barY + 14}
                      textAnchor="middle"
                      fill="white"
                      fontSize={9.5}
                      fontFamily="'Inter', sans-serif"
                      fontWeight={600}
                    >
                      {act.end - act.start + 1}Q
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 24px",
          }}
        >
          {(Object.entries(TYPE_LABELS) as [ActivityType, string][]).map(
            ([type, label]) => (
              <div
                key={type}
                style={{ display: "flex", alignItems: "center", gap: "7px" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "14px",
                    height: "14px",
                    borderRadius: "3px",
                    background: TYPE_COLORS[type],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#4A4A6A",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {label}
                </span>
              </div>
            ),
          )}
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: "32px",
            background: "#E8F5E9",
            borderLeft: "4px solid #2E7D32",
            borderRadius: "0 8px 8px 0",
            padding: "14px 18px",
            fontSize: "0.85rem",
            color: "#1A1A2E",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#1B5E20" }}>Note:</strong> Each colored bar
          spans the quarters during which the activity is active. Capital
          Mobilization and Monitoring & Evaluation run throughout all 20
          quarters. The project spans January 2026 – December 2031.
        </div>
        <PageNav />
      </div>

      <style>
        {
          "@media (max-width: 768px) { .content-padding { padding: 24px 16px !important; } }"
        }
      </style>
    </div>
  );
}
