"use client";

import { useForm } from "react-hook-form";
import { Contact, MailIcon, UserCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { PasswordInput } from "../components/ui/password-input";
import { RegisterSchema } from "../schemas";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      role: location.pathname.includes("admin") ? "ADMIN" : "USER",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const data = {
      name: values.name,
      email: values.email,
      contact: values.contact,
      role: values.role,
      password: values.password,
    };
    console.log({ data });
    const response = await axios.post("http://localhost:8086/api/signup", data);
    console.log(response.status);

    if (response.status == 200) {
      navigate("/");
    } else {
      alert("Error");
      return;
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        //   disabled={isPending}
                        type="text"
                        placeholder="John Doe"
                        {...field}
                        suffix={<UserCircle className="opacity-80" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        //   disabled={isPending}
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        suffix={<MailIcon className="opacity-80" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-between">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        //   disabled={isPending}
                        type="text"
                        placeholder="1234567890"
                        {...field}
                        suffix={<Contact className="opacity-80" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        //   disabled={isPending}
                        type="text"
                        placeholder="user"
                        {...field}
                        suffix={<UserCheck2 className="opacity-80" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="flex gap-4 justify-between">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        //   disabled={isPending}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        //   disabled={isPending}
                        placeholder="Re-enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="w-full text-center">
          Already have an account?&nbsp;
          <NavLink className="text-blue-700" to="/login">
            Login
          </NavLink>
        </p>
      </Form>
    </div>
  );
};

export default RegisterForm;
