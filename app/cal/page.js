import NewTime from "@/components/new-time/time"
import { FormCal } from "@/components/subComp/test";



export default async function Page() {
  const event = new Date()
   event.setUTCHours(23,59,59,59);
    event.getDate(event.setDate(event.getDate()+6))
    const events = new Date()
     events.setUTCHours(0,0,0,0);
    const calendarId = ["a16c4aac33575e5eddfc40fac317fc414d26f123a733f3651cacbe268e85f3a4@group.calendar.google.com","e6e9e8c902d57bb7f9d63b62c5831292c8246381ed1c6931e063168ba924bc24@group.calendar.google.com"]; // Replace with your calendar ID
    const baseUrl = "https://www.googleapis.com/calendar/v3/calendars";
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY; // Use your API key from environment variables
    var o = []
  for (let i=0; i<calendarId.length; i++){

      const url = `${baseUrl}/${encodeURIComponent(calendarId[i])}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${events.toISOString()}&timeMax=${event.toISOString()}`;
 console.log(url)
//86400
  const response = await fetch(url,{next: {revalidate: 5}})

  const data = await response.json()


   o[i] = FormCal(data)
  }
  return (
    
    <>
    
    <NewTime {...o}/>
    
    </>
  )
}