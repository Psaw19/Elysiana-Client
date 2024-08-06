import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axiosRequest from "../lib/axiosConfig";
import { Event } from "../types";

const YourEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const getAllEvents = async () => {
    const response = await axiosRequest.get("/api/admin/events");
    console.log(response);
    setEvents(response.data);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-5 flex flex-col gap-5 my-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Your Events</h1>
        <Button>
          <NavLink to="/events/create">Create Event</NavLink>
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <NavLink
            to={`/events/${event.eventId}`}
            key={event.title}
            className="flex justify-between border rounded px-5 py-3"
          >
            <div className="">
              <p className="text-xl font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
              <div className="pt-3 flex gap-4 text-sm text-neutral-900/65">
                <p>Date: {event.eventDate}</p>
                <p>Time: {event.eventTime}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default YourEvents;
