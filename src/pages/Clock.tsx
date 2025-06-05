import { useEffect, useState } from "react";
import "../css/App.css";
import backgroundImage from "../media/Sequoia-Sunrise.png"
// Example JSON Schedule
const scheduleData = {
  'A Day': [
    { name: 'Period 1', start_hour: 7, start_minute: 32, end_hour: 8, end_minute: 26 },
    { name: 'Period 2', start_hour: 8, start_minute: 30, end_hour: 9, end_minute: 23 },
    { name: 'Hawks Nest | Capstone', start_hour: 9, start_minute: 27, end_hour: 9, end_minute: 52 },
    { name: 'Period 3', start_hour: 9, start_minute: 56, end_hour: 10, end_minute: 49 },
    { name: 'Period 5A', start_hour: 10, start_minute: 53, end_hour: 11, end_minute: 23 },
    { name: 'Period 5B', start_hour: 11, start_minute: 25, end_hour: 11, end_minute: 55 },
    { name: 'Period 5C', start_hour: 11, start_minute: 59, end_hour: 12, end_minute: 29 },
    { name: 'Period 6', start_hour: 12, start_minute: 23, end_hour: 13, end_minute: 26 },
    { name: 'Period 7', start_hour: 13, start_minute: 30, end_hour: 14, end_minute: 23 },
  ],
  'B Day': [
    { name: 'Period 4', start_hour: 7, start_minute: 32, end_hour: 8, end_minute: 26 },
    { name: 'Period 1', start_hour: 8, start_minute: 30, end_hour: 9, end_minute: 23 },
    { name: 'Hawks Nest | Capstone', start_hour: 9, start_minute: 27, end_hour: 9, end_minute: 52 },
    { name: 'Period 2', start_hour: 9, start_minute: 56, end_hour: 10, end_minute: 49 },
    { name: 'Period 8A', start_hour: 10, start_minute: 53, end_hour: 11, end_minute: 23 },
    { name: 'Period 8B', start_hour: 11, start_minute: 25, end_hour: 11, end_minute: 55 },
    { name: 'Period 8C', start_hour: 11, start_minute: 59, end_hour: 12, end_minute: 29 },
    { name: 'Period 5', start_hour: 12, start_minute: 23, end_hour: 13, end_minute: 26 },
    { name: 'Period 6', start_hour: 13, start_minute: 30, end_hour: 14, end_minute: 23 },
  ],
  'C Day': [
    { name: 'Period 3', start_hour: 7, start_minute: 32, end_hour: 8, end_minute: 26 },
    { name: 'Period 4', start_hour: 8, start_minute: 30, end_hour: 9, end_minute: 23 },
    { name: 'Hawks Nest | Capstone', start_hour: 9, start_minute: 27, end_hour: 9, end_minute: 52 },
    { name: 'Period 1', start_hour: 9, start_minute: 56, end_hour: 10, end_minute: 49 },
    { name: 'Period 7A', start_hour: 10, start_minute: 53, end_hour: 11, end_minute: 23 },
    { name: 'Period 7B', start_hour: 11, start_minute: 25, end_hour: 11, end_minute: 55 },
    { name: 'Period 7C', start_hour: 11, start_minute: 59, end_hour: 12, end_minute: 29 },
    { name: 'Period 8', start_hour: 12, start_minute: 23, end_hour: 13, end_minute: 26 },
    { name: 'Period 5', start_hour: 13, start_minute: 30, end_hour: 14, end_minute: 23 },
  ],
  'D Day': [
    { name: 'Period 2', start_hour: 7, start_minute: 32, end_hour: 8, end_minute: 26 },
    { name: 'Period 3', start_hour: 8, start_minute: 30, end_hour: 9, end_minute: 23 },
    { name: 'Hawks Nest | Capstone', start_hour: 9, start_minute: 27, end_hour: 9, end_minute: 52 },
    { name: 'Period 4', start_hour: 9, start_minute: 56, end_hour: 10, end_minute: 49 },
    { name: 'Period 6A', start_hour: 10, start_minute: 53, end_hour: 11, end_minute: 23 },
    { name: 'Period 6B', start_hour: 11, start_minute: 25, end_hour: 11, end_minute: 55 },
    { name: 'Period 6C', start_hour: 11, start_minute: 59, end_hour: 12, end_minute: 29 },
    { name: 'Period 7', start_hour: 12, start_minute: 23, end_hour: 13, end_minute: 26 },
    { name: 'Period 8', start_hour: 13, start_minute: 30, end_hour: 14, end_minute: 23 },
  ],
  'none': [

  ],
};

// // Helper function to format time
// const formatTime = (hours: number, minutes: number): string => {
//   return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
// };
// const daysOfWeek = ['A Day', 'B Day', 'C Day', 'D Day'];

// function getScheduleDay() {
//   const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//   // If it's a weekend (Saturday or Sunday), return the first day (Monday)
//   if (currentDay === 0 || currentDay === 6) {
//     return daysOfWeek[0]; // Default to A Day if it's the weekend
//   }
//   // Otherwise, map weekdays (1 = Monday, 2 = Tuesday, ..., 5 = Friday)
//   return daysOfWeek[(currentDay - 3) % daysOfWeek.length];
// }

export default function Clock() {
  const date = new Date();
  const localDate = date.toLocaleDateString();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPeriod, setCurrentPeriod] = useState<string | null>(null); // Using string | null
  // const dayname = getScheduleDay(); // Dynamically set this based on actual day
  const dayname = 'B Day'; // Dynamically set this based on actual day


  // Set interval to update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Determine which period is active based on current time
  useEffect(() => {
    const now = currentTime;
    const periods = scheduleData[dayname];
    let activePeriod: string | null = null;

    for (let i = 0; i < periods.length; i++) {
      const { start_hour, start_minute, end_hour, end_minute, name } = periods[i];

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), start_hour, start_minute).getTime();
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), end_hour, end_minute).getTime();

      if (now.getTime() >= startTime && now.getTime() <= endTime) {
        activePeriod = name;
        break;
      }
    }

    setCurrentPeriod(activePeriod); // Use this to set the current period


  }, [currentTime, dayname]);

  // Function to format time in 12-hour format
  const formatTo12Hour = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'; // AM or PM
    let formattedHour = hour % 12; // Convert 24-hour format to 12-hour
    if (formattedHour === 0) formattedHour = 12; // Handle 12 AM or 12 PM
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Add leading zero if minute is < 10
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  return (
    <div
      className="clock"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Optional: Adjust as needed
        backgroundRepeat: 'no-repeat', // Optional: Adjust as needed
        height: '100vh', // Optional: Adjust as needed
        width: '100vw' // Optional: Adjust as needed
      }}
    >

      <div id="time">
        <h2 className="text-center font-bold text-4xl flex time-items" id="clock-date"> {localDate}</h2>
        <h1 className="text-center font-bold text-7xl flex time-items" id="clock-time"> {currentTime.toLocaleTimeString()}</h1>
      </div>

      <div id="schedule">
        {scheduleData[dayname].map((period, index) => {
          const { name, start_hour, start_minute, end_hour, end_minute } = period;
          const periodStartTime = formatTo12Hour(start_hour, start_minute);
          const periodEndTime = formatTo12Hour(end_hour, end_minute);

          return (
            <div
              key={index}
              className={`period ${currentPeriod === name ? 'active' : ''}`}
            >
              <span className="period-text">{name}</span>
              <span className="period-time">{periodStartTime} - {periodEndTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
