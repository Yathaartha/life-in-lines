import { useState } from "react";

import {
    Form,
    FormInput,
    FormWrapper,
    InputLabel,
    InputWrapper,
    SubmitButton,
    SliderContainer,
    SliderValue,
    RadioGroup,
    RadioOption,
} from "./EventForm.css";

import type { LifeEvent } from "../../views/home/HomePage";

interface EventFormProps {
  onSubmit: (event: LifeEvent) => void;
}

export const EventForm = ({ onSubmit }: EventFormProps) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("positive");
  const [eventValue, setEventValue] = useState(0);
  const [eventDate, setEventDate] = useState<Date>(new Date());

  return (
    <FormWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            x: eventDate,
            y: eventValue,
            name: eventTitle,
          });
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
          <InputLabel>Event Type:</InputLabel>
          <RadioGroup>
            <RadioOption>
              <FormInput
                type="radio"
                required
                id="positive"
                name="eventType"
                value="positive"
                onChange={() => {
                  setEventType("positive");
                  setEventValue(Math.abs(eventValue));
                }}
                checked={eventType === "positive"}
              />
              <InputLabel htmlFor="positive">Positive</InputLabel>
            </RadioOption>
            <RadioOption>
              <FormInput
                type="radio"
                required
                id="negative"
                name="eventType"
                value="negative"
                onChange={() => {
                  setEventType("negative");
                  setEventValue(-Math.abs(eventValue));
                }}
                checked={eventType === "negative"}
              />
              <InputLabel htmlFor="negative">Negative</InputLabel>
            </RadioOption>
          </RadioGroup>
        </InputWrapper>

        <InputWrapper>
          <InputLabel htmlFor="eventValue">Event Value:</InputLabel>
          <SliderContainer>
            <SliderValue $isPositive={eventValue >= 0}>
              {eventValue > 0 ? "+" : ""}
              {eventValue}
            </SliderValue>
            <FormInput
              id="eventValue"
              type="range"
              required
              min={0}
              max={10}
              value={Math.abs(eventValue)}
              onChange={(e) => {
                const value = Number(e.target.value);
                setEventValue(eventType === "positive" ? value : -value);
              }}
            />
          </SliderContainer>
        </InputWrapper>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormWrapper>
  );
};

