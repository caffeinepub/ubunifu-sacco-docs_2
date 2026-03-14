import { useEffect, useState } from "react";
import { markdownToHtml } from "../lib/markdownToHtml";
import { Link } from "../lib/router";

const quickFacts = [
  { icon: "🏢", value: "2025", label: "Year Founded" },
  { icon: "💰", value: "UGX 50B", label: "Target Capital" },
  { icon: "👥", value: "25,000+", label: "Target Members" },
  { icon: "🌍", value: "4 Regions", label: "Geographic Coverage" },
  { icon: "💼", value: "3,000+", label: "MSMEs to Finance" },
  { icon: "🎯", value: "5 Years", label: "Project Duration" },
];

export default function HomePage() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/docs/home.md")
      .then((r) => r.text())
      .then(setContent)
      .catch(() => null);
  }, []);

  const htmlContent = content ? markdownToHtml(content) : "";

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B5E20 0%, #388E3C 100%)",
          padding: "80px 56px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-section"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-6 6l12-12M0 60L60 0M54 66l12-12' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
            opacity: 0.05,
          }}
        />
        <div style={{ position: "relative", maxWidth: "700px" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "#FFD600",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Uganda's Premier Tech &amp; Creative SACCO
          </p>
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
            className="hero-title"
          >
            UBUNIFU SACCO Documentation
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.2rem",
              color: "#FFD600",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}
            className="hero-subtitle"
          >
            Empowering Uganda&#39;s Tech Innovators &amp; Creatives
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              to="/about/company-profile"
              data-ocid="hero.get_started.button"
              style={{
                background: "white",
                color: "#1B5E20",
                padding: "12px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/project/concept-note"
              data-ocid="hero.concept_note.button"
              style={{
                background: "transparent",
                color: "white",
                padding: "12px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "2px solid white",
                display: "inline-block",
              }}
            >
              View Concept Note
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div
        style={{ background: "#F8FAF8", padding: "48px 56px" }}
        className="facts-section"
      >
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "#2E7D32",
            borderBottom: "2px solid #FFD600",
            paddingBottom: "8px",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          Quick Facts
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="facts-grid"
        >
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 16px rgba(27,94,32,0.08)",
                borderLeft: "4px solid #2E7D32",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>
                {fact.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1B5E20",
                  lineHeight: 1.2,
                }}
              >
                {fact.value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "#4A4A6A",
                  marginTop: "4px",
                }}
              >
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      {content && (
        <div
          style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
          className="content-padding"
        >
          <article
            className="md-content"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}

      <style>{`
        .hero-title { font-size: 3rem; }
        @media (max-width: 768px) {
          .hero-section { padding: 48px 24px !important; }
          .hero-title { font-size: 2rem !important; }
          .hero-subtitle { font-size: 1rem !important; }
          .facts-section { padding: 32px 24px !important; }
          .facts-grid { grid-template-columns: 1fr !important; }
          .content-padding { padding: 24px !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .facts-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
