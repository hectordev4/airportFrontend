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
  FormMessage
} from "@/components/ui/form";
import { useAppService } from "@/context/AppServiceContext";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  manufacturer: z.string().min(2, {
    message: "Manufacturer must be at least 2 characters.",
  }),
  capacity: z.number({
    invalid_type_error: "Capacity must be a number",
  }).int().positive({
    message: "Capacity must be a positive integer",
  }),
  registrationNumber: z.string().min(2, {
    message: "Registration number must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
});

export function PlaneForm() {
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
      model: "",
      manufacturer: "",
      capacity: 0,
      registrationNumber: "",
      status: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        try {
          const data = await Services.plane.getById(id);
          if (data) {
            // Convert number fields from strings if needed
            const formattedData = {
              ...data,
              capacity: typeof data.capacity === 'string' ? parseInt(data.capacity) : data.capacity
            };
            form.reset(formattedData);
          }
        } catch (error) {
          setError("Failed to load plane data. Please try again later.");
        }
      };
      fetchData();
    }
  }, [id, mode, Services.plane]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await Services.plane.createPlane(values);
        form.reset();
        navigate("/planes");
      } else {
        await Services.plane.updateById(id, values);
        navigate("/planes");
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

        {[
          "name",
          "model", 
          "manufacturer",
          "capacity",
          "registrationNumber",
          "status"
        ].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    {...field}
                    disabled={isSubmitting}
                    type={field === "capacity" ? "number" : "text"}
                    value={field.value}
                    onChange={(e) => {
                      if (field.name === "capacity") {
                        field.onChange(parseInt(e.target.value) || 0);
                      } else {
                        field.onChange(e.target.value);
                      }
                    }}
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
            mode === "create" ? "Create Plane" : "Update Plane"
          )}
        </Button>
      </form>
    </Form>
  );
}