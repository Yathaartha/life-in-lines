import { useState } from "react";

import { EventForm } from "../../components/event-form/EventForm";
import LifeLine from "../../components/lifeline/LifeLine";
import { Modal } from "../../components/modal/Modal";
import { HomePageBackground, OpenBtnWrapper, OpenButton } from "./HomePage.css";

export type LifeEvent = {
  // id: string;
  x: Date;
  y: number;
  name: string;
};

const lifeEvents: LifeEvent[] = [];

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: LifeEvent) => {
    lifeEvents.push(event);
    setIsOpen(false);
  };

  return (
    <HomePageBackground>
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
          { x: new Date("2025-07-19"), y: 10.0, name: "Great Day" },
          { x: new Date("2025-07-20"), y: 10.0, name: "Great Day" },
          { x: new Date("2025-07-21"), y: 0.0, name: "Great Day" },
          // add 100 life events with different dates and values and names
        ]}
        width={"100dvw"}
        height={"100%"}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Life Event">
        <EventForm onSubmit={handleSubmit} />
      </Modal>
    </HomePageBackground>
  );
};
