import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useAppService } from "@/context/AppServiceContext";

const formSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  code: z.string().min(2),
  phoneNumber: z.string().min(2),
  email: z.string().email(),
});

export function AirportForm() {
  const { id } = useParams();
  const location = useLocation();
  const mode = location.pathname.includes("edit") ? "update" : "create";

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
        const data = await Services.airport.getById(id);
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
      await Services.airport.createAirport(values);
    } else {
      await Services.airport.updateAirport(id, values);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {["name", "city", "country", "code", "phoneNumber", "email"].map((fieldName) => (
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
