'use client'
import './time.css'
import { useEffect} from 'react'
import { OfficeHours } from '../subComp/calandertimes'




// Function to check if the office is open

export const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Denver',
  weekday: 'long'
})


function convertTo12Hour(start,end) {
  if (!start || !end) {
    return 'Closed'
  }
  const [hours1, minutes1, seconds1] = start.split(':').map(Number);
  const [hours2, minutes2, seconds2] = end.split(':').map(Number);
  const period1 = hours1 >= 12 ? 'PM' : 'AM';
  const period2 = hours2 >= 12 ? 'PM' : 'AM';
  const hours122 = hours2 % 12 || 12;
  const hours121 = hours1 % 12 || 12; // Convert "0" to "12" for midnight
  return `${hours121} ${period1}-${hours122} ${period2}`;
}


function isOfficeOpen () {
  var isOpen = null
 
  
  
  
  const dayHours = OfficeHours[formatter.format(new Date())]

  const serverTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date())
  

  if (serverTime >= dayHours.start && serverTime <= dayHours.end) {
    isOpen = true //open
  }
  if (serverTime < dayHours.start || serverTime > dayHours.end) {
    isOpen = false
  }
  return isOpen
}



export default function Timetable () {

  console.log(
    'it looks like your looking at the  source code lucky for you all of it is on https://github.com/alexler12345/Vaneetruckwash.git'
  )

  
  const today = new Date() // Current date
  const next7Days = []

  // Loop to get the current day and the next 6 days
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today) // Clone the current date
    nextDay.setDate(today.getDate() + i) // Increment the date
    next7Days.push(formatter.format(nextDay)) // Format and add to the array
  }

  useEffect(() => {
   

   
    
    for (let i = 0; i < 7; i++) {
      document.getElementById(i).firstChild.innerHTML = next7Days[i]
      document.getElementById(i).lastChild.innerHTML = convertTo12Hour(OfficeHours[next7Days[i]].start,OfficeHours[next7Days[i]].end)

      if (document.getElementById(i).firstChild.textContent == "Saturday" || document.getElementById(i).firstChild.textContent == "Sunday") {
        document.getElementById(i).classList.add('offDays')
      }
    }
    
    if (!isOfficeOpen()) {
    document.getElementById('0').classList.add('closed')
    } else {
    document.getElementById('0').classList.add('open')
  }
  })

  


  return (
    <>

    
  
    <table className='openinghours'>
      <tbody>
        <tr id='0'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='1'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='2'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='3'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='4'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='5'>
          <th></th>
          <td className='text-right'></td>
        </tr>
        <tr id='6'>
          <th></th>
          <td className='text-right'></td>
        </tr>
      </tbody>
    </table>
    </>
  )
}
