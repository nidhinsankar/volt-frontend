"use client";

import Image from "next/image";
import { ItemCard } from "./common/ui-card";
import useTravelStore from "@/lib/store";
import tripImage from "@/app/assets/trip-image.jpg";

export default function TripResult() {
  const { travelData: data, info } = useTravelStore();

  return (
    <div>
      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={tripImage.src}
          alt="Destination Hero"
          className="object-cover"
          fill
          priority
        />
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6 capitalize">
            {info?.location}
          </h1>
          <div className="flex gap-4 flex-wrap">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100">
              📅 {info?.days || "-1 Day"}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100">
              💰 {info?.budget || "Moderate Budget"}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100">
              👥 {info?.people || "No. of traveler: 2 People"}
            </span>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-6 my-10 mx-auto py-8 px-4 mt-10">
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6">Hotel Recommandation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.result?.all_hotels?.map((hotel: any, index: any) => (
              <ItemCard key={index} item={hotel} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data?.result?.all_hotels?.map((eatery: any, index: any) => (
              <ItemCard key={index} item={eatery} />
            ))}
          </div>
        </div>
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6">Places Recommandation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.result?.all_places?.map((place: any, index: any) => (
              <ItemCard key={index} item={place} />
            ))}
          </div>
        </div>

        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6">
            Recommanded mode of transportation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.result?.all_transportation?.map(
              (transport: any, index: any) => (
                <ItemCard key={index} item={transport} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
