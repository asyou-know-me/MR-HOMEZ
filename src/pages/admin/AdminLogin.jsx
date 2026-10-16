import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { LockKeyhole, Mail, LogIn } from "lucide-react";

import { loginAdmin } from "../../entities/admin/admin.api";

import useAdminAuth from "../../shared/auth/useAdminAuth";

import "./admin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAdminAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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

      const response = await loginAdmin(formData);

      const { token, admin } = response.data;

      login(token, admin);

      navigate("/admin", {
        replace: true,
      });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(error.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin_login_page">
      <div className="admin_login_card">
        <div className="admin_login_brand">
          <h1>MR.HOMEZ</h1>

          <p>Administration Portal</p>
        </div>

        <div className="admin_login_heading">
          <h2>Welcome Back</h2>

          <p>Sign in to manage properties, projects and website content.</p>
        </div>

        <form className="admin_login_form" onSubmit={handleSubmit}>
          <div className="admin_form_group">
            <label htmlFor="email">Email Address</label>

            <div className="admin_input_wrapper">
              <Mail />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@mrhomez.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="admin_form_group">
            <label htmlFor="password">Password</label>

            <div className="admin_input_wrapper">
              <LockKeyhole />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="admin_login_error">{error}</div>}

          <button
            type="submit"
            className="admin_login_button"
            disabled={loading}
          >
            <LogIn />

            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;
