import PropertyCard from "../FeaturedProperties/PropertyCard";
import { BsArrowRight } from "react-icons/bs";


function NewLaunches() {
         const properties = [
    {
      id: 1,
      name: "The Marq by Atlantis",
      price: "₹3 Cr onwards",
      location: "Sector 82 Block B, PR-7 Airport Road (Aerocity), Mohali",
      image: "",
    },
    {
      id: 2,
      name: "4 BHK Flat for Sale in Jubilee Vallum, Sector 91 Mohali",
      price: "₹2.4 Cr",
      location: "Mohali, Punjab",
      image: "",
    },
    {
      id: 3,
      name: "200 Sq Yard Residential Plot for Sale in Preet City, Sector 86 Mohali",
      price: "₹2 Cr",
      location: "Mohali, Punjab",
      image: "",
    },
    {
      id: 4,
      name: "200 Gaj Kothi for Sale in Wave Estate, Sector 85 Mohali",
      price: "₹4.75 Cr",
      location: "Mohali, Punjab",
      image: "",
    },
  ];
  return (
    <div className="featuredProperties_container" >
      <div className="represent_properties" style={{backgroundColor: "#F6F4EF"}}>
        <div className="featured_properties">
          <span className="featured_properties_content">
            <h5>TRUSTED DEVELOPERS</h5>
            <h1>Projects & New Launches</h1>
            <p>Trusted developers, verified inventory</p>
          </span>
        </div>
        <div className="properties_container">
          <PropertyCard properties={properties} />
        </div>
      <button className="all_properties">
        View all properties <BsArrowRight/>
      </button>
      </div>
    </div>
  );
}

export default NewLaunches;