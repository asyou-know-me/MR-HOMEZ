import { useState } from "react";

// import "./FAQSection.css";

import {
  FaPlus,
  FaMinus,
  FaPhoneAlt,
} from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question:
      'What does "Direct Customers Only" mean?',
    answer:
      "It means the platform primarily connects with end buyers rather than relying on broker chains, helping keep pricing and communication more transparent.",
  },

  {
    id: 2,
    question:
      "Is there any consultation fee?",
    answer:
      "Buyer consultation is offered without a consultation charge. Property guidance, basic assistance and site-visit coordination can be discussed with the team.",
  },

  {
    id: 3,
    question:
      "Which locations do you cover?",
    answer:
      "The platform covers major Tricity and nearby markets including Mohali, Chandigarh, Zirakpur, Kharar, Panchkula, Banur and other surrounding locations.",
  },

  {
    id: 4,
    question:
      "Are the properties legally verified?",
    answer:
      "Property documentation and project details are reviewed before recommendation. Buyers should still independently verify legal documents before completing any transaction.",
  },

  {
    id: 5,
    question:
      "Do you help with home loans?",
    answer:
      "Yes. The team can assist buyers with the home-loan process and help coordinate with major banking partners.",
  },

  {
    id: 6,
    question:
      "How quickly will someone contact me?",
    answer:
      "During normal business hours, enquiries are generally handled quickly. Requests received outside business hours may be followed up the next working period.",
  },

  {
    id: 7,
    question:
      "What is RERA and why is it important?",
    answer:
      "RERA provides regulatory protections for property buyers and creates accountability around project registration, disclosures and delivery obligations.",
  },

  {
    id: 8,
    question:
      "What documents are usually required when buying property?",
    answer:
      "Common buyer documents include identity proof, PAN, photographs and address proof. Additional documents may be required depending on financing and property type.",
  },
];

function FAQSection() {
  const [activeFaq, setActiveFaq] =
    useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(
      activeFaq === index ? null : index
    );
  };

  return (
    <section className="faqSection">
      <div className="faqSection_container">

        <div className="faqSection_left">
          <p>GOT QUESTIONS?</p>

          <h2>
            Frequently
            <span> Asked Questions</span>
          </h2>

          <p className="faqSection_help">
            Can&apos;t find your answer?
            Call us directly.
          </p>

          <a
            href="tel:+917347673883"
            className="faqSection_phone"
          >
            <FaPhoneAlt />
            +91 73476 73883
          </a>
        </div>


        <div className="faqSection_right">

          {faqs.map((faq, index) => {
            const isActive =
              activeFaq === index;

            return (
              <article
                className={`faq_item ${
                  isActive
                    ? "faq_item_active"
                    : ""
                }`}
                key={faq.id}
              >

                <button
                  className="faq_question"
                  onClick={() =>
                    toggleFaq(index)
                  }
                >
                  <span>
                    {faq.question}
                  </span>

                  {isActive ? (
                    <FaMinus />
                  ) : (
                    <FaPlus />
                  )}
                </button>

                <div
                  className={`faq_answer ${
                    isActive
                      ? "faq_answer_open"
                      : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>

              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default FAQSection;