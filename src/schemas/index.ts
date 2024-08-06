import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "enter valid password",
  }),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Enter valid name" })
      .max(20, { message: "less than 20 charaters only" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    role: z.string(),
    contact: z.string().trim().length(10, {
      message: "enter 10 digit contact number",
    }),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/])[A-Za-z\d ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

export const EventSchema = z.object({
  title: z.string(),
  eventType: z.string(),
  description: z.string(),
  eventDate: z.string().refine((val) => dateRegex.test(val), {
    message: "Invalid date format. Expected YYYY-MM-DD",
  }),
  eventTime: z.string().refine((val) => timeRegex.test(val), {
    message: "Invalid time format. Expected HH:mm:ss",
  }),
});

export const SeatSchema = z.object({
  capacity: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue > 0;
    },
    {
      message: "Capacity must be a positive number",
    }
  ),
  price: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue > 0;
    },
    {
      message: "Capacity must be a positive number",
    }
  ),
  seatType: z.string(),
});

export const LocationSchema = z.object({
  place: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z
    .string()
    .length(6)
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue > 0;
      },
      {
        message: "Capacity must be a positive number",
      }
    ),
});
