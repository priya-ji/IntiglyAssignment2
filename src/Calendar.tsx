import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";




const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});



const DnDCalendar = withDragAndDrop(Calendar);



interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

let eventId = 0;

export default function MyCalendar() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: ++eventId,
      title: "Sample Task",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000), // +1 hour
    },
  ]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Enter Task Title");
    if (title) {
      setEvents([
        ...events,
        { id: ++eventId, title, start, end },
      ]);
    }
  };

  const moveEvent = ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
    setEvents(events.map(e => (e.id === event.id ? { ...e, start, end } : e)));
  };

  const resizeEvent = ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
    setEvents(events.map(e => (e.id === event.id ? { ...e, start, end } : e)));
  };

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
}
