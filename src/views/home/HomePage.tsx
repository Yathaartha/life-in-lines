import { useState } from "react";
import { FormWrapper, HomePageBackground } from "./HomePage.css";
import LifeLine from "../../components/lifeline/LifeLine";
import { Form } from "./HomePage.css";

export type LifeEvent = {
  // id: string;
  x: Date;
  y: number;
  name: string;
};

const lifeEvents: LifeEvent[] = [];

export const HomePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("positive");
  const [eventValue, setEventValue] = useState(0);
  const [eventDate, setEventDate] = useState<Date>(new Date());

  return (
    <HomePageBackground
      bgColor={`${eventType === "positive" ? "#00c936" : "#ff0000"}`}
      bgOpacity={eventValue / 100}>
      <FormWrapper>
        {/* <h1>Welcome to Life in Lines</h1> */}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            lifeEvents.push({
              // format date to match YYYY-MM-DD
              x: eventDate,
              // id: eventTitle,
              y: eventValue * (eventType === "positive" ? 1 : -1),
              name: eventTitle,
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

          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            required
            id="eventDate"
            value={eventDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setEventDate(date);
            }}
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

      <LifeLine
        data={[
          { x: new Date("2025-07-20"), y: 25 },
          { x: new Date("2025-07-21"), y: 60 },
          { x: new Date("2025-07-22"), y: -40 },
          { x: new Date("2025-07-23"), y: -85 },
          { x: new Date("2025-07-24"), y: -10 },
          { x: new Date("2025-07-25"), y: 95 },
        ]}
        width={"100dvw"}
        height={"100dvh"}
      />
    </HomePageBackground>
  );
};
