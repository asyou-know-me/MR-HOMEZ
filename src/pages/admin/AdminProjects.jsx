import useAdminFeedback from "../../shared/components/AdminFeedback/useAdminFeedback";
import { useEffect, useState } from "react";

import {
  Building2,
  Edit3,
  Images,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectImages,
  uploadProjectImages,
  deleteProjectImage,
} from "../../entities/project/project.api";

import "./admin.css";

const emptyForm = {
  name: "",
  developerName: "",
  description: "",
  city: "",
  locality: "",
  address: "",
  projectType: "",
  startingPrice: "",
  launchStatus: "new_launch",
  possessionDate: "",
  featured: false,
  verified: false,
  status: "active",
};

function AdminProjects() {
  const { showNotice, askConfirmation, feedbackDialog } = useAdminFeedback();
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [imageProject, setImageProject] = useState(null);

  const [projectImages, setProjectImages] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [uploading, setUploading] = useState(false);

  /* ===============================================
     LOAD
  =============================================== */

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();

      setProjects(response.data || []);
    } catch (error) {
      console.error(error);

      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ===============================================
     FORM
  =============================================== */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddForm = () => {
    setEditingProject(null);

    setFormData(emptyForm);

    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name || "",

      developerName: project.developerName || "",

      description: project.description || "",

      city: project.city || "",

      locality: project.locality || "",

      address: project.address || "",

      projectType: project.projectType || "",

      startingPrice: project.startingPrice || "",

      launchStatus: project.launchStatus || "new_launch",

      possessionDate: project.possessionDate || "",

      featured: Boolean(project.featured),

      verified: Boolean(project.verified),

      status: project.status || "active",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setEditingProject(null);

    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,

        startingPrice: formData.startingPrice || null,

        possessionDate: formData.possessionDate || null,
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }

      closeForm();

      await loadProjects();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  /* ===============================================
     DELETE
  =============================================== */

  const handleDelete = async (project) => {
    const confirmed = await askConfirmation(`Delete "${project.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      await loadProjects();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to delete project.");
    }
  };

  /* ===============================================
     IMAGES
  =============================================== */

  const openImageManager = async (project) => {
    setImageProject(project);

    setSelectedFiles([]);

    try {
      const response = await getProjectImages(project.id);

      setProjectImages(response.data || []);
    } catch (error) {
      console.error(error);

      setProjectImages([]);
    }
  };

  const closeImageManager = () => {
    setImageProject(null);

    setProjectImages([]);

    setSelectedFiles([]);
  };

  const refreshImages = async () => {
    if (!imageProject) {
      return;
    }

    const response = await getProjectImages(imageProject.id);

    setProjectImages(response.data || []);
  };

  const handleImageUpload = async () => {
    if (!selectedFiles.length) {
      showNotice("Select at least one image.");

      return;
    }

    try {
      setUploading(true);

      await uploadProjectImages(imageProject.id, selectedFiles);

      setSelectedFiles([]);

      await refreshImages();

      await loadProjects();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to upload images.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirmed = await askConfirmation("Delete this image?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectImage(imageProject.id, imageId);

      await refreshImages();

      await loadProjects();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to delete image.");
    }
  };

  return (
    <section>
      {feedbackDialog}
      {/* PAGE HEADER */}

      <div className="admin_page_header">
        <div className="admin_page_heading">
          <h1>Projects</h1>

          <p>Manage projects and new launches.</p>
        </div>

        <button
          type="button"
          className="admin_primary_button"
          onClick={openAddForm}
        >
          <Plus />
          Add Project
        </button>
      </div>

      {/* TABLE */}

      <div className="admin_table_card">
        {loading && (
          <div className="admin_empty_state">Loading projects...</div>
        )}

        {!loading && error && <div className="admin_empty_state">{error}</div>}

        {!loading && !error && projects.length === 0 && (
          <div className="admin_empty_state">
            <Building2 />
            No projects yet.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="admin_table_wrapper">
            <table className="admin_table">
              <thead>
                <tr>
                  <th>Project</th>

                  <th>Location</th>

                  <th>Starting Price</th>

                  <th>Launch Status</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="admin_property_cell">
                        <div className="admin_property_thumb">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.name} />
                          ) : (
                            <Building2 />
                          )}
                        </div>

                        <div>
                          <strong>{project.name}</strong>

                          <span>
                            {project.developerName || project.projectType}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      {[project.locality, project.city]
                        .filter(Boolean)
                        .join(", ")}
                    </td>

                    <td>
                      {project.startingPrice
                        ? `₹${Number(project.startingPrice).toLocaleString(
                            "en-IN",
                          )}`
                        : "Price on request"}
                    </td>

                    <td>
                      <span className="admin_status_badge">
                        {project.launchStatus?.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td>{project.status}</td>

                    <td>
                      <div className="admin_actions">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEditForm(project)}
                        >
                          <Edit3 />
                        </button>

                        <button
                          type="button"
                          title="Images"
                          onClick={() => openImageManager(project)}
                        >
                          <Images />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          className="danger"
                          onClick={() => handleDelete(project)}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT */}

      {showForm && (
        <div className="admin_modal_overlay">
          <div className="admin_modal admin_property_modal">
            <div className="admin_modal_header">
              <div>
                <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>

                <p>Enter the project information.</p>
              </div>

              <button type="button" onClick={closeForm}>
                <X />
              </button>
            </div>

            <form className="admin_property_form" onSubmit={handleSubmit}>
              <div className="admin_form_grid">
                <div className="admin_field full">
                  <label>Project Name *</label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="admin_field">
                  <label>Developer</label>

                  <input
                    name="developerName"
                    value={formData.developerName}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Project Type *</label>

                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>

                    <option value="apartment">Apartment</option>

                    <option value="villa">Villa</option>

                    <option value="plot">Plot</option>

                    <option value="commercial">Commercial</option>

                    <option value="mixed_use">Mixed Use</option>
                  </select>
                </div>

                <div className="admin_field">
                  <label>Starting Price</label>

                  <input
                    type="number"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Launch Status</label>

                  <select
                    name="launchStatus"
                    value={formData.launchStatus}
                    onChange={handleChange}
                  >
                    <option value="new_launch">New Launch</option>

                    <option value="pre_launch">Pre Launch</option>

                    <option value="under_construction">
                      Under Construction
                    </option>

                    <option value="ready_to_move">Ready To Move</option>
                  </select>
                </div>

                <div className="admin_field">
                  <label>City *</label>

                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="admin_field">
                  <label>Locality</label>

                  <input
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field full">
                  <label>Address</label>

                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Possession Date</label>

                  <input
                    type="date"
                    name="possessionDate"
                    value={formData.possessionDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>

                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="admin_field full">
                  <label>Description</label>

                  <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_checkbox_group full">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    Featured Project
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="verified"
                      checked={formData.verified}
                      onChange={handleChange}
                    />
                    Verified Project
                  </label>
                </div>
              </div>

              <div className="admin_modal_footer">
                <button
                  type="button"
                  className="admin_secondary_button"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin_primary_button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingProject
                      ? "Update Project"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE MANAGER */}

      {imageProject && (
        <div className="admin_modal_overlay">
          <div className="admin_modal">
            <div className="admin_modal_header">
              <div>
                <h2>Project Images</h2>

                <p>{imageProject.name}</p>
              </div>

              <button type="button" onClick={closeImageManager}>
                <X />
              </button>
            </div>

            <div className="admin_image_upload">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) =>
                  setSelectedFiles(Array.from(event.target.files))
                }
              />

              <button
                type="button"
                className="admin_primary_button"
                onClick={handleImageUpload}
                disabled={uploading}
              >
                <Upload />

                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            </div>

            <div className="admin_image_grid">
              {projectImages.length === 0 && (
                <div className="admin_empty_state">No images uploaded.</div>
              )}

              {projectImages.map((image) => (
                <div key={image.id} className="admin_image_card">
                  <img src={image.imageUrl} alt="Project" />

                  {image.isPrimary && <span>Primary</span>}

                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProjects;
