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
  info: any;
  setTravelData: (data: TravelData) => void;
  setInfoData: (data: any) => void;
}

const useTravelStore = create<TravelStore>((set) => ({
  travelData: null,
  info: null,
  setTravelData: (data) => set({ travelData: data }),
  setInfoData: (data) => set({ info: data }),
}));

export default useTravelStore;
