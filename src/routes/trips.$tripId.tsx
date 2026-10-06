import {createFileRoute} from '@tanstack/react-router';
import {TripDetailsPage} from '@/components/travel-pages';
export const Route=createFileRoute('/trips/$tripId')({head:({params})=>({meta:[{title:`Trip ${params.tripId} Details — TravelPlanner`},{name:'description',content:'Connected itinerary, bookings, transport, accommodation and expense records for your trip.'},{property:'og:title',content:`Trip ${params.tripId} — TravelPlanner`},{property:'og:description',content:'See the connected records for this TravelPlanner trip.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Details});
function Details(){const{tripId}=Route.useParams();return <TripDetailsPage tripId={tripId}/>;}
