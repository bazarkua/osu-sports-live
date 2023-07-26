import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./LiveEventsPage.module.css";
import { TailSpin } from "react-loader-spinner";
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

export default function LiveEventsPage() {
  const [events, setEvents] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allSports, setAllSports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://api.pac-12.com/v3/onnow", {
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
        });

        if (response.data?.programs) {
          setEvents(response.data.programs);
          setIsLoading(false);
        } else {
          console.log("No events available.");
          setEvents([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllSports = async () => {
      try {
        const response = await axios.get("http://api.pac-12.com/v3/sports");

        if (response.data?.sports) {
          setAllSports(response.data.sports);
        } else {
          console.log("No sports available.");
          setAllSports([]);
        }
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchAllSports();
  }, []);

  const handleSportChange = (sport) => {
    console.log("Selected Sport:", sport);
    setSelectedSport(sport);
  };

  useEffect(() => {
    console.log("All Sports:", allSports);
  }, [allSports]);

  useEffect(() => {
    console.log("Selected Sport ID:", selectedSport);
    const filteredEvents = selectedSport
      ? events?.filter((event) => {
          return event.sports?.some((sport) => sport.id === selectedSport);
        }) ?? []
      : events ?? [];

    console.log("Filtered Events:", filteredEvents);
  }, [selectedSport, events]);

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
    ? events?.filter((event) => {
        return event.sports?.some((sport) => sport.id === selectedSport);
      }) ?? []
    : events ?? [];

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleReadMoreClick = () => {
    if (selectedEvent) {
      window.open(selectedEvent.url);
    }
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.sportListContainer}>
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
      </div>
      <div className={styles.eventListContainer}>
        {isLoading ? (
          <div
            className={`${styles.loadingContainer} ${styles.loadingContainer}`}
          >
            <TailSpin
              type="TailSpin"
              color={COLORS.primary}
              height={60}
              width={60}
            />
          </div>
        ) : (
          <div className={styles.eventList}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={styles.card}
                  onClick={() => handleCardClick(event)}
                >
                  <h2 className={styles.card__title}>{event.title}</h2>
                  <img
                    className={styles.card__background}
                    src={event.images?.medium}
                    alt="Event Thumbnail"
                  />
                  <div className={styles.card__overlay}>
                    <div className={styles.card__overlayContent}>
                      <p className={styles.card__description}>
                        Duration: {formatDuration(event.duration)}
                      </p>
                      {event.program_times &&
                        event.program_times.length > 0 && (
                          <>
                            <p className={styles.card__description}>
                              Start Time:{" "}
                              {formatTime(event.program_times[0].start_time)}
                            </p>
                            <p className={styles.card__description}>
                              End Time:{" "}
                              {formatTime(event.program_times[0].end_time)}
                            </p>
                            <button
                              className={styles.card__description}
                              onClick={handleReadMoreClick}
                            >
                              Read More
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>
                {selectedSport
                  ? `No live events available for ${selectedSport}.`
                  : "No live events available."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
