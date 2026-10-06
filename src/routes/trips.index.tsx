import { createFileRoute } from "@tanstack/react-router";
import { TripsPage } from "@/components/travel-pages";
export const Route = createFileRoute("/trips/")({
  head: () => ({
    meta: [
      { title: "My Trips — TravelPlanner" },
      {
        name: "description",
        content: "My Trips management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "My Trips — TravelPlanner" },
      { property: "og:description", content: "Explore and manage TravelPlanner my trips records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TripsPage,
});
