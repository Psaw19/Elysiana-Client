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
import { LocationSchema } from "../schemas";
import { Location } from "../types";
import axiosRequest from "../lib/axiosConfig";

export default function LocationForm({ eventId }: { eventId: number }) {
  const form = useForm<z.infer<typeof LocationSchema>>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      place: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(values: z.infer<typeof LocationSchema>) {
    const location: Partial<Location> = {};
    location.place = values.place;
    location.city = values.city;
    location.state = values.state;
    location.pincode = parseInt(values.pincode);

    const response = await axiosRequest.post(
      `/api/admin/events/${eventId}/locations`,
      location
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
          <Button>Add Location</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Loaction</DialogTitle>
          <DialogDescription>Create a location here...</DialogDescription>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Cubbon Park" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Bangalore" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Karnataka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="560066" {...field} />
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
