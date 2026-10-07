import {
  FaClipboardList,
  FaPhoneAlt,
  FaKey,
  FaArrowRight,
} from "react-icons/fa";

function DreamSteps() {
  const steps = [
    {
      id: 1,
      number: "01",
      icon: <FaClipboardList />,
      title: "Share Your Requirement",
      description:
        "Tell us your preferred property type, budget and location. It only takes a moment to get started.",
    },
    {
      id: 2,
      number: "02",
      icon: <FaPhoneAlt />,
      title: "Expert Calls You Back",
      description:
        "A property expert connects with you and shares options that closely match your requirements.",
    },
    {
      id: 3,
      number: "03",
      icon: <FaKey />,
      title: "Visit & Get Your Keys",
      description:
        "Visit shortlisted properties, complete the required process and move closer to owning your dream home.",
    },
  ];

  return (
    <section className="dreamSteps_section">
      <div className="dreamSteps_container">

        {/* HEADING */}
        <div className="dreamSteps_header">
          <p className="dreamSteps_eyebrow">
            YOUR JOURNEY TO HOME
          </p>

          <h2>
            Dream Property in
            <span> 3 Simple Steps</span>
          </h2>

          <p className="dreamSteps_description">
            Your journey towards the right property can be simple.
            Here&apos;s how we help you move from requirement to ownership.
          </p>
        </div>


        {/* STEPS */}
        <div className="dreamSteps_steps">

          {/* CONNECTING LINE */}
          <div className="dreamSteps_line"></div>

          {steps.map((step) => (
            <div
              className="dreamSteps_card"
              key={step.id}
            >

              {/* NUMBER */}
              <span className="dreamSteps_number">
                {step.number}
              </span>


              {/* ICON CIRCLE */}
              <div className="dreamSteps_icon_wrapper">
                <div className="dreamSteps_icon">
                  {step.icon}
                </div>
              </div>


              {/* CONTENT */}
              <div className="dreamSteps_card_content">
                <h3>{step.title}</h3>

                <p>
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>


        {/* CTA */}
        <div className="dreamSteps_cta">
          <button>
            Start My Journey
            <FaArrowRight />
          </button>

          <span>
            Free consultation. No hidden charges.
          </span>
        </div>

      </div>
    </section>
  );
}

export default DreamSteps;