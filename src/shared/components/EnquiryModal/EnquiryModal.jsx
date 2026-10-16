import { useState } from "react";

import { CheckCircle2, X } from "lucide-react";

import { createEnquiry } from "../../../entities/enquiry/enquiry.api";

import "./EnquiryModal.css";

function EnquiryModal({ propertyId = null, projectId = null, title, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createEnquiry({
        ...formData,

        propertyId,
        projectId,
      });

      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry_overlay">
      <div className="enquiry_modal">
        <button type="button" className="enquiry_close" onClick={onClose}>
          <X />
        </button>

        {success ? (
          <div className="enquiry_success">
            <CheckCircle2 />

            <h2>Thank You!</h2>

            <p>
              Your enquiry has been submitted successfully. Our team will
              contact you shortly.
            </p>

            <button type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="enquiry_heading">
              <span>PROPERTY ENQUIRY</span>

              <h2>Interested in this property?</h2>

              <p>{title}</p>
            </div>

            <form onSubmit={handleSubmit} className="enquiry_form">
              <div>
                <label>Name *</label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Phone *</label>

                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Message</label>

                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I would like more information..."
                />
              </div>

              {error && <p className="enquiry_error">{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EnquiryModal;
