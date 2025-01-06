import { Calendar, Wallet } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const TripCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Chennai,India</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Chennai cityscape"
          width={1200}
          height={400}
          className="w-full object-cover bg-red-200"
        />
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
      </CardContent>
    </Card>
  );
};

export default TripCard;
