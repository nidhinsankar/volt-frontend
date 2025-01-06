"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Share2, Star, Wallet } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
const hotels = [
  {
    name: "The Leela Palace Chennai",
    address:
      "81, G.O.C. Club Rd, MRC Nagar, Nungambakkam, Chennai, Tamil Nadu 600034, India",
    price: "10000-15000 INR",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "ITC Grand Chola",
    address:
      "68, Mahatma Gandhi Rd, Temple Bar, Nungambakkam, Chennai, Tamil Nadu 600034, India",
    price: "8000-12000 INR",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Taj Coromandel",
    address:
      "No 37, San Thome High Rd, Santhome, Mylapore, Chennai, Tamil Nadu 600004, India",
    price: "7000-10000 INR",
    rating: 4.4,
    image: "/placeholder.svg?height=300&width=400",
  },
];

const places = [
  {
    name: "Marina Beach",
    description: "Chennai's famous urban beach, great for a morning walk",
    duration: "1-2 hours",
    timeOfDay: "Morning",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Kapaleeshwarar Temple",
    description: "Ancient Hindu temple with Dravidian architecture",
    duration: "1-2 hours",
    timeOfDay: "Morning",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Government Museum",
    description: "Museum displaying South Indian art and artifacts",
    duration: "2-3 hours",
    timeOfDay: "Morning",
    image: "/placeholder.svg?height=200&width=200",
  },
];
const TripPlan = () => {
  return (
    <main className="container mx-auto px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Chennai cityscape"
            width={1200}
            height={400}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Chennai, India
            </h1>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                1-Day Trip
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Wallet className="w-4 h-4" />
                Moderate Budget
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                👥 2 People
              </Badge>
            </div>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Hotel Recommendations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Hotel Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{hotel.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-500 flex items-start gap-1">
                      <MapPin className="w-4 h-4 shrink-0 mt-1" />
                      {hotel.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">💵 {hotel.price}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{hotel.rating} stars</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Places to Visit */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Places to Visit</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Day 1</h3>
              <div className="text-orange-500 font-medium mb-4">Morning</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {places.map((place, index) => (
                  <motion.div
                    key={place.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="flex overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative w-32 shrink-0">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{place.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {place.description}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {place.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
};

export default TripPlan;
