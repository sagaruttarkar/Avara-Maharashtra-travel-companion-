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
    seasonNote: "Monsoon scenery is popular; check local safety advisories around waterfalls and forts.",
    details: {
      travelBy: [
        { title: "By road", description: "Drive from Mumbai or Pune via the Mumbai-Pune Expressway and take the ghat roads into Lonavala. Travel time is usually 2 to 3 hours from Mumbai and around 1.5 hours from Pune.", meta: "Best for couples and families" },
        { title: "By train + cab", description: "Take a local train to Lonavala station and continue with a short cab or auto ride to your stay. A practical option for a low-stress, budget-friendly getaway.", meta: "Easy for quick trips" }
      ],
      hotels: [
        { title: "The Lake Shore", description: "Premium stays with valley views and family-friendly rooms.", meta: "Approx. ₹4,500/night" },
        { title: "Hotel 9 Inn", description: "Comfortable mid-range choice near the town centre with easy access to major viewpoints.", meta: "Approx. ₹2,200/night" },
        { title: "Aamby Valley villas", description: "A more relaxed luxury option for larger groups and quiet scenic stays.", meta: "Approx. ₹6,000+/night" }
      ],
      hiddenPlaces: [
        { title: "Tiger Point", description: "A popular sunrise viewpoint that feels calmer in the early morning hours." },
        { title: "Bhaja Caves", description: "An ancient rock-cut cave site with quiet surroundings and a sense of history." },
        { title: "Karla Caves", description: "A less crowded heritage site with striking carvings and a cool, shaded atmosphere." }
      ],
      reviews: [
        { name: "Riya S.", rating: 5, review: "The drive was smooth, the weather was perfect and the sunset points were amazing for group photos." },
        { name: "Amit P.", rating: 4, review: "We went for a two-day trip and loved the mix of viewpoints and easy food options around the town." }
      ],
      bestTimeToVisit: "October to February for cool weather, or the monsoon for lush green valleys and waterfall views.",
      speciality: "Lonavala is known for its misty hill roads, lush greenery, lush viewpoints, and easy reach from Mumbai and Pune.",
      history: "The area is linked to the historic trade and military routes that passed through the Western Ghats, and it became a popular hill retreat during the British era."
    }
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
    seasonNote: "Check sea conditions and ferry operations before travelling.",
    details: {
      travelBy: [
        { title: "By road", description: "Drive from Mumbai through the coastal route, usually taking 2 to 3 hours depending on traffic and the ferry or port timing. It is a very easy option for a beach weekend.", meta: "Best for family groups" },
        { title: "By ferry + road", description: "Take a ferry from Mumbai if you want a scenic start, then continue by cab or local transport to the beachside stay.", meta: "Scenic and memorable" }
      ],
      hotels: [
        { title: "The Fern Alibaug", description: "A comfortable stay with beach access and a modern family-friendly setup.", meta: "Approx. ₹4,000/night" },
        { title: "Saffron Stays", description: "A boutique option close to beaches and local food spots.", meta: "Approx. ₹2,700/night" },
        { title: "V Resorts Alibaug", description: "Good for groups planning a relaxed beach getaway with easy access to local attractions.", meta: "Approx. ₹3,800/night" }
      ],
      hiddenPlaces: [
        { title: "Kihim Beach", description: "A quieter stretch of shoreline ideal for sunrise walks and relaxed evenings." },
        { title: "Murud Beach", description: "Known for its long coastline and laid-back sandbars away from the busiest tourist spots." },
        { title: "Kolaba Fort", description: "Visit at low tide for a fort walk and views of the sea from a historic structure." }
      ],
      reviews: [
        { name: "Nisha K.", rating: 5, review: "The beach vibe was exactly what we needed. We stayed close to the water and loved the evening drive through Alibaug." },
        { name: "Vikram T.", rating: 4, review: "Great for people who want a relaxed coastal escape without a long travel time from Mumbai." }
      ],
      bestTimeToVisit: "November to February for a cooler and more comfortable beach experience; early monsoon is also scenic.",
      speciality: "Alibaug stands out for its beachside charm, coastal food, short road trips and easy access from Mumbai.",
      history: "Alibaug was historically important as a port and military outpost, and later developed as a popular coastal getaway for people from the city."
    }
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
    seasonNote: "Trail and toy-train operations can be seasonal; verify before departure.",
    details: {
      travelBy: [
        { title: "By road", description: "Travel from Mumbai or Pune to Neral, then take the toy train or a short cab ride up to Matheran. The route is scenic and feels very different from a regular hill drive.", meta: "Best for a quick hill escape" },
        { title: "By train + toy train", description: "Take a train to Neral station and then enjoy the toy train climb to Matheran for a classic, stress-free arrival.", meta: "Popular with families and first-time visitors" }
      ],
      hotels: [
        { title: "Shivaji Palace Hotel", description: "A classic stay option close to the main market and walking routes.", meta: "Approx. ₹2,200/night" },
        { title: "Westend Hotel", description: "Comfortable and mid-range, ideal for travellers who want a simple hill stay near major views.", meta: "Approx. ₹3,100/night" },
        { title: "Matheran Hill Retreat", description: "Known for scenic views and quiet rooms for a more relaxed holiday.", meta: "Approx. ₹4,800/night" }
      ],
      hiddenPlaces: [
        { title: "One Tree Hill", description: "A quiet, elevated viewpoint that is less crowded than some of the more famous sunset points." },
        { title: "Charlotte Lake", description: "A charming lake area great for an easy walk and a slow afternoon break." },
        { title: "Garbut Point", description: "A hidden lookout with a broad valley view and a peaceful atmosphere." }
      ],
      reviews: [
        { name: "Samaira D.", rating: 5, review: "The no-vehicle rule made it feel peaceful and refreshing. We spent the whole day walking around viewpoints and enjoying the cool air." },
        { name: "Harsh M.", rating: 4, review: "A great quick getaway for a relaxed weekend. The toy train ride and the quiet trails were the highlights." }
      ],
      bestTimeToVisit: "October to March for cool mornings and comfortable walking weather; monsoon brings lush greenery and misty views.",
      speciality: "Matheran is famous for being a vehicle-free hill station, with scenic walking trails, viewpoints, and a calm natural atmosphere.",
      history: "Matheran developed as a British-era hill retreat because of its cool climate and scenic setting, and it still keeps the charm of a quiet colonial-era getaway."
    }
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
