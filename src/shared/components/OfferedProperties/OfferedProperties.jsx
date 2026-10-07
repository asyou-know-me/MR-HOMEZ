import OfferedPropertiesCard from "./OfferedPropertiesCard";

function OfferedProperties() {
  const properties = [
    {
      id: 1,
      name: "Residential Plot",
      about:
        "Freehold & leasehold plots in prime sectors. GMADA approved, registry available.",
      specialities: ["GMADA", "Freehold", "Registry"],
      image: "",
      typeToExplore: "Browse Listings",
      path: "/properties/plots",
    },
    {
      id: 2,
      name: "Independent Home / Villa",
      about:
        "Ready-to-move & under-construction villas with modern amenities. G+1, G+2 options.",
      specialities: ["Ready to Move", "Modern", "Prime Loc"],
      image: "",
      typeToExplore: "Browse Listings",
      path: "/properties/villas",
    },
    {
      id: 3,
      name: "Apartment / Flat",
      about:
        "2BHK, 3BHK & 4BHK in gated communities with world-class amenities & 24x7 security.",
      specialities: ["2BHK", "3BHK", "4BHK"],
      image: "",
      typeToExplore: "Browse Listings",
      path: "/properties/apartments",
    },
    {
      id: 4,
      name: "Pre-Launch / New Launch",
      about:
        "Book at pre-launch prices & save up to 20%. Limited units with exclusive early-bird benefits.",
      specialities: ["Pre-Launch Price", "Limited Units"],
      image: "",
      typeToExplore: "Explore New Launches",
      path: "/new-launch",
    },
  ];

  return (
    <section className="offered_properties_section">
      <div className="offered_properties_container">

        {/* SECTION HEADER */}
        <div className="offered_properties_header">
          <p className="offered_properties_eyebrow">
            WHAT WE OFFER
          </p>

          <h2 className="offered_properties_heading">
            Every Property Type.
            <span>One Trusted Name.</span>
          </h2>

          <p className="offered_properties_description">
            From your first plot to a premium commercial space — browse every
            category across India with verified listings and best prices.
          </p>
        </div>


        {/* PROPERTY TYPE CARDS */}
        <div className="offered_properties_grid">
          <OfferedPropertiesCard properties={properties} />
        </div>

      </div>
    </section>
  );
}

export default OfferedProperties;