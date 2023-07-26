import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./LiveEventsPage.module.css";
import {
  faBaseballBall,
  faBasketballBall,
  faFootballBall,
  faRunning,
  faSoccerBall,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

export default function LiveEventsPage() {
  const [events, setEvents] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://api.pac-12.com/v3/onnow", // Replace with your API endpoint
          {
            params: {
              page: 1,
              pagesize: 10,
              sort: "ASC",
              ignore_hidden_canceled: true,
              school: 18,
            },
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.data?.programs) {
          setEvents(response.data.programs);
        } else {
          console.log("No events available.");
          setEvents([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const sportOptions = [
    { label: "All Sports", value: "" },
    { label: "Men's Baseball", value: "Baseball", icon: faBaseballBall },
    { label: "Men's Basketball", value: "Basketball", icon: faBasketballBall },
    { label: "Football", value: "Football", icon: faFootballBall },
    { label: "Women's Running", value: "Running", icon: faRunning },
    { label: "Men's Soccer", value: "Soccer", icon: faSoccerBall },
    {
      label: "Women's Volleyball",
      value: "Volleyball",
      icon: faVolleyballBall,
    },
    // Add other sports here
  ];

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  const formatTime = (timeString) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    };
    return new Date(timeString).toLocaleString("en-US", options);
  };

  const formatDuration = (duration) => {
    if (!duration) return "Unknown";
    const [hours, minutes] = duration.split(":");
    return `${parseInt(hours, 10)} hour ${parseInt(minutes, 10)} mins`;
  };

  const filteredEvents = selectedSport
    ? events?.filter((event) => event.title.includes(selectedSport)) ?? []
    : events ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.sportIcons}>
        {sportOptions.map((option) => (
          <div
            key={option.value}
            className={`${styles.sportIcon} ${
              selectedSport === option.value ? styles.selected : ""
            }`}
            onClick={() => handleSportChange(option.value)}
          >
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
      <div>
        {filteredEvents.length > 0 ? (
          <div>
            {filteredEvents.map((event) => (
              <Link key={event.id} to={event.url} target="_blank">
                <div className={styles.event}>
                  <h2>{event.title}</h2>
                  <img src={event.images.medium} alt="Event Thumbnail" />
                  <p>Duration: {formatDuration(event.duration)}</p>
                  {event.program_times && event.program_times.length > 0 && (
                    <>
                      <p>
                        Start Time:{" "}
                        {formatTime(event.program_times[0].start_time)}
                      </p>
                      <p>
                        End Time: {formatTime(event.program_times[0].end_time)}
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>
            {selectedSport
              ? `No live events available for ${selectedSport}.`
              : "No live events available."}
          </p>
        )}
      </div>
    </div>
  );
}
