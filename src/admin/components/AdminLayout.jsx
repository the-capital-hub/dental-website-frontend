import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "../styles/admin.css";

const AdminLayout = ({
  children,
  title = "Dashboard",
  subtitle = "Welcome back to your clinic workspace.",
  activePage = "Dashboard",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(
      (previous) => !previous
    );
  };

  const handleMobileMenu = () => {
    setMobileSidebarOpen(
      (previous) => !previous
    );
  };

  return (
    <div className="admin-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <div
        className={
          mobileSidebarOpen
            ? "admin-sidebar-mobile-open"
            : ""
        }
      >
        <AdminSidebar
          activePage={activePage}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileSidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={() =>
            setMobileSidebarOpen(false)
          }
          aria-label="Close sidebar"
        />
      )}


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">

        <AdminHeader
          title={title}
          subtitle={subtitle}
          onMenuClick={handleMobileMenu}
        />


        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <div className="admin-page-content">
          {children}
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;