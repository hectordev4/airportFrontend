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
  model: z.string().min(2, { message: "Model must be at least 2 characters" }),
  manufacturer: z.string().min(2, { message: "Manufacturer must be at least 2 characters" }),
  capacity: z.coerce.number().int().positive({ message: "Must be a positive integer" }),
  registrationNumber: z.string().min(2, { message: "Registration number must be at least 2 characters" }),
  yearOfManufacture: z.string().min(4, { message: "Must be a valid year" }),
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
      model: "",
      manufacturer: "",
      capacity: 0,
      registrationNumber: "",
      yearOfManufacture: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        try {
          const data = await Services.plane.getById(id);
          if (data) form.reset(data);
        } catch (error) {
          setError("Failed to load plane data");
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
        navigate("/planes");
      } else {
        await Services.plane.updateById(id, values);
        navigate("/planes");
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

        {["model", "manufacturer", "capacity", "registrationNumber", "yearOfManufacture"].map((field) => (
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
                    type={field === "capacity" ? "number" : "text"}
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
          ) : mode === "create" ? "Create Plane" : "Update Plane"}
        </Button>
      </form>
    </Form>
  );
}