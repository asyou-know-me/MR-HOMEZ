import { useEffect, useState } from "react";

import { Mail, Phone, Trash2, UserRound, MessageSquare } from "lucide-react";

import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../../entities/enquiry/enquiry.api";

import "./admin.css";

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     LOAD ENQUIRIES
  ===================================================== */

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEnquiries();

      setEnquiries(response.data || []);
    } catch (error) {
      console.error("Enquiry load error:", error);

      setError("Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  /* =====================================================
     UPDATE STATUS
  ===================================================== */

  const handleStatusChange = async (enquiryId, status) => {
    try {
      await updateEnquiryStatus(enquiryId, status);

      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry.id === enquiryId
            ? {
                ...enquiry,
                status,
              }
            : enquiry,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to update status.");
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (enquiry) => {
    const confirmed = window.confirm(`Delete enquiry from "${enquiry.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteEnquiry(enquiry.id);

      setEnquiries((previous) =>
        previous.filter((item) => item.id !== enquiry.id),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete enquiry.");
    }
  };

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",

      timeStyle: "short",
    });
  };

  return (
    <section>
      {/* HEADER */}

      <div className="admin_page_header">
        <div className="admin_page_heading">
          <h1>Leads & Enquiries</h1>

          <p>Review customer enquiries and track their progress.</p>
        </div>

        <div className="admin_lead_count">
          <strong>{enquiries.length}</strong>

          <span>Total Leads</span>
        </div>
      </div>

      {/* TABLE */}

      <div className="admin_table_card">
        {loading && (
          <div className="admin_empty_state">Loading enquiries...</div>
        )}

        {!loading && error && <div className="admin_empty_state">{error}</div>}

        {!loading && !error && enquiries.length === 0 && (
          <div className="admin_empty_state">
            <MessageSquare />
            No enquiries yet.
          </div>
        )}

        {!loading && !error && enquiries.length > 0 && (
          <div className="admin_table_wrapper">
            <table className="admin_table">
              <thead>
                <tr>
                  <th>Customer</th>

                  <th>Contact</th>

                  <th>Enquiring About</th>

                  <th>Message</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    {/* CUSTOMER */}

                    <td>
                      <div className="admin_lead_customer">
                        <div className="admin_lead_avatar">
                          <UserRound />
                        </div>

                        <div>
                          <strong>{enquiry.name}</strong>

                          <span>Lead #{enquiry.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* CONTACT */}

                    <td>
                      <div className="admin_lead_contact">
                        <span>
                          <Phone />

                          {enquiry.phone}
                        </span>

                        {enquiry.email && (
                          <span>
                            <Mail />

                            {enquiry.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* REFERENCE */}

                    <td>
                      {enquiry.propertyId && (
                        <span className="admin_reference_badge">
                          Property #{enquiry.propertyId}
                        </span>
                      )}

                      {enquiry.projectId && (
                        <span className="admin_reference_badge">
                          Project #{enquiry.projectId}
                        </span>
                      )}
                    </td>

                    {/* MESSAGE */}

                    <td>
                      <div className="admin_lead_message">
                        {enquiry.message || "No message"}
                      </div>
                    </td>

                    {/* DATE */}

                    <td>
                      <span className="admin_lead_date">
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <select
                        className={`admin_lead_status status_${enquiry.status}`}
                        value={enquiry.status}
                        onChange={(event) =>
                          handleStatusChange(enquiry.id, event.target.value)
                        }
                      >
                        <option value="new">New</option>

                        <option value="contacted">Contacted</option>

                        <option value="qualified">Qualified</option>

                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* DELETE */}

                    <td>
                      <div className="admin_actions">
                        <button
                          type="button"
                          title="Delete enquiry"
                          className="danger"
                          onClick={() => handleDelete(enquiry)}
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
    </section>
  );
}

export default AdminEnquiries;
