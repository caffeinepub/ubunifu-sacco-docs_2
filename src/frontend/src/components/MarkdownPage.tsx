import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const mdComponents: Components = {
  table: ({ children }) => (
    <div className="md-table-scroll">
      <table>{children}</table>
    </div>
  ),
};

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

  if (loading) {
    return (
      <div
        data-ocid="content.loading_state"
        className="flex items-center gap-3 py-16 text-muted-foreground"
      >
        <Loader2
          size={20}
          className="animate-spin"
          style={{ color: "oklch(0.52 0.155 150)" }}
        />
        <span className="text-sm">Loading content…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-ocid="content.error_state"
        className="flex items-start gap-3 py-16 text-sm"
        style={{ color: "oklch(0.5 0.18 25)" }}
      >
        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Could not load content</p>
          <p className="text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <article className="md-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={mdComponents}
      >
        {content ?? ""}
      </ReactMarkdown>
    </article>
  );
}
