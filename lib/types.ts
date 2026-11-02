export type TravelMood =
  | "peaceful"
  | "adventure"
  | "beach"
  | "culture"
  | "family"
  | "party"
  | "shopping";

export type TransportMode = "own-car" | "public-transport" | "bike" | "not-decided";

export interface TripPreferences {
  origin: string;
  people: number;
  days: number;
  budget: number;
  mood: TravelMood;
  transport: TransportMode;
}

export interface Destination {
  id: string;
  name: string;
  district: string;
  description: string;
  moods: TravelMood[];
  minDays: number;
  maxDays: number;
  indicativeBudgetPerPerson: number;
  origins: string[];
  tags: string[];
  bestFor: string;
  budgetNote: string;
  seasonNote: string;
}
