import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import YourEvents from "./pages/YourEvents";
import ProtectedRoute from "./components/ProtectedRoutes";
import EventDetails from "./pages/EventDetails";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/admin" element={<Register />} />
        <Route element={<ProtectedRoute roles={["ROLE_ADMIN"]} />}>
          <Route path="/events" element={<YourEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/events/create" element={<CreateEvent />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
