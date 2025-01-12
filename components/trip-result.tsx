"use client";

import { ItemCard } from "./common/ui-card";
import useTravelStore from "@/lib/store";

export default function TripResult() {
  const { travelData: data } = useTravelStore();
  console.log("trip", data);

  return (
    <div className="container flex flex-col gap-6 my-10 mx-auto py-8 px-4 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        cdv
        {data?.result?.all_hotels?.map((hotel: any, index: any) => (
          <ItemCard key={index} item={hotel} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.result?.all_hotels?.map((eatery: any, index: any) => (
          <ItemCard key={index} item={eatery} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.result?.all_places?.map((place: any, index: any) => (
          <ItemCard key={index} item={place} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.result?.all_transportation?.map((transport: any, index: any) => (
          <ItemCard key={index} item={transport} />
        ))}
      </div>
    </div>
  );
}
