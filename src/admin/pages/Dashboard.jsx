import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  MoreHorizontal,
  TrendingUp,
  UserRound,
  Users,
  Sparkles,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Dashboard.css";

// =====================================================
// API
// =====================================================

const API_URL =
  "https://dental-website-backend.onrender.com/api/dashboard";

// =====================================================
// DASHBOARD
// =====================================================

const Dashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===================================================
  // GET ADMIN TOKEN
  // ===================================================

  const getAdminToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken")
    );
  };

  // ===================================================
  // CLEAR ADMIN SESSION
  // ===================================================

  const clearAdminSession = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");
  };

  // ===================================================
  // FETCH DASHBOARD DATA
  // ===================================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getAdminToken();

      // -----------------------------------------------
      // NO TOKEN
      // -----------------------------------------------

      if (!token) {
        window.location.href =
          "/admin/login";

        return;
      }

      // -----------------------------------------------
      // API REQUEST
      // -----------------------------------------------

      const response = await fetch(
        API_URL,
        {
          method: "GET",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const result =
        await response.json();

      // -----------------------------------------------
      // AUTH ERROR
      // -----------------------------------------------

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        clearAdminSession();

        window.location.href =
          "/admin/login";

        return;
      }

      // -----------------------------------------------
      // API ERROR
      // -----------------------------------------------

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to load dashboard"
        );
      }

      // -----------------------------------------------
      // SAVE DATA
      // -----------------------------------------------

      setDashboard(
        result.data || {}
      );

    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <AdminLayout
        title="Dashboard"
        subtitle="Welcome back to your clinic workspace."
        activePage="Dashboard"
      >
        <div className="dashboard">

          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >

            <div className="dashboard-stat-icon">
              <CalendarDays size={20} />
            </div>

            <h3>
              Loading dashboard...
            </h3>

            <p>
              Fetching the latest clinic data.
            </p>

          </div>

        </div>
      </AdminLayout>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <AdminLayout
        title="Dashboard"
        subtitle="Welcome back to your clinic workspace."
        activePage="Dashboard"
      >
        <div className="dashboard">

          <div
            style={{
              padding: "25px",
              borderRadius: "12px",
              background: "#fff5f4",
              border: "1px solid #ecd4d1",
              color: "#a24840",
            }}
          >

            <strong>
              Dashboard could not load
            </strong>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={fetchDashboard}
              style={{
                marginTop: "10px",
                padding: "9px 14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>

          </div>

        </div>
      </AdminLayout>
    );
  }

  // ===================================================
  // DATA
  // ===================================================

  const patients =
    dashboard?.patients || {};

  const leads =
    dashboard?.leads || {};

  const appointments =
    dashboard?.appointments || {};

  const upcomingAppointments =
    dashboard?.upcomingAppointments || [];

  const recentLeads =
    dashboard?.recentLeads || [];

  const recentPatients =
    dashboard?.recentPatients || [];

  // ===================================================
  // LEAD PIPELINE DATA
  // ===================================================

  const leadPipeline = [
    {
      label: "New",
      value: leads.new || 0,
    },
    {
      label: "Contacted",
      value: leads.contacted || 0,
    },
    {
      label: "Qualified",
      value: leads.qualified || 0,
    },
    {
      label: "Converted",
      value: leads.converted || 0,
    },
    {
      label: "Lost",
      value: leads.lost || 0,
    },
  ];

  // ===================================================
  // APPOINTMENT STATUS DATA
  // ===================================================

  const appointmentStatus = [
    {
      label: "Pending",
      value:
        appointments.pending || 0,
    },
    {
      label: "Confirmed",
      value:
        appointments.confirmed || 0,
    },
    {
      label: "Completed",
      value:
        appointments.completed || 0,
    },
    {
      label: "Cancelled",
      value:
        appointments.cancelled || 0,
    },
  ];

  const maxLeadValue =
    Math.max(
      ...leadPipeline.map(
        (item) => item.value
      ),
      1
    );

  const maxAppointmentValue =
    Math.max(
      ...appointmentStatus.map(
        (item) => item.value
      ),
      1
    );

  // ===================================================
  // DATE FORMAT
  // ===================================================

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  // ===================================================
  // TIME FORMAT
  // ===================================================

  const formatTime = (time) => {
    if (!time) {
      return "—";
    }

    return time;
  };

  // ===================================================
  // DATE FORMAT
  // ===================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "—";
    }
  };

  // ===================================================
  // STATUS CLASS
  // ===================================================

  const getAppointmentStatusClass =
    (status) => {

      switch (status) {
        case "Pending":
          return "dashboard-status-pending";

        case "Confirmed":
          return "dashboard-status-confirmed";

        case "Completed":
          return "dashboard-status-completed";

        case "Cancelled":
          return "dashboard-status-cancelled";

        default:
          return "";
      }
    };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Welcome back to your clinic workspace."
      activePage="Dashboard"
    >

      <div className="dashboard">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="dashboard-welcome">

          <div>

            <span className="dashboard-eyebrow">
              CLINIC OVERVIEW
            </span>

            <h2>
              Good morning, Admin
              <span>👋</span>
            </h2>

            <p>
              Here's what's happening at Oak & Ivory
              Dental today.
            </p>

          </div>

          <div className="dashboard-date">

            <CalendarDays size={15} />

            <span>
              {today}
            </span>

          </div>

        </section>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <section className="dashboard-stats">

          {/* APPOINTMENTS */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <CalendarDays size={17} />
              </div>

              <span className="dashboard-stat-change">
                Today
                <TrendingUp size={11} />
              </span>

            </div>

            <span className="dashboard-stat-label">
              Appointments
            </span>

            <strong className="dashboard-stat-value">
              {appointments.total || 0}
            </strong>

            <span className="dashboard-stat-note">
              {appointments.today || 0}
              {" "}
              scheduled for today
            </span>

          </div>

          {/* PATIENTS */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Users size={17} />
              </div>

              <span className="dashboard-stat-change">
                New
                <TrendingUp size={11} />
              </span>

            </div>

            <span className="dashboard-stat-label">
              Total Patients
            </span>

            <strong className="dashboard-stat-value">
              {patients.total || 0}
            </strong>

            <span className="dashboard-stat-note">
              {patients.newThisMonth || 0}
              {" "}
              new this month
            </span>

          </div>

          {/* LEADS */}

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <UserRound size={17} />
              </div>

              <span className="dashboard-stat-change">
                Active
                <TrendingUp size={11} />
              </span>

            </div>

            <span className="dashboard-stat-label">
              Total Leads
            </span>

            <strong className="dashboard-stat-value">
              {leads.total || 0}
            </strong>

            <span className="dashboard-stat-note">
              {leads.followUps || 0}
              {" "}
              waiting for follow-up
            </span>

          </div>

          {/* IVY */}

          <div className="dashboard-stat-card dashboard-stat-card-ivy">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon dashboard-stat-icon-ivy">
                <Sparkles size={17} />
              </div>

              <span className="dashboard-live">
                <span />
                LIVE
              </span>

            </div>

            <span className="dashboard-stat-label">
              Ivy Conversations
            </span>

            <strong className="dashboard-stat-value">
              16
            </strong>

            <span className="dashboard-stat-note">
              AI receptionist activity
            </span>

          </div>

        </section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <section className="dashboard-main-grid">

          {/* =================================================
              TODAY'S APPOINTMENTS
          ================================================= */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <span className="dashboard-panel-label">
                  TODAY
                </span>

                <h3>
                  Upcoming appointments
                </h3>

              </div>

              <a
                href="/admin/appointments"
                className="dashboard-view-link"
              >
                View all
                <ArrowUpRight size={13} />
              </a>

            </div>

            <div className="dashboard-appointments">

              {upcomingAppointments.length === 0 ? (

                <div
                  style={{
                    padding: "30px 10px",
                    textAlign: "center",
                  }}
                >

                  <CalendarDays size={22} />

                  <p>
                    No appointments scheduled for today.
                  </p>

                </div>

              ) : (

                upcomingAppointments.map(
                  (appointment) => (

                    <div
                      className="dashboard-appointment"
                      key={appointment._id}
                    >

                      {/* TIME */}

                      <div className="dashboard-appointment-time">

                        <Clock3 size={13} />

                        <span>
                          {formatTime(
                            appointment.appointmentTime
                          )}
                        </span>

                      </div>

                      {/* PATIENT */}

                      <div className="dashboard-patient">

                        <div className="dashboard-patient-avatar">

                          {(
                            appointment.patient?.name ||
                            appointment.patientName ||
                            "P"
                          )
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <strong>
                            {appointment.patient?.name ||
                              appointment.patientName ||
                              "Unknown Patient"}
                          </strong>

                          <span>
                            {appointment.service ||
                              "General Consultation"}
                          </span>

                        </div>

                      </div>

                      {/* DOCTOR */}

                      <div className="dashboard-doctor">

                        {appointment.doctor ||
                          "Any available dentist"}

                      </div>

                      {/* STATUS */}

                      <span
                        className={`dashboard-status ${getAppointmentStatusClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      {/* MORE */}

                      <button
                        type="button"
                        className="dashboard-more"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                    </div>

                  )
                )

              )}

            </div>

          </div>

          {/* =================================================
              IVY PANEL
          ================================================= */}

          <div className="dashboard-panel dashboard-ivy-panel">

            <div className="dashboard-panel-header">

              <div>

                <span className="dashboard-panel-label">
                  AI ASSISTANT
                </span>

                <h3>
                  Ivy activity
                </h3>

              </div>

              <div className="dashboard-ivy-badge">

                <span />

                Active

              </div>

            </div>

            <div className="dashboard-ivy-summary">

              <div className="dashboard-ivy-big-icon">
                <Sparkles size={22} />
              </div>

              <div>

                <strong>
                  16
                </strong>

                <span>
                  conversations today
                </span>

              </div>

            </div>

            <div className="dashboard-ivy-metrics">

              <div>

                <strong>
                  8
                </strong>

                <span>
                  Booked
                </span>

              </div>

              <div>

                <strong>
                  {leads.followUps || 0}
                </strong>

                <span>
                  Follow-ups
                </span>

              </div>

              <div>

                <strong>
                  {leads.conversionRate || 0}%
                </strong>

                <span>
                  Conversion
                </span>

              </div>

            </div>

            <a
              href="/admin/ivy-conversations"
              className="dashboard-ivy-link"
            >
              View Ivy conversations
              <ArrowUpRight size={13} />
            </a>

          </div>

        </section>

        {/* =================================================
            LOWER GRID
        ================================================= */}

        <section className="dashboard-lower-grid">

          {/* =================================================
              LEAD PIPELINE
          ================================================= */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <span className="dashboard-panel-label">
                  LEADS
                </span>

                <h3>
                  Lead pipeline
                </h3>

              </div>

              <span className="dashboard-panel-total">
                {leads.total || 0} total
              </span>

            </div>

            <div className="dashboard-pipeline">

              {leadPipeline.map(
                (item) => {

                  const percentage =
                    Math.round(
                      (item.value /
                        maxLeadValue) *
                        100
                    );

                  return (
                    <div
                      className="dashboard-pipeline-row"
                      key={item.label}
                    >

                      <div className="dashboard-pipeline-label">

                        <span>
                          {item.label}
                        </span>

                        <strong>
                          {item.value}
                        </strong>

                      </div>

                      <div className="dashboard-pipeline-bar">

                        <span
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              APPOINTMENT STATUS
          ================================================= */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <span className="dashboard-panel-label">
                  APPOINTMENTS
                </span>

                <h3>
                  Appointment status
                </h3>

              </div>

              <span className="dashboard-panel-total">
                {appointments.total || 0} total
              </span>

            </div>

            <div className="dashboard-pipeline">

              {appointmentStatus.map(
                (item) => {

                  const percentage =
                    Math.round(
                      (item.value /
                        maxAppointmentValue) *
                        100
                    );

                  return (
                    <div
                      className="dashboard-pipeline-row"
                      key={item.label}
                    >

                      <div className="dashboard-pipeline-label">

                        <span>
                          {item.label}
                        </span>

                        <strong>
                          {item.value}
                        </strong>

                      </div>

                      <div className="dashboard-pipeline-bar">

                        <span
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            RECENT LEADS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="dashboard-panel-label">
                RECENT ACTIVITY
              </span>

              <h3>
                Recent leads
              </h3>

            </div>

            <a
              href="/admin/leads"
              className="dashboard-view-link"
            >
              View all
              <ArrowUpRight size={13} />
            </a>

          </div>

          <div className="dashboard-recent-list">

            {recentLeads.length === 0 ? (

              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                <MessageCircle size={22} />

                <p>
                  No recent leads.
                </p>
              </div>

            ) : (

              recentLeads.map(
                (lead) => (

                  <div
                    className="dashboard-recent-item"
                    key={lead._id}
                  >

                    <div className="dashboard-patient-avatar">

                      {(
                        lead.name ||
                        "L"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div className="dashboard-recent-info">

                      <strong>
                        {lead.name ||
                          "Unknown Lead"}
                      </strong>

                      <span>
                        {lead.service ||
                          "Dental enquiry"}
                      </span>

                    </div>

                    <div className="dashboard-recent-source">

                      {lead.source ||
                        "Website"}

                    </div>

                    <span
                      className={`dashboard-status ${
                        lead.status === "Converted"
                          ? "dashboard-status-completed"
                          : lead.status === "New"
                          ? "dashboard-status-pending"
                          : ""
                      }`}
                    >
                      {lead.status ||
                        "New"}
                    </span>

                    <span className="dashboard-recent-date">
                      {formatDate(
                        lead.createdAt
                      )}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </section>

        {/* =================================================
            RECENT PATIENTS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="dashboard-panel-label">
                PATIENTS
              </span>

              <h3>
                Recent patients
              </h3>

            </div>

            <a
              href="/admin/patients"
              className="dashboard-view-link"
            >
              View all
              <ArrowUpRight size={13} />
            </a>

          </div>

          <div className="dashboard-recent-list">

            {recentPatients.length === 0 ? (

              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >

                <Users size={22} />

                <p>
                  No recent patients.
                </p>

              </div>

            ) : (

              recentPatients.map(
                (patient) => (

                  <div
                    className="dashboard-recent-item"
                    key={patient._id}
                  >

                    <div className="dashboard-patient-avatar">

                      {(
                        patient.name ||
                        "P"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div className="dashboard-recent-info">

                      <strong>
                        {patient.name ||
                          "Unknown Patient"}
                      </strong>

                      <span>
                        {patient.treatment ||
                          "General Dentistry"}
                      </span>

                    </div>

                    <div className="dashboard-recent-source">

                      {patient.phone ||
                        "No phone"}

                    </div>

                    <span
                      className={`dashboard-status ${
                        patient.status === "Active"
                          ? "dashboard-status-confirmed"
                          : ""
                      }`}
                    >
                      {patient.status ||
                        "Active"}
                    </span>

                    <span className="dashboard-recent-date">
                      {formatDate(
                        patient.createdAt
                      )}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </section>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;