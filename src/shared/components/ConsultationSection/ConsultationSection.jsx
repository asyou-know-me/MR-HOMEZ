// import "./ConsultationSection.css";

import {
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

function ConsultationSection() {
  const benefits = [
    "Direct developer pricing",
    "Transparent pricing with no hidden charges",
    "Verified and legal properties",
    "Clear guidance without fake promises",
    "Home loan assistance",
    "Free site visit arrangement",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Consultation submitted");
  };

  return (
    <section className="consultation">
      <div className="consultation_container">

        <div className="consultation_left">
          <p className="consultation_eyebrow">
            FREE CONSULTATION
          </p>

          <h2>
            Ready to Find Your
            <span> Dream Property?</span>
          </h2>

          <p className="consultation_description">
            Share your requirements and let a property expert
            help you shortlist options based on your budget and
            preferred location.
          </p>

          <div className="consultation_benefits">
            {benefits.map((benefit) => (
              <div
                className="consultation_benefit"
                key={benefit}
              >
                <FaCheckCircle />

                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="consultation_contact">
            <a href="tel:+917347673883">
              <FaPhoneAlt />
              +91 73476 73883
            </a>

            <a
              href="https://wa.me/917347673883"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </div>


        <div className="consultation_formBox">
          <h3>
            Get Free Property Consultation
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="consultation_formRow">
              <div className="consultation_field">
                <label>Full Name *</label>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="consultation_field">
                <label>Mobile *</label>

                <input
                  type="tel"
                  placeholder="10-digit number"
                  required
                />
              </div>
            </div>

            <div className="consultation_formRow">
              <div className="consultation_field">
                <label>Property Type *</label>

                <select required>
                  <option value="">
                    Select Property Type
                  </option>

                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                  <option>Showroom</option>
                </select>
              </div>

              <div className="consultation_field">
                <label>Budget</label>

                <select>
                  <option>Select Budget</option>
                  <option>Below ₹50 Lakh</option>
                  <option>₹50 Lakh - ₹1 Crore</option>
                  <option>₹1 Crore - ₹2 Crore</option>
                  <option>Above ₹2 Crore</option>
                </select>
              </div>
            </div>

            <div className="consultation_field">
              <label>
                Preferred Location
              </label>

              <select>
                <option>
                  Select Location
                </option>

                <option>Mohali</option>
                <option>Chandigarh</option>
                <option>Zirakpur</option>
                <option>Kharar</option>
                <option>Panchkula</option>
              </select>
            </div>

            <div className="consultation_field">
              <label>
                Message (Optional)
              </label>

              <textarea
                rows="4"
                placeholder="Tell us what you are looking for..."
              />
            </div>

            <button
              type="submit"
              className="consultation_submit"
            >
              Send My Requirement — FREE
            </button>

            <p className="consultation_privacy">
              We respect your privacy. Your information
              stays confidential.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

export default ConsultationSection;