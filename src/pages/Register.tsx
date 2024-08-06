import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { token } = useAuth();

  const navigate = useNavigate();

  if (token) {
    navigate("/login");
  }

  return (
    <div className="mx-auto max-w-lg py-5">
      <Card className="">
        <CardHeader>
          <CardTitle className="font-medium">Register</CardTitle>
          <CardDescription>Please register here...</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
