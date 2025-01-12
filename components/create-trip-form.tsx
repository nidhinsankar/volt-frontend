"use client";

import {
  Heart,
  HomeIcon,
  Plane,
  Timer,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_CONTENT, GET_TRIP_PLAN_QUERY } from "@/lib/graphql";
import { parseClean } from "@/lib/utils";
import TripResult from "./trip-result";
import data from "@/data.json";
import { budgetOptions, companionOptions } from "@/lib/constants";
import useTravelStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const CreateTripForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setTravelData } = useTravelStore();
  const [error, setError] = useState<null | string>("");
  const [tripResult, setTripResult] = useState({});
  const [formData, setFormData] = useState({
    location: "",
    days: "",
    selectedBudget: "",
    selectedCompanions: "",
    people: "2", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle card selections
  const handleBudgetSelection = (budgetId: any) => {
    setFormData((prev) => ({
      ...prev,
      selectedBudget: budgetId,
    }));
  };

  const handleCompanionSelection = (companionId: any) => {
    setFormData((prev) => ({
      ...prev,
      selectedCompanions: companionId,
      // Update number of people based on companion selection
      people:
        companionId === "solo"
          ? "1"
          : companionId === "couple"
          ? "2"
          : companionId === "family"
          ? "4"
          : "3",
    }));
  };

  // Use lazy query instead of useQuery to manually trigger it
  const [getTripPlan, { loading }] = useLazyQuery(GET_TRIP_PLAN_QUERY, {
    onCompleted: async (data) => {
      try {
        const parsedResult = JSON.parse(parseClean(data.generateTripPlan));
        setTripResult(parsedResult);
        setTravelData(parsedResult);
        console.log("data=>", data.generateTripPlan);
        toast({
          title: "Trip Plan",
          description: "Generating the Trip Plan Contents",
        });

        // Add the data to database before navigation
        try {
          setIsSubmitting(true);
          const { results, errors } = await handleAddAllContent(parsedResult);

          if (errors.length > 0) {
            console.error("Some items failed to add:", errors);
            // Optionally set an error state or show a notification
          }

          console.log("results", results);

          // Navigate only after database operations are complete
          setIsSubmitting(false);
          setError(null);
          toast({
            title: "Trip Plan Generated",
            description: "Generated the Trip Plan Contents Successfully",
          });
          router.push(`/trip-plan/${formData.location}`);
        } catch (err) {
          setError("Error adding content to database");
          setIsSubmitting(false);
          toast({
            title: "Trip Plan Failed",
            description: "Generating the Contents Faile.Try Again",
          });
        }
      } catch (err) {
        setError("Error processing trip plan data");
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      setError(error.message || "Error generating trip plan");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    // Validate form data before submission
    const validateForm = () => {
      const errors = [];
      if (!formData.location.trim()) errors.push("Location is required");
      if (!formData.days || parseInt(formData.days) < 1)
        errors.push("Valid number of days is required");
      if (!formData.selectedBudget)
        errors.push("Please select a budget option");
      if (!formData.selectedCompanions)
        errors.push("Please select who you're traveling with");

      return errors;
    };

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsSubmitting(true);

    // Prepare variables for the query
    const variables = {
      location: formData.location,
      days: formData.days,
      people: formData.people,
    };

    toast({
      description: "Generating the Trip Plan Contents",
    });

    try {
      // Execute the query
      await getTripPlan({
        variables: variables,
      });
    } catch (err) {
      setError("Failed to submit trip plan request");
      setIsSubmitting(false);
    }
  };

  console.log("parse", tripResult);

  const [
    addContent,
    { data, loading: addContentLoading, error: addContentError },
  ] = useMutation(ADD_CONTENT);

  const handleAddContent = async (contentItem: any) => {
    try {
      const response = await addContent({
        variables: {
          content: {
            id: `${contentItem?.name}-${contentItem?.price}`,
            name: contentItem.name,
            price: String(contentItem.price), // Ensure price is a number
            address: contentItem.address,
            image: contentItem.image,
            type: contentItem.type,
            tags: contentItem.tags,
            cost_option: contentItem.cost_option,
            description: contentItem.description,
          },
        },
      });
      console.log("Content added successfully:", response.data.addContent);
      return response.data.addContent;
    } catch (err) {
      console.error("Error adding content:", err);
      throw err;
    }
  };
  const handleAddAllContent = async (tripResult: any) => {
    const results = [];
    const errors = [];
    console.log("handleAddAllContent");

    if (!tripResult?.result) {
      throw new Error("No trip result data available");
    }
    const all_data = {
      all_hotels: tripResult?.result?.all_hotels || [],
      all_places: tripResult?.result?.all_places || [],
      all_transportation: tripResult?.result?.all_transportation || [],
    };

    for (const [category, items] of Object.entries(all_data)) {
      for (const item of items) {
        try {
          const result = await handleAddContent(item);
          results.push(result);
        } catch (err) {
          errors.push({ item: item, error: err });
        }
      }
    }

    // Return results and errors for handling by parent component
    return { results, errors };
  };
  return (
    <div>
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Share Your Travel Preferences and Let Us Curate Your Perfect
              Journey! 🌴⛺
            </h1>
            <p className="text-gray-600 text-lg">
              Simply provide some basic details, and our trip planner will craft
              a personalized itinerary tailored to your preferences
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination Input */}
            <div className="space-y-4">
              <label className="text-lg font-medium flex items-center gap-2">
                <Plane className="w-5 h-5" />
                What is destination of your choice?
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ex. Mumbai,India"
                className="h-12 text-lg"
                required
              />
            </div>

            {/* Duration Input */}
            <div className="space-y-4">
              <label className="text-lg font-medium flex items-center gap-2">
                <Timer className="w-5 h-5" />
                How many days are you planning your trip?
              </label>
              <Input
                name="days"
                type="number"
                value={formData.days}
                onChange={handleInputChange}
                placeholder="Ex. 2"
                className="h-12 text-lg"
                min="1"
                required
              />
            </div>

            {/* Budget Selection */}
            <div className="space-y-4">
              <label className="text-lg font-medium flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                What is your Budget?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.selectedBudget === option.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleBudgetSelection(option.id)}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="text-2xl">{option.icon}</div>
                      <h3 className="font-semibold">{option.label}</h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Companions Selection */}
            <div className="space-y-4">
              <label className="text-lg font-medium">
                Who do you plan on traveling with on your next adventure?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companionOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.selectedCompanions === option.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleCompanionSelection(option.id)}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="text-primary">
                        <option.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">{option.label}</h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-medium bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 group"
                disabled={
                  !formData.location ||
                  !formData.days ||
                  !formData.selectedBudget ||
                  !formData.selectedCompanions
                }
              >
                Generate Trip
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateTripForm;
