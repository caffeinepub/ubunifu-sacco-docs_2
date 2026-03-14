import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MarkdownPage from "./components/MarkdownPage";

const routes: Array<{ path: string; mdFile: string }> = [
  { path: "/", mdFile: "home.md" },
  { path: "/about/company-profile", mdFile: "about-company-profile.md" },
  { path: "/about/vision-mission", mdFile: "about-vision-mission.md" },
  { path: "/about/core-services", mdFile: "about-core-services.md" },
  {
    path: "/about/strategic-objectives",
    mdFile: "about-strategic-objectives.md",
  },
  { path: "/about/contact", mdFile: "about-contact.md" },
  { path: "/project/introduction", mdFile: "project-introduction.md" },
  {
    path: "/project/problem-statement",
    mdFile: "project-problem-statement.md",
  },
  { path: "/project/concept-note", mdFile: "project-concept-note.md" },
  {
    path: "/methodology/literature-review",
    mdFile: "methodology-literature-review.md",
  },
  {
    path: "/methodology/feasibility-study",
    mdFile: "methodology-feasibility-study.md",
  },
  {
    path: "/methodology/needs-assessment",
    mdFile: "methodology-needs-assessment.md",
  },
  {
    path: "/methodology/stakeholder-analysis",
    mdFile: "methodology-stakeholder-analysis.md",
  },
  {
    path: "/methodology/data-collection",
    mdFile: "methodology-data-collection.md",
  },
  { path: "/implementation/phases", mdFile: "implementation-phases.md" },
  {
    path: "/implementation/key-activities",
    mdFile: "implementation-key-activities.md",
  },
  {
    path: "/implementation/deliverables",
    mdFile: "implementation-deliverables.md",
  },
  { path: "/implementation/schedule", mdFile: "implementation-schedule.md" },
  { path: "/beneficiaries", mdFile: "beneficiaries.md" },
  {
    path: "/products/financial-products",
    mdFile: "products-financial-products.md",
  },
  {
    path: "/products/value-proposition",
    mdFile: "products-value-proposition.md",
  },
  {
    path: "/products/customer-segments",
    mdFile: "products-customer-segments.md",
  },
  { path: "/products/channels", mdFile: "products-channels.md" },
  { path: "/products/revenue-streams", mdFile: "products-revenue-streams.md" },
  { path: "/products/key-resources", mdFile: "products-key-resources.md" },
  { path: "/products/impact-metrics", mdFile: "products-impact-metrics.md" },
  { path: "/strategy-results", mdFile: "strategy-results.md" },
  { path: "/risk-management", mdFile: "risk-management.md" },
  { path: "/hr/staffing", mdFile: "hr-staffing.md" },
  { path: "/hr/organogram", mdFile: "hr-organogram.md" },
  { path: "/hr/motivation-plan", mdFile: "hr-motivation-plan.md" },
  { path: "/budget", mdFile: "budget.md" },
  { path: "/sustainability", mdFile: "sustainability.md" },
  { path: "/references", mdFile: "references.md" },
];

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map(({ path, mdFile }) => (
            <Route
              key={path}
              path={path}
              element={<MarkdownPage mdFile={mdFile} />}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
