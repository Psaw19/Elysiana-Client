import { Seat } from "../types";

const SeatCard = ({ seat }: { seat: Seat }) => {
  return (
    <div className="flex flex-col gap-2 border p-3 max-w-md col-span-1">
      <p className="text-lg font-medium">{seat.seatType}</p>
      <div className="flex justify-between">
        <p>Capacity : {seat.capacity}</p>
        <p>Price: Rs. {seat.price}</p>
      </div>
    </div>
  );
};

export default SeatCard;
