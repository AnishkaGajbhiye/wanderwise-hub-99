import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from '@/components/travel-pages';
export const Route=createFileRoute('/login')({head:()=>({meta:[{title:'Login — TravelPlanner'},{name:'description',content:'Login management in the local TravelPlanner college DBMS demo.'},{property:'og:title',content:'Login — TravelPlanner'},{property:'og:description',content:'Explore and manage TravelPlanner login records.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:LoginPage});
