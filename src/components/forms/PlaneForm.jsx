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
  model: z.string().min(2),
  manufacturer: z.string().min(2),
  capacity: z.number().int().positive(),
  registrationNumber: z.string().min(2),
  status: z.string().min(2),
});

export function PlaneForm() {
  const { id } = useParams();
  const location = useLocation();
  const mode = location.pathname.includes("edit") ? "update" : "create";

  const Services = useAppService();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      manufacturer: "",
      capacity: "",
      registrationNumber: "",
      yearOfManufacture: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const data = await Services.plane.getById(id);
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
      await Services.plane.createPlane(values);
      Navigate("/planes");
    } else {
      await Services.plane.updateById(id, values);
      Navigate("/planes");
    }
    
  };

  return (
    <Form {...form}>
      <form  className="space-y-6">
        {[ "model", "manufacturer", "capacity", "registrationNumber", "yearOfManufacture"].map((fieldName) => (
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
        <Button type="submit" onSubmit={form.handleSubmit(onSubmit)}>{mode === "create" ? "Create" : "Update"}</Button>
      </form>
    </Form>
  );
}
