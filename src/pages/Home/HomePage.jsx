import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("All");

  const [location, setLocation] =
    useState("");

  const [city, setCity] =
    useState("");

  const [propertyType, setPropertyType] =
    useState("");


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


  /* =================================================
     BUILD SEARCH URL
  ================================================= */

  const performSearch = ({
    tab = activeTab,
    selectedType = propertyType,
  } = {}) => {

    const params =
      new URLSearchParams();


    if (location.trim()) {
      params.set(
        "search",
        location.trim()
      );
    }


    if (city) {
      params.set(
        "city",
        city
      );
    }


    /*
      PROJECT SEARCH
    */

    if (
      tab === "Projects" ||
      tab === "New Launch"
    ) {

      params.set(
        "mode",
        "projects"
      );


      if (selectedType) {
        params.set(
          "propertyType",
          selectedType
        );
      }


      if (
        tab === "New Launch"
      ) {
        params.set(
          "launchStatus",
          "new_launch"
        );
      }


      params.set(
        "status",
        "active"
      );

    } else {

      /*
        NORMAL PROPERTY SEARCH
      */

      params.set(
        "mode",
        "properties"
      );


      if (selectedType) {
        params.set(
          "propertyType",
          selectedType
        );
      }


      if (tab === "Buy") {
        params.set(
          "listingType",
          "sale"
        );
      }


      if (tab === "Rent") {
        params.set(
          "listingType",
          "rent"
        );
      }

    }


    navigate(
      `/search?${params.toString()}`
    );
  };


  const handleSearch = (event) => {
    event.preventDefault();

    performSearch();
  };


  /* =================================================
     POPULAR SEARCH
  ================================================= */

  const handlePopularSearch =
    (item) => {

      const typeMap = {
        Apartments:
          "apartment",

        Villas:
          "villa",

        Plots:
          "plot",

        Commercial:
          "commercial",
      };


      if (item === "New Launch") {

        setActiveTab(
          "New Launch"
        );

        performSearch({
          tab: "New Launch",
          selectedType: "",
        });

        return;
      }


      if (item === "Projects") {

        setActiveTab(
          "Projects"
        );

        performSearch({
          tab: "Projects",
          selectedType: "",
        });

        return;
      }


      const selectedType =
        typeMap[item] || "";


      setPropertyType(
        selectedType
      );


      performSearch({
        selectedType,
      });
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

            <span>
              100% DIRECT DEALS
            </span>

            <Dot />

            <span>
              NO OVERPRICE
            </span>

            <Dot />

            <span>
              VERIFIED & LEGAL
            </span>

          </div>


          {/* HERO TITLE */}

          <h1 className="property_slogan">

            Find Your Dream Property

            <br />

            Across <i>Hyderabad</i>

          </h1>


          {/* HERO DESCRIPTION */}

          <p className="property_about">

            Plots, homes, apartments &
            commercial spaces across India —
            verified listings, best prices,
            direct deals.

          </p>


          {/* HERO TABS */}

          <div className="nav">

            {tabs.map(
              (tab) => (

                <button
                  type="button"
                  key={tab}
                  className={`nav_links ${
                    activeTab === tab
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab)
                  }
                >

                  {tab}

                </button>

              )
            )}

          </div>


          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <form
            className="search_tab"
            onSubmit={
              handleSearch
            }
          >

            {/* LOCATION */}

            <div className="search_location">

              <span className="search_icon">
                <Search />
              </span>


              <div className="search_field">

                <label
                  htmlFor="property-location"
                >
                  LOCATION
                </label>


                <input
                  type="text"
                  id="property-location"
                  name="location"
                  placeholder="Locality, project or address..."
                  value={
                    location
                  }
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
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
                  value={
                    city
                  }
                  onChange={(event) =>
                    setCity(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    All Cities
                  </option>

                  <option value="Mohali">
                    Mohali
                  </option>

                  <option value="Kharar">
                    Kharar
                  </option>

                  <option value="Zirakpur">
                    Zirakpur
                  </option>

                  <option value="Kurali">
                    Kurali
                  </option>

                  <option value="New Chandigarh">
                    New Chandigarh
                  </option>

                  <option value="Panchkula">
                    Panchkula
                  </option>

                  <option value="Banur">
                    Banur
                  </option>

                  <option value="Dera Bassi">
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

                <label
                  htmlFor="property-type"
                >
                  PROPERTY TYPE
                </label>


                <select
                  id="property-type"
                  name="propertyType"
                  value={
                    propertyType
                  }
                  onChange={(event) =>
                    setPropertyType(
                      event.target.value
                    )
                  }
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

                  <option value="independent_home">
                    Independent Homes
                  </option>

                </select>

              </div>

            </div>


            {/* SEARCH */}

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
              POPULAR
          ================================================= */}

          <div className="popular_tab">

            <label>
              Popular:
            </label>


            {popularItems.map(
              (item) => (

                <button
                  type="button"
                  key={item}
                  className="popular_links"
                  onClick={() =>
                    handlePopularSearch(
                      item
                    )
                  }
                >

                  {item}

                </button>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          REST OF HOMEPAGE
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