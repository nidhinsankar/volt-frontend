"use client";
import { GET_ALL_TRIPS } from "@/lib/graphql";
import { useQuery } from "@apollo/client";
import { ItemCard } from "./ui-card";

const TripLast = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRIPS);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error loading trips: {error.message}</p>;

  return (
    <div>
      <h2>Available Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {data.allTrip.map((trip: any) => (
          <ItemCard key={trip?.name} item={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripLast;
