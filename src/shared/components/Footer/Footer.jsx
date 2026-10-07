// import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const propertiesLinks = [
  "Residential Plots",
  "Independent Homes",
  "Apartments / Flats",
  "Pre-Launch Projects",
  "Commercial Spaces",
  "Showrooms / Shops",
  "Booths & Kiosks",
  "Suites / Studios",
];

const locationLinks = [
  "Mohali",
  "Chandigarh",
  "Zirakpur",
  "Kharar & Kurali",
  "Panchkula",
  "Ambala",
  "Landran & Banur",
  "All Cities",
];

const footerMegaLinks = [
  {
    title: "PLOTS FOR SALE",
    links: [
      "Plots in Mohali",
      "Plots in Chandigarh",
      "Plots in Zirakpur",
      "Plots in Kharar",
      "Plots in Kurali",
      "Plots in Landran",
      "Plots in Banur",
      "Plots in Panchkula",
      "Plots in Ambala",
      "Plots in Mullanpur",
    ],
  },

  {
    title: "HOMES FOR SALE",
    links: [
      "Homes in Mohali",
      "Homes in Chandigarh",
      "Homes in Zirakpur",
      "Homes in Kharar",
      "Homes in Panchkula",
      "Homes in Kurali",
      "Homes in Landran",
      "Homes in Banur",
      "Homes in Dera Bassi",
      "Homes in Mullanpur",
    ],
  },

  {
    title: "APARTMENTS FOR SALE",
    links: [
      "Apartments in Mohali",
      "Apartments in Chandigarh",
      "Apartments in Zirakpur",
      "Apartments in Kharar",
      "Apartments in Panchkula",
      "Apartments in Landran",
      "Apartments in Banur",
      "Apartments in Dera Bassi",
      "Apartments in Mullanpur",
      "Apartments in Ropar",
    ],
  },

  {
    title: "PRE-LAUNCH PROJECTS",
    links: [
      "Pre-Launch in Mohali",
      "Pre-Launch in Chandigarh",
      "Pre-Launch in Zirakpur",
      "Pre-Launch in Kharar",
      "Pre-Launch in Mullanpur",
      "Pre-Launch in Panchkula",
      "Pre-Launch in Landran",
      "Pre-Launch in Banur",
      "Pre-Launch in Ambala",
      "Pre-Launch in Dera Bassi",
    ],
  },

  {
    title: "COMMERCIAL FOR SALE",
    links: [
      "Commercial in Mohali",
      "Commercial in Chandigarh",
      "Commercial in Zirakpur",
      "Commercial in Kharar",
      "Commercial in Panchkula",
      "Commercial in Landran",
      "Commercial in Banur",
      "Commercial in Ambala",
      "Commercial in Dera Bassi",
      "Commercial in Mullanpur",
    ],
  },

  {
    title: "SHOWROOMS FOR SALE",
    links: [
      "Showrooms in Mohali",
      "Showrooms in Chandigarh",
      "Showrooms in Zirakpur",
      "Showrooms in Kharar",
      "Showrooms in Kurali",
      "Showrooms in Banur",
      "Showrooms in Panchkula",
      "Showrooms in Ambala",
      "Showrooms in Dera Bassi",
      "Showrooms in Landran",
    ],
  },

  {
    title: "BOOTHS FOR SALE",
    links: [
      "Booths in Mohali",
      "Booths in Chandigarh",
      "Booths in Zirakpur",
      "Booths in Kharar",
      "Booths in Panchkula",
      "Booths in Landran",
      "Booths in Banur",
      "Booths in Ambala",
      "Booths in Dera Bassi",
      "Booths in Mullanpur",
    ],
  },

  {
    title: "SUITES & STUDIOS",
    links: [
      "Suites in Mohali",
      "Suites in Chandigarh",
      "Suites in Zirakpur",
      "Suites in Kharar",
      "Suites in Panchkula",
      "Suites in Landran",
      "Suites in Banur",
      "Suites in Ambala",
      "Suites in Dera Bassi",
      "Suites in Mullanpur",
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">

        {/* =====================================
            TOP FOOTER
        ====================================== */}

        <div className="footer_top">

          {/* BRAND */}
          <div className="footer_brand">
            <h2 className="footer_logo">
              <span>MR.</span>
              <strong>HOMEZ</strong>
            </h2>

            <p>
              Delivering dream properties at best price across India.
              Direct deals — transparent pricing, no overprice, 100%
              trusted.
            </p>

            <a
              href="https://mrhomez.com"
              className="footer_website"
            >
              <FaGlobe />
              www.mrhomez.com
            </a>

            <div className="footer_socials">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>

              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>


          {/* PROPERTIES */}
          <div className="footer_column">
            <h4>PROPERTIES</h4>

            <ul>
              {propertiesLinks.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>


          {/* LOCATIONS */}
          <div className="footer_column">
            <h4>LOCATIONS</h4>

            <ul>
              {locationLinks.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>


          {/* CONTACT */}
          <div className="footer_column footer_contact">
            <h4>CONTACT</h4>

            <a href="tel:+917347673883">
              <FaPhoneAlt />
              +91 73476 73883
            </a>

            <a href="#">
              <FaWhatsapp />
              WhatsApp Chat
            </a>

            <a href="mailto:mrhomezmohali@gmail.com">
              <FaEnvelope />
              mrhomezmohali@gmail.com
            </a>

            <span>
              <FaClock />
              Mon–Sun · 9 AM – 8 PM
            </span>

            <span>
              <FaMapMarkerAlt />
              Mohali, Punjab, India
            </span>
          </div>

        </div>


        {/* =====================================
            LARGE LINK DIRECTORY
        ====================================== */}

        <div className="footer_directory">

          {footerMegaLinks.map((group) => (
            <div
              className="footer_directory_group"
              key={group.title}
            >
              <h5>{group.title}</h5>

              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


        {/* =====================================
            DISCLAIMER
        ====================================== */}

        <div className="footer_disclaimer">
          <p>
            <strong>Disclaimer:</strong>{" "}
            Property and project information is provided by
            builders, promoters, agents and owners. Images,
            pricing and financial information are for reference
            purposes. Please independently verify property,
            pricing and RERA details before making a decision.
            {" "}
            <a href="#">Read more.</a>
          </p>
        </div>


        {/* =====================================
            BOTTOM
        ====================================== */}

        <div className="footer_bottom">

          <p>
            © 2026 Mr. Homez · mrhomez.com · All rights reserved.
          </p>

          <div className="footer_legal">
            <a href="#">Privacy Policy</a>

            <span>·</span>

            <a href="#">Terms & Conditions</a>

            <span>·</span>

            <a href="#">Disclaimer</a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;