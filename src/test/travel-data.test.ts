import { describe, it, expect } from "vitest";
import { initialData, total, validateRecord, deleteBlocker } from "@/lib/travel-data";
describe("TravelPlanner records and integrity", () => {
  it("has four trips and a 117000 budget", () => {
    expect(initialData.TRIP).toHaveLength(4);
    expect(total(initialData.TRIP, "Budget")).toBe(117000);
  });
  it("has three sample bookings", () => {
    expect(initialData.BOOKING).toHaveLength(3);
  });
  it("shows only booking 501 for logged-in traveler 1", () => {
    const mine = initialData.BOOKING.filter((b) => b["TravelerID"] === 1);
    expect(mine).toHaveLength(1);
    expect(mine[0]?.["BookingID"]).toBe(501);
  });
  it("shows only trip 104 as a past trip for traveler 1", () => {
    const today = new Date().toISOString().slice(0, 10);
    const past = initialData.TRIP.filter(
      (t) => t["TravelerID"] === 1 && String(t["EndDate"]) < today,
    );
    expect(past).toHaveLength(1);
    expect(past[0]?.["TripID"]).toBe(104);
  });
  it("totals expenses to 11000", () => expect(total(initialData.EXPENSE, "Amount")).toBe(11000));
  it.each([
    [701, 7700],
    [702, 1800],
    [703, 1500],
  ])("totals category %i to %i", (id, amount) =>
    expect(
      total(
        initialData.EXPENSE.filter((r) => r["CategoryID"] === id),
        "Amount",
      ),
    ).toBe(amount),
  );
  it("totals Goa expenses to 4300", () =>
    expect(
      total(
        initialData.EXPENSE.filter((r) => r["TripID"] === 101),
        "Amount",
      ),
    ).toBe(4300));
  it("updates total when a 500 expense is added", () =>
    expect(total([...initialData.EXPENSE, { Amount: 500 }], "Amount")).toBe(11500));
  it("rejects duplicate traveler emails", () =>
    expect(
      validateRecord(initialData, "TRAVELER", { TravelerID: 4, Tra_Email: "ananya@gmail.com" }),
    ).toMatch(/already exists/));
  it("rejects missing trip references", () =>
    expect(
      validateRecord(initialData, "EXPENSE", { TripID: 999, CategoryID: 701, Amount: 100 }),
    ).toMatch(/existing TRIP/));
  it("allows nullable booking transport and accommodation", () =>
    expect(
      validateRecord(initialData, "BOOKING", {
        TravelerID: 1,
        TripID: 101,
        TransportID: null,
        AccommodationID: null,
        TotalCost: 100,
      }),
    ).toBeNull());
  it("prevents deletion of referenced transport", () =>
    expect(deleteBlocker(initialData, "TRANSPORT", 301)).toMatch(/BOOKING/));
  it("rejects end dates earlier than start dates", () =>
    expect(
      validateRecord(initialData, "TRIP", {
        TravelerID: 1,
        StartDate: "2026-10-15",
        EndDate: "2026-10-10",
      }),
    ).toMatch(/End date/));
});
