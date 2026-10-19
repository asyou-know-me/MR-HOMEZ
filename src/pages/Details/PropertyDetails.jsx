import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import EnquiryModal from "../../shared/components/EnquiryModal/EnquiryModal";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  MapPin,
  Maximize,
} from "lucide-react";

import { getPropertyById } from "../../entities/property/property.api";

import "./Details.css";

function PropertyDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await getPropertyById(id);

        setProperty(response.data);
      } catch (error) {
        console.error(error);

        setError("Unable to load property.");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return <div className="details_state">Loading property...</div>;
  }

  if (error || !property) {
    return (
      <div className="details_state">{error || "Property not found."}</div>
    );
  }

  const images = property.images || [];

  const location = [property.locality, property.city]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="details_page">
      <div className="details_container">
        <button
          type="button"
          className="details_back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </button>

        {/* GALLERY */}

        {images.length > 0 ? (
          <div className={`details_gallery ${images.length === 1 ? "single_image_gallery" : ""}`}>
            <div className="details_main_image">
              <img src={images[0].imageUrl} alt={property.title} />
            </div>

            <div className="details_side_images">
              {images.slice(1).map((image) => (
                <div key={image.id} className="details_side_image">
                  <img src={image.imageUrl} alt={property.title} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="details_no_image">
            <Building2 />
            No images available
          </div>
        )}

        {/* CONTENT */}

        <div className="details_content">
          <section>
            <p className="details_label">{property.propertyType}</p>

            <h1 className="details_title">{property.title}</h1>

            <p className="details_location">
              <MapPin />

              {location || property.address || "Location unavailable"}
            </p>

            <div className="details_specs">
              {property.bhk && (
                <div className="details_spec">
                  <span>Bedrooms</span>

                  <strong>
                    <BedDouble size={15} /> {property.bhk} BHK
                  </strong>
                </div>
              )}

              {property.bathrooms && (
                <div className="details_spec">
                  <span>Bathrooms</span>

                  <strong>
                    <Bath size={15} /> {property.bathrooms}
                  </strong>
                </div>
              )}

              {property.area && (
                <div className="details_spec">
                  <span>Area</span>

                  <strong>
                    <Maximize size={15} /> {property.area}{" "}
                    {property.areaUnit || "sq.ft"}
                  </strong>
                </div>
              )}

              {property.balconies && (
                <div className="details_spec">
                  <span>Balconies</span>

                  <strong>{property.balconies}</strong>
                </div>
              )}
            </div>

            <div className="details_description">
              <h2>Property Description</h2>

              <p>{property.description || "No description available."}</p>
            </div>
          </section>

          {/* PRICE */}

          <aside className="details_price_card">
            <span>Property Price</span>

            <h2>₹{Number(property.price).toLocaleString("en-IN")}</h2>

            <button type="button" onClick={() => setShowEnquiry(true)}>
              Enquire Now
            </button>
          </aside>
        </div>
      </div>
      {showEnquiry && (
        <EnquiryModal
          propertyId={property.id}
          title={property.title}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </main>
  );
}

export default PropertyDetails;
