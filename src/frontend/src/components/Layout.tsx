import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className="sticky top-0 z-50 flex items-center h-16 px-4 md:px-6"
        style={{ background: "oklch(0.52 0.155 150)" }}
      >
        <button
          type="button"
          data-ocid="header.sidebar.toggle"
          onClick={() => setSidebarOpen((o) => !o)}
          className="md:hidden mr-3 p-2 rounded text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <span
              className="text-white font-bold text-base md:text-lg leading-tight tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              UBUNIFU SACCO Ltd.
            </span>
            <span className="hidden md:block text-white/70 text-xs leading-none mt-0.5 font-body">
              Documentation Portal
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <div className="hidden md:flex md:w-64 lg:w-72 flex-shrink-0">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismiss
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40" />
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
            <div
              className="absolute left-0 top-16 bottom-0 w-72 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0 overflow-auto">
          <div className="mx-auto max-w-4xl px-4 md:px-8 py-8">{children}</div>
          <footer className="border-t border-border mt-8 py-6 px-4 md:px-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
