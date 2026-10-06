import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '@/components/travel-pages';
export const Route = createFileRoute('/')({head:()=>({meta:[{title:'Dashboard — TravelPlanner'},{name:'description',content:'TravelPlanner DBMS dashboard with trips, bookings, budgets and expenses.'},{property:'og:title',content:'Dashboard — TravelPlanner'},{property:'og:description',content:'Your local TravelPlanner database workspace.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:DashboardPage});
