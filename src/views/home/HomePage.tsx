import { useState } from "react";
import { FormWrapper, HomePageBackground } from "./HomePage.css";
import { LifeLine } from "../../components/lifeline/LifeLine";
import { Form } from "./HomePage.css";

export type LifeEvent = {
  // id: string;
  x: number;
  y: number;
};

const lifeEvents: LifeEvent[] = [];

export const HomePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("positive");
  const [eventValue, setEventValue] = useState(0);

  return (
    <HomePageBackground
      bgColor={`${eventType === "positive" ? "#ff0000" : "#00c936"}`}
      bgOpacity={eventValue / 100}>
      <FormWrapper>
        {/* <h1>Welcome to Life in Lines</h1> */}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            lifeEvents.push({
              x: lifeEvents.length,
              // id: eventTitle,
              y: eventValue * (eventType === "positive" ? 1 : -1),
            });
            setEventTitle("");
            setEventType("positive");
            setEventValue(0);
          }}>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <label htmlFor="positive">Positive</label>
          <input
            type="radio"
            required
            id="positive"
            value={eventType}
            onChange={() => setEventType("positive")}
            checked={eventType === "positive"}
          />
          <label htmlFor="negative">Negative</label>
          <input
            type="radio"
            required
            id="negative"
            value={eventType}
            onChange={() => setEventType("negative")}
            checked={eventType === "negative"}
          />
          <input
            type="number"
            required
            max={100}
            value={eventValue}
            onChange={(e) => setEventValue(Number(e.target.value))}
          />
          <button type="submit">Submit</button>
        </Form>
      </FormWrapper>

      <LifeLine data={lifeEvents} />
    </HomePageBackground>
  );
};

