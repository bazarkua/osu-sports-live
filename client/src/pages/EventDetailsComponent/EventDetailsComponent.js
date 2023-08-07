import React from "react";
import styles from "./EventDetailsComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const EventDetailsComponent = ({ event, onClose }) => {
  const formatTime = (timeString, isEndTime = false) => {
    if (!timeString) return "TBD";

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    };

    const formattedTime = new Date(timeString).toLocaleString("en-US", options);

    // Remove the time zone from the end time
    if (isEndTime) {
      const timeParts = formattedTime.split(",");
      return timeParts[0] + timeParts[2];
    }

    return formattedTime.replace("GMT", "");
  };

  const handleReadMoreClick = () => {
    if (event.url) {
      window.open(event.url);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h2>{event.title}</h2>
        
        <p>{`Start Time: ${formatTime(event.event_date.start_time)}`}</p>
        <p>{`End Time: ${formatTime(event.event_date.end_time)}`}</p>
        <p>{`Game type: ${event.game_type}`}</p>
        <p>{`Season: ${event.season}`}</p>
        {event.venue.name && <p>{`Venue: ${event.venue.name}`}</p>}
        {event.venue && (
          <p>{`Location: ${event.venue.city}, ${event.venue.state}`}</p>
        )}
        {event.sport && <p>{`Sport: ${event.sport.name}`}</p>}
        <div className={styles.buttonContainer}>
          {event.url ? (
            <button
              className={styles.readMoreButton}
              onClick={handleReadMoreClick}
            >
              Read More
            </button>
          ) : (
            "No more information available."
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsComponent;
