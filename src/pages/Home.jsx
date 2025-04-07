import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center my-12"
      >
        <h1 className="text-4xl font-bold mb-2">Explore the World with Us</h1>
        <p className="text-lg text-gray-600">Book your next flight easily and quickly</p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-5"
      >
        <Input placeholder="From (e.g. JFK)" className="col-span-1" />
        <Input placeholder="To (e.g. LAX)" className="col-span-1" />
        <div className="md:col-span-2 col-span-1 w-full flex justify-center items-center">

            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border w-full" />

        </div>
        <Button className="col-span-1 w-full">Search Flights</Button>
      </motion.div>

      {/* Featured Destinations */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { city: "Paris", image: "🇫🇷" },
            { city: "Tokyo", image: "🇯🇵" },
            { city: "New York", image: "🇺🇸" },
          ].map((dest, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{dest.image} {dest.city}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Discover amazing flights and deals to {dest.city}.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20">
        <h3 className="text-xl font-medium mb-2">Ready to take off?</h3>
        <Button className="text-lg px-6 py-3">Book Now</Button>
      </div>
    </div>
  );
}
