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
  faGolfBall,
  faShip,
  faPersonFalling,
  faBaseballBatBall,
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
  const [selectedSportId, setSelectedSportId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://api.pac-12.com/v3/onnow", {
          params: {
            page: 1,
            pagesize: 10,
            sort: "ASC",
            ignore_hidden_canceled: true,
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

  const handleSportChange = (selectedSportValue) => {
    const selectedSport = allSports.find(
      (sport) => sport.name === selectedSportValue
    );
    const selectedSportId = selectedSport ? selectedSport.id : "";

    console.log("Selected Sport Name:", selectedSportValue);
    console.log("Selected Sport ID:", selectedSportId);

    setSelectedSport(selectedSportValue); // This is for styling
    setSelectedSportId(selectedSportId); // This is for filtering
  };

  useEffect(() => {
    console.log("All Sports:", allSports);
  }, [allSports]);

  useEffect(() => {
    console.log("All Events:", events);
  }, [events]);

  useEffect(() => {
    console.log("Selected Sport ID:", selectedSportId);
    const filteredEvents = selectedSportId
      ? events?.filter((event) => {
          return event.sports?.some((sport) => sport.id === selectedSportId);
        }) ?? []
      : events ?? [];

    console.log("Filtered Events:", filteredEvents);
  }, [selectedSportId, events]);

  const formatTime = (event) => {
    const optionsDate = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };

    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const startTime = new Date(event.program_times[0].start_time);
    const formattedStartDate = startTime.toLocaleString("en-US", optionsDate);
    const formattedStartTime = startTime.toLocaleString("en-US", optionsTime);

    let formattedEndTime = "Invalid (PDT)";
    if (event?.program_times[0]?.end_time) {
      const endTime = new Date(event.program_times[0].end_time);
      formattedEndTime = endTime.toLocaleString("en-US", optionsTime);
      formattedEndTime = formattedEndTime.replace(":00 ", " "); // Remove ":00" from the time
    }

    // Format the time range
    const timeRange = `${formattedStartDate}, ${formattedStartTime} to ${formattedEndTime} (PDT)`;

    return timeRange.replace("GMT", "");
  };

  const formatDuration = (duration) => {
    if (!duration) return "Unknown";
    const [hours, minutes] = duration.split(":");
    return `${parseInt(hours, 10)} hour ${parseInt(minutes, 10)} mins`;
  };

  const filteredEvents = selectedSportId
    ? events?.filter((event) => {
        return event.sports?.some((sport) => sport.id === selectedSportId);
      }) ?? []
    : events ?? [];

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const fetchNetworkDetails = async (networkId) => {
    try {
      const response = await axios.get(
        `http://api.pac-12.com/v3/networks/${networkId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching network details:", error);
      return null;
    }
  };

  const handleReadMoreClick = async () => {
    if (
      selectedEvent &&
      selectedEvent.program_times &&
      selectedEvent.program_times.length > 0
    ) {
      const programTimes = selectedEvent.program_times[0];
      if (programTimes.networks && programTimes.networks.length > 0) {
        // Assuming the first network in the networks array is the one you want to use for the redirect
        const networkId = programTimes.networks[0].id;
        console.log("Network ID:", networkId);

        const networkDetails = await fetchNetworkDetails(networkId);
        console.log("Network Details:", networkDetails);

        if (networkDetails && networkDetails.url) {
          console.log("Redirecting to URL:", networkDetails.url);
          window.open(networkDetails.url);
        } else {
          console.error("Error: Network URL not available.");
        }
      }
    }
  };

  const sportOptions = [
    { label: "All Sports", value: "" },
    { label: "Men's Baseball", value: "Baseball", icon: faBaseballBatBall },
    {
      label: "Men's Basketball",
      value: "Men's Basketball",
      icon: faBasketballBall,
    },
    {
      label: "Women's Basketball",
      value: "Women's Basketball",
      icon: faBasketballBall,
    },
    { label: "Football", value: "Football", icon: faFootballBall },
    { label: "Women's Track & Field", value: "Track & Field", icon: faRunning },
    { label: "Men's Soccer", value: "Men's Soccer", icon: faSoccerBall },
    { label: "Women's Soccer", value: "Women's Soccer", icon: faSoccerBall },
    {
      label: "Men's Volleyball",
      value: "Men's Volleyball",
      icon: faVolleyballBall,
    },
    {
      label: "Women's Volleyball",
      value: "Women's Volleyball",
      icon: faVolleyballBall,
    },
    // Add other sports here
    {
      label: "Cross Country",
      value: "Cross Country",
      icon: faRunning,
    },
    { label: "Men's Golf", value: "Men's Golf", icon: faGolfBall },
    { label: "Women's Golf", value: "Women's Golf", icon: faGolfBall },
    {
      label: "Women's Gymnastics",
      value: "Women's Gymnastics",
      icon: faPersonFalling,
    },
    { label: "Women's Rowing", value: "Women's Rowing", icon: faShip },
    {
      label: "Softball",
      value: "Softball",
      icon: faBaseballBall,
    },
  ];

  return (
    <>
      <h1 className={styles.liveEventsHeader}>PAC-12 Live Events</h1>
      <div className={styles.sportListContainer}>
        <div className={styles.sportIcons}>
          {sportOptions.map((option) => (
            <div
              key={option.id}
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
      <div className={styles.container}>
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
                      className={`${styles.card__background} ${styles.card__photo}`}
                      src={event.images?.medium}
                      alt="Event Thumbnail"
                    />
                    <div className={styles.card__overlay}>
                      <div className={styles.card__overlayContent}>
                        {event.program_times &&
                          event.program_times.length > 0 && (
                            <>
                              {/* Update the time and duration display */}
                              <p className={styles.card__description}>
                                {formatTime(event)}
                              </p>

                              <p className={styles.card__description}>
                                Duration: {formatDuration(event.duration)}
                              </p>
                              <button
                                className={styles.card__button}
                                onClick={handleReadMoreClick} // Remove () here to pass the function reference
                              >
                                Launch Pac-12 Live
                              </button>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className={styles.not__avail}>
                  {selectedSport
                    ? `No live events currently available for ${selectedSport}.`
                    : "No live events currently available."}
                </h2>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
