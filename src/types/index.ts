export interface User {
  userId: number;
  name: string;
  email: string;
  contact: string;
  role: string;
}

export interface AuthResponse extends User {
  jwt: string;
}

export interface booking {
  locationId: number;
  place: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Seat {
  seatId: string;
  capacity: number;
  price: number;
  seatType: string;
}

export interface Booking {
  bookingId: number;
  noOfSeats: number;
  totalCost: number;
  seat: Seat;
}

export interface Event {
  eventId: number;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: Location;
  booking: Booking[];
  seats: Seat[];
}

export interface Location {
  locationId: number;
  place: string;
  city: string;
  state: string;
  pincode: number;
}
