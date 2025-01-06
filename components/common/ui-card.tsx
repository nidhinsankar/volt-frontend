import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, IndianRupee, MapPin, Star, Tag } from "lucide-react";
import { Item } from "@/types";
// import { Hotel, Place, Transportation } from "@/types";

interface HotelCardProps {
  hotel: any;
  category: string;
}

export function HotelCard({ hotel, category }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-48">
        <img src={hotel.image} alt={hotel.name} className="object-cover" />
        <Badge
          className="absolute top-2 right-2 capitalize"
          variant={
            category === "cheap"
              ? "default"
              : category === "moderate"
              ? "secondary"
              : "destructive"
          }
        >
          {category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{hotel.name}</span>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{hotel.rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {hotel.location}
        </div>
        <p className="text-lg font-semibold">
          ₹{hotel.price.toLocaleString("en-IN")}/night
        </p>
      </CardContent>
    </Card>
  );
}

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-48">
        <img src={item.image} alt={item.name} className="object-cover" />
        <Badge
          className="absolute top-2 right-2 capitalize"
          variant={
            item.cost_option === "cheap"
              ? "default"
              : item.cost_option === "moderate"
              ? "secondary"
              : "destructive"
          }
        >
          {item.cost_option}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{item.address}</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <IndianRupee className="h-4 w-4" />
          {item.price === 0 ? "Free" : item.price.toLocaleString("en-IN")}
        </div>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag: any, index: any) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface PlaceCardProps {
  place: any;
  category: string;
}

export function PlaceCard({ place, category }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-48">
        <img src={place.image} alt={place.name} className="object-cover" />
        <Badge
          className="absolute top-2 right-2 capitalize"
          variant={
            category === "cheap"
              ? "default"
              : category === "moderate"
              ? "secondary"
              : "destructive"
          }
        >
          {category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{place.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {place.location}
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <IndianRupee className="h-4 w-4" />
          {place.price === 0
            ? "Free Entry"
            : `${place.price.toLocaleString("en-IN")}`}
        </div>
      </CardContent>
    </Card>
  );
}

interface TransportCardProps {
  transport: any;
  type: string;
}

export function TransportCard({ transport, type }: TransportCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="capitalize">{type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="font-medium">{transport.from}</p>
          </div>
          <div className="text-2xl">→</div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-muted-foreground">To</p>
            <p className="font-medium">{transport.to}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{transport.duration}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <IndianRupee className="h-4 w-4" />
            {transport.price.toLocaleString("en-IN")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
