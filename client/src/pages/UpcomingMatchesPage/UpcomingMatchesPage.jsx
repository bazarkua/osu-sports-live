import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UpcomingMatchesPage.module.css";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaseballBall,
  faBasketballBall,
  faFootballBall,
  faRunning,
  faSoccerBall,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

const COLORS = {
  primary: "#ff6c00", // OSU Orange
  secondary: "#000000", // OSU Black
};

export default function UpcomingMatchesPage() {
  const sportOptions = [
    { label: "All Sports", value: "" },
    { label: "Men's Baseball", value: "Baseball", icon: faBaseballBall, id: 6 },
    {
      label: "Men's Basketball",
      value: "Basketball",
      icon: faBasketballBall,
      id: 7,
    },
    { label: "Football", value: "Football", icon: faFootballBall, id: 8 },
    { label: "Women's Running", value: "Running", icon: faRunning, id: 29 },
    { label: "Men's Soccer", value: "Soccer", icon: faSoccerBall, id: 26 },
    {
      label: "Women's Volleyball",
      value: "Volleyball",
      icon: faVolleyballBall,
      id: 25,
    },
  ];

  const [events, setEvents] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allSports, setAllSports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "http://api.pac-12.com/v3/events",
        params: {
          page: 1,
          pagesize: 100,
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
          const osuEvents = response.data.events.filter((event) =>
            event.title.includes("Oregon State")
          );
          setEvents(osuEvents);
        } else {
          console.log("No upcoming events available.");
          setEvents([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    

    fetchData();
  }, []);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  const filteredEvents = selectedSport
    ? events?.filter((event) => event.sport_id === selectedSport) ?? []
    : events ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.sportListContainer}>
        <div className={styles.sportIcons}>
          {sportOptions.map((option) => (
            <div
              key={option.id}
              className={`${styles.sportIcon} ${
                selectedSport === option.id ? styles.selected : ""
              }`}
              onClick={() => handleSportChange(option.id)}
            >
              <FontAwesomeIcon icon={option.icon} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.eventListContainer}>
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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                // Regular expression to find ' at ' and replace with ' vs. '
                // then find 'vs ' (without dot) and replace with 'vs. '
                const title = event.title
                  .replace(/ at /gi, " vs. ")
                  .replace(/vs /gi, "vs. ");

                return (
                  <div
                    key={event.id}
                    className={styles.eventContainer}
                    onClick={() => (window.location.href = event.url)}
                  >
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
              })
            ) : (
              <p>
                {selectedSport
                  ? `No live events available for ${
                      sportOptions.find((option) => option.id === selectedSport)
                        ?.label
                    }.`
                  : "No live events available."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
