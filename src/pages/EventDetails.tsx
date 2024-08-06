import { useParams } from "react-router-dom";
import SeatForm from "../components/SeatForm";
import { useEffect, useState } from "react";
import axiosRequest from "../lib/axiosConfig";
import { Event } from "../types";
import SeatCard from "../components/SeatCard";
import LocationForm from "../components/LocationForm";
import { Button } from "../components/ui/button";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const [event, setEvent] = useState<Event>();

  const fetchEventById = async () => {
    const response = await axiosRequest.get(`/api/events/${eventId}`);
    console.log(response.data);
    setEvent(response.data);
  };

  useEffect(() => {
    fetchEventById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-semibold">Event Title: {event?.title}</p>
          <p className="text-muted-foreground">{event?.description}</p>
        </div>
      </div>
      <div className="border-b"></div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Location</h1>
          {!event?.location ? (
            <LocationForm eventId={parseInt(eventId!)} />
          ) : (
            <Button>Edit Location</Button>
          )}
        </div>
        <div>
          {event?.location && (
            <div className="flex flex-col">
              <p> Place : {event?.location.place}</p>
              <div className="flex justify-between">
                <p>City : {event?.location.city}</p>
                <p>State : {event?.location.state}</p>
                <p>Pincode : {event?.location.pincode}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-b"></div>
      <div className="flex gap-2 flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Seats</h1>
          <SeatForm eventId={parseInt(eventId!)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {event?.seats.map((seat) => (
            <SeatCard seat={seat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
