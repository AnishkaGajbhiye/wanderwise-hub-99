export type Row = Record<string, string | number | null>;
export type Entity = 'TRAVELER'|'TRIP'|'DESTINATION'|'TRANSPORT'|'ACCOMMODATION'|'BOOKING'|'ITINERARY'|'EXPENSE_CATEGORY'|'EXPENSE';
export type Database = Record<Entity, Row[]>;
export const ids: Record<Entity,string> = {TRAVELER:'TravelerID',TRIP:'TripID',DESTINATION:'DestinationID',TRANSPORT:'TransportID',ACCOMMODATION:'AccommodationID',BOOKING:'BookingID',ITINERARY:'ItineraryID',EXPENSE_CATEGORY:'CategoryID',EXPENSE:'ExpenseID'};
export const initialData: Database = {
TRAVELER:[{TravelerID:1,Tra_Name:'Ananya Sharma',Tra_Email:'ananya@gmail.com',Tra_Phone:'9876543210',Tra_DOB:'2004-05-12',Password:'pass123'},{TravelerID:2,Tra_Name:'Rohan Mehta',Tra_Email:'rohan@gmail.com',Tra_Phone:'9876501234',Tra_DOB:'2003-11-20',Password:'rohan456'},{TravelerID:3,Tra_Name:'Priya Shah',Tra_Email:'priya@gmail.com',Tra_Phone:'9988776655',Tra_DOB:'2004-02-15',Password:'priya789'}],
TRIP:[{TripID:101,TravelerID:1,Title:'Goa Vacation',StartDate:'2026-10-10',EndDate:'2026-10-15',Budget:30000,Description:'Beach vacation with friends'},{TripID:102,TravelerID:2,Title:'Manali Trip',StartDate:'2026-12-05',EndDate:'2026-12-10',Budget:40000,Description:'Winter trip to Manali'},{TripID:103,TravelerID:3,Title:'Jaipur Tour',StartDate:'2026-11-01',EndDate:'2026-11-04',Budget:25000,Description:'Exploring historical places'}],
DESTINATION:[{DestinationID:201,Dest_Name:'Baga Beach',Country:'India',City:'Goa',Dest_Info:'Popular beach destination'},{DestinationID:202,Dest_Name:'Solang Valley',Country:'India',City:'Manali',Dest_Info:'Famous for snow activities'},{DestinationID:203,Dest_Name:'Hawa Mahal',Country:'India',City:'Jaipur',Dest_Info:'Historical palace'}],
TRANSPORT:[{TransportID:301,Type:'Flight',Name:'IndiGo',Provider:'IndiGo Airlines',CostPerUnit:5500},{TransportID:302,Type:'Bus',Name:'Volvo AC',Provider:'RedBus',CostPerUnit:1800},{TransportID:303,Type:'Train',Name:'Rajdhani Express',Provider:'Indian Railways',CostPerUnit:2200}],
ACCOMMODATION:[{AccommodationID:401,Name:'Sea View Resort',Type:'Resort',Location:'Baga, Goa',CostPerNight:3500,Rating:4.2},{AccommodationID:402,Name:'Mountain Stay',Type:'Hotel',Location:'Manali',CostPerNight:2800,Rating:4},{AccommodationID:403,Name:'Royal Palace Hotel',Type:'Hotel',Location:'Jaipur',CostPerNight:3200,Rating:4.5}],
BOOKING:[{BookingID:501,TravelerID:1,TripID:101,TransportID:301,AccommodationID:401,BookingDate:'2026-09-20',Status:'Confirmed',TotalCost:12000,PaymentStatus:'Paid'},{BookingID:502,TravelerID:2,TripID:102,TransportID:302,AccommodationID:402,BookingDate:'2026-09-22',Status:'Confirmed',TotalCost:8000,PaymentStatus:'Paid'},{BookingID:503,TravelerID:3,TripID:103,TransportID:303,AccommodationID:403,BookingDate:'2026-09-25',Status:'Pending',TotalCost:7500,PaymentStatus:'Pending'}],
ITINERARY:[{ItineraryID:601,TripID:101,DayNo:1,Activity:'Arrival and check-in at hotel',Location:'Goa'},{ItineraryID:602,TripID:101,DayNo:2,Activity:'Visit Baga Beach',Location:'Baga Beach'},{ItineraryID:603,TripID:102,DayNo:1,Activity:'Arrival and local sightseeing',Location:'Manali'},{ItineraryID:604,TripID:103,DayNo:1,Activity:'Visit Hawa Mahal',Location:'Jaipur'}],
EXPENSE_CATEGORY:[{CategoryID:701,CategoryName:'Food',Details:'Meals and refreshments'},{CategoryID:702,CategoryName:'Travel',Details:'Transportation expenses'},{CategoryID:703,CategoryName:'Shopping',Details:'Shopping and souvenirs'}],
EXPENSE:[{ExpenseID:801,TripID:101,CategoryID:701,Amount:2500,Date:'2026-10-11',ExpenseType:'Food',ReceiptURL:'receipt001.com'},{ExpenseID:802,TripID:101,CategoryID:702,Amount:1800,Date:'2026-10-10',ExpenseType:'Travel',ReceiptURL:'receipt002.com'},{ExpenseID:803,TripID:102,CategoryID:701,Amount:2200,Date:'2026-12-06',ExpenseType:'Food',ReceiptURL:'receipt003.com'},{ExpenseID:804,TripID:103,CategoryID:703,Amount:1500,Date:'2026-11-02',ExpenseType:'Shopping',ReceiptURL:'receipt004.com'}]
};
export const money=(n:unknown)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(n)||0);
export const date=(n:unknown,long=false)=>n ? new Date(`${n}T00:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:long?'long':'short',year:'numeric'}):'—';
export const total=(rows:Row[],key:string)=>rows.reduce((a,r)=>a+Number(r[key]||0),0);
export const references: Partial<Record<Entity,Record<string,Entity>>>={TRIP:{TravelerID:'TRAVELER'},BOOKING:{TravelerID:'TRAVELER',TripID:'TRIP',TransportID:'TRANSPORT',AccommodationID:'ACCOMMODATION'},ITINERARY:{TripID:'TRIP'},EXPENSE:{TripID:'TRIP',CategoryID:'EXPENSE_CATEGORY'}};
export function validateRecord(db:Database,entity:Entity,row:Row):string|null {
 for(const [field,parent] of Object.entries(references[entity]||{})) { if(row[field]===null&&(field==='TransportID'||field==='AccommodationID'))continue; if(!db[parent].some(r=>r[ids[parent]]===Number(row[field])))return `${field} must reference an existing ${parent} record.`; }
 if(entity==='TRAVELER'&&db.TRAVELER.some(r=>r['TravelerID']!==row['TravelerID']&&String(r['Tra_Email']).toLowerCase()===String(row['Tra_Email']).toLowerCase()))return 'This traveler email already exists.';
 if(entity==='TRIP'&&row['EndDate']&&row['StartDate']&&row['EndDate']<row['StartDate'])return 'End date must be on or after start date.';
 for(const key of ['Amount','Budget','TotalCost','CostPerUnit','CostPerNight'])if(row[key]!=null&&(!Number.isFinite(Number(row[key]))||Number(row[key])<0))return `${key} must be a non-negative amount.`;
 if(entity==='ITINERARY'&&(!Number.isInteger(Number(row['DayNo']))||Number(row['DayNo'])<1))return 'Day number must be a positive integer.';
 if(entity==='ACCOMMODATION'&&(Number(row['Rating'])<0||Number(row['Rating'])>5))return 'Rating must be between 0 and 5.';
 return null;
}
export function deleteBlocker(db:Database,entity:Entity,id:number):string|null {
 for(const [child,refs]of Object.entries(references)) for(const[field,parent]of Object.entries(refs))if(parent===entity&&db[child as Entity].some(r=>r[field]===id))return `Cannot delete: this record is referenced by ${child}. Remove or update those records first.`;
 return null;
}
