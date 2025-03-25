import React, { useState, useEffect } from "react";
import { useTaskDesk } from "../../context/TaskdeskContextApi";

function ApiRecordings() {
  const CONTAINER_URL = "https://akshaydatastorage.blob.core.windows.net/demotalkdeskrec"; // Replace with your container URL 
  const SAS_TOKEN = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-03-31T19:11:14Z&st=2025-03-19T11:11:14Z&spr=https,http&sig=X2dsdX4u3LbM1PQLhb41%2FV1UrLjwuMutKguzt%2Flxu%2FA%3D"; // Replace with your actual SAS token
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { metadata,setMetadata} = useTaskDesk();

  useEffect(() => {
    async function fetchRecordings() {
      try {
        setLoading(true);
        setError("");

        // Construct request URL to list blobs with metadata
        const requestUrl = `${CONTAINER_URL}?restype=container&comp=list&include=metadata&${SAS_TOKEN}`;

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: { "x-ms-version": "2020-06-12" },
        });

        if (!response.ok) throw new Error("Failed to fetch recordings");

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        const blobs = Array.from(xml.getElementsByTagName("Blob")).map((blob) => {
          const name = blob.getElementsByTagName("Name")[0].textContent;
          const metadataNode = blob.getElementsByTagName("Metadata")[0];
          let Metadata = {};

          if (metadataNode) {
            Array.from(metadataNode.children).forEach((meta) => {
              Metadata[meta.tagName] = meta.textContent;
            });
          }

          return {
            name,
            url: `${CONTAINER_URL}/${name}?${SAS_TOKEN}`,
            Metadata,
          };
        });
        setMetadata(prev => blobs);
        setRecordings(blobs);
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecordings();
  }, []);

  return (
    <div className="container">
      {/* <h2>Azure Audio Recordings</h2> */}

      {/* {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}

      {/* <ul>
        {metadata.length > 0 ? (
          metadata.map((rec) => (
            <li key={rec.name}> 
              <p><strong>Filename:</strong> {rec.name}</p>
              {Object.entries(rec.Metadata).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
              <audio controls>
                <source src={rec.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))
        ) : (
          <p>No recordings found.</p>
        )}
      </ul> */}
    </div>
  );
}

export default ApiRecordings;