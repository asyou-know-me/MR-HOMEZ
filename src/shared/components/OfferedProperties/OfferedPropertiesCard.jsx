import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa6";

function OfferedPropertiesCard({ properties }) {
  return (
    <>
      {properties.map((property) => (
        <article
          key={property.id}
          className="offered_property_card"
        >

          {/* IMAGE */}
          <div className="offered_property_image">

            {property.image ? (
              <img
                src={property.image}
                alt={property.name}
              />
            ) : (
              <div className="offered_property_image_placeholder">
                <FaBuilding />
              </div>
            )}

          </div>


          {/* CONTENT */}
          <div className="offered_property_content">

            <h3 className="offered_property_title">
              {property.name}
            </h3>


            <p className="offered_property_about">
              {property.about}
            </p>


            {/* TAGS */}
            <div className="offered_property_specialities">

              {property.specialities.map((speciality) => (
                <span
                  key={speciality}
                  className="offered_property_tag"
                >
                  {speciality}
                </span>
              ))}

            </div>


            {/* LINK */}
            <Link
              to={property.path}
              className="offered_property_btn"
            >
              {property.typeToExplore}

              <BsArrowRight />
            </Link>

          </div>

        </article>
      ))}
    </>
  );
}

export default OfferedPropertiesCard;