// types.ts
export interface BaseItem {
  name: string;
  price: number;
  address: string;
  image: string;
  tags: string[];
  cost_option: "cheap" | "moderate" | "costly";
  description: string;
}

export interface TravelData {
  result: {
    all_hotels: BaseItem[];
    all_places: BaseItem[];
    all_transportation: BaseItem[];
  };
}

// store/useTravelStore.ts
import { create } from "zustand";

interface TravelStore {
  travelData: TravelData | null;
  setTravelData: (data: TravelData) => void;
}

const useTravelStore = create<TravelStore>((set) => ({
  travelData: null,
  setTravelData: (data) => set({ travelData: data }),
}));

export default useTravelStore;
