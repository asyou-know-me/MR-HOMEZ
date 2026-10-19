import { useState } from "react";
import EnquiryModal from "../EnquiryModal/EnquiryModal";
import { MapPin, Building2, BadgeCheck } from "lucide-react";

import { Link } from "react-router-dom";

function NewLaunchCard({ projects, enquiryOnClick = false }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const CardWrapper = enquiryOnClick ? "button" : Link;
  return (
    <>
      {projects.map((project) => {
        const location = [project.locality, project.city]
          .filter(Boolean)
          .join(", ");

        const formattedPrice = project.startingPrice
          ? Number(project.startingPrice).toLocaleString("en-IN")
          : null;

        return (
          <CardWrapper
            key={project.id}
            {...(enquiryOnClick
              ? { type: "button", onClick: () => setSelectedProject(project), "aria-label": `Enquire about ${project.name}` }
              : { to: `/project/${project.id}` })}
            className="property_card_link"
          >
            <article key={project.id} className="property_card">
              {/* =========================
                  IMAGE
              ========================= */}

              <div className="property_card_image">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name} />
                ) : (
                  <div className="property_image_placeholder">
                    <Building2 />
                  </div>
                )}

                {/* VERIFIED BADGE */}

                {project.verified && (
                  <span className="project_verified_badge">
                    <BadgeCheck />
                    Verified
                  </span>
                )}
              </div>

              {/* =========================
                  CONTENT
              ========================= */}

              <div className="property_card_content">
                {/* PRICE */}

                <p className="property_card_price">
                  {formattedPrice ? (
                    <>
                      ₹{formattedPrice}
                      <span className="project_price_suffix"> onwards</span>
                    </>
                  ) : (
                    "Price on request"
                  )}
                </p>

                {/* PROJECT NAME */}

                <h3 className="property_card_title">{project.name}</h3>

                {/* DEVELOPER */}

                {project.developerName && (
                  <p className="project_developer">
                    By {project.developerName}
                  </p>
                )}

                {/* LOCATION */}

                <p className="property_card_location">
                  <MapPin />

                  <span>{location || "Location unavailable"}</span>
                </p>

                {/* PROJECT INFO */}

                <div className="project_card_tags">
                  {project.projectType && <span>{project.projectType}</span>}

                  {project.launchStatus && (
                    <span>{project.launchStatus.replaceAll("_", " ")}</span>
                  )}
                </div>
              </div>
            </article>
          </CardWrapper>
        );
      })}
      {selectedProject && (
        <EnquiryModal key={selectedProject.id} projectId={selectedProject.id}
          title={selectedProject.name} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

export default NewLaunchCard;
