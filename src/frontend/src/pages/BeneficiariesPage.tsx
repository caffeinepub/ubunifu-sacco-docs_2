import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PageNav from "../components/PageNav";

const beneficiaries = [
  {
    name: "Tech Startups",
    category: "Primary Beneficiary",
    description:
      "Early-stage companies leveraging technology to solve problems",
    needs: "Seed capital, business incubation, networks, market access",
    serviceAlignment:
      "Affordable credit, innovation grants, business advisory, networking forums",
  },
  {
    name: "Digital Entrepreneurs",
    category: "Primary Beneficiary",
    description: "Individuals or SMEs offering digital products or services",
    needs: "Working capital, digital marketing support, platform development",
    serviceAlignment:
      "Loans, digital platform partnerships, e-commerce training",
  },
  {
    name: "Software Developers",
    category: "Primary Beneficiary",
    description:
      "Freelancers or companies building apps, websites, and custom tech solutions",
    needs: "Access to devices, software licenses, cloud hosting",
    serviceAlignment:
      "Asset financing, bulk licensing programs, tech community hubs",
  },
  {
    name: "Creative Industry Workers",
    category: "Creative Sector",
    description:
      "Artists, designers, filmmakers, musicians, and content creators",
    needs: "Equipment, content monetization, digital distribution, IP training",
    serviceAlignment:
      "Creative-specific loan packages, copyright education, digital marketplaces",
  },
  {
    name: "Innovators / Inventors",
    category: "Innovation Sector",
    description:
      "Individuals or groups developing new products, systems, or methods",
    needs: "Prototype funding, IP support, commercialization pathways",
    serviceAlignment:
      "Innovation funds, legal advisory for patents, technical mentorship",
  },
  {
    name: "Youth-led Enterprises",
    category: "Youth Focus",
    description: "Businesses owned and managed by young entrepreneurs under 35",
    needs: "Startup capital, mentorship, peer learning",
    serviceAlignment:
      "Youth-specific loan schemes, mentorship programs, innovation challenges",
  },
  {
    name: "Women in Tech & Innovation",
    category: "Gender Inclusion",
    description:
      "Female entrepreneurs and creatives in STEM, ICT, and innovation",
    needs: "Gender-inclusive funding, safe networking spaces",
    serviceAlignment:
      "Women empowerment funds, gender-sensitive policies, mentorship",
  },
  {
    name: "Tech Hubs & Incubators",
    category: "Ecosystem Partner",
    description:
      "Organizations offering incubation, co-working, and acceleration",
    needs: "Partner support, funding for incubatees, co-financing",
    serviceAlignment:
      "Strategic partnerships, shared resource facilities, joint programs",
  },
  {
    name: "Freelancers / Gig Workers",
    category: "Independent Professionals",
    description:
      "Independent tech and creative professionals working per project",
    needs: "Short-term loans, savings solutions, social security",
    serviceAlignment: "Micro-loans, savings plans, health & pension products",
  },
  {
    name: "Academic Innovators",
    category: "Research & Education",
    description:
      "Students and researchers creating tech and creative innovations",
    needs: "Funding for research prototypes, commercialization support",
    serviceAlignment:
      "Research commercialization funds, university-SACCO partnerships",
  },
  {
    name: "Diaspora Returnees",
    category: "Diaspora",
    description:
      "Ugandans returning from abroad with tech and innovation experience",
    needs: "Re-integration support, access to finance, legal/market guidance",
    serviceAlignment:
      "Diaspora investment schemes, SACCO-backed startup support",
  },
  {
    name: "Rural Tech Creatives",
    category: "Rural Focus",
    description:
      "Innovators and creatives operating in rural or underserved areas",
    needs: "Access to ICT infrastructure, finance, market linkages",
    serviceAlignment:
      "Rural innovation programs, mobile SACCO services, solar tech financing",
  },
  {
    name: "SMEs in ICT / Creative Sector",
    category: "SME Sector",
    description:
      "Small and medium-sized enterprises in tech-enabled or creative businesses",
    needs: "Scale-up capital, access to skilled labor, systems improvement",
    serviceAlignment:
      "SACCO enterprise loans, HR training partnerships, automation support",
  },
  {
    name: "Investors / Shareholders",
    category: "Investment Partners",
    description:
      "Individuals and institutions seeking to invest in the innovation ecosystem",
    needs: "Transparent structures, return on investment, impact opportunities",
    serviceAlignment:
      "Share acquisition, dividends, stakeholder engagement forums",
  },
  {
    name: "Government and NGOs",
    category: "Public & Development Sector",
    description:
      "Public and development sector institutions supporting innovation & youth",
    needs: "Collaboration partners for policy, funding, implementation",
    serviceAlignment:
      "Public-private partnerships, policy advocacy, program co-implementation",
  },
];

function BeneficiaryCard({
  item,
  index,
}: { item: (typeof beneficiaries)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-ocid={`beneficiaries.item.${index + 1}`}
      style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(27,94,32,0.07)",
        border: "1px solid #E0EDE0",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease",
        marginBottom: "10px",
      }}
    >
      <button
        type="button"
        data-ocid={`beneficiaries.toggle.${index + 1}`}
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
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#1B5E20",
                lineHeight: 1.3,
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#4A4A6A",
                marginTop: "2px",
                fontStyle: "italic",
              }}
            >
              {item.category}
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
          maxHeight: open ? "500px" : "0",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px",
          }}
        >
          {[
            { label: "Description", value: item.description },
            { label: "Potential Needs", value: item.needs },
            {
              label: "UBUNIFU SACCO Service Alignment",
              value: item.serviceAlignment,
            },
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

export default function BeneficiariesPage() {
  return (
    <div>
      <PageHeader
        title="Beneficiary Specification"
        subtitle="Beneficiaries & Products"
      />
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
        className="content-padding"
      >
        <div
          style={{
            background: "#E8F5E9",
            borderLeft: "4px solid #2E7D32",
            borderRadius: "0 8px 8px 0",
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>ℹ️</span>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#1A1A2E",
              lineHeight: 1.6,
            }}
          >
            UBUNIFU SACCO serves <strong>15 distinct beneficiary groups</strong>{" "}
            across Uganda's technology and creative sectors. Click any card to
            view the full details.
          </p>
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
          Beneficiary Categories
        </h2>

        <div data-ocid="beneficiaries.list">
          {beneficiaries.map((item, i) => (
            <BeneficiaryCard key={item.name} item={item} index={i} />
          ))}
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
