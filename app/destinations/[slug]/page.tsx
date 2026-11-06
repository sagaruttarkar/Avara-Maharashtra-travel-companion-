import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/destinations";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.id }));
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.id === slug);

  if (!destination) {
    notFound();
  }

  const detail = destination.details ?? {
    travelBy: [{ title: "Travel", description: "Plan a road trip or local transfer depending on your starting city.", meta: "Flexible" }],
    hotels: [{ title: "Local stay", description: "Choose a comfortable base close to the main attraction or market area.", meta: "Depends on budget" }],
    hiddenPlaces: [{ title: "Explore locally", description: "Ask local guides or residents for lesser-known viewpoints and quiet spots.", meta: "Best discovered on foot" }],
    reviews: [{ name: "Traveller", rating: 4, review: "This destination offers a memorable escape with local charm and easy planning." }],
    bestTimeToVisit: "Plan around the weather and your preferred travel pace.",
    speciality: "A favourite stop for travellers looking for a fresh break in nature and local culture.",
    history: "This place has grown from a quiet local destination into a popular getaway with a mix of heritage and modern tourism.",
  };

  return (
    <main className="shell destination-page">
      <div className="detail-btn-row">
        <Link href="/" className="secondary-link">← Back to planner</Link>
      </div>

      <section className="detail-hero">
        <span className="eyebrow">{destination.district} district</span>
        <h1>{destination.name}</h1>
        <p>{destination.description}</p>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <h3>Travel by</h3>
          <div className="detail-list">
            {detail.travelBy.map((travel) => (
              <div key={travel.title} className="detail-list-item">
                <h4>{travel.title}</h4>
                <p>{travel.description}</p>
                {travel.meta ? <span className="meta-tag">{travel.meta}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>Nearest best hotels</h3>
          <div className="detail-list">
            {detail.hotels.map((hotel) => (
              <div key={hotel.title} className="detail-list-item">
                <h4>{hotel.title}</h4>
                <p>{hotel.description}</p>
                {hotel.meta ? <span className="meta-tag">{hotel.meta}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>Hidden places</h3>
          <div className="detail-list">
            {detail.hiddenPlaces.map((place) => (
              <div key={place.title} className="detail-list-item">
                <h4>{place.title}</h4>
                <p>{place.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h3>Recently visited people and their review</h3>
          <ul className="review-list">
            {detail.reviews.map((item) => (
              <li key={item.name} className="review-item">
                <strong>{item.name}</strong>
                <div className="review-stars">{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</div>
                <p>{item.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <h3>Best time to visit</h3>
          <p>{detail.bestTimeToVisit}</p>
        </div>

        <div className="detail-card">
          <h3>Speciality of this place</h3>
          <p>{detail.speciality}</p>
        </div>

        <div className="detail-card" style={{ gridColumn: "1 / -1" }}>
          <h3>History</h3>
          <p>{detail.history}</p>
        </div>
      </section>
    </main>
  );
}
