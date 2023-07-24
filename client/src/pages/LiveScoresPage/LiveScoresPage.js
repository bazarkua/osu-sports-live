import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LiveScoresPage.module.css';

export default function LiveScoresPage() {
  const [events, setEvents] = useState(null);
  const [selectedSport, setSelectedSport] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'http://api.pac-12.com/v3/onnow',
        params: {
          page: 1,
          pagesize: 10,
          sort: 'ASC',
          ignore_hidden_canceled: true,
        },
        headers: {
          Accept: 'application/json',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (response.data.programs) {
          setEvents(response.data.programs);
        } else {
          console.log('No events available.');
          setEvents([]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  const sportOptions = [
    { label: 'All Sports', value: '' },
    { label: "Men's Baseball", value: "Baseball" },
    { label: "Men's Basketball", value: "Basketball" },
    { label: 'Football', value: 'Football' },
    { label: "Men's Golf", value: 'Golf' },
    { label: "Men's Rowing", value: 'Rowing' },
    { label: "Men's Soccer", value: 'Soccer' },
    { label: "Men's Wrestling", value: 'Wrestling' },
    { label: "Women's Basketball", value: 'Basketball' },
    { label: "Women's Cross Country", value: 'Cross Country' },
    { label: "Women's Golf", value: 'Golf' },
    { label: "Women's Gymnastics", value: 'Gymnastics' },
    { label: "Women's Rowing", value: 'Rowing' },
    { label: "Women's Soccer", value: 'Soccer' },
    { label: "Women's Softball", value: 'Softball' },
  ];

  const formatTime = (timeString) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    };
    const formattedTime = new Date(timeString).toLocaleString('en-US', options);
    return formattedTime;
  };

  const formatDuration = (duration) => {
    if (!duration) return 'Unknown';
    const [hours, minutes] = duration.split(':');
    return `${parseInt(hours, 10)} hour ${parseInt(minutes, 10)} mins`;
  };

  const filteredEvents = selectedSport
    ? events?.filter((event) => event.title.includes(selectedSport)) ?? []
    : events ?? [];

  return (
    <div className={styles.container}>
      
      <div className={styles.dropdown}>
      <h1>PAC 12 Live Events</h1>
        <p>Select Sport:</p>
        <select value={selectedSport} onChange={(e) => handleSportChange(e.target.value)}>
          {sportOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {filteredEvents.length > 0 ? (
        <div>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              <h2>{event.title}</h2>
              <img src={event.images.medium} alt="Event Thumbnail" />
              {/* <p>Event ID: {event.id}</p> */}
              <p>Duration: {formatDuration(event.duration)}</p>
              {event.program_times && event.program_times.length > 0 && (
                <>
                  <p>Start Time: {formatTime(event.program_times[0].start_time)}</p>
                  <p>End Time: {formatTime(event.program_times[0].end_time)}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>
          {selectedSport ? 'No live events available for the selected sport.' : 'No live events available.'}
        </p>
      )}
    </div>
  );
}

