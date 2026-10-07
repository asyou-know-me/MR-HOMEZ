// import "./CityExplorer.css";
import { FaArrowRight } from "react-icons/fa";

const cities = [
  {
    id: 1,
    name: "Mohali",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Chandigarh",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Zirakpur",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Kharar",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Panchkula",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Mullanpur",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80",
  },
];

function CityExplorer() {
  return (
    <section className="cityExplorer">
      <div className="cityExplorer_container">
        <div className="cityExplorer_header">
          <p className="cityExplorer_eyebrow">
            EXPLORE BY CITY
          </p>

          <h2>
            Find Property in
            <span> Your City</span>
          </h2>

          <p>
            Live inventory across India — choose a city to explore
            verified homes, plots and projects.
          </p>
        </div>

        <div className="cityExplorer_grid">
          {cities.map((city) => (
            <article
              className="cityExplorer_card"
              key={city.id}
            >
              <img
                src={city.image}
                alt={`${city.name} properties`}
              />

              <div className="cityExplorer_overlay" />

              <div className="cityExplorer_cardContent">
                <h3>{city.name}</h3>

                <button>
                  Explore Properties
                  <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="cityExplorer_bottom">
          Don&apos;t see your city? We can still help —
          <button> tell us your location.</button>
        </p>
      </div>
    </section>
  );
}

export default CityExplorer;