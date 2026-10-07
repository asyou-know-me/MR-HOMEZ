import { IoMdPin } from "react-icons/io";
import {
  FaBed,
  FaBuilding,
} from "react-icons/fa6";

import { TbTextResize } from "react-icons/tb";

function PropertyCard({ properties }) {
  return (
    <>
      {properties.map((property) => (
        <article
          key={property.id}
          className="property_card"
        >

          {/* IMAGE */}
          <div className="property_card_image">
            {property.image ? (
              <img
                src={property.image}
                alt={property.name}
              />
            ) : (
              <div className="property_image_placeholder">
                <FaBuilding />
              </div>
            )}
          </div>


          {/* CONTENT */}
          <div className="property_card_content">

            <p className="property_card_price">
              {property.price}
            </p>


            <h3 className="property_card_title">
              {property.name}
            </h3>


            <p className="property_card_location">
              <IoMdPin />

              <span>
                {property.location}
              </span>
            </p>


            {/* SPECIFICATIONS */}
            <div className="property_card_specifications">

              {property.propertyType && (
                <p className="one">
                  <FaBuilding />

                  <span>
                    {property.propertyType}
                  </span>
                </p>
              )}


              {property.specification && (
                <p className="two">
                  <FaBed />

                  <span>
                    {property.specification}
                  </span>
                </p>
              )}


              {property.squareFeets && (
                <p className="three">
                  <TbTextResize />

                  <span>
                    {property.squareFeets} sq.ft
                  </span>
                </p>
              )}

            </div>

          </div>
        </article>
      ))}
    </>
  );
}

export default PropertyCard;