import { Link } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import PropertyCard
  from "./PropertyCard";

import {
  getFeaturedProperties,
} from "../../../entities/property/property.api.js";


function FeaturedProperties() {
  const [
    properties,
    setProperties,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getFeaturedProperties();

        setProperties(
          response.data || []
        );

      } catch (error) {
        console.error(
          "Featured properties error:",
          error
        );

        setError(
          "Unable to load featured properties."
        );

      } finally {
        setLoading(false);
      }
    };


    loadProperties();
  }, []);


  return (
    <section className="featuredProperties_container">

      <div className="represent_properties">

        {/* =================================
            HEADER
        ================================= */}

        <div className="featured_properties">

          <div className="featured_properties_content">

            <h5>
              FEATURED PROPERTIES
            </h5>

            <h1>
              Handpicked Properties
              <span>
                You'll Love.
              </span>
            </h1>

            <p>
              Explore verified properties
              selected for location,
              pricing and overall value.
            </p>

          </div>

        </div>


        {/* =================================
            PROPERTY CARDS
        ================================= */}

        <div className="properties_container">

          {/* LOADING */}

          {loading && (
            <div className="property_state">
              Loading featured properties...
            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="property_state property_error">
              {error}
            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            properties.length === 0 && (
              <div className="property_state">
                No featured properties
                available right now.
              </div>
            )}


          {/* DATA */}

          {!loading &&
            !error &&
            properties.length > 0 && (
              <PropertyCard
                properties={properties.slice(0, 8)}
              />
            )}

        </div>

        <Link to="/properties" className="all_properties">
          View all Properties →
        </Link>
      </div>

    </section>
  );
}


export default FeaturedProperties;