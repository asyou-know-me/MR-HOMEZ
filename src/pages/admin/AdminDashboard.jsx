import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Building2, FolderKanban, Tags, MessageSquare } from "lucide-react";

import { getProperties } from "../../entities/property/property.api";

import { getProjects } from "../../entities/project/project.api";

import { getPropertyCategories } from "../../entities/propertyCategory/propertyCategory.api";

import { getEnquiries } from "../../entities/enquiry/enquiry.api";

import "./admin.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    projects: 0,
    categories: 0,
    enquiries: 0,
    newLeads: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          propertiesResponse,
          projectsResponse,
          categoriesResponse,
          enquiriesResponse,
        ] = await Promise.all([
          getProperties(),
          getProjects(),
          getPropertyCategories(),
          getEnquiries(),
        ]);

        const properties = propertiesResponse.data || [];

        const projects = projectsResponse.data || [];

        const categories = categoriesResponse.data || [];

        const enquiries = enquiriesResponse.data || [];

        const newLeads = enquiries.filter(
          (enquiry) => enquiry.status === "new",
        ).length;

        setStats({
          properties: properties.length,

          projects: projects.length,

          categories: categories.length,

          enquiries: enquiries.length,

          newLeads,
        });
      } catch (error) {
        console.error("Dashboard error:", error);

        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <section className="admin_dashboard">
      {/* HEADER */}

      <div className="admin_page_heading">
        <h1>Dashboard</h1>

        <p>Overview of your MR.HOMEZ website and leads.</p>
      </div>

      {error && <div className="admin_dashboard_error">{error}</div>}

      {/* STATS */}

      <div className="admin_stats_grid">
        {/* PROPERTIES */}

        <Link className="admin_stat_card" to="/admin/properties">
          <div className="admin_stat_icon">
            <Building2 />
          </div>

          <div className="admin_stat_content">
            <span>Properties</span>

            <strong>{loading ? "..." : stats.properties}</strong>

            <small>Total listings</small>
          </div>
        </Link>

        {/* PROJECTS */}

        <Link className="admin_stat_card" to="/admin/projects">
          <div className="admin_stat_icon">
            <FolderKanban />
          </div>

          <div className="admin_stat_content">
            <span>Projects</span>

            <strong>{loading ? "..." : stats.projects}</strong>

            <small>Projects & launches</small>
          </div>
        </Link>

        {/* CATEGORIES */}

        <Link className="admin_stat_card" to="/admin/categories">
          <div className="admin_stat_icon">
            <Tags />
          </div>

          <div className="admin_stat_content">
            <span>Categories</span>

            <strong>{loading ? "..." : stats.categories}</strong>

            <small>Offered property types</small>
          </div>
        </Link>

        {/* LEADS */}

        <Link className="admin_stat_card" to="/admin/enquiries">
          <div className="admin_stat_icon">
            <MessageSquare />
          </div>

          <div className="admin_stat_content">
            <span>Total Leads</span>

            <strong>{loading ? "..." : stats.enquiries}</strong>

            <small>
              {loading ? "Loading..." : `${stats.newLeads} new leads`}
            </small>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;
