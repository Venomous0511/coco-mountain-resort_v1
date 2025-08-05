"use client";

import { useEffect, useState } from "react";

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

  let recognition: SpeechRecognition | null = null;

  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const WebkitSpeechRecognition =
      window.webkitSpeechRecognition as typeof SpeechRecognition;
    recognition = new WebkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const handleListen = () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setListening(false);

      const filtered = bookings.filter((booking) =>
        booking.toLowerCase().includes(speech.toLowerCase())
      );
      setFilteredResults(filtered);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleListen}
        className="w-full rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 transition"
      >
        🎙️ {listening ? "Listening..." : "Start Voice Search"}
      </button>

      {transcript && (
        <p className="mt-2 text-sm text-muted-foreground">
          You said: <span className="italic">{transcript}</span>
        </p>
      )}

      {/* Results */}
      <div className="mt-4 space-y-2">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, i) => (
            <div
              key={i}
              className="rounded-md bg-background p-2 shadow border text-sm"
            >
              {result}
            </div>
          ))
        ) : transcript ? (
          <p className="text-sm text-muted-foreground">No results found.</p>
        ) : null}
      </div>
    </div>
  );
}
