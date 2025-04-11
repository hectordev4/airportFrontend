import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useAppService } from "@/context/AppServiceContext";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  flightNumber: z.string().min(2, { message: "Must be at least 2 characters" }),
  departureAirportId: z.string().min(1, { message: "Required" }),
  arrivalAirportId: z.string().min(1, { message: "Required" }),
  departureTime: z.string().min(1, { message: "Required" }),
  arrivalTime: z.string().min(1, { message: "Required" }),
  aircraftId: z.string().min(1, { message: "Required" }),
  status: z.string().min(2, { message: "Must be at least 2 characters" }),
});

export function FlightForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.pathname.includes("edit") ? "update" : "create";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
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
        try {
          const data = await Services.flight.getById(id);
          if (data) form.reset(data);
        } catch (error) {
          setError("Failed to load flight data");
        }
      };
      fetchData();
    }
  }, [id, mode, Services.flight]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await Services.flight.createFlight(values);
        navigate("/flights");
      } else {
        await Services.flight.updateById(id, values);
        navigate("/flights");
      }
    } catch (error) {
      setError(error.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && <div className="text-red-500 text-sm p-2 rounded bg-red-50">{error}</div>}

        {[
          "flightNumber",
          "departureAirportId",
          "arrivalAirportId", 
          "departureTime",
          "arrivalTime",
          "aircraftId",
          "status"
        ].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    disabled={isSubmitting}
                    type={field.includes("Time") ? "datetime-local" : "text"}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : mode === "create" ? "Create Flight" : "Update Flight"}
        </Button>
      </form>
    </Form>
  );
}