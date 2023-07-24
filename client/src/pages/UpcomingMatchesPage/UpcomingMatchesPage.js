import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UpcomingMatchesPage.module.css";
import { TailSpin } from "react-loader-spinner";

const COLORS = {
  primary: "#ff6c00", // OSU Orange
  secondary: "#000000", // OSU Black
};

export default function UpcomingMatchesPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "http://api.pac-12.com/v3/events",
        params: {
          page: 1,
          pagesize: 100, // Increase pagesize to retrieve more events if necessary
          sort: "ASC",
          start: new Date().toISOString(),
        },
        headers: {
          Accept: "application/json",
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data.events) {
          // Filter events for those including "Oregon State" in the title
          const osuEvents = response.data.events.filter(event =>
            event.title.includes('Oregon State')
          );
          setEvents(osuEvents);
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
      <h1 className={styles.header}>Upcoming Matches</h1>
      {isLoading ? (
        <div className={`${styles.loadingContainer} loading-container`}>
          <TailSpin
            type="TailSpin"
            color={COLORS.primary}
            height={60}
            width={60}
          />
        </div>
      ) : (
        <div>
          {events.map((event) => {
            // Regular expression to find ' at ' and replace with ' vs. '
            // then find 'vs ' (without dot) and replace with 'vs. '
            const title = event.title
              .replace(/ at /gi, " vs. ")
              .replace(/vs /gi, "vs. ");
  
            return (
              <div key={event.id} className={styles.eventContainer} onClick={() => window.location.href = event.url}>
                <div className={styles.event}>
                  <h2>{title}</h2>
                  <p>
                    Start Time:{" "}
                    {new Date(event.event_date.start_time).toLocaleString()}
                  </p>
                  <p>Season: {event.season}</p>
                  <p>Game Type: {event.game_type}</p>
                  {/* Add more event details as needed */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
