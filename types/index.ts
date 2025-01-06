export interface Item {
  name: string;
  price: number;
  address: string;
  image: string;
  tags: string[];
  cost_option: "cheap" | "moderate" | "high";
  description: string;
}

export interface TravelData {
  result: {
    all_hotels: {
      stay_hotels: Item[];
      eatery_hotels: Item[];
    };
    all_places: Item[];
    all_transportation: Item[];
  };
}
