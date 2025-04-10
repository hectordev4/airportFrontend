import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useAppService } from "@/context/AppServiceContext";

// Modify the schema to match the flight's fields
const formSchema = z.object({
  flightNumber: z.string().min(2),
  departureAirportId: z.string().min(2), // You can make it a select dropdown later
  arrivalAirportId: z.string().min(2), // Same as above
  departureTime: z.string().min(2), // Use a date-time picker component for this
  arrivalTime: z.string().min(2), // Use a date-time picker component for this
  aircraftId: z.string().min(2), // The aircraft associated with this flight
  status: z.string().min(2), // For example: "scheduled", "delayed", etc.
});

export function FlightForm() {
  const { id } = useParams();
  const location = useLocation();
  const mode = location.pathname.includes("edit") ? "update" : "create";

  const Services = useAppService();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: "",
      departureAirportId: "",
      arrivalAirportId: "",
      departureTime: "",
      arrivalTime: "",
      aircraftId: "",
      status: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const data = await Services.flight.getById(id); // Use the flight service
        if (data) {
          form.reset(data);
        }
      };
      fetchData();
    }
  }, [id, mode, Services]);

  const onSubmit = async (values) => {
    console.log(Services);
    if (mode === "create") {
      await Services.flight.createFlight(values); // Call the createFlight method
    } else {
      await Services.flight.updateFlight(id, values); // Call the updateFlight method
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {["flightNumber", "departureAirportId", "arrivalAirportId", "departureTime", "arrivalTime", "aircraftId", "status"].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{fieldName.replace(/([A-Z])/g, " $1")}</FormLabel>
                <FormControl>
                  <Input placeholder={fieldName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">{mode === "create" ? "Create" : "Update"}</Button>
      </form>
    </Form>
  );
}
