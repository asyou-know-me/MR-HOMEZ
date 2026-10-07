import { Outlet } from "react-router-dom";

import Header from "../shared/components/Header/Header";
import Footer from "../shared/components/Footer/Footer";

import { MapPin, Dot } from "lucide-react";

import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

function MainLayout() {
  return (
    <>
      {/* =========================================
          ANNOUNCEMENT BAR
      ========================================= */}

      <div className="announcement_banner">

        {/* LOCATION */}
        <div className="loc_name">
          <span className="location_icon">
            <MapPin />
          </span>

          <h3>Hyderabad</h3>
        </div>


        {/* ANNOUNCEMENT */}
        <div className="announcement">
          <Dot className="announcement_dot" />

          <p className="announcement_content">
            Pre-Launch - Possession Ready Projects - Hyderabad
          </p>

          <Dot className="announcement_dot" />
        </div>


        {/* SOCIAL MEDIA */}
        <div className="social_media">

          <a
            href="#"
            className="icon"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="#"
            className="icon"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="icon"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            className="icon"
            aria-label="X"
          >
            <FaXTwitter />
          </a>

        </div>

      </div>


      {/* =========================================
          HEADER
      ========================================= */}

      <Header />


      {/* =========================================
          PAGE CONTENT
      ========================================= */}

      <main>
        <Outlet />
      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />
    </>
  );
}

export default MainLayout;