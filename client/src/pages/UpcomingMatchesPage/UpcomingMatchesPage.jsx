import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UpcomingMatchesPage.module.css";
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
import EventDetailsComponent from "../EventDetailsComponent/EventDetailsComponent";

const COLORS = {
  primary: "#ff6c00", // OSU Orange
};

const sportOptions = [
  { label: "All Sports", value: "" },
  { label: "Men's Baseball", value: "6", icon: faBaseballBatBall },
  { label: "Men's Basketball", value: "7", icon: faBasketballBall },
  { label: "Women's Basketball", value: "36", icon: faBasketballBall },
  { label: "Football", value: "8", icon: faFootballBall },
  { label: "Women's Track & Field", value: "29", icon: faRunning },
  { label: "Men's Soccer", value: "26", icon: faSoccerBall },
  { label: "Women's Soccer", value: "1", icon: faSoccerBall },
  { label: "Men's Volleyball", value: "37", icon: faVolleyballBall },
  { label: "Women's Volleyball", value: "25", icon: faVolleyballBall },
  { label: "Women's Cross Country", value: "50", icon: faRunning },
  { label: "Men's Golf", value: "33", icon: faGolfBall },
  { label: "Women's Golf", value: "32", icon: faGolfBall },
  { label: "Women's Gymnastics", value: "41", icon: faPersonFalling },
  { label: "Women's Rowing", value: "34", icon: faShip },
  { label: "Women's Softball", value: "45", icon: faBaseballBall },
  // Add other sports here
  // ...
];

export default function UpcomingMatchesPage() {
  const [sports, setSports] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [isLoadingSports, setIsLoadingSports] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [schoolNames, setSchoolNames] = useState({});
  const [teamNamesArray, setTeamNames] = useState([]);
  // Add state to store the school images and loading status
  const [schoolImages, setSchoolImages] = useState({});
  const [isLoadingSchoolImages, setIsLoadingSchoolImages] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get("http://api.pac-12.com/v3/sports", {
          params: {
            sort: "ASC",
            featured_only: false,
            sort_by: "weight",
          },
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data?.sports) {
          setSports(response.data.sports);
          setIsLoadingSports(false);
        } else {
          console.log("No sports available.");
          setSports([]);
          setIsLoadingSports(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoadingSports(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://api.pac-12.com/v3/events", {
          params: {
            page: 1,
            pagesize: 30,
            sort: "ASC",
            start: new Date().toISOString(),
          },
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data?.events) {
          setEvents(response.data.events);
          console.log(response.data.events);
          setIsLoadingEvents(false);
        } else {
          console.log("No events available.");
          setEvents([]);
          setIsLoadingEvents(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoadingEvents(false);
      }
    };

    // Function to fetch individual school name by ID and store it in schoolNames state

    fetchSports();
    fetchEvents();
  }, []);

  const handleSportChange = (selectedSportValue) => {
    setSelectedSport(selectedSportValue);
  };
  const formatTime = (timeString, isEndTime = false) => {
    if (!timeString) return "N/A";

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

  const formatTimeZone = (timeZone) => {
    // Check if the timeZone exists and is a string
    if (typeof timeZone === "string" && timeZone.trim() !== "") {
      // Split the timeZone string to get only the abbreviations (PST, PDT, etc.)
      const timeZoneAbbreviation = timeZone.split(" ").pop();
      return `(${timeZoneAbbreviation})`;
    }
    return ""; // Return an empty string if timeZone is not valid
  };

  // Wrap the filtered events array in useMemo Hook
  const filteredEvents = useMemo(() => {
    return selectedSport
      ? events?.filter(
          (event) => event.sport_id.toString() === selectedSport
        ) ?? []
      : events ?? [];
  }, [events, selectedSport]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleViewDetailsClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const fetchSchoolName = async (schoolId) => {
    // Function to fetch individual school name by ID and store it in schoolNames state
    try {
      const response = await axios.get(
        `http://api.pac-12.com/v3/schools/${schoolId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data?.name) {
        return response.data.name;
      } else {
        console.log(`School with ID ${schoolId} not found.`);
        return "N/A";
      }
    } catch (error) {
      console.error("Error:", error);
      return "N/A";
    }
  };

  const findTeamNames = async (schoolId1, schoolId2) => {
    const name1 = await fetchSchoolName(schoolId1);
    const name2 = await fetchSchoolName(schoolId2);
    return [name1, name2];
  };

  useEffect(() => {
    const fetchTeamNames = async () => {
      const teamNamesArray = await Promise.all(
        filteredEvents.map(async (event) => {
          // Check if event.schools array contains at least two schools
          if (event.schools.length < 2) {
            return ["N/A", "N/A"];
          }

          const name1 = await fetchSchoolName(event.schools[0]?.id);
          const name2 = await fetchSchoolName(event.schools[1]?.id);
          return [name1, name2];
        })
      );

      setTeamNames(teamNamesArray);
    };
    const fetchSchoolImages = async (schoolId) => {
      try {
        const response = await axios.get(
          `http://api.pac-12.com/v3/schools/${schoolId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.data?.images?.medium) {
          return response.data.images.medium;
        } else {
          console.log(`School image not found for ID ${schoolId}.`);
          return "";
        }
      } catch (error) {
        console.error("Error:", error);
        return "";
      }
    };

    const fetchImagesForEvents = async () => {
      const schoolImagesObj = {};
      await Promise.all(
        filteredEvents.map(async (event) => {
          const image1 = await fetchSchoolImages(event.schools[0]?.id);
          const image2 = await fetchSchoolImages(event.schools[1]?.id);
          schoolImagesObj[event.schools[0]?.id] = image1;
          schoolImagesObj[event.schools[1]?.id] = image2;
        })
      );

      setSchoolImages(schoolImagesObj);
      setIsLoadingSchoolImages(false);
    };

    fetchImagesForEvents();
    fetchTeamNames();
  }, [filteredEvents]);

  return (
    <>
      <div className={styles.sportListContainer}>
        <div className={styles.sportIcons}>
          {isLoadingSports ? (
            <div className={styles.loadingContainer}>
              <TailSpin
                type="TailSpin"
                color={COLORS.primary}
                height={60}
                width={60}
              />
            </div>
          ) : (
            sportOptions.map((option) => (
              <div
                key={option.label}
                className={`${styles.sportIcon} ${
                  selectedSport === option.value ? styles.selected : ""
                }`}
                onClick={() => handleSportChange(option.value)}
              >
                <FontAwesomeIcon icon={option.icon} />
                <span>{option.label}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.eventListContainer}>
          {isLoadingEvents ? (
            <div className={styles.loadingContainer}>
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
                filteredEvents.map((event, index) => {
                  // Check if event.schools array contains at least two schools
                  if (event.schools.length < 2) {
                    return null; // Skip rendering this event card
                  }
                  const schoolImage1 = schoolImages[event.schools[0]?.id];
                  const schoolImage2 = schoolImages[event.schools[1]?.id];

                  return (
                    <div
                      key={event.id}
                      className={styles.card}
                      onClick={() => handleCardClick(event)}
                    >
                      <div className={styles.card__images}>
                        <img
                          className={`${styles.card__background} ${styles.card__photo}`}
                          src={schoolImage1}
                          alt="School 1 Logo"
                        />
                        <img
                          className={`${styles.card__background} ${styles.card__photo}`}
                          src={schoolImage2}
                          alt="School 2 Logo"
                        />
                      </div>
                      <h2 className={styles.card__title}>
                        {teamNamesArray[index]?.join(" vs. ") || "N/A"}
                      </h2>

                      <div className={styles.card__overlay}>
                        <div className={styles.card__overlayContent}>
                          {/* Update the time display */}
                          <p className={styles.card__description}>
                            {event.schools[0].id}
                          </p>
                          <p className={styles.card__description}>
                            {event.schools[1].id}
                          </p>
                          <p className={styles.card__description}>
                            Match Start Time: {formatTime(event.event_date.start_time)}{" "}
                            {formatTimeZone(event.event_date.time_zone)}
                          </p>

                          <button
                            className={styles.card__button}
                            onClick={() => handleViewDetailsClick(event)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.noEventsMessage}>
                  {selectedSport
                    ? `No upcoming events for the selected sport: "${
                        sportOptions.find(
                          (option) => option.value === selectedSport
                        ).label
                      }". Please check back later or select a different sport.`
                    : "No live events available. Please check back later."}
                </div>
              )}
            </div>
          )}
        </div>

        {selectedEvent && (
          <EventDetailsComponent
            event={selectedEvent}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </>
  );
}
