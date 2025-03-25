import React, { useState } from "react";
import axios from "axios";

const AudioFetcher = () => {
  const [interactionId, setInteractionId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metadata, setMetadata] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);

  const API_BASE_URL = "http://localhost:8000"; // Update this with your actual FastAPI backend URL

  // 1️⃣ Fetch metadata by interaction_id
  const fetchMetadataByInteractionId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/metadata/interaction/${interactionId}`);
      setMetadata(response.data.metadata || []);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  // 2️⃣ Fetch metadata by date range
  const fetchMetadataByDate = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/metadata/date/`, {
        params: { start_date: startDate, end_date: endDate },
      });
      setMetadata(response.data.metadata || []);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  // 3️⃣ Fetch audio stream and play it
  const fetchAudioStream = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/audio/${interactionId}`, {
        responseType: "blob", // Important: Handle binary data
      });
    
      const audioUrl = URL.createObjectURL(response.data);
      console.log("Audio URL:", audioUrl);
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  return (
    <div>
      <h2>Fetch Audio Metadata & Stream Recordings</h2>

      {/* Input for Interaction ID */}
      <input
        type="text"
        placeholder="Enter Interaction ID"
        value={interactionId}
        onChange={(e) => setInteractionId(e.target.value)}
      />
      <button onClick={fetchMetadataByInteractionId}>
        Get Metadata by Interaction ID
      </button>
      <button onClick={fetchAudioStream}>Stream Audio</button>

      {/* Input for Start & End Date */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={fetchMetadataByDate}>
        Get Metadata by Date Range
      </button>

      {/* Display Metadata */}
      {metadata.length > 0 && (
        <div>
          <h3>Metadata:</h3>
          <ul>
            {metadata.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Streaming Audio Player */}
      {audioSrc && (
        <div>
          <h3>Audio Stream:</h3>
          <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioFetcher;
