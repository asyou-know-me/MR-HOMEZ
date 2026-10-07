import PropertyCard from "./PropertyCard";
import { BsArrowRight } from "react-icons/bs";

function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      name: "150 Gaj Triple-Storey Kothi for Sale in GMADA Sector 79, Mohali",
      price: "Price on request",
      location: "Mohali, Punjab",
      image: "",
      propertyType: "Villa",
      squareFeets: "1,350",
      specification: "",
    },
    {
      id: 2,
      name: "4 BHK Flat for Sale in Jubilee Vallum, Sector 91 Mohali",
      price: "₹2.4 Cr",
      location: "Mohali, Punjab",
      image: "",
      propertyType: "Apartment",
      squareFeets: "3,256",
      specification: "4 BHK",
    },
    {
      id: 3,
      name: "200 Sq Yard Residential Plot for Sale in Preet City, Sector 86 Mohali",
      price: "₹2 Cr",
      location: "Mohali, Punjab",
      image: "",
      propertyType: "Plot",
      squareFeets: "1,800",
      specification: "",
    },
    {
      id: 4,
      name: "200 Gaj Kothi for Sale in Wave Estate, Sector 85 Mohali",
      price: "₹4.75 Cr",
      location: "Mohali, Punjab",
      image: "",
      propertyType: "Villa",
      squareFeets: "1,800",
      specification: "",
    },
  ];

  return (
    <section className="featuredProperties_container">
      <div className="represent_properties">
        {/* SECTION HEADING */}
        <div className="featured_properties">
          <div className="featured_properties_content">
            <h5>HANDPICKED</h5>

            <h1>Featured Properties</h1>

            <p>Handpicked homes for sale and rent across India</p>
          </div>
        </div>

        {/* PROPERTY CARDS */}
        <div className="properties_container">
          <PropertyCard properties={properties} />
        </div>

        {/* VIEW ALL BUTTON */}
        <button type="button" className="all_properties">
          View all properties
          <BsArrowRight />
        </button>
      </div>
    </section>
  );
}

export default FeaturedProperties;
