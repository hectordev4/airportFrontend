"use client"

import { useEffect } from "react"
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
import { usePageService } from "@/hooks/usePageService" // Custom hook for dynamic services

const formSchema = z.object({
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  manufacturer: z.string().min(2, {
    message: "Manufacturer must be at least 2 characters.",
  }),
  registrationNumber: z.string().min(2, {
    message: "Registration Number must be at least 2 characters.",
  }),
  yearOfManufacture: z.number().min(1900, {
    message: "Year of Manufacture must be a valid year.",
  }),
})

export function PlaneForm({ mode = "create", id }) {
  const { services, methodSuffix } = usePageService()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      manufacturer: "",
      registrationNumber: "",
      yearOfManufacture: "",
    },
  })

  // Load data for update mode
  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const data = await services.aircraft[`get${methodSuffix}`](id)
        if (data) {
          form.reset(data) // Pre-fill the form with data
        }
      }
      fetchData()
    }
  }, [id, mode])

  const onSubmit = async (values) => {
    if (mode === "create") {
      await services.aircraft[`create${methodSuffix}`](values)
    } else {
      await services.aircraft[`update${methodSuffix}`](id, values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {["model", "manufacturer", "registrationNumber", "yearOfManufacture"].map((fieldName) => (
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
        <Button type="submit">{mode === "create" ? "Create" : "Update"}</Button>
      </form>
    </Form>
  )
}
