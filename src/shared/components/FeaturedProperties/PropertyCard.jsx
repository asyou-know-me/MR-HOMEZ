import { BedDouble, Bath, Maximize, MapPin, Building2 } from "lucide-react";

import { Link } from "react-router-dom";

function PropertyCard({ properties }) {
  return (
    <>
      {properties.map((property) => {
        const location = [property.locality, property.city]
          .filter(Boolean)
          .join(", ");

        return (
          <Link
            key={property.id}
            to={`/property/${property.id}`}
            className="property_card_link"
          >
            <article className="property_card">
              {/* IMAGE */}

              <div className="property_card_image">
                {property.imageUrl ? (
                  <img src={property.imageUrl} alt={property.title} />
                ) : (
                  <div className="property_image_placeholder">
                    <Building2 />
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div className="property_card_content">
                <p className="property_card_price">
                  ₹{Number(property.price).toLocaleString("en-IN")}
                </p>

                <h3 className="property_card_title">{property.title}</h3>

                <p className="property_card_location">
                  <MapPin />

                  <span>{location || "Location unavailable"}</span>
                </p>

                <div className="property_card_specifications">
                  {property.bhk && (
                    <p className="one">
                      <BedDouble />

                      <span>{property.bhk} BHK</span>
                    </p>
                  )}

                  {property.bathrooms && (
                    <p className="two">
                      <Bath />

                      <span>{property.bathrooms} Bath</span>
                    </p>
                  )}

                  {property.area && (
                    <p className="three">
                      <Maximize />

                      <span>
                        {property.area} {property.areaUnit || "sq.ft"}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
}

export default PropertyCard;
