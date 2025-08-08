"use client";

import { useState } from "react";

export default function VoiceSearch() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const bookings = [
    "John Doe - Room 101",
    "Jane Smith - Cottage A",
    "Alice Johnson - Room 102",
    "Bob Lee - Cottage B",
  ];

  let recognition: any = null;

  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const WebkitSpeechRecognition = (window as any).webkitSpeechRecognition;
    recognition = new WebkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const handleListen = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setListening(false);

      const filtered = bookings.filter((booking) =>
        booking.toLowerCase().includes(speech.toLowerCase())
      );
      setFilteredResults(filtered);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="mt-6 max-w-md mx-auto p-4 border rounded">
      <button
        onClick={handleListen}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        🎙️ {listening ? "Listening..." : "Start Voice Search"}
      </button>

      {transcript && (
        <p className="mt-2 text-gray-600">
          You said: <span className="italic">{transcript}</span>
        </p>
      )}

      <div className="mt-4 space-y-2">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, i) => (
            <div
              key={i}
              className="border p-2 rounded bg-gray-50 text-sm"
            >
              {result}
            </div>
          ))
        ) : transcript ? (
          <p className="text-sm text-gray-500">No results found.</p>
        ) : null}
      </div>
    </div>
  );
}
