import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { markdownToHtml } from "../lib/markdownToHtml";
import PageHeader from "./PageHeader";
import PageNav from "./PageNav";

export default function MarkdownPage({ mdFile }: { mdFile: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setContent(null);
    fetch(`/docs/${mdFile}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [mdFile]);

  const title = content
    ? (content.match(/^#\s+(.+)$/m)?.[1] ?? "Documentation")
    : loading
      ? "Loading\u2026"
      : "Documentation";

  const htmlContent = content ? markdownToHtml(content) : "";

  return (
    <div>
      <PageHeader title={title} subtitle="UBUNIFU SACCO Ltd. Documentation" />

      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 56px" }}
        className="content-padding"
      >
        {loading && (
          <div
            data-ocid="content.loading_state"
            className="flex items-center gap-3 py-16"
            style={{ color: "#2E7D32" }}
          >
            <Loader2 size={20} className="animate-spin" />
            <span style={{ fontSize: "0.9rem" }}>Loading content\u2026</span>
          </div>
        )}

        {error && (
          <div
            data-ocid="content.error_state"
            className="flex items-start gap-3 py-16"
            style={{ color: "#c62828" }}
          >
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p style={{ fontWeight: 600, margin: 0 }}>
                Could not load content
              </p>
              <p style={{ opacity: 0.7, marginTop: "4px", fontSize: "0.9rem" }}>
                {error}
              </p>
            </div>
          </div>
        )}

        {content && (
          <article
            className="md-content"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

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
