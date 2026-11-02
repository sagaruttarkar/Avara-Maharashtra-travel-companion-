import { destinations } from "./destinations";
import type { Destination, TripPreferences } from "./types";

export interface RankedDestination extends Destination {
  score: number;
  reasons: string[];
}

export function recommendDestinations(input: TripPreferences): RankedDestination[] {
  const origin = input.origin.trim().toLowerCase();

  return destinations
    .map((destination) => {
      let score = 0;
      const reasons: string[] = [];

      if (destination.moods.includes(input.mood)) {
        score += 5;
        reasons.push(`Matches your ${input.mood.replace("-", " ")} travel mood`);
      }

      if (input.days >= destination.minDays && input.days <= destination.maxDays) {
        score += 4;
        reasons.push(`Fits your ${input.days}-day time window`);
      } else if (input.days >= destination.minDays - 1 && input.days <= destination.maxDays + 1) {
        score += 1;
        reasons.push("Could work with a slightly adjusted schedule");
      }

      if (destination.origins.some((place) => origin.includes(place.toLowerCase()))) {
        score += 2;
        reasons.push(`Included in the initial ${input.origin} launch shortlist`);
      }

      if (destination.indicativeBudgetPerPerson * input.people <= input.budget) {
        score += 3;
        reasons.push("Indicative per-person budget is within your total budget");
      } else if (destination.indicativeBudgetPerPerson <= input.budget) {
        score += 1;
        reasons.push("May fit if the budget is per person or shared costs are optimized");
      }

      return { ...destination, score, reasons };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.indicativeBudgetPerPerson - b.indicativeBudgetPerPerson)
    .slice(0, 5);
}
