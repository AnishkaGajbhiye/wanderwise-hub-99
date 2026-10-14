# Wanderwise Hub

Build a complete, modern, professional-looking **Travel Planner Database Management System** web application for a college Mini Project.

The project is based on a relational SQL database called `TravelPlanner`.

IMPORTANT:
- This is a **college DBMS project**, not a commercial travel booking website.
- The UI should clearly demonstrate the database entities, relationships, CRUD-style management, and stored data.
- Keep the application simple enough for a student to explain in a viva.
- Prioritize a polished frontend UI and realistic database-oriented functionality.
- Do not add unnecessary features that are unrelated to the database.
- Make the UI responsive for laptop and desktop screens.
- Use a clean modern design with cards, tables, badges, icons, charts where useful, and a professional travel theme.
- Use a consistent sidebar navigation throughout the application.

TECHNOLOGY:
- Use React + TypeScript if supported.
- Use Tailwind CSS or an equivalent modern CSS approach.
- Use reusable components.
- Keep the code organized and easy for a student to understand.
- For the initial version, use realistic mock/local data matching the SQL data below.
- Structure the code so that it can later be connected to MySQL/backend APIs.
- Do NOT invent database entities that are not listed below.

==================================================
DATABASE STRUCTURE
==================================================

DATABASE:
TravelPlanner

1. TRAVELER

Fields:
- TravelerID INT PRIMARY KEY
- Tra_Name VARCHAR(100) NOT NULL
- Tra_Email VARCHAR(100) UNIQUE NOT NULL
- Tra_Phone VARCHAR(15)
- Tra_DOB DATE
- Password VARCHAR(255) NOT NULL

2. TRIP

Fields:
- TripID INT PRIMARY KEY
- TravelerID INT FOREIGN KEY REFERENCES TRAVELER
- Title VARCHAR(100) NOT NULL
- StartDate DATE
- EndDate DATE
- Budget DECIMAL(10,2)
- Description VARCHAR(350)

3. DESTINATION

Fields:
- DestinationID INT PRIMARY KEY
- Dest_Name VARCHAR(100) NOT NULL
- Country VARCHAR(100)
- City VARCHAR(100)
- Dest_Info VARCHAR(255)

4. TRANSPORT

Fields:
- TransportID INT PRIMARY KEY
- Type VARCHAR(50)
- Name VARCHAR(100)
- Provider VARCHAR(100)
- CostPerUnit DECIMAL(10,2)

5. ACCOMMODATION

Fields:
- AccommodationID INT PRIMARY KEY
- Name VARCHAR(100) NOT NULL
- Type VARCHAR(50)
- Location VARCHAR(150)
- CostPerNight DECIMAL(10,2)
- Rating DECIMAL(2,1)

6. BOOKING

Fields:
- BookingID INT PRIMARY KEY
- TravelerID INT NOT NULL FOREIGN KEY REFERENCES TRAVELER
- TripID INT NOT NULL FOREIGN KEY REFERENCES TRIP
- TransportID INT NULL FOREIGN KEY REFERENCES TRANSPORT
- AccommodationID INT NULL FOREIGN KEY REFERENCES ACCOMMODATION
- BookingDate DATE
- Status VARCHAR(50)
- TotalCost DECIMAL(10,2)
- PaymentStatus VARCHAR(50)

7. ITINERARY

Fields:
- ItineraryID INT PRIMARY KEY
- TripID INT NOT NULL FOREIGN KEY REFERENCES TRIP
- DayNo INT
- Activity VARCHAR(300)
- Location VARCHAR(150)

8. EXPENSE_CATEGORY

Fields:
- CategoryID INT PRIMARY KEY
- CategoryName VARCHAR(100) NOT NULL
- Details VARCHAR(255)

9. EXPENSE

Fields:
- ExpenseID INT PRIMARY KEY
- TripID INT NOT NULL FOREIGN KEY REFERENCES TRIP
- CategoryID INT NOT NULL FOREIGN KEY REFERENCES EXPENSE_CATEGORY
- Amount DECIMAL(10,2) NOT NULL
- Date DATE
- ExpenseType VARCHAR(50)
- ReceiptURL VARCHAR(500)

==================================================
RELATIONSHIPS
==================================================

Implement the UI so these relationships are clearly visible:

TRAVELER
  ↓
TRIP
  ↓
  ├── ITINERARY
  ├── BOOKING
  │     ├── TRANSPORT
  │     └── ACCOMMODATION
  └── EXPENSE
        └── EXPENSE_CATEGORY

A traveler can have trips.

A trip contains itinerary items and expenses.

A booking belongs to a traveler and trip and can reference transport and accommodation.

Expenses belong to a trip and an expense category.

==================================================
SAMPLE DATABASE DATA
==================================================

TRAVELERS:

1.
TravelerID: 1
Name: Ananya Sharma
Email: ananya@gmail.com
Phone: 9876543210
DOB: 2004-05-12
Password: pass123

2.
TravelerID: 2
Name: Rohan Mehta
Email: rohan@gmail.com
Phone: 9876501234
DOB: 2003-11-20
Password: rohan456

3.
TravelerID: 3
Name: Priya Shah
Email: priya@gmail.com
Phone: 9988776655
DOB: 2004-02-15
Password: priya789


TRIPS:

1.
TripID: 101
TravelerID: 1
Title: Goa Vacation
StartDate: 2026-10-10
EndDate: 2026-10-15
Budget: 30000
Description: Beach vacation with friends

2.
TripID: 102
TravelerID: 2
Title: Manali Trip
StartDate: 2026-12-05
EndDate: 2026-12-10
Budget: 40000
Description: Winter trip to Manali

3.
TripID: 103
TravelerID: 3
Title: Jaipur Tour
StartDate: 2026-11-01
EndDate: 2026-11-04
Budget: 25000
Description: Exploring historical places


DESTINATIONS:

201:
Baga Beach
India
Goa
Popular beach destination

202:
Solang Valley
India
Manali
Famous for snow activities

203:
Hawa Mahal
India
Jaipur
Historical palace


TRANSPORT:

301:
Type: Flight
Name: IndiGo
Provider: IndiGo Airlines
CostPerUnit: 5500

302:
Type: Bus
Name: Volvo AC
Provider: RedBus
CostPerUnit: 1800

303:
Type: Train
Name: Rajdhani Express
Provider: Indian Railways
CostPerUnit: 2200


ACCOMMODATION:

401:
Name: Sea View Resort
Type: Resort
Location: Baga, Goa
CostPerNight: 3500
Rating: 4.2

402:
Name: Mountain Stay
Type: Hotel
Location: Manali
CostPerNight: 2800
Rating: 4.0

403:
Name: Royal Palace Hotel
Type: Hotel
Location: Jaipur
CostPerNight: 3200
Rating: 4.5


BOOKINGS:

501:
TravelerID: 1
TripID: 101
TransportID: 301
AccommodationID: 401
BookingDate: 2026-09-20
Status: Confirmed
TotalCost: 12000
PaymentStatus: Paid

502:
TravelerID: 2
TripID: 102
TransportID: 302
AccommodationID: 402
BookingDate: 2026-09-22
Status: Confirmed
TotalCost: 8000
PaymentStatus: Paid

503:
TravelerID: 3
TripID: 103
TransportID: 303
AccommodationID: 403
BookingDate: 2026-09-25
Status: Pending
TotalCost: 7500
PaymentStatus: Pending


ITINERARY:

601:
TripID: 101
DayNo: 1
Activity: Arrival and check-in at hotel
Location: Goa

602:
TripID: 101
DayNo: 2
Activity: Visit Baga Beach
Location: Baga Beach

603:
TripID: 102
DayNo: 1
Activity: Arrival and local sightseeing
Location: Manali

604:
TripID: 103
DayNo: 1
Activity: Visit Hawa Mahal
Location: Jaipur


EXPENSE CATEGORIES:

701:
CategoryName: Food
Details: Meals and refreshments

702:
CategoryName: Travel
Details: Transportation expenses

703:
CategoryName: Shopping
Details: Shopping and souvenirs


EXPENSES:

801:
TripID: 101
CategoryID: 701
Amount: 2500
Date: 2026-10-11
ExpenseType: Food
ReceiptURL: receipt001.com

802:
TripID: 101
CategoryID: 702
Amount: 1800
Date: 2026-10-10
ExpenseType: Travel
ReceiptURL: receipt002.com

803:
TripID: 102
CategoryID: 701
Amount: 2200
Date: 2026-12-06
ExpenseType: Food
ReceiptURL: receipt003.com

804:
TripID: 103
CategoryID: 703
Amount: 1500
Date: 2026-11-02
ExpenseType: Shopping
ReceiptURL: receipt004.com

==================================================
PAGES REQUIRED
==================================================

Create these pages:

1. Login
2. Dashboard
3. My Trips
4. Trip Details
5. Itinerary
6. Bookings
7. Destinations
8. Transport
9. Accommodation
10. Expenses
11. Profile

==================================================
1. LOGIN PAGE
==================================================

Create a clean login screen.

Include:
- Travel Planner logo/icon
- Email input
- Password input
- Login button
- Remember me
- Forgot password link

For demo purposes, allow login using:
Email: ananya@gmail.com
Password: pass123

After login, navigate to Dashboard.

Make it visually polished but simple.

==================================================
2. DASHBOARD
==================================================

Create a professional dashboard.

Sidebar:
- Dashboard
- My Trips
- Itinerary
- Bookings
- Destinations
- Transport
- Accommodation
- Expenses
- Profile

Top bar:
- Page title
- Search
- Notifications icon
- Logged-in user profile

Dashboard statistic cards:

- Total Trips: 3
- Total Budget: ₹95,000
- Total Bookings: 3
- Total Expenses: ₹8,000

Add an "Upcoming Trips" section showing:

Goa Vacation
10 Oct 2026 - 15 Oct 2026
Budget ₹30,000

Manali Trip
5 Dec 2026 - 10 Dec 2026
Budget ₹40,000

Jaipur Tour
1 Nov 2026 - 4 Nov 2026
Budget ₹25,000

Add a recent activity section.

Add a small expense overview chart if it improves the design.

==================================================
3. MY TRIPS
==================================================

Display all three trips as attractive cards or a clean table.

Each trip should show:
- Trip title
- Destination
- Start date
- End date
- Budget
- Description
- Status
- View Details button
- Edit button

Add:
"+ Create Trip"

The Create Trip button should open a modal/form containing:
- Title
- Start Date
- End Date
- Budget
- Description
- Traveler

Allow the user to add a trip to the local UI state.

==================================================
4. TRIP DETAILS
==================================================

This should be the most impressive page.

When the user selects Goa Vacation, display:

GOA VACATION

10 October 2026 → 15 October 2026

Beach vacation with friends

Show sections:

DESTINATION:
Baga Beach
Goa, India
Popular beach destination

TRANSPORT:
IndiGo
Flight
IndiGo Airlines
₹5,500

ACCOMMODATION:
Sea View Resort
Resort
Baga, Goa
₹3,500/night
Rating 4.2

ITINERARY:
Day 1
Arrival and check-in at hotel
Goa

Day 2
Visit Baga Beach
Baga Beach

EXPENSES:
Food ₹2,500
Travel ₹1,800

Total expenses: ₹4,300

Show booking information:
Status: Confirmed
Payment: Paid
Total Cost: ₹12,000

Use tabs or cards to organize this information.

==================================================
5. ITINERARY PAGE
==================================================

Create a timeline-style itinerary.

Show:
Day 1
Arrival and check-in at hotel
Location: Goa

Day 2
Visit Baga Beach
Location: Baga Beach

Also show itinerary entries for Manali and Jaipur.

Include:
"+ Add Activity"

Form:
- Trip
- Day number
- Activity
- Location

Allow adding activities locally.

==================================================
6. BOOKINGS PAGE
==================================================

Create a professional booking management table.

Columns:
- Booking ID
- Traveler
- Trip
- Transport
- Accommodation
- Booking Date
- Status
- Total Cost
- Payment Status
- Actions

Use badges:
Green = Confirmed/Paid
Yellow = Pending
Red = Cancelled if needed

Show the three sample bookings.

Add:
"+ New Booking"

==================================================
7. DESTINATIONS PAGE
==================================================

Display destination cards:

Baga Beach
Goa, India
Popular beach destination

Solang Valley
Manali, India
Famous for snow activities

Hawa Mahal
Jaipur, India
Historical palace

Each card should have:
- Attractive travel image/placeholder
- Destination name
- City
- Country
- Description
- View button

Add search/filter functionality.

==================================================
8. TRANSPORT PAGE
==================================================

Create a table/card view showing:

IndiGo
Flight
IndiGo Airlines
₹5,500

Volvo AC
Bus
RedBus
₹1,800

Rajdhani Express
Train
Indian Railways
₹2,200

Include:
- Search
- Add Transport
- Edit
- Delete

==================================================
9. ACCOMMODATION PAGE
==================================================

Display:

Sea View Resort
Resort
Baga, Goa
₹3,500/night
⭐ 4.2

Mountain Stay
Hotel
Manali
₹2,800/night
⭐ 4.0

Royal Palace Hotel
Hotel
Jaipur
₹3,200/night
⭐ 4.5

Include:
- Search
- Add accommodation
- Edit
- Delete

==================================================
10. EXPENSES PAGE
==================================================

Create an expense management dashboard.

Top cards:
Total Expenses: ₹8,000
Food: ₹4,700
Travel: ₹1,800
Shopping: ₹1,500

Then show a table:

Expense ID
Trip
Category
Amount
Date
Expense Type
Receipt

Show all four sample expenses.

Add:
"+ Add Expense"

Form:
- Trip
- Category
- Amount
- Date
- Expense Type
- Receipt URL

When an expense is added, update the total shown on the page.

==================================================
11. PROFILE PAGE
==================================================

Display the logged-in traveler:

Ananya Sharma
ananya@gmail.com
9876543210
DOB: 12 May 2004

Allow editing:
- Name
- Email
- Phone
- DOB

Do NOT display the password as plain text.

==================================================
DESIGN REQUIREMENTS
==================================================

Make the application visually polished.

Design style:
- Modern travel dashboard
- Professional college-project quality
- Clean white cards
- Soft background
- Dark navy sidebar
- Blue/purple primary accent
- Rounded corners
- Subtle shadows
- Good spacing
- Modern typography
- Responsive layout

Use travel-related icons such as:
- Plane
- Map pin
- Calendar
- Hotel
- Train
- Bus
- Wallet
- Receipt
- User

Avoid excessive animations.

Use subtle hover effects.

Make status badges visually clear.

==================================================
FUNCTIONAL REQUIREMENTS
==================================================

The application should actually feel interactive.

Implement:
- Login
- Sidebar navigation
- Page navigation
- Search
- Filtering where appropriate
- Add Trip modal
- Add Expense modal
- Add Itinerary Activity
- Edit/Delete actions where appropriate
- Status badges
- Dynamic expense totals
- Trip detail navigation
- Responsive sidebar

Use local state/local storage for the demo if a real backend is not configured.

Do not pretend that the app is connected to MySQL if it is only using mock/local data.

==================================================
IMPORTANT DATABASE PROJECT REQUIREMENT
==================================================

Keep the UI terminology exactly aligned with the database.

For example:
- Traveler → TRAVELER
- Trip → TRIP
- Destination → DESTINATION
- Transport → TRANSPORT
- Accommodation → ACCOMMODATION
- Booking → BOOKING
- Itinerary → ITINERARY
- Expense Category → EXPENSE_CATEGORY
- Expense → EXPENSE

Make the relationship between the pages visually understandable.

This application will be demonstrated as a DBMS mini project, so clarity of database entities and relationships is more important than adding unnecessary commercial features.

==================================================
FINAL REQUIREMENT
==================================================

Make the final application look like a polished **Travel Planner DBMS dashboard** that a college student could realistically demonstrate in a project presentation.

The UI should be impressive but still simple enough for me to understand and explain in a viva.

Start by generating the complete frontend application with the above pages, components, sample data, navigation, and interactions.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://wanderwise-hub-99.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cb9fe1d5-4231-57fd-8473-4b629f7ecba1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
