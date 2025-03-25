import React, { useState } from "react";

const AudioConverter = () => {
    const [convertedFile, setConvertedFile] = useState(null);
    const fileName = "audiowav2.wav"; 

    const handleConvert = async () => {
        try {
            // const fileUrl = `${process.env.PUBLIC_URL}/${fileName}`;
            const fileUrl = `${window.location.origin}/${fileName}`;


            
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: blob.type });

            const formData = new FormData();
            formData.append("file", file);

            const uploadResponse = await fetch("http://localhost:8000/convert-audio/", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to convert file.");
            }

            const mp3Blob = await uploadResponse.blob();
            const mp3Url = URL.createObjectURL(mp3Blob);
            setConvertedFile(mp3Url);
        } catch (error) {
            console.error("Error:", error);
        }
        
    };
    const downloadFile = async () => {
        try {
          const fileUrl = "/audiowav1.wav"; 
          
          const response = await fetch(fileUrl);
          if (!response.ok) throw new Error("Failed to fetch file");
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
      
        
          const a = document.createElement("a");
          a.href = url;
          a.download = "sample-audio"; 
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      

          window.URL.revokeObjectURL(url);
      
          console.log("Download started!");
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      };
      
      // Button to trigger download
      
      

    return (
        <div>
            <h2>Convert WMA/WMV to MP3</h2>
            <button onClick={handleConvert}>Convert</button>

            {convertedFile && (
                <div>
                    <h3>Converted Audio:</h3>
                    <audio controls>
                        <source src={convertedFile} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={downloadFile}>Download Audio</button>
                </div>
            )}
            
      
        </div>
    );
};

export default AudioConverter;
