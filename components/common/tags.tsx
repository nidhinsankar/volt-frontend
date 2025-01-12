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
import { Input } from "../ui/input";
import { TagCloud } from "./tag-cloud";

const TripsDisplay = () => {
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });
  const [searchQuery, setSearchQuery] = useState("");
  // Query for all tags
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
    refetch: tagsRefetch,
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
  const filterTrips = (trips: any) => {
    if (!trips) return [];
    return trips.filter((trip: any) =>
      trip.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={tagsRefetch}
          >
            Retry
          </Button>
          <AlertDescription>Failed to load tags</AlertDescription>
        </Alert>
      );
    }

    return (
      <TagCloud
        tags={tagsData?.allTags || []}
        activeTag={
          activeFilter.type === "tag" ? activeFilter?.value : undefined
        }
        onTagClick={(tag) => handleFilterClick("tag", tag)}
      />
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

    const filteredTrips = filterTrips(trips);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrips?.map((trip: any) => (
          <ItemCard key={trip?.id} item={trip} />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="space-y-4">
        <Input
          placeholder="search places"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <div className="inline-flex justify-end items-end ">
          <a
            href="https://dgraph.io"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2 w-32 px-3 py-1.5 bg-gray-800/90 rounded-lg text-xs text-gray-400 hover:text-gray-300 transition-colors group hover:bg-gray-800/70"
          >
            <span>Search powered by</span>
            <img
              src="https://cdn.prod.website-files.com/63fa3e9d303f20f698270a7a/6634fe57b4ce744214616951_DgraphByHypermode_light.svg"
              alt="Dgraph"
              className="h-3.5 invert opacity-75 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
        <div className="flex items-center justify-between">
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
