import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Plane,
  LayoutDashboard,
  Map,
  Route,
  Ticket,
  MapPin,
  TrainFront,
  Hotel,
  Wallet,
  UserRound,
  Search,
  Bell,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTravel } from "@/lib/travel-store";
import { LoginPage } from "./travel-pages";
const nav = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "My Trips", path: "/trips", icon: Map },
  { label: "Itinerary", path: "/itinerary", icon: Route },
  { label: "Bookings", path: "/bookings", icon: Ticket },
  { label: "Destinations", path: "/destinations", icon: MapPin },
  { label: "Transport", path: "/transport", icon: TrainFront },
  { label: "Accommodation", path: "/accommodation", icon: Hotel },
  { label: "Expenses", path: "/expenses", icon: Wallet },
  { label: "Profile", path: "/profile", icon: UserRound },
] as const;
export function TravelShell({ children }: { children: ReactNode }) {
  const { user, search, setSearch, signedIn, logout, db } = useTravel();
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const title = path.startsWith("/trips/")
    ? "Trip Details"
    : (nav.find((n) => n.path === path)?.label ?? "Dashboard");
  if (path === "/login" || !signedIn) return <LoginPage />;
  return (
    <div className={`app-shell ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Plane size={24} />
          </span>
          <span>
            travel<span className="brand-light">planner</span>
            <small>DATABASE MANAGEMENT SYSTEM</small>
          </span>
        </Link>
        <div className="sidebar-label">WORKSPACE</div>
        <nav>
          {nav.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              onClick={() => setSearch("")}
              className={`nav-item ${path === n.path || (n.path === "/trips" && path.startsWith("/trips/")) ? "active" : ""}`}
              title={n.label}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {n.path === "/trips" && <span className="nav-count">{db.TRIP.length}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="db-info">
            <Database size={20} />
            <div>
              <strong>TravelPlanner</strong>
              <small>
                <i />
                Local demo database
              </small>
            </div>
            <ArrowUpRight size={15} />
          </div>
          <div className="side-user">
            <span className="avatar">
              {String(user?.["Tra_Name"] || "A")
                .split(" ")
                .map((s) => s[0])
                .join("")}
            </span>
            <div>
              <strong>{String(user?.["Tra_Name"])}</strong>
              <small>Traveler · #{user?.["TravelerID"]}</small>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={17} />
            </Button>
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-title">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>
            <span>{title}</span>
          </div>
          <div className="topbar-tools">
            <div className="global-search">
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search records..."
                aria-label="Search records"
              />
            </div>
            <div className="notification-wrap">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => setNotifications(!notifications)}
              >
                <Bell size={20} />
                <span className="notification-dot" />
              </Button>
              {notifications && (
                <div className="notification-popover">
                  <strong>Notifications</strong>
                  <p>Jaipur Tour booking #503 is pending.</p>
                  <p>Goa Vacation starts on 10 October.</p>
                </div>
              )}
            </div>
            <span className="top-divider" />
            <Link to="/profile" className="profile-link">
              <span className="avatar">
                {String(user?.["Tra_Name"] || "A")
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <span>{String(user?.["Tra_Name"])}</span>
              <ChevronDown size={15} />
            </Link>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="app-footer">
          <span>
            TravelPlanner <span> / </span> DBMS Mini Project
          </span>
          <span>
            <i /> Local demo · 9 relational entities
          </span>
        </footer>
      </div>
    </div>
  );
}
