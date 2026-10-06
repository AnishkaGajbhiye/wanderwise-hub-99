import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  initialData,
  ids,
  validateRecord,
  deleteBlocker,
  type Database,
  type Entity,
  type Row,
} from "./travel-data";
type Store = {
  db: Database;
  user: Row;
  search: string;
  setSearch: (s: string) => void;
  save: (e: Entity, r: Row) => string | null;
  remove: (e: Entity, id: number) => string | null;
  login: (email: string, password: string, remember: boolean) => boolean;
  logout: () => void;
  signedIn: boolean;
};
const Context = createContext<Store | null>(null);
export function TravelProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Database>(initialData);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(1);
  const [signedIn, setSignedIn] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("travelplanner-db-v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Object.keys(initialData).every((k) => Array.isArray(parsed[k]))) setDb(parsed);
      }
      const session =
        sessionStorage.getItem("travelplanner-session") ??
        localStorage.getItem("travelplanner-session");
      if (session) {
        const id = Number(session);
        setSignedIn(id > 0);
        if (id > 0) setUserId(id);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("travelplanner-db-v1", JSON.stringify(db));
  }, [db, ready]);
  const user = db.TRAVELER.find((r) => r["TravelerID"] === userId) ?? initialData.TRAVELER[0] ?? {};
  const save = (e: Entity, r: Row) => {
    const row = {
      ...r,
      [ids[e]]: r[ids[e]] ?? Math.max(0, ...db[e].map((x) => Number(x[ids[e]]))) + 1,
    };
    const error = validateRecord(db, e, row);
    if (error) return error;
    setDb((prev) => ({
      ...prev,
      [e]: prev[e].some((x) => x[ids[e]] === row[ids[e]])
        ? prev[e].map((x) => (x[ids[e]] === row[ids[e]] ? row : x))
        : [...prev[e], row],
    }));
    return null;
  };
  const remove = (e: Entity, id: number) => {
    const error = deleteBlocker(db, e, id);
    if (error) return error;
    setDb((prev) => ({ ...prev, [e]: prev[e].filter((r) => r[ids[e]] !== id) }));
    return null;
  };
  const login = (email: string, password: string, remember: boolean) => {
    const u = db.TRAVELER.find(
      (r) =>
        String(r["Tra_Email"]).toLowerCase() === email.trim().toLowerCase() &&
        r["Password"] === password,
    );
    if (!u) return false;
    setUserId(Number(u["TravelerID"]));
    setSignedIn(true);
    localStorage.removeItem("travelplanner-session");
    sessionStorage.setItem("travelplanner-session", String(u["TravelerID"]));
    if (remember) localStorage.setItem("travelplanner-session", String(u["TravelerID"]));
    return true;
  };
  const logout = () => {
    setSignedIn(false);
    localStorage.removeItem("travelplanner-session");
    sessionStorage.setItem("travelplanner-session", "0");
  };
  return (
    <Context.Provider
      value={{ db, user, search, setSearch, save, remove, login, logout, signedIn }}
    >
      {children}
    </Context.Provider>
  );
}
export function useTravel() {
  const store = useContext(Context);
  if (!store) throw new Error("TravelProvider missing");
  return store;
}
