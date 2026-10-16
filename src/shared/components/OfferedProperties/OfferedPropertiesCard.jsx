import {
  Link,
} from "react-router-dom";

import {
  BsArrowRight,
} from "react-icons/bs";

import {
  Building2,
} from "lucide-react";


function OfferedPropertiesCard({
  categories,
}) {
  return (
    <>
      {categories.map(
        (category) => (

          <article
            key={category.id}
            className="offered_property_card"
          >

            {/* IMAGE */}

            <div className="offered_property_image">

              {category.imageUrl ? (

                <img
                  src={
                    category.imageUrl
                  }
                  alt={
                    category.name
                  }
                />

              ) : (

                <div className="offered_property_image_placeholder">

                  <Building2 />

                </div>

              )}

            </div>


            {/* CONTENT */}

            <div className="offered_property_content">

              <h3 className="offered_property_title">
                {category.name}
              </h3>


              <p className="offered_property_about">
                {category.description}
              </p>


              {/* TAGS */}

              <div className="offered_property_specialities">

                {category.specialities?.map(
                  (speciality) => (

                    <span
                      key={speciality}
                      className="offered_property_tag"
                    >
                      {speciality}
                    </span>

                  )
                )}

              </div>


              {/* LINK */}

              <Link
                to={
                  category.linkPath ||
                  "/properties"
                }
                className="offered_property_btn"
              >

                {category.buttonLabel}

                <BsArrowRight />

              </Link>

            </div>

          </article>

        )
      )}
    </>
  );
}


export default OfferedPropertiesCard;