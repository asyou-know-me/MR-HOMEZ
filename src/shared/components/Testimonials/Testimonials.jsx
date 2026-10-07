// import "./Testimonials.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    initials: "RS",
    name: "Rajesh Sharma",
    location: "Zirakpur",
    type: "Apartment Buyer",
    review:
      "The process was transparent and straightforward. I found a suitable apartment without dealing with brokers or unexpected charges.",
  },
  {
    id: 2,
    initials: "PK",
    name: "Priya Kapoor",
    location: "Kharar",
    type: "Plot Buyer",
    review:
      "The team quickly understood my budget and showed me relevant options. The entire buying process was handled professionally.",
  },
  {
    id: 3,
    initials: "AM",
    name: "Arjun Mehta",
    location: "Mohali",
    type: "Commercial Investor",
    review:
      "I received clear guidance on a commercial investment and was able to make the decision with confidence.",
  },
  {
    id: 4,
    initials: "SV",
    name: "Sunita Verma",
    location: "Panchkula",
    type: "Villa Buyer",
    review:
      "Professional support from property selection through paperwork and loan assistance made the experience much easier.",
  },
  {
    id: 5,
    initials: "GS",
    name: "Gurmeet Singh",
    location: "Chandigarh",
    type: "Plot Buyer",
    review:
      "Pricing and legal details were explained clearly before I made a decision. That transparency made a big difference.",
  },
  {
    id: 6,
    initials: "NK",
    name: "Navneet Kumar",
    location: "Banur",
    type: "Showroom Investor",
    review:
      "The team focused on facts and options rather than pressuring me. I appreciated the straightforward approach.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials_container">

        <header className="testimonials_header">
          <p>CLIENT STORIES</p>

          <h2>
            What Our Clients
            <span> Say About Us</span>
          </h2>

          <span>
            Real experiences from property buyers
            and investors.
          </span>
        </header>


        <div className="testimonials_grid">
          {testimonials.map((item) => (
            <article
              className="testimonial_card"
              key={item.id}
            >
              <FaQuoteLeft className="testimonial_quote" />

              <div className="testimonial_stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              <p className="testimonial_review">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="testimonial_user">
                <div className="testimonial_avatar">
                  {item.initials}
                </div>

                <div>
                  <h4>{item.name}</h4>

                  <p>
                    {item.location} · {item.type}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;