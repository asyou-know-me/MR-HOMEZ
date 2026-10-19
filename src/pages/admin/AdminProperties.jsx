import useAdminFeedback from "../../shared/components/AdminFeedback/useAdminFeedback";
import { useEffect, useState } from "react";

import {
  Building2,
  Edit3,
  Images,
  Plus,
  Trash2,
  X,
  Upload,
} from "lucide-react";

import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyImages,
  uploadPropertyImages,
  deletePropertyImage,
} from "../../entities/property/property.api";

import "./admin.css";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  city: "",
  locality: "",
  address: "",
  propertyType: "",
  listingType: "sale",
  bhk: "",
  bathrooms: "",
  balconies: "",
  area: "",
  areaUnit: "sq.ft",
  status: "available",
  featured: false,
  verified: false,
};

function AdminProperties() {
  const { showNotice, askConfirmation, feedbackDialog } = useAdminFeedback();
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProperty, setEditingProperty] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [imageProperty, setImageProperty] = useState(null);

  const [propertyImages, setPropertyImages] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [uploading, setUploading] = useState(false);

  /* =====================================================
     LOAD PROPERTIES
  ===================================================== */

  const loadProperties = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await getProperties();

      setProperties(response.data || []);
    } catch (error) {
      console.error(error);

      setError("Unable to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  /* =====================================================
     FORM
  ===================================================== */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddForm = () => {
    setEditingProperty(null);

    setFormData(emptyForm);

    setShowForm(true);
  };

  const openEditForm = (property) => {
    setEditingProperty(property);

    setFormData({
      title: property.title || "",

      description: property.description || "",

      price: property.price || "",

      city: property.city || "",

      locality: property.locality || "",

      address: property.address || "",

      propertyType: property.propertyType || "",

      listingType: property.listingType || "sale",

      bhk: property.bhk || "",

      bathrooms: property.bathrooms || "",

      balconies: property.balconies || "",

      area: property.area || "",

      areaUnit: property.areaUnit || "sq.ft",

      status: property.status || "available",

      featured: Boolean(property.featured),

      verified: Boolean(property.verified),
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setEditingProperty(null);

    setFormData(emptyForm);
  };

  const preparePayload = () => {
    return {
      ...formData,

      price: formData.price,

      bhk: formData.bhk ? Number(formData.bhk) : null,

      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,

      balconies: formData.balconies ? Number(formData.balconies) : null,

      area: formData.area || null,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = preparePayload();

      if (editingProperty) {
        await updateProperty(editingProperty.id, payload);
      } else {
        await createProperty(payload);
      }

      closeForm();

      await loadProperties();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to save property.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     DELETE PROPERTY
  ===================================================== */

  const handleDelete = async (property) => {
    const confirmed = await askConfirmation(`Delete "${property.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(property.id);

      await loadProperties();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to delete property.");
    }
  };

  /* =====================================================
     IMAGE MANAGER
  ===================================================== */

  const openImageManager = async (property) => {
    setImageProperty(property);

    setSelectedFiles([]);

    try {
      const response = await getPropertyImages(property.id);

      setPropertyImages(response.data || []);
    } catch (error) {
      console.error(error);

      setPropertyImages([]);
    }
  };

  const closeImageManager = () => {
    setImageProperty(null);

    setPropertyImages([]);

    setSelectedFiles([]);
  };

  const refreshImages = async () => {
    if (!imageProperty) {
      return;
    }

    const response = await getPropertyImages(imageProperty.id);

    setPropertyImages(response.data || []);
  };

  const handleImageUpload = async () => {
    if (!selectedFiles.length) {
      showNotice("Select at least one image.");

      return;
    }

    try {
      setUploading(true);

      await uploadPropertyImages(imageProperty.id, selectedFiles);

      setSelectedFiles([]);

      await refreshImages();

      await loadProperties();
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
      await deletePropertyImage(imageProperty.id, imageId);

      await refreshImages();

      await loadProperties();
    } catch (error) {
      console.error(error);

      showNotice("Unable to delete image.");
    }
  };

  return (
    <section>
      {feedbackDialog}
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="admin_page_header">
        <div className="admin_page_heading">
          <h1>Properties</h1>

          <p>Manage property listings displayed on MR.HOMEZ.</p>
        </div>

        <button
          type="button"
          className="admin_primary_button"
          onClick={openAddForm}
        >
          <Plus />
          Add Property
        </button>
      </div>

      {/* =================================================
          LIST
      ================================================= */}

      <div className="admin_table_card">
        {loading && (
          <div className="admin_empty_state">Loading properties...</div>
        )}

        {!loading && error && <div className="admin_empty_state">{error}</div>}

        {!loading && !error && properties.length === 0 && (
          <div className="admin_empty_state">
            <Building2 />
            No properties yet.
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="admin_table_wrapper">
            <table className="admin_table">
              <thead>
                <tr>
                  <th>Property</th>

                  <th>Location</th>

                  <th>Price</th>

                  <th>Status</th>

                  <th>Featured</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <div className="admin_property_cell">
                        <div className="admin_property_thumb">
                          {property.imageUrl ? (
                            <img src={property.imageUrl} alt={property.title} />
                          ) : (
                            <Building2 />
                          )}
                        </div>

                        <div>
                          <strong>{property.title}</strong>

                          <span>{property.propertyType}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      {[property.locality, property.city]
                        .filter(Boolean)
                        .join(", ")}
                    </td>

                    <td>₹{Number(property.price).toLocaleString("en-IN")}</td>

                    <td>
                      <span className="admin_status_badge">
                        {property.status}
                      </span>
                    </td>

                    <td>{property.featured ? "Yes" : "No"}</td>

                    <td>
                      <div className="admin_actions">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEditForm(property)}
                        >
                          <Edit3 />
                        </button>

                        <button
                          type="button"
                          title="Images"
                          onClick={() => openImageManager(property)}
                        >
                          <Images />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          className="danger"
                          onClick={() => handleDelete(property)}
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

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (
        <div className="admin_modal_overlay">
          <div className="admin_modal admin_property_modal">
            <div className="admin_modal_header">
              <div>
                <h2>{editingProperty ? "Edit Property" : "Add Property"}</h2>

                <p>Enter the property information below.</p>
              </div>

              <button type="button" onClick={closeForm}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin_property_form">
              <div className="admin_form_grid">
                <div className="admin_field full">
                  <label>Property Title *</label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="admin_field">
                  <label>Price *</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="admin_field">
                  <label>Property Type *</label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>

                    <option value="apartment">Apartment</option>

                    <option value="flat">Flat</option>

                    <option value="villa">Villa</option>

                    <option value="independent_home">Independent Home</option>

                    <option value="plot">Plot</option>

                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div className="admin_field">
                  <label>Listing Type *</label>

                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                  >
                    <option value="sale">Sale</option>

                    <option value="rent">Rent</option>
                  </select>
                </div>

                <div className="admin_field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="available">Available</option>

                    <option value="sold">Sold</option>

                    <option value="rented">Rented</option>

                    <option value="inactive">Inactive</option>
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
                  <label>BHK</label>

                  <input
                    type="number"
                    name="bhk"
                    value={formData.bhk}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Bathrooms</label>

                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Balconies</label>

                  <input
                    type="number"
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Area</label>

                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin_field">
                  <label>Area Unit</label>

                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                  >
                    <option value="sq.ft">sq.ft</option>

                    <option value="sq.yard">sq.yard</option>

                    <option value="acre">acre</option>
                  </select>
                </div>

                <div className="admin_field full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="4"
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
                    Featured Property
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="verified"
                      checked={formData.verified}
                      onChange={handleChange}
                    />
                    Verified Property
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
                    : editingProperty
                      ? "Update Property"
                      : "Create Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          IMAGE MANAGER
      ================================================= */}

      {imageProperty && (
        <div className="admin_modal_overlay">
          <div className="admin_modal">
            <div className="admin_modal_header">
              <div>
                <h2>Property Images</h2>

                <p>{imageProperty.title}</p>
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
              {propertyImages.length === 0 && (
                <div className="admin_empty_state">No images uploaded.</div>
              )}

              {propertyImages.map((image) => (
                <div key={image.id} className="admin_image_card">
                  <img src={image.imageUrl} alt="Property" />

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

export default AdminProperties;
