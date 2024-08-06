import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import Logout from "./Logout";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { token, user } = useAuth();

  return (
    <div className="border-b flex justify-between py-2 px-5">
      <div className="flex items-center gap-8">
        <NavLink
          to="/"
          className="uppercase font-sans tracking-widest text-2xl font-semibold"
        >
          Elysiana
        </NavLink>
        <div className="flex gap-4">
          {user?.role === "ROLE_ADMIN" && (
            <NavLink to={"/events"}>Events</NavLink>
          )}
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
      </div>
      {!token && (
        <div className="flex items-center gap-4">
          <Button variant={"outline"}>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button variant={"outline"}>
            <NavLink to="/register">Register</NavLink>
          </Button>
        </div>
      )}

      {token && (
        <div className="flex items-center gap-4">
          <p className="capitalize">Welcome {user?.name}</p>
          <p>My Bookings</p>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Navbar;
