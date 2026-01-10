import { useState } from "react";
import LifeLine from "../../components/lifeline/LifeLine";
import { Modal } from "../../components/modal/Modal";
import {
  Form,
  FormInput,
  FormWrapper,
  HomePageBackground,
  InputLabel,
  InputWrapper,
  OpenBtnWrapper,
  OpenButton,
  SubmitButton,
} from "./HomePage.css";

export type LifeEvent = {
  // id: string;
  x: Date;
  y: number;
  name: string;
};

const lifeEvents: LifeEvent[] = [];

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("positive");
  const [eventValue, setEventValue] = useState(0);
  const [eventDate, setEventDate] = useState<Date>(new Date());

  return (
    <HomePageBackground
      bgColor={`${eventType === "positive" ? "#00c936" : "#ff0000"}`}
      bgOpacity={eventValue / 100}>
      <OpenBtnWrapper>
        <OpenButton onClick={() => setIsOpen(true)}>
          Add a Life Event
        </OpenButton>
      </OpenBtnWrapper>

      <LifeLine
        data={[
          {
            x: new Date("2025-07-12"),
            y: 2.5,
            name: "Meh",
            description:
              "Did nothing in particular. Just spent most of the day on the couch watching Stranger Things. Btw I hated the ending.",
          },
          {
            x: new Date("2025-07-13"),
            y: 6.0,
            name: "Great Day",
            description:
              "Had a wonderful day at the park with friends. Played some frisbee and had a picnic. Later went out for some Ukrainian food.",
          },
          { x: new Date("2025-07-15"), y: -4.0, name: "Bad Day" },
          { x: new Date("2025-07-16"), y: -8.5, name: "Terrible Day" },
          { x: new Date("2025-07-17"), y: -1.0, name: "Okay Day" },
          { x: new Date("2025-07-18"), y: 9.5, name: "Awesome Day" },
        ]}
        width={"100dvw"}
        height={"100%"}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Life Event">
        <FormWrapper>
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
              setIsOpen(false);
            }}>
            <InputWrapper>
              <InputLabel htmlFor="eventTitle">Event Title:</InputLabel>
              <FormInput
                id="eventTitle"
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor="eventDate">Event Date:</InputLabel>
              <FormInput
                type="date"
                required
                id="eventDate"
                value={eventDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setEventDate(date);
                }}
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor="positive">Positive</InputLabel>
              <FormInput
                type="radio"
                required
                id="positive"
                value={eventType}
                onChange={() => setEventType("positive")}
                checked={eventType === "positive"}
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor="negative">Negative</InputLabel>
              <FormInput
                type="radio"
                required
                id="negative"
                value={eventType}
                onChange={() => setEventType("negative")}
                checked={eventType === "negative"}
              />
              <FormInput
                type="number"
                required
                max={100}
                value={eventValue}
                onChange={(e) => setEventValue(Number(e.target.value))}
              />
            </InputWrapper>

            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </FormWrapper>
      </Modal>
    </HomePageBackground>
  );
};
