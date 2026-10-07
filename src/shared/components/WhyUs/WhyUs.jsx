import {
  FaHandshake,
  FaEye,
  FaMoneyBillTrendUp,
  FaFileShield,
} from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
function WhyUs() {
  return (
    <section className="whyUs_bg_container">
      <div className="whyUs_container">
        {/* LEFT SIDE */}
        <div className="whyUs_container_left">
          <h4>WHY MR. HOMEZ?</h4>

          <h1>
            We Are Different.
            <br />
            <span>Here's Why.</span>
          </h1>

          <p>
            Not just another property portal. We work exclusively with direct
            buyers — no middlemen, no brokers, no hidden costs. We believe in
            100% transparent pricing — what you see is what you pay, every step
            of the way.
          </p>

          <button type="button">Start Your Search - Free</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="whyUs_container_right">
          {/* CARD 1 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <FaHandshake />
            </div>

            <div className="whyUs_card_content">
              <h4>Direct Customer Policy</h4>

              <p>
                We deal only with end buyers. No brokers, no agents and no
                unnecessary middlemen.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <FaTag />
            </div>

            <div className="whyUs_card_content">
              <h4>Best Price Guarantee</h4>

              <p>
                You always get the actual developer price — zero overprice, zero
                hidden charges, ever. What we promise, we deliver.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <FaEye />
            </div>

            <div className="whyUs_card_content">
              <h4>100% Transparency</h4>

              <p>
                Every cost, every clause shown upfront. No hidden charges, no
                surprises — ever. What we say is what you pay.
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <FaFileShield />
            </div>

            <div className="whyUs_card_content">
              <h4>100% Legally Verified</h4>

              <p>
                Every property verified for clear title, approved layout &
                encumbrance check before listing.
              </p>
            </div>
          </div>

          {/* CARD 5 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <MdOutlineAccessTimeFilled />
            </div>

            <div className="whyUs_card_content">
              <h4>10-Min Expert Callback</h4>

              <p>
                Submit your inquiry and a dedicated property expert calls you
                within 10 minutes. Guaranteed.
              </p>
            </div>
          </div>

          {/* CARD 6 */}
          <div className="whyUs_container_right_card">
            <div className="whyUs_card_icon">
              <FaMoneyBillTrendUp />
            </div>

            <div className="whyUs_card_content">
              <h4>Home Loan Assistance</h4>

              <p>
                SBI, HDFC, ICICI, PNB tie-ups. Best interest rates. Fast
                approval. Zero hassle for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
