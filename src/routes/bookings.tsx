import { createFileRoute } from "@tanstack/react-router";
import { ManagementPage } from "@/components/travel-pages";
export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings — TravelPlanner" },
      {
        name: "description",
        content: "Bookings management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "Bookings — TravelPlanner" },
      { property: "og:description", content: "Explore and manage TravelPlanner bookings records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ManagementPage entity="BOOKING" />,
});
