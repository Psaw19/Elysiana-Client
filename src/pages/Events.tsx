import axiosRequest from "../lib/axiosConfig";
import { useEffect, useState } from "react";
import { Event } from "../types";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  const getAllEvents = async () => {
    const response = await axiosRequest.get("/api/events");
    console.log(response);
    setEvents(response.data);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold pb-2">Events</h1>
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div
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
            <Button>Book Tickets</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
