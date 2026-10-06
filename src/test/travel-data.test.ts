import {describe,it,expect} from 'vitest';
import {initialData,total,validateRecord,deleteBlocker} from '@/lib/travel-data';
describe('TravelPlanner records and integrity',()=>{
 it('has three trips and a 95000 budget',()=>{expect(initialData.TRIP).toHaveLength(3);expect(total(initialData.TRIP,'Budget')).toBe(95000);});
 it('has three sample bookings',()=>{expect(initialData.BOOKING).toHaveLength(3);});
 it('totals expenses to 8000',()=>expect(total(initialData.EXPENSE,'Amount')).toBe(8000));
 it.each([[701,4700],[702,1800],[703,1500]])('totals category %i to %i',(id,amount)=>expect(total(initialData.EXPENSE.filter(r=>r['CategoryID']===id),'Amount')).toBe(amount));
 it('totals Goa expenses to 4300',()=>expect(total(initialData.EXPENSE.filter(r=>r['TripID']===101),'Amount')).toBe(4300));
 it('updates total when a 500 expense is added',()=>expect(total([...initialData.EXPENSE,{Amount:500}],'Amount')).toBe(8500));
 it('rejects duplicate traveler emails',()=>expect(validateRecord(initialData,'TRAVELER',{TravelerID:4,Tra_Email:'ananya@gmail.com'})).toMatch(/already exists/));
 it('rejects missing trip references',()=>expect(validateRecord(initialData,'EXPENSE',{TripID:999,CategoryID:701,Amount:100})).toMatch(/existing TRIP/));
 it('allows nullable booking transport and accommodation',()=>expect(validateRecord(initialData,'BOOKING',{TravelerID:1,TripID:101,TransportID:null,AccommodationID:null,TotalCost:100})).toBeNull());
 it('prevents deletion of referenced transport',()=>expect(deleteBlocker(initialData,'TRANSPORT',301)).toMatch(/BOOKING/));
 it('rejects end dates earlier than start dates',()=>expect(validateRecord(initialData,'TRIP',{TravelerID:1,StartDate:'2026-10-15',EndDate:'2026-10-10'})).toMatch(/End date/));
});