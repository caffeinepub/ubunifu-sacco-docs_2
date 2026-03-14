import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PageNav from "../components/PageNav";

const risks = [
  {
    name: "Loan Default by Startup Members",
    category: "Financial",
    likelihood: "High",
    impact: "High",
    mitigation:
      "Strict credit assessments, financial literacy training, guarantor systems",
    responsible: "Credit Committee",
  },
  {
    name: "Inadequate Digital Infrastructure or System Failure",
    category: "Technological",
    likelihood: "Medium",
    impact: "High",
    mitigation:
      "Partner with reliable IT providers, regular audits, backup/disaster recovery plan",
    responsible: "IT Department",
  },
  {
    name: "Fraud or Internal Financial Mismanagement",
    category: "Governance",
    likelihood: "Medium",
    impact: "High",
    mitigation:
      "Internal audit systems, segregation of duties, board oversight",
    responsible: "Board of Directors",
  },
  {
    name: "Low Member Recruitment or Retention",
    category: "Operational",
    likelihood: "Medium",
    impact: "Medium",
    mitigation: "Aggressive awareness campaigns, incentives for early members",
    responsible: "Marketing Department",
  },
  {
    name: "Regulatory Non-Compliance",
    category: "Legal / Compliance",
    likelihood: "Low",
    impact: "High",
    mitigation:
      "Regular compliance audits, continuous engagement with regulators",
    responsible: "Legal & Compliance Officer",
  },
  {
    name: "Inability to Raise Initial Capital",
    category: "Financial / Funding",
    likelihood: "Medium",
    impact: "High",
    mitigation:
      "Attractive investment packages, showcase ROI, partner with angel investors",
    responsible: "Fundraising Team",
  },
  {
    name: "Political Interference or Instability",
    category: "External",
    likelihood: "Low",
    impact: "High",
    mitigation: "Maintain neutrality, diversify regional operations",
    responsible: "Board of Directors",
  },
  {
    name: "Cybersecurity Threats",
    category: "Technological",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Encryption, penetration tests, staff cyber hygiene training",
    responsible: "IT Department",
  },
  {
    name: "Lack of Business Acumen Among Members",
    category: "Capacity",
    likelihood: "High",
    impact: "Medium",
    mitigation:
      "Continuous capacity-building, mentorship and incubation support",
    responsible: "Business Development Team",
  },
  {
    name: "Competition from Other SACCOs",
    category: "Strategic / Market",
    likelihood: "Medium",
    impact: "Medium",
    mitigation: "Define unique value proposition, focus on niche",
    responsible: "Strategy Team",
  },
  {
    name: "Delays in Government Support",
    category: "Funding / External",
    likelihood: "Medium",
    impact: "Medium",
    mitigation:
      "Diversify funding sources, establish MoUs with clear timelines",
    responsible: "Board of Directors",
  },
  {
    name: "Resistance to Digital Service Adoption",
    category: "Technological / Change",
    likelihood: "Medium",
    impact: "Medium",
    mitigation: "User training on digital tools, provide hybrid services",
    responsible: "IT Dept., Member Services",
  },
  {
    name: "Inadequate Board Oversight",
    category: "Governance",
    likelihood: "Low",
    impact: "High",
    mitigation: "Board training, regular performance reviews",
    responsible: "Governance Committee",
  },
  {
    name: "Macroeconomic Shocks",
    category: "External / Economic",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Monitor market trends, adjust interest rates, build reserves",
    responsible: "SACCO Treasury",
  },
  {
    name: "Negative Public Perception",
    category: "Reputational",
    likelihood: "Low",
    impact: "High",
    mitigation: "Transparent communication, timely member engagement",
    responsible: "Communications Dept.",
  },
];

const likelihoodColor: Record<string, string> = {
  High: "#c62828",
  Medium: "#e65100",
  Low: "#2E7D32",
};

const impactColor: Record<string, string> = {
  High: "#c62828",
  Medium: "#e65100",
  Low: "#2E7D32",
};

function RiskCard({ item, index }: { item: (typeof risks)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-ocid={`risk.item.${index + 1}`}
      style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(27,94,32,0.07)",
        border: "1px solid #E0EDE0",
        overflow: "hidden",
        marginBottom: "10px",
      }}
    >
      <button
        type="button"
        data-ocid={`risk.toggle.${index + 1}`}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: open ? "#f0f7f0" : "#fff",
          border: "none",
          cursor: "pointer",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          textAlign: "left",
          transition: "background 0.2s ease",
        }}
        aria-expanded={open}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <div
            style={{
              width: "4px",
              alignSelf: "stretch",
              borderRadius: "2px",
              background: open ? "#FFD600" : "#2E7D32",
              flexShrink: 0,
              transition: "background 0.2s ease",
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "0.97rem",
                color: "#1B5E20",
                lineHeight: 1.3,
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "5px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.73rem",
                  color: "#4A4A6A",
                  fontStyle: "italic",
                }}
              >
                {item.category}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "1px 8px",
                  borderRadius: "999px",
                  background: `${likelihoodColor[item.likelihood]}18`,
                  color: likelihoodColor[item.likelihood],
                  border: `1px solid ${likelihoodColor[item.likelihood]}40`,
                }}
              >
                Likelihood: {item.likelihood}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "1px 8px",
                  borderRadius: "999px",
                  background: `${impactColor[item.impact]}18`,
                  color: impactColor[item.impact],
                  border: `1px solid ${impactColor[item.impact]}40`,
                }}
              >
                Impact: {item.impact}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          style={{
            color: "#2E7D32",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>

      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "16px 20px 20px 36px",
            borderTop: "1px solid #E0EDE0",
            background: "#fafffe",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {[
            { label: "Mitigation Strategy", value: item.mitigation },
            { label: "Responsible Party", value: item.responsible },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#2E7D32",
                  marginBottom: "4px",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: "#1A1A2E",
                  lineHeight: 1.6,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const governanceRows = [
  {
    body: "Board of Directors",
    role: "Overall risk oversight, approve risk appetite",
  },
  {
    body: "Risk Management Committee",
    role: "Monitor risk profile, review mitigation plans",
  },
  { body: "Internal Audit", role: "Independent assurance on risk controls" },
  { body: "Management", role: "Implement risk policies, daily monitoring" },
  { body: "Credit Committee", role: "Assess and manage credit risk" },
  {
    body: "IT Security Team",
    role: "Manage technology and cybersecurity risks",
  },
];

const monitoringRows = [
  { freq: "Daily", reports: "System alerts, transaction monitoring" },
  { freq: "Weekly", reports: "Cash flow, liquidity reports" },
  { freq: "Monthly", reports: "Portfolio quality, member complaints" },
  { freq: "Quarterly", reports: "Risk dashboard to Board" },
  { freq: "Annually", reports: "Comprehensive risk review, external audit" },
];

export default function RiskManagementPage() {
  return (
    <div>
      <PageHeader title="Risk Management Plan" subtitle="Strategy & Risk" />
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
        className="content-padding"
      >
        {/* Risk Appetite */}
        <div
          style={{
            background: "#FFFDE7",
            borderLeft: "4px solid #FFD600",
            borderRadius: "0 8px 8px 0",
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>🎯</span>
          <div>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "#1B5E20",
              }}
            >
              Risk Appetite Statement
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.88rem",
                color: "#1A1A2E",
                lineHeight: 1.6,
              }}
            >
              UBUNIFU SACCO maintains a{" "}
              <strong>conservative to moderate risk appetite</strong>,
              prioritizing protection of member deposits, sustainable growth
              over rapid expansion, compliance with all regulations, responsible
              lending, and strong governance.
            </p>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#2E7D32",
            borderBottom: "2px solid #FFD600",
            display: "inline-block",
            paddingBottom: "6px",
            marginBottom: "20px",
          }}
        >
          Risk Matrix
        </h2>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#4A4A6A",
            marginBottom: "20px",
          }}
        >
          15 identified risks. Click any card to reveal the mitigation strategy
          and responsible party.
        </p>

        <div data-ocid="risk.list" style={{ marginBottom: "48px" }}>
          {risks.map((item, i) => (
            <RiskCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Risk Governance */}
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#2E7D32",
            borderBottom: "2px solid #FFD600",
            display: "inline-block",
            paddingBottom: "6px",
            marginBottom: "20px",
          }}
        >
          Risk Governance Structure
        </h2>
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "40px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1B5E20" }}>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Governing Body
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {governanceRows.map((row, i) => (
                <tr
                  key={row.body}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f0f7f0" }}
                >
                  <td
                    style={{
                      padding: "11px 16px",
                      fontWeight: 600,
                      color: "#1B5E20",
                      fontSize: "0.88rem",
                      borderBottom: "1px solid #E0EDE0",
                    }}
                  >
                    {row.body}
                  </td>
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "#1A1A2E",
                      fontSize: "0.88rem",
                      borderBottom: "1px solid #E0EDE0",
                    }}
                  >
                    {row.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monitoring */}
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "#2E7D32",
            borderBottom: "2px solid #FFD600",
            display: "inline-block",
            paddingBottom: "6px",
            marginBottom: "20px",
          }}
        >
          Risk Monitoring & Reporting
        </h2>
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1B5E20" }}>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Frequency
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Reports
                </th>
              </tr>
            </thead>
            <tbody>
              {monitoringRows.map((row, i) => (
                <tr
                  key={row.freq}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f0f7f0" }}
                >
                  <td
                    style={{
                      padding: "11px 16px",
                      fontWeight: 600,
                      color: "#1B5E20",
                      fontSize: "0.88rem",
                      borderBottom: "1px solid #E0EDE0",
                    }}
                  >
                    {row.freq}
                  </td>
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "#1A1A2E",
                      fontSize: "0.88rem",
                      borderBottom: "1px solid #E0EDE0",
                    }}
                  >
                    {row.reports}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageNav />
      </div>
      <style>
        {
          "@media (max-width: 768px) { .content-padding { padding: 24px !important; } }"
        }
      </style>
    </div>
  );
}
