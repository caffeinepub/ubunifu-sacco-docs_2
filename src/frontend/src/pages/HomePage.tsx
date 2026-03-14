import { useEffect, useRef, useState } from "react";
import PageNav from "../components/PageNav";
import { markdownToHtml } from "../lib/markdownToHtml";
import { Link } from "../lib/router";

const heroStats = [
  { target: 25000, suffix: "+", label: "Members", prefix: "" },
  { target: 50, suffix: "B", label: "Total Budget (UGX)", prefix: "" },
  { target: 3000, suffix: "+", label: "Startups Funded", prefix: "" },
  { target: 10000, suffix: "+", label: "Jobs Created", prefix: "" },
  { target: 5, suffix: "", label: "Years Duration", prefix: "" },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCounter({
  stat,
  started,
}: { stat: (typeof heroStats)[0]; started: boolean }) {
  const value = useCountUp(stat.target, 1600, started);
  const display =
    stat.target >= 1000 ? value.toLocaleString() : value.toString();
  return (
    <div
      style={{
        textAlign: "center",
        flex: "1 1 0",
        minWidth: "100px",
        padding: "0 8px",
      }}
    >
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 800,
          color: "#FFD600",
          lineHeight: 1,
          marginBottom: "6px",
        }}
        className="stat-number"
      >
        {display}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(255,255,255,0.8)",
          fontWeight: 500,
        }}
        className="stat-label"
      >
        {stat.label}
      </div>
    </div>
  );
}

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
  const [statsStarted, setStatsStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/docs/home.md")
      .then((r) => r.text())
      .then(setContent)
      .catch(() => null);
  }, []);

  // Start count-up when hero is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const htmlContent = content ? markdownToHtml(content) : "";

  return (
    <div>
      {/* Hero Section */}
      <div
        ref={heroRef}
        style={{
          background: "linear-gradient(135deg, #1B5E20 0%, #388E3C 100%)",
          padding: "72px 56px 56px",
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

        {/* Animated Stats Row */}
        <div
          style={{
            position: "relative",
            marginTop: "52px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "36px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px 0",
          }}
          className="stats-row"
        >
          {heroStats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} started={statsStarted} />
          ))}
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

      <PageNav />

      <style>{`
        .hero-title { font-size: 3rem; }
        .stat-number { font-size: 2.2rem; }
        .stat-label { font-size: 0.82rem; }
        @media (max-width: 768px) {
          .hero-section { padding: 48px 24px 40px !important; }
          .hero-title { font-size: 2rem !important; }
          .hero-subtitle { font-size: 1rem !important; }
          .stats-row { gap: 20px 0 !important; }
          .stat-number { font-size: 1.6rem !important; }
          .stat-label { font-size: 0.75rem !important; }
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
