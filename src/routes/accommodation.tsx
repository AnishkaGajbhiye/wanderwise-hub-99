import { createFileRoute } from "@tanstack/react-router";
import { ManagementPage } from "@/components/travel-pages";
export const Route = createFileRoute("/accommodation")({
  head: () => ({
    meta: [
      { title: "Accommodation — TravelPlanner" },
      {
        name: "description",
        content: "Accommodation management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "Accommodation — TravelPlanner" },
      {
        property: "og:description",
        content: "Explore and manage TravelPlanner accommodation records.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ManagementPage entity="ACCOMMODATION" />,
});
