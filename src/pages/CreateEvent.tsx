import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import EventForm from "../components/EventForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  return (
    <div className="w-full py-5">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>create a new event here...</CardDescription>
        </CardHeader>
        <CardContent>
          <EventForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
