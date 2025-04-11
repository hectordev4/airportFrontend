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
  name: z.string().min(2, { message: "Must be at least 2 characters" }),
  city: z.string().min(2, { message: "Must be at least 2 characters" }),
  country: z.string().min(2, { message: "Must be at least 2 characters" }),
  code: z.string().min(2, { message: "Must be at least 2 characters" }),
  phoneNumber: z.string().min(2, { message: "Must be at least 2 characters" }),
  email: z.string().email({ message: "Must be a valid email" }),
});

export function AirportForm() {
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
      name: "",
      city: "",
      country: "",
      code: "",
      phoneNumber: "",
      email: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        try {
          const data = await Services.airport.getById(id);
          if (data) form.reset(data);
        } catch (error) {
          setError("Failed to load airport data");
        }
      };
      fetchData();
    }
  }, [id, mode, Services.airport]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await Services.airport.createAirport(values);
        navigate("/airports");
      } else {
        await Services.airport.updateById(id, values);
        navigate("/airports");
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

        {["name", "city", "country", "code", "phoneNumber", "email"].map((field) => (
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
          ) : mode === "create" ? "Create Airport" : "Update Airport"}
        </Button>
      </form>
    </Form>
  );
}