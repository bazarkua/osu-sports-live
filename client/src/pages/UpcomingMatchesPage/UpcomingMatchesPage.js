import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UpcomingMatchesPage.module.css';
import { TailSpin } from 'react-loader-spinner';


export default function UpcomingMatchesPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'http://api.pac-12.com/v3/events',
        params: {
          page: 1,
          pagesize: 100, // Increase pagesize to retrieve more events if necessary
          sort: 'ASC',
          start: new Date().toISOString(),
        },
        headers: {
          Accept: 'application/json',
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data.events) {
          setEvents(response.data.events);
        } else {
          console.log('No upcoming events available.');
          setEvents([]);
        }
        setIsLoading(false); // Set isLoading to false once events are loaded
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Upcoming Matches</h1>
      {events.length > 0 ? (
        <div>
          {events.map((event) => (
            <div key={event.id} className={styles.event}>
              <h2>{event.title}</h2>
              <p>Start Time: {new Date(event.event_date.start_time).toLocaleString()}</p>
              
              <p>Season: {event.season}</p>
              <p>Game Type: {event.game_type}</p>
              {/* Add more event details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <div className={`${styles.loadingContainer} loading-container`}>
          <TailSpin type="TailSpin" color="#3498db" height={60} width={60} />
        </div>
      )}
    </div>
  );
}
