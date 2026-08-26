import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Stethoscope,
  Users,
  UserRound,
  Star,
  Sparkles,
} from "lucide-react";

import "../styles/admin.css";

const AdminSidebar = ({
  activePage = "Dashboard",
  collapsed = false,
  onToggle,
}) => {
  const mainMenu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      label: "Appointments",
      icon: CalendarDays,
      href: "/admin/appointments",
    },
    {
      label: "Leads",
      icon: ClipboardList,
      href: "/admin/leads",
    },
    {
      label: "Patients",
      icon: Users,
      href: "/admin/patients",
    },
    {
      label: "Doctors",
      icon: UserRound,
      href: "/admin/doctors",
    },
    {
      label: "Ivy Conversations",
      icon: MessageCircle,
      href: "/admin/ivy-conversations",
    },
    {
      label: "Reviews",
      icon: Star,
      href: "/admin/reviews",
    },
    {
      label: "Services",
      icon: Stethoscope,
      href: "/admin/services",
    },
  ];

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside
      className={`admin-sidebar ${
        collapsed ? "admin-sidebar-collapsed" : ""
      }`}
    >

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="admin-sidebar-top">

        <a
          href="/admin/dashboard"
          className="admin-sidebar-logo"
        >
          <span className="admin-sidebar-logo-mark">
            O
          </span>

          {!collapsed && (
            <span className="admin-sidebar-logo-text">
              <strong>Oak & Ivory</strong>
              <small>CLINICOS</small>
            </span>
          )}
        </a>


        {/* Collapse Button */}

        <button
          type="button"
          className="admin-sidebar-collapse"
          onClick={onToggle}
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>

      </div>


      {/* =====================================================
          CLINIC STATUS
      ===================================================== */}

      {!collapsed && (
        <div className="admin-sidebar-status">

          <div className="admin-sidebar-status-dot" />

          <div>
            <strong>Clinic online</strong>
            <span>Oak & Ivory Dental</span>
          </div>

        </div>
      )}


      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}

      <div className="admin-sidebar-section">

        {!collapsed && (
          <span className="admin-sidebar-section-title">
            WORKSPACE
          </span>
        )}

        <nav className="admin-sidebar-nav">

          {mainMenu.map((item) => {

            const Icon = item.icon;

            const isActive =
              activePage.toLowerCase() ===
              item.label.toLowerCase();

            return (
              <a
                key={item.label}
                href={item.href}
                className={`admin-sidebar-link ${
                  isActive
                    ? "admin-sidebar-link-active"
                    : ""
                }`}
                title={
                  collapsed
                    ? item.label
                    : undefined
                }
              >

                <span className="admin-sidebar-link-icon">
                  <Icon size={17} />
                </span>

                {!collapsed && (
                  <>
                    <span className="admin-sidebar-link-text">
                      {item.label}
                    </span>

                    {isActive && (
                      <span className="admin-sidebar-active-dot" />
                    )}
                  </>
                )}

              </a>
            );
          })}

        </nav>

      </div>


      {/* =====================================================
          AI IVY CARD
      ===================================================== */}

      {!collapsed && (
        <div className="admin-sidebar-ivy">

          <div className="admin-sidebar-ivy-icon">
            <Sparkles size={16} />
          </div>

          <div className="admin-sidebar-ivy-content">

            <span>AI ASSISTANT</span>

            <strong>
              Ivy is ready
            </strong>

            <small>
              Conversations are active
            </small>

          </div>

          <span className="admin-sidebar-ivy-status" />

        </div>
      )}


      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <div className="admin-sidebar-bottom">

        <a
          href="/admin/settings"
          className={`admin-sidebar-link ${
            activePage.toLowerCase() ===
            "settings"
              ? "admin-sidebar-link-active"
              : ""
          }`}
          title={
            collapsed
              ? "Settings"
              : undefined
          }
        >

          <span className="admin-sidebar-link-icon">
            <Settings size={17} />
          </span>

          {!collapsed && (
            <span className="admin-sidebar-link-text">
              Settings
            </span>
          )}

        </a>


        <button
          type="button"
          className="admin-sidebar-logout"
          onClick={handleLogout}
          title={
            collapsed
              ? "Logout"
              : undefined
          }
        >

          <span className="admin-sidebar-link-icon">
            <LogOut size={17} />
          </span>

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;