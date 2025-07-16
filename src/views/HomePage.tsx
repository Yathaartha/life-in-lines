import { useState } from "react";
import { HomePageBackground } from "./HomePage.css";

export const HomePage = () => {
  const [eventType, setEventType] = useState("positive");
  const [eventValue, setEventValue] = useState(0);

  return (
    <HomePageBackground
      bgColor={`${eventType === "positive" ? "#ff0000" : "#0CCE6B"}`}
      bgOpacity={eventValue / 100}>
      <div>
        <h1>Welcome to Life in Lines</h1>
        <input
          type="radio"
          id="positive"
          value={eventType}
          onChange={() => setEventType("positive")}
          checked={eventType === "positive"}
        />
        <input
          type="radio"
          id="negative"
          value={eventType}
          onChange={() => setEventType("negative")}
          checked={eventType === "negative"}
        />
        <input
          type="number"
          max={100}
          value={eventValue}
          onChange={(e) => setEventValue(Number(e.target.value))}
        />
      </div>
    </HomePageBackground>
  );
};

