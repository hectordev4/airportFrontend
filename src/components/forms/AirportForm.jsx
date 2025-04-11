import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { useAppService } from "@/context/AppServiceContext";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }),
  phoneNumber: z.string().min(2, { message: "Phone number must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
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
          setError("Failed to load airport data. Please try again later.");
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
        form.reset();
        navigate("/airports");
      } else {
        await Services.airport.updateById(id, values);
        navigate("/airports");
      }
    } catch (error) {
      setError(error.message || "There was an error submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm py-2 px-3 rounded-md bg-red-50">
            {error}
          </div>
        )}
        
        {["name", "city", "country", "code", "phoneNumber", "email"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {field.name.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`Enter ${field}`} 
                    {...field} 
                    disabled={isSubmitting}
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
          ) : (
            mode === "create" ? "Create Airport" : "Update Airport"
          )}
        </Button>
      </form>
    </Form>
  );
}