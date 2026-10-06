import {createFileRoute} from '@tanstack/react-router';
import {ItineraryPage} from '@/components/travel-pages';
export const Route=createFileRoute('/itinerary')({head:()=>({meta:[{title:'Itinerary — TravelPlanner'},{name:'description',content:'Itinerary management in the local TravelPlanner college DBMS demo.'},{property:'og:title',content:'Itinerary — TravelPlanner'},{property:'og:description',content:'Explore and manage TravelPlanner itinerary records.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:ItineraryPage});
