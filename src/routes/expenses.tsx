import { createFileRoute } from "@tanstack/react-router";
import { ManagementPage } from "@/components/travel-pages";
export const Route = createFileRoute("/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses — TravelPlanner" },
      {
        name: "description",
        content: "Expenses management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "Expenses — TravelPlanner" },
      { property: "og:description", content: "Explore and manage TravelPlanner expenses records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ManagementPage entity="EXPENSE" />,
});
