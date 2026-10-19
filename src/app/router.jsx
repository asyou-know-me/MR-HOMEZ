import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";

import AdminLogin from "../pages/admin/AdminLogin";

import AdminDashboard from "../pages/admin/AdminDashboard";
import SearchResults from "../pages/SearchResults/SearchResults";
import AdminLayout from "../layouts/AdminLayout";
import AdminProjects from "../pages/admin/AdminProjects";
import ProtectedAdminRoute from "../shared/auth/ProtectedAdminRoute";
import AdminCategories from "../pages/admin/AdminCategories";
import PropertyDetails from "../pages/Details/PropertyDetails";
import AdminEnquiries from "../pages/admin/AdminEnquiries";
import ProjectDetails from "../pages/Details/ProjectDetails";
import AdminProperties from "../pages/admin/AdminProperties";
export const router = createBrowserRouter([
  /* =========================================
       PUBLIC WEBSITE
    ========================================= */

  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/properties",
        element: <SearchResults />,
      },
      {
        path: "/projects",
        element: <SearchResults />,
      },
      {
        path: "/new-launch",
        element: <SearchResults />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/property/:id",
        element: <PropertyDetails />,
      },

      {
        path: "/project/:id",
        element: <ProjectDetails />,
      },
    ],
  },

  /* =========================================
       ADMIN LOGIN
    ========================================= */

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  /* =========================================
       PROTECTED ADMIN AREA
    ========================================= */

  {
    element: <ProtectedAdminRoute />,

    children: [
      {
        path: "/admin",
        element: <AdminLayout />,

        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "properties",
            element: <AdminProperties />,
          },
          {
            path: "projects",
            element: <AdminProjects />,
          },
          {
            path: "categories",
            element: <AdminCategories />,
          },
          {
            path: "enquiries",
            element: <AdminEnquiries />,
          },
        ],
      },
    ],
  },
]);
