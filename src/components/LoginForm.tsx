"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { z } from "zod";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { AuthResponse, User } from "../types";
import { NavLink, useNavigate } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const response = await axios.post(
      "http://localhost:8086/api/authenticate",
      values
    );

    const data: AuthResponse = response.data;
    console.log(data);

    const { jwt, userId, name, contact, email, role } = data;

    const user: User = {
      userId,
      name,
      email,
      contact,
      role,
    };

    login(jwt, user);
    role === "ROLE_ADMIN" ? navigate("/events") : navigate("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="w-full text-center">
        Don&apos;t have an account?&nbsp;
        <NavLink className="text-blue-700" to="/register">
          Register here
        </NavLink>
      </p>
    </Form>
  );
}
