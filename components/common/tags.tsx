"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_TRIPS,
  GET_ALL_TAGS,
  GET_TRIP_BY_TAG,
  GET_TRIP_BY_TYPE,
} from "@/lib/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCcw, X, MapPin, DollarSign } from "lucide-react";
import { ItemCard } from "./ui-card";
import { motion } from "framer-motion";

const TripsDisplay = () => {
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  // Query for all tags
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(GET_ALL_TAGS);

  // Query for trips based on active filter
  const {
    loading: tripsLoading,
    error: tripsError,
    data: tripsData,
    refetch: tripsRefetch,
  } = useQuery(
    activeFilter.type === "tag"
      ? GET_TRIP_BY_TAG
      : activeFilter.type === "type"
      ? GET_TRIP_BY_TYPE
      : GET_ALL_TRIPS,
    {
      variables: activeFilter.value
        ? { [activeFilter.type!]: activeFilter.value }
        : undefined,
    }
  );

  console.log("data", tripsData);

  const handleFilterClick = (type: any, value: any) => {
    if (activeFilter.type === type && activeFilter.value === value) {
      setActiveFilter({ type: null, value: null });
    } else {
      setActiveFilter({ type, value });
    }
  };

  const clearFilter = () => {
    setActiveFilter({ type: null, value: null });
  };

  const renderTags = () => {
    if (tagsLoading) {
      return (
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      );
    }

    if (tagsError) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load tags</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {tagsData?.allTags.map((tag: any) => (
          <Badge
            key={tag}
            variant={
              activeFilter.type === "tag" && activeFilter.value === tag
                ? "default"
                : "secondary"
            }
            className="cursor-pointer hover:bg-secondary-hover"
            onClick={() => handleFilterClick("tag", tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    );
  };

  const renderTrips = () => {
    if (tripsLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (tripsError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load trips: {tripsError.message}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => tripsRefetch()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    const trips =
      activeFilter.type === "tag"
        ? tripsData?.tripByTag
        : activeFilter.type === "type"
        ? tripsData?.tripByType
        : tripsData?.allTrip;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips?.map((trip: any) => (
          <ItemCard item={trip} />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Available Trips</CardTitle>
          {activeFilter.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-1"
            >
              <span className="text-sm">
                {activeFilter.type}: {activeFilter.value}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilter}
                className="h-6 w-6 p-0 rounded-full hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
        {renderTags()}
      </CardHeader>
      <CardContent>{renderTrips()}</CardContent>
    </Card>
  );
};

export default TripsDisplay;

{
  /* <Card key={trip.id} className="overflow-hidden">
            <img
              // src={TripImage.src}
              onError={(e) => {
                e.currentTarget.src = TripImage.src;
              }}
              width={100}
              height={100}
              src={trip.image}
              alt={trip.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{trip.name}</h3>
                <Badge
                  variant={
                    trip.cost_option === "High"
                      ? "destructive"
                      : trip.cost_option === "Gtgteg"
                      ? "default"
                      : "secondary"
                  }
                >
                  {trip.cost_option}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {trip.address}
              </div>
              <div className="flex items-center text-sm font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {trip.price}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {trip.tags.map((tag: any) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card> */
}

//

// import { GET_ALL_TAGS } from "@/lib/graphql";
// import { useQuery } from "@apollo/client";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle, RefreshCcw } from "lucide-react";

// const Tags = () => {
//   const { loading, error, data, refetch } = useQuery(GET_ALL_TAGS);

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="flex flex-wrap gap-2">
//           {[...Array(5)].map((_, index) => (
//             <Skeleton key={index} className="h-6 w-16 rounded-full" />
//           ))}
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             Failed to load tags: {error.message}
//             <Button
//               variant="outline"
//               size="sm"
//               className="mt-2"
//               onClick={() => refetch()}
//             >
//               <RefreshCcw className="mr-2 h-4 w-4" />
//               Retry
//             </Button>
//           </AlertDescription>
//         </Alert>
//       );
//     }

//     return (
//       <div className="flex flex-wrap gap-2">
//         {data.allTags.map((tag: string) => (
//           <Badge key={tag} variant="secondary">
//             {tag}
//           </Badge>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle>Tags</CardTitle>
//       </CardHeader>
//       <CardContent>{renderContent()}</CardContent>
//     </Card>
//   );
// };

// export default Tags;
