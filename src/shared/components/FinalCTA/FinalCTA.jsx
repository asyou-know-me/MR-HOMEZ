// import "./FinalCTA.css";

import {
  FaPhoneAlt,
} from "react-icons/fa";

function FinalCTA() {
  return (
    <section className="finalCTA">
      <div className="finalCTA_container">

        <h2>
          Your Dream Property is
          <span>One Step Away</span>
        </h2>

        <p>
          Find your perfect property with verified listings,
          transparent pricing and expert guidance.
        </p>

        <div className="finalCTA_actions">

          <button className="finalCTA_consultation_btn">
            Get Free Consultation
          </button>

          <a
            href="tel:+917347673883"
            className="finalCTA_phone_btn"
          >
            <FaPhoneAlt />

            <span>
              +91 73476 73883
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}

export default FinalCTA;