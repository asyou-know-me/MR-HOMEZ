import { useState } from "react";

import {
  Dot,
  Search,
  Building2,
  Building,
} from "lucide-react";

import Promote from "../../shared/components/promote/Promote";
import FeaturedProperties from "../../shared/components/FeaturedProperties/FeaturedProperties";
import NewLaunches from "../../shared/components/NewLaunches/NewLaunches";
import OfferedProperties from "../../shared/components/OfferedProperties/OfferedProperties";
import WhyUs from "../../shared/components/WhyUs/WhyUs";
import DreamSteps from "../../shared/components/DreamSteps/DreamSteps";
import CityExplorer from "../../shared/components/CityExplorer/CityExplorer";
import ConsultationSection from "../../shared/components/ConsultationSection/ConsultationSection";
import Testimonials from "../../shared/components/Testimonials/Testimonials";
import FAQSection from "../../shared/components/FAQSection/FAQSection";
import FinalCTA from "../../shared/components/FinalCTA/FinalCTA";

function HomePage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Buy",
    "Rent",
    "Projects",
    "New Launch",
  ];

  const popularItems = [
    "Apartments",
    "Villas",
    "Plots",
    "Commercial",
    "New Launch",
    "Projects",
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Add your search functionality here later
    console.log("Search clicked");
  };

  return (
    <div className="home_page">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="hero_container">
        <div className="hero_content">

          {/* DEAL INFO */}
          <div className="deal_info">
            <span>100% DIRECT DEALS</span>

            <Dot />

            <span>NO OVERPRICE</span>

            <Dot />

            <span>VERIFIED & LEGAL</span>
          </div>


          {/* HERO TITLE */}
          <h1 className="property_slogan">
            Find Your Dream Property
            <br />
            Across <i>Hyderabad</i>
          </h1>


          {/* HERO DESCRIPTION */}
          <p className="property_about">
            Plots, homes, apartments & commercial spaces across India —
            verified listings, best prices, direct deals.
          </p>


          {/* HERO TABS */}
          <div className="nav">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                className={`nav_links ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>


          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <form
            className="search_tab"
            onSubmit={handleSearch}
          >

            {/* LOCATION */}
            <div className="search_location">
              <span className="search_icon">
                <Search />
              </span>

              <div className="search_field">
                <label htmlFor="property-location">
                  LOCATION
                </label>

                <input
                  type="text"
                  id="property-location"
                  name="location"
                  placeholder="Locality, project or address..."
                />
              </div>
            </div>


            {/* CITY */}
            <div className="select_city">
              <span className="city_icon">
                <Building2 />
              </span>

              <div className="city_field">
                <label htmlFor="city">
                  CITY
                </label>

                <select
                  id="city"
                  name="city"
                  defaultValue=""
                >
                  <option value="">
                    All Cities
                  </option>

                  <option value="mohali">
                    Mohali
                  </option>

                  <option value="kharar">
                    Kharar
                  </option>

                  <option value="zirakpur">
                    Zirakpur
                  </option>

                  <option value="kurali">
                    Kurali
                  </option>

                  <option value="new-chandigarh">
                    New Chandigarh
                  </option>

                  <option value="panchkula">
                    Panchkula
                  </option>

                  <option value="banur">
                    Banur
                  </option>

                  <option value="dera-bassi">
                    Dera Bassi
                  </option>
                </select>
              </div>
            </div>


            {/* PROPERTY TYPE */}
            <div className="select_property_type">
              <span className="property_type_icon">
                <Building />
              </span>

              <div className="property_type_field">
                <label htmlFor="property-type">
                  PROPERTY TYPE
                </label>

                <select
                  id="property-type"
                  name="propertyType"
                  defaultValue=""
                >
                  <option value="">
                    All Types
                  </option>

                  <option value="apartment">
                    Apartments
                  </option>

                  <option value="villa">
                    Villas
                  </option>

                  <option value="plot">
                    Plots
                  </option>

                  <option value="commercial">
                    Commercial
                  </option>

                  <option value="independent-home">
                    Independent Homes
                  </option>

                  <option value="project">
                    Projects
                  </option>
                </select>
              </div>
            </div>


            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="search_btn"
            >
              <Search />

              <span>
                Search
              </span>
            </button>

          </form>


          {/* =================================================
              POPULAR SEARCHES
          ================================================= */}

          <div className="popular_tab">
            <label>
              Popular:
            </label>

            {popularItems.map((item) => (
              <button
                type="button"
                key={item}
                className="popular_links"
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* =================================================
          REMAINING HOMEPAGE
      ================================================= */}

      <Promote />

      <FeaturedProperties />

      <NewLaunches />

      <OfferedProperties />

      <WhyUs />

      <DreamSteps />

      <CityExplorer />

      <ConsultationSection />

      <Testimonials />

      <FAQSection />

      <FinalCTA />

    </div>
  );
}

export default HomePage;