import {
  useEffect,
  useState,
} from "react";

import OfferedPropertiesCard
  from "./OfferedPropertiesCard";

import {
  getPropertyCategories,
} from "../../../entities/propertyCategory/propertyCategory.api";


function OfferedProperties() {
  const [
    categories,
    setCategories,
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

    const loadCategories =
      async () => {

        try {

          setLoading(true);
          setError("");


          const response =
            await getPropertyCategories();


          setCategories(
            response.data || []
          );

        } catch (error) {

          console.error(
            "Offered properties error:",
            error
          );


          setError(
            "Unable to load property categories."
          );

        } finally {

          setLoading(false);

        }

      };


    loadCategories();

  }, []);


  return (
    <section className="offered_properties_section">

      <div className="offered_properties_container">


        {/* HEADER */}

        <div className="offered_properties_header">

          <p className="offered_properties_eyebrow">
            WHAT WE OFFER
          </p>


          <h2 className="offered_properties_heading">
            Every Property Type.

            <span>
              One Trusted Name.
            </span>
          </h2>


          <p className="offered_properties_description">
            From your first plot to a premium
            commercial space — browse every
            category with verified listings
            and transparent pricing.
          </p>

        </div>


        {/* CARDS */}

        <div className="offered_properties_grid">

          {loading && (
            <div className="property_state">
              Loading property categories...
            </div>
          )}


          {!loading && error && (
            <div className="property_state property_error">
              {error}
            </div>
          )}


          {!loading &&
            !error &&
            categories.length === 0 && (
              <div className="property_state">
                No property categories
                available.
              </div>
            )}


          {!loading &&
            !error &&
            categories.length > 0 && (
              <OfferedPropertiesCard
                categories={
                  categories
                }
              />
            )}

        </div>

      </div>

    </section>
  );
}


export default OfferedProperties;