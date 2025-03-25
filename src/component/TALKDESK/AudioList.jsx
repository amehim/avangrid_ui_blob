import React, { useState } from "react";

const AudioList = () => {
    const [recordings, setRecordings] = useState([]);
    const [interactionId, setInteractionId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRecordings = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `https://<your-function-app>.azurewebsites.net/api/fetch_audio?interaction_id=${interactionId}&start_date=${startDate}&end_date=${endDate}`
            );
            const data = await response.json();

            if (response.ok) {
                setRecordings(data.recordings);
            } else {
                setError(data.detail || "No recordings found.");
            }
        } catch (err) {
            setError("Error fetching recordings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="audio-list">
            <h2>Fetch Recordings</h2>
            
            <input 
                type="text" 
                placeholder="Enter Interaction ID" 
                value={interactionId} 
                onChange={(e) => setInteractionId(e.target.value)} 
            />
            
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
            
            <button onClick={fetchRecordings} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Recordings"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {recordings.map((recording, index) => (
                    <li key={index}>
                        <h4>Recording {index + 1}</h4>
                        <p><strong>Interaction ID:</strong> {recording.metadata.Interaction_ID}</p>
                        <p><strong>Start Time:</strong> {recording.metadata.Start_Time}</p>
                        <audio controls>
                            <source src={recording.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudioList;
