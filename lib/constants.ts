import { User, Heart, HomeIcon, Users } from "lucide-react";
export const budgetOptions = [
  {
    id: "cheap",
    label: "Cheap",
    description: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: "moderate",
    label: "Moderate",
    description: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: "expensive",
    label: "Expensive",
    description: "Money is not a concern",
    icon: "💎",
  },
];

export const companionOptions = [
  {
    id: "solo",
    label: "Just Me",
    description: "A sole travels in exploration",
    icon: User,
  },
  {
    id: "couple",
    label: "A Couple",
    description: "Two travels in tandem",
    icon: Heart,
  },
  {
    id: "family",
    label: "Family",
    description: "A group of fun loving adventurers",
    icon: HomeIcon,
  },
  {
    id: "friends",
    label: "Friends",
    description: "A group of friends on a trip",
    icon: Users,
  },
];
