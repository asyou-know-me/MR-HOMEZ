import useAdminFeedback from "../../shared/components/AdminFeedback/useAdminFeedback";
import { useEffect, useState } from "react";

import { Edit3, Image, Plus, Tags, Trash2, Upload, X } from "lucide-react";

import {
  getPropertyCategories,
  createPropertyCategory,
  updatePropertyCategory,
  deletePropertyCategory,
  uploadPropertyCategoryImage,
} from "../../entities/propertyCategory/propertyCategory.api";

import "./admin.css";

const emptyForm = {
  name: "",
  description: "",
  specialities: "",
  buttonLabel: "Browse Listings",
  linkPath: "",
  displayOrder: 0,
  active: true,
};

function AdminCategories() {
  const { showNotice, askConfirmation, feedbackDialog } = useAdminFeedback();
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [imageCategory, setImageCategory] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [uploading, setUploading] = useState(false);

  /* =====================================================
     LOAD CATEGORIES
  ===================================================== */

  const loadCategories = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await getPropertyCategories();

      setCategories(response.data || []);
    } catch (error) {
      console.error(error);

      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
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
    setEditingCategory(null);

    setFormData(emptyForm);

    setShowForm(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name || "",

      description: category.description || "",

      specialities: Array.isArray(category.specialities)
        ? category.specialities.join(", ")
        : "",

      buttonLabel: category.buttonLabel || "Browse Listings",

      linkPath: category.linkPath || "",

      displayOrder: category.displayOrder ?? 0,

      active: Boolean(category.active),
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setEditingCategory(null);

    setFormData(emptyForm);
  };

  const preparePayload = () => {
    const specialities = formData.specialities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return {
      name: formData.name,

      description: formData.description,

      specialities,

      buttonLabel: formData.buttonLabel,

      linkPath: formData.linkPath,

      displayOrder: Number(formData.displayOrder),

      active: formData.active,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = preparePayload();

      if (editingCategory) {
        await updatePropertyCategory(editingCategory.id, payload);
      } else {
        await createPropertyCategory(payload);
      }

      closeForm();

      await loadCategories();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (category) => {
    const confirmed = await askConfirmation(`Delete "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deletePropertyCategory(category.id);

      await loadCategories();
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to delete category.");
    }
  };

  /* =====================================================
     IMAGE MANAGER
  ===================================================== */

  const openImageManager = (category) => {
    setImageCategory(category);

    setSelectedImage(null);
  };

  const closeImageManager = () => {
    setImageCategory(null);

    setSelectedImage(null);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      showNotice("Please select an image.");

      return;
    }

    try {
      setUploading(true);

      await uploadPropertyCategoryImage(imageCategory.id, selectedImage);

      setSelectedImage(null);

      await loadCategories();

      const response = await getPropertyCategories();

      const updated = response.data?.find(
        (category) => category.id === imageCategory.id,
      );

      if (updated) {
        setImageCategory(updated);
      }
    } catch (error) {
      console.error(error);

      showNotice(error.response?.data?.message || "Unable to upload image.");
    } finally {
      setUploading(false);
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
          <h1>Categories</h1>

          <p>Manage the property types shown in the What We Offer section.</p>
        </div>

        <button
          type="button"
          className="admin_primary_button"
          onClick={openAddForm}
        >
          <Plus />
          Add Category
        </button>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="admin_table_card">
        {loading && (
          <div className="admin_empty_state">Loading categories...</div>
        )}

        {!loading && error && <div className="admin_empty_state">{error}</div>}

        {!loading && !error && categories.length === 0 && (
          <div className="admin_empty_state">
            <Tags />
            No categories yet.
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="admin_table_wrapper">
            <table className="admin_table">
              <thead>
                <tr>
                  <th>Category</th>

                  <th>Specialities</th>

                  <th>Order</th>

                  <th>Active</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    {/* CATEGORY */}

                    <td data-label="Category">
                      <div className="admin_property_cell">
                        <div className="admin_property_thumb">
                          {category.imageUrl ? (
                            <img src={category.imageUrl} alt={category.name} />
                          ) : (
                            <Tags />
                          )}
                        </div>

                        <div>
                          <strong>{category.name}</strong>

                          <span>{category.buttonLabel}</span>
                        </div>
                      </div>
                    </td>

                    {/* SPECIALITIES */}

                    <td data-label="Specialities">
                      <div className="admin_category_tags">
                        {category.specialities
                          ?.slice(0, 3)
                          .map((speciality) => (
                            <span key={speciality}>{speciality}</span>
                          ))}
                      </div>
                    </td>

                    {/* ORDER */}

                    <td data-label="Order">{category.displayOrder}</td>

                    {/* ACTIVE */}

                    <td data-label="Active">
                      <span
                        className={
                          category.active
                            ? "admin_status_badge"
                            : "admin_status_badge admin_status_inactive"
                        }
                      >
                        {category.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td data-label="Actions">
                      <div className="admin_actions">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEditForm(category)}
                        >
                          <Edit3 />
                        </button>

                        <button
                          type="button"
                          title="Image"
                          onClick={() => openImageManager(category)}
                        >
                          <Image />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          className="danger"
                          onClick={() => handleDelete(category)}
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
          <div className="admin_modal">
            <div className="admin_modal_header">
              <div>
                <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>

                <p>
                  Manage the content displayed in the Offered Properties
                  section.
                </p>
              </div>

              <button type="button" onClick={closeForm}>
                <X />
              </button>
            </div>

            <form className="admin_property_form" onSubmit={handleSubmit}>
              <div className="admin_form_grid">
                {/* NAME */}

                <div className="admin_field full">
                  <label>Category Name *</label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="admin_field full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* SPECIALITIES */}

                <div className="admin_field full">
                  <label>Specialities</label>

                  <input
                    name="specialities"
                    value={formData.specialities}
                    onChange={handleChange}
                    placeholder="GMADA, Freehold, Registry"
                  />

                  <small>Separate each item with a comma.</small>
                </div>

                {/* BUTTON LABEL */}

                <div className="admin_field">
                  <label>Button Label</label>

                  <input
                    name="buttonLabel"
                    value={formData.buttonLabel}
                    onChange={handleChange}
                  />
                </div>

                {/* LINK */}

                <div className="admin_field">
                  <label>Link Path</label>

                  <input
                    name="linkPath"
                    value={formData.linkPath}
                    onChange={handleChange}
                    placeholder="/properties?type=plot"
                  />
                </div>

                {/* DISPLAY ORDER */}

                <div className="admin_field">
                  <label>Display Order</label>

                  <input
                    type="number"
                    min="0"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                  />
                </div>

                {/* ACTIVE */}

                <div className="admin_checkbox_group">
                  <label>
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                    />
                    Active Category
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
                    : editingCategory
                      ? "Update Category"
                      : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          IMAGE MODAL
      ================================================= */}

      {imageCategory && (
        <div className="admin_modal_overlay">
          <div className="admin_modal admin_category_image_modal">
            <div className="admin_modal_header">
              <div>
                <h2>Category Image</h2>

                <p>{imageCategory.name}</p>
              </div>

              <button type="button" onClick={closeImageManager}>
                <X />
              </button>
            </div>

            {/* CURRENT IMAGE */}

            <div className="admin_category_image_preview">
              {imageCategory.imageUrl ? (
                <img src={imageCategory.imageUrl} alt={imageCategory.name} />
              ) : (
                <div className="admin_category_no_image">
                  <Image />
                  No image uploaded
                </div>
              )}
            </div>

            {/* NEW IMAGE */}

            <div className="admin_image_upload">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  setSelectedImage(event.target.files?.[0] || null)
                }
              />

              <button
                type="button"
                className="admin_primary_button"
                onClick={handleImageUpload}
                disabled={uploading}
              >
                <Upload />

                {uploading
                  ? "Uploading..."
                  : imageCategory.imageUrl
                    ? "Replace Image"
                    : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminCategories;
