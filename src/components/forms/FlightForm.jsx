import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePageService } from "@/hooks/usePageService"

const formSchema = z.object({
  flightNumber: z.string().min(1, {
    message: "Flight number is required",
  }),
  departureTime: z.string().min(1, {
    message: "Departure time is required",
  }),
  arrivalTime: z.string().min(1, {
    message: "Arrival time is required",
  }),
  status: z.string().min(1, {
    message: "Status is required",
  }),
  departureAirport: z.object({
    code: z.string().min(1, {
      message: "Departure airport code is required",
    }),
    name: z.string().min(1, {
      message: "Departure airport name is required",
    }),
  }),
  arrivalAirport: z.object({
    code: z.string().min(1, {
      message: "Arrival airport code is required",
    }),
  }),
  plane: z.string().min(1, {
    message: "Plane is required",
  }),
})

export function FlightForm() {
  const { id } = useParams()
  const location = useLocation()
  const mode = location.pathname.includes("edit") ? "update" : "create"

  const { services, methodSuffix } = usePageService()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: "",
      departureTime: "",
      arrivalTime: "",
      status: "",
      departureAirport: {
        code: "",
        name: "",
      },
      arrivalAirport: {
        code: "",
      },
      plane: "",
    },
  })

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const data = await services.location[`get${methodSuffix}`](id)
        if (data) {
          form.reset(data)
        }
      }
      fetchData()
    }
  }, [id, mode])

  const onSubmit = async (values) => {
    if (mode === "create") {
      await services.location[`create${methodSuffix}`](values)
    } else {
      await services.location[`update${methodSuffix}`](id, values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {["flightNumber", "departureTime", "arrivalTime", "status"].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldName.replace(/([A-Z])/g, " $1")}</FormLabel>
                <FormControl>
                  <Input placeholder={fieldName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="departureAirport.code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Airport Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departureAirport.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Airport Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalAirport.code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Airport Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plane"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plane</FormLabel>
              <FormControl>
                <Input placeholder="Plane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{mode === "create" ? "Create" : "Update"}</Button>
      </form>
    </Form>
  )
}
