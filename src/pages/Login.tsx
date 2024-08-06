import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const { token, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (user?.role === "ROLE_ADMIN") {
      navigate("/events");
    } else if (user?.role === "ROLE_USER") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[400px] mx-auto py-5">
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Login</CardTitle>
          <CardDescription>Please login here...</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
