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

export interface DetailPoint {
  title: string;
  description: string;
  meta?: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  review: string;
}

export interface DestinationDetail {
  travelBy: DetailPoint[];
  hotels: DetailPoint[];
  hiddenPlaces: DetailPoint[];
  reviews: ReviewItem[];
  bestTimeToVisit: string;
  speciality: string;
  history: string;
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
  details?: DestinationDetail;
}
