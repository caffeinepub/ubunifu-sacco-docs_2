interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div
      data-ocid="page.header.section"
      style={{
        background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle diagonal pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-4 4l8-8M0 40L40 0M36 44l8-8' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
          opacity: 0.05,
        }}
      />
      <div className="relative" style={{ padding: "40px 56px" }}>
        {subtitle && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {subtitle}
          </p>
        )}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "white",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          [data-ocid="page.header.section"] > .relative {
            padding: 24px !important;
          }
          [data-ocid="page.header.section"] h1 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
