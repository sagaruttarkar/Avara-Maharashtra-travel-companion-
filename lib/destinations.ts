import type { Destination } from "./types";

// Curated demo data only. Replace/expand with researched, licensed and verified records.
// Budget values are broad planning estimates, not live quotes or guaranteed trip prices.
export const destinations: Destination[] = [
  {
    id: "lonavala",
    name: "Lonavala & Khandala",
    district: "Pune",
    description: "A convenient hill escape with viewpoints, forts and seasonal waterfalls.",
    moods: ["peaceful", "adventure", "family"],
    minDays: 1, maxDays: 3, indicativeBudgetPerPerson: 3200,
    origins: ["Mumbai", "Pune"],
    tags: ["Hill station", "Viewpoints", "Weekend escape"],
    bestFor: "A short, flexible getaway",
    budgetNote: "Costs vary significantly by resort, season and transport.",
    seasonNote: "Monsoon scenery is popular; check local safety advisories around waterfalls and forts."
  },
  {
    id: "alibaug",
    name: "Alibaug",
    district: "Raigad",
    description: "Coastal downtime, beaches, forts and relaxed stays near Mumbai.",
    moods: ["peaceful", "beach", "family", "party"],
    minDays: 2, maxDays: 3, indicativeBudgetPerPerson: 4200,
    origins: ["Mumbai", "Pune"],
    tags: ["Beach", "Coastal food", "Forts"],
    bestFor: "Friends, couples and relaxed beach time",
    budgetNote: "Ferry, road transfer and accommodation choices affect the total.",
    seasonNote: "Check sea conditions and ferry operations before travelling."
  },
  {
    id: "matheran",
    name: "Matheran",
    district: "Raigad",
    description: "A vehicle-restricted hill town known for walking trails and viewpoints.",
    moods: ["peaceful", "adventure", "family"],
    minDays: 1, maxDays: 2, indicativeBudgetPerPerson: 2800,
    origins: ["Mumbai", "Pune"],
    tags: ["Walking", "Nature", "Viewpoints"],
    bestFor: "Slow travel and a car-free hill experience",
    budgetNote: "Local transport and stay category change the budget.",
    seasonNote: "Trail and toy-train operations can be seasonal; verify before departure."
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar & Panchgani",
    district: "Satara",
    description: "Cooler hill-country scenery, viewpoints, farms and family-friendly sightseeing.",
    moods: ["peaceful", "family", "shopping", "adventure"],
    minDays: 2, maxDays: 4, indicativeBudgetPerPerson: 5200,
    origins: ["Mumbai", "Pune"],
    tags: ["Hill station", "Strawberries", "Viewpoints"],
    bestFor: "A two- or three-day hill holiday",
    budgetNote: "Accommodation and private sightseeing transport are major cost drivers.",
    seasonNote: "Winter and post-monsoon are popular; verify weather and road conditions."
  },
  {
    id: "kolad",
    name: "Kolad",
    district: "Raigad",
    description: "A river-and-countryside destination known for outdoor adventure camps.",
    moods: ["adventure", "family"],
    minDays: 2, maxDays: 2, indicativeBudgetPerPerson: 3900,
    origins: ["Mumbai", "Pune"],
    tags: ["River", "Adventure", "Camping"],
    bestFor: "An activity-led friends or family trip",
    budgetNote: "Package inclusions, activity operator and season affect pricing.",
    seasonNote: "Water activities depend on river conditions and operator safety decisions."
  },
  {
    id: "nashik",
    name: "Nashik",
    district: "Nashik",
    description: "A mix of heritage, temples, food, markets and vineyard experiences.",
    moods: ["culture", "shopping", "peaceful", "family"],
    minDays: 2, maxDays: 3, indicativeBudgetPerPerson: 4300,
    origins: ["Mumbai", "Pune"],
    tags: ["Culture", "Food", "Markets", "Vineyards"],
    bestFor: "A varied city break with food and culture",
    budgetNote: "Experiences and accommodation determine the final spend.",
    seasonNote: "Check individual venue schedules and advance booking requirements."
  },
  {
    id: "ganpatipule",
    name: "Ganpatipule",
    district: "Ratnagiri",
    description: "A Konkan coastal break with beaches, temple visits and scenic drives.",
    moods: ["peaceful", "beach", "family"],
    minDays: 3, maxDays: 4, indicativeBudgetPerPerson: 6500,
    origins: ["Mumbai", "Pune"],
    tags: ["Konkan", "Beach", "Temple", "Scenic drive"],
    bestFor: "A longer coastal weekend",
    budgetNote: "Long-distance travel and stay selection drive the budget.",
    seasonNote: "Check monsoon road and sea conditions before travelling."
  },
  {
    id: "tarkarli",
    name: "Tarkarli & Malvan",
    district: "Sindhudurg",
    description: "Clear-water coastal scenery, local Malvani food and water-based experiences.",
    moods: ["beach", "adventure", "peaceful"],
    minDays: 3, maxDays: 5, indicativeBudgetPerPerson: 7500,
    origins: ["Mumbai", "Pune"],
    tags: ["Beach", "Snorkelling", "Malvani food"],
    bestFor: "A longer beach holiday",
    budgetNote: "Travel mode, activity availability and accommodation affect cost.",
    seasonNote: "Water activities are weather-dependent; confirm operator and sea conditions."
  }
];
