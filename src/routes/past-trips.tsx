import { createFileRoute } from "@tanstack/react-router";
import { PastTripsPage } from "@/components/travel-pages";
export const Route = createFileRoute("/past-trips")({
  head: () => ({
    meta: [
      { title: "Past Trips — TravelPlanner" },
      {
        name: "description",
        content: "Completed trips of the logged-in traveler in the TravelPlanner DBMS demo.",
      },
      { property: "og:title", content: "Past Trips — TravelPlanner" },
      { property: "og:description", content: "View completed trips from your travel history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastTripsPage,
});
