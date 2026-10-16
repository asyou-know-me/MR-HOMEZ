import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Building2, MapPin } from "lucide-react";

import { getProjectById } from "../../entities/project/project.api";

import "./Details.css";
import EnquiryModal from "../../shared/components/EnquiryModal/EnquiryModal";

function ProjectDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await getProjectById(id);

        setProject(response.data);
      } catch (error) {
        console.error(error);

        setError("Unable to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return <div className="details_state">Loading project...</div>;
  }

  if (error || !project) {
    return <div className="details_state">{error || "Project not found."}</div>;
  }

  const images = project.images || [];

  const location = [project.locality, project.city].filter(Boolean).join(", ");
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
          <div
            className={`details_gallery ${
              images.length === 1 ? "single_image_gallery" : ""
            }`}
          >
            <div className="details_main_image">
              <img src={images[0].imageUrl} />
            </div>

            {images.length > 1 && (
              <div className="details_side_images">
                {images.slice(1, 3).map((image) => (
                  <div key={image.id} className="details_side_image">
                    <img src={image.imageUrl} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="details_no_image">
            <Building2 />
            No images available
          </div>
        )}

        <div className="details_content">
          <section>
            <p className="details_label">
              {project.launchStatus?.replaceAll("_", " ")}
            </p>

            <h1 className="details_title">{project.name}</h1>

            {project.developerName && (
              <p>
                By <strong>{project.developerName}</strong>
              </p>
            )}

            <p className="details_location">
              <MapPin />

              {location || project.address || "Location unavailable"}
            </p>

            <div className="details_specs">
              <div className="details_spec">
                <span>Project Type</span>

                <strong>{project.projectType}</strong>
              </div>

              <div className="details_spec">
                <span>Status</span>

                <strong>{project.launchStatus?.replaceAll("_", " ")}</strong>
              </div>

              {project.possessionDate && (
                <div className="details_spec">
                  <span>Possession</span>

                  <strong>{project.possessionDate}</strong>
                </div>
              )}
            </div>

            <div className="details_description">
              <h2>Project Description</h2>

              <p>{project.description || "No description available."}</p>
            </div>
          </section>

          <aside className="details_price_card">
            <span>Starting Price</span>

            <h2>
              {project.startingPrice
                ? `₹${Number(project.startingPrice).toLocaleString("en-IN")}`
                : "Price on request"}
            </h2>

            <button type="button" onClick={() => setShowEnquiry(true)}>
              Enquire Now
            </button>
          </aside>
        </div>
      </div>
      {showEnquiry && (
        <EnquiryModal
          projectId={project.id}
          title={project.name}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </main>
  );
}

export default ProjectDetails;
