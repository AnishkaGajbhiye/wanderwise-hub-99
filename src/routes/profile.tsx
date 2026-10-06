import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/travel-pages";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — TravelPlanner" },
      {
        name: "description",
        content: "Profile management in the local TravelPlanner college DBMS demo.",
      },
      { property: "og:title", content: "Profile — TravelPlanner" },
      { property: "og:description", content: "Explore and manage TravelPlanner profile records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});
