import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF8" }}>
      {/* Fixed sidebar */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "280px",
          background: "#1B5E20",
          overflowY: "auto",
          zIndex: 40,
        }}
        className="hidden md:block"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismiss
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          />
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "280px",
              background: "#1B5E20",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        className="md:ml-[280px]"
      >
        {/* Mobile hamburger bar */}
        <div
          className="md:hidden flex items-center gap-3 px-4"
          style={{
            height: "56px",
            background: "#1B5E20",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            type="button"
            data-ocid="header.hamburger.button"
            onClick={() => setSidebarOpen((o) => !o)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? (
              <X size={20} color="white" />
            ) : (
              <Menu size={20} color="white" />
            )}
          </button>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "white",
            }}
          >
            UBUNIFU SACCO
          </span>
        </div>

        {/* Page content */}
        <main style={{ flex: 1 }}>{children}</main>

        {/* Rich footer */}
        <footer
          data-ocid="footer.section"
          style={{
            background: "#1B5E20",
            color: "white",
            textAlign: "center",
            padding: "40px 24px",
          }}
        >
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            UBUNIFU SACCO Ltd.
          </p>
          <p
            style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "16px" }}
          >
            info@ubunifusacco.org | +256 781 940358 | ubunifusacco.co.ug
          </p>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              {
                href: "https://twitter.com/ubunifusacco",
                icon: <SiX size={16} />,
                label: "X (Twitter)",
              },
              {
                href: "https://linkedin.com/company/ubunifusacco",
                icon: <SiLinkedin size={16} />,
                label: "LinkedIn",
              },
              {
                href: "https://facebook.com/ubunifusacco",
                icon: <SiFacebook size={16} />,
                label: "Facebook",
              },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  transition: "background 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.15)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "8px" }}>
            &copy; 2025 UBUNIFU SACCO Ltd. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFD600", textDecoration: "underline" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
