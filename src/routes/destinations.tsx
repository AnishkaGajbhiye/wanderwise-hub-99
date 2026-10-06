import { createFileRoute } from "@tanstack/react-router";
import { DestinationsPage } from "@/components/travel-pages";
export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — TravelPlanner" },
      {
        name: "description",
        content: "Destinations management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "Destinations — TravelPlanner" },
      {
        property: "og:description",
        content: "Explore and manage TravelPlanner destinations records.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DestinationsPage,
});
