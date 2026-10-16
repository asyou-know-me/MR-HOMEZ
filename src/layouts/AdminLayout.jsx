import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  Building2,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Tags,
  MessageSquare,
} from "lucide-react";

import useAdminAuth from "../shared/auth/useAdminAuth";

function AdminLayout() {
  const { admin, logout } = useAdminAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <div className="admin_layout">
      <aside className="admin_sidebar">
        <div className="admin_sidebar_brand">
          <h2>MR.HOMEZ</h2>

          <span>ADMIN</span>
        </div>

        <nav className="admin_navigation">
          <NavLink to="/admin" end>
            <LayoutDashboard />
            Dashboard
          </NavLink>

          <NavLink to="/admin/properties">
            <Building2 />
            Properties
          </NavLink>

          <NavLink to="/admin/projects">
            <FolderKanban />
            Projects
          </NavLink>

          <NavLink to="/admin/categories">
            <Tags />
            Categories
          </NavLink>
          <NavLink to="/admin/enquiries">
            <MessageSquare />
            Leads
          </NavLink>
        </nav>

        <div className="admin_sidebar_footer">
          <div className="admin_user">
            <strong>{admin?.name || "Admin"}</strong>

            <span>{admin?.email}</span>
          </div>

          <button type="button" onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin_main">
        <header className="admin_topbar">
          <span>Administration</span>

          <strong>{admin?.name}</strong>
        </header>

        <div className="admin_content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
