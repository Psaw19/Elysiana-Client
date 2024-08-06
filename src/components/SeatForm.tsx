"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { SeatSchema } from "../schemas";
import { Seat } from "../types";
import axiosRequest from "../lib/axiosConfig";

export default function SeatForm({ eventId }: { eventId: number }) {
  const form = useForm<z.infer<typeof SeatSchema>>({
    resolver: zodResolver(SeatSchema),
    defaultValues: {
      capacity: "",
      price: "",
      seatType: "",
    },
  });

  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(values: z.infer<typeof SeatSchema>) {
    const seat: Partial<Seat> = {};
    seat.capacity = parseInt(values.capacity);
    seat.price = parseFloat(values.price);
    seat.seatType = values.seatType;
    console.log(seat);
    const response = await axiosRequest.post(
      `/api/admin/events/${eventId}/seats`,
      seat
    );
    console.log(response);
    form.reset();
    setOpen(false);
    window.location.reload();
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-60" asChild>
          <Button>Add Seat</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Seat </DialogTitle>
          <DialogDescription>Create a seat here...</DialogDescription>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seatType"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Seat Type</FormLabel>
                  <FormControl>
                    <Input placeholder="gold/silver/platinum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.dispatchEvent(new Event("submit"));
                  }
                }}
                className="mt-3 w-full"
                type="submit"
              >
                Add Seat
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
