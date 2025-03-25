import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayerTD = ({ selectedTableRow }) => {
  if (!selectedTableRow || Object.keys(selectedTableRow).length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg shadow-md bg-white w-full max-w-xl mx-auto h-48">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Please select a row to view recordings</p>
        </div>
      </div>
    );
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioPath = selectedTableRow?.url;


  useEffect(() => {
    if (!audioPath) return;

    // Reset state when audioPath changes
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);

    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#10B981",
      progressColor: "#044E38",
      cursorColor: "transparent",
      height: 70,
      responsive: true,
      normalize: true,
      barRadius: 3,
    });

    wavesurferRef.current.load(audioPath);

    wavesurferRef.current.on("ready", () => {
      setDuration(wavesurferRef.current.getDuration());
      setCurrentTime(0);
      updateWaveformVisualization(false);
    });

    wavesurferRef.current.on("audioprocess", () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on("play", () => {
      setIsPlaying(true);
      updateWaveformVisualization(true);
    });

    wavesurferRef.current.on("pause", () => {
      setIsPlaying(false);
      updateWaveformVisualization(false);
    });

    wavesurferRef.current.on("seeking", () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioPath]);

  const updateWaveformVisualization = (playing) => {
    if (!wavesurferRef.current) return;

    if (playing) {
      wavesurferRef.current.setOptions({
        barWidth: 2,
        barHeight: 1,
        barGap: 3,
      });
    } else {
      wavesurferRef.current.setOptions({
        barWidth: 1,
        barHeight: 0.01,
        barGap: 0,
      });
    }
  };

  const togglePlay = () => {
    if (wavesurferRef.current) {
      isPlaying ? wavesurferRef.current.pause() : wavesurferRef.current.play();
    }
  };

  const skipTime = (seconds) => {
    if (wavesurferRef.current) {
      const newTime = Math.min(Math.max(0, currentTime + seconds), duration);
      setCurrentTime(newTime);
      setTimeout(() => {
        wavesurferRef.current.seekTo(newTime / duration);
      }, 0);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleDownload = async () => {
    if (!audioPath) return;
    
    try {
      setIsDownloading(true);
      
      // Fetch the audio file
      const response = await fetch(audioPath);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      // Get filename from the URL or use a default name
      const filename = audioPath.substring(audioPath.lastIndexOf('/') + 1) || 'audio-recording.mp3';
      
      // Set up and trigger download
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      // Handle error (could add error state and message)
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg shadow-md bg-white w-full max-w-xl mx-auto backdrop-filter backdrop-blur-sm">
      <div className="h-[80px] bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 relative overflow-hidden">
        {isPlaying && <div className="absolute inset-0 bg-green-50 opacity-20 animate-pulse"></div>}
        <div ref={waveformRef} className="h-[100%] w-[95%] mx-auto transition-all duration-100" />
      </div>

      <div className="flex justify-center">
        <span className="text-gray-600 text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex justify-center items-center gap-2 mt-2">
        <button onClick={() => skipTime(-10)} className="w-16 h-8 rounded-full text-white text-xs font-medium bg-gray-500 hover:bg-gray-600 active:bg-gray-700 transition-all duration-100 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 shadow-md hover:shadow-lg">
          -10s
        </button>

        <button onClick={togglePlay} className={`w-16 h-8 rounded-full text-white text-xs font-medium transition-all duration-100 transform ${isPlaying ? "bg-red-500 hover:bg-red-600 active:bg-red-700" : "bg-green-500 hover:bg-green-600 active:bg-green-700"} hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 shadow-md hover:shadow-lg`}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={() => skipTime(10)} className="w-16 h-8 rounded-full text-white text-xs font-medium bg-gray-500 hover:bg-gray-600 active:bg-gray-700 transition-all duration-100 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 shadow-md hover:shadow-lg">
          +10s
        </button>
      </div>

      <button 
        onClick={handleDownload} 
        disabled={isDownloading || !audioPath}
        className={`bg-green-500 text-white text-xs font-medium w-[30%] mx-auto py-2 px-4 mt-4 rounded-full hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-100 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-1 ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isDownloading ? (
          <span className="flex items-center gap-1">
            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading
          </span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayerTD;