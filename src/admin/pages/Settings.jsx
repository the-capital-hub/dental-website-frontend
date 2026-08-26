import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  Clock3,
  Mail,
  Phone,
  Save,
  Settings as SettingsIcon,
  Sparkles,
  UserRound,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] =
    useState("clinic");

  const [saved, setSaved] =
    useState(false);

  const [clinic, setClinic] = useState({
    clinicName: "Oak & Ivory Dental",
    email: "hello@oakivory.com",
    phone: "+91 98765 43210",
    address:
      "123 Dental Avenue, New Delhi, India",
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  });

  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@oakivory.com",
    phone: "+91 98765 43210",
  });

  const [ivy, setIvy] = useState({
    enabled: true,
    greeting:
      "Hi! I'm Ivy, your virtual dental assistant. How can I help you today?",
    autoBooking: true,
    afterHours: true,
  });

  const [notifications, setNotifications] =
    useState({
      appointments: true,
      newLeads: true,
      reviews: true,
      ivyConversations: true,
    });

  const handleClinicChange = (event) => {
    const { name, value } =
      event.target;

    setClinic((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleAdminChange = (event) => {
    const { name, value } =
      event.target;

    setAdmin((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleIvyChange = (event) => {
    const { name, value } =
      event.target;

    setIvy((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const toggleIvy = () => {
    setIvy((previous) => ({
      ...previous,
      enabled: !previous.enabled,
    }));

    setSaved(false);
  };

  const toggleIvyOption = (name) => {
    setIvy((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const toggleNotification = (name) => {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <AdminLayout
      title="Settings"
      subtitle="Manage your clinic and admin preferences."
      activePage="Settings"
    >
      <div className="settings-page">

        {/* HEADER */}

        <section className="settings-header">

          <div>
            <span className="settings-eyebrow">
              ADMIN SETTINGS
            </span>

            <h2>
              Settings
            </h2>

            <p>
              Configure your clinic, Ivy and
              notification preferences.
            </p>
          </div>

          <button
            type="button"
            className={`settings-save-button ${
              saved
                ? "settings-saved"
                : ""
            }`}
            onClick={handleSave}
          >
            {saved ? (
              <>
                <Check size={15} />
                Saved
              </>
            ) : (
              <>
                <Save size={15} />
                Save Changes
              </>
            )}
          </button>

        </section>


        {/* SETTINGS LAYOUT */}

        <section className="settings-layout">

          {/* SIDEBAR */}

          <aside className="settings-sidebar">

            <button
              type="button"
              className={
                activeTab === "clinic"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("clinic")
              }
            >
              <Building2 size={15} />
              Clinic
            </button>


            <button
              type="button"
              className={
                activeTab === "admin"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("admin")
              }
            >
              <UserRound size={15} />
              Admin Profile
            </button>


            <button
              type="button"
              className={
                activeTab === "ivy"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("ivy")
              }
            >
              <Sparkles size={15} />
              Ivy
            </button>


            <button
              type="button"
              className={
                activeTab === "notifications"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "notifications"
                )
              }
            >
              <Bell size={15} />
              Notifications
            </button>

          </aside>


          {/* CONTENT */}

          <main className="settings-content">

            {/* CLINIC */}

            {activeTab === "clinic" && (

              <div className="settings-section">

                <div className="settings-section-header">

                  <div className="settings-section-icon">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <h3>
                      Clinic Information
                    </h3>

                    <p>
                      Basic information about
                      your dental clinic.
                    </p>
                  </div>

                </div>


                <div className="settings-form-grid">

                  <div className="settings-field">

                    <label>
                      Clinic name
                    </label>

                    <input
                      type="text"
                      name="clinicName"
                      value={
                        clinic.clinicName
                      }
                      onChange={
                        handleClinicChange
                      }
                    />

                  </div>


                  <div className="settings-field">

                    <label>
                      Email address
                    </label>

                    <div className="settings-input-icon">

                      <Mail size={14} />

                      <input
                        type="email"
                        name="email"
                        value={clinic.email}
                        onChange={
                          handleClinicChange
                        }
                      />

                    </div>

                  </div>


                  <div className="settings-field">

                    <label>
                      Phone number
                    </label>

                    <div className="settings-input-icon">

                      <Phone size={14} />

                      <input
                        type="tel"
                        name="phone"
                        value={clinic.phone}
                        onChange={
                          handleClinicChange
                        }
                      />

                    </div>

                  </div>


                  <div className="settings-field">

                    <label>
                      Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={clinic.address}
                      onChange={
                        handleClinicChange
                      }
                    />

                  </div>


                  <div className="settings-field">

                    <label>
                      Opening time
                    </label>

                    <div className="settings-input-icon">

                      <Clock3 size={14} />

                      <input
                        type="text"
                        name="openingTime"
                        value={
                          clinic.openingTime
                        }
                        onChange={
                          handleClinicChange
                        }
                      />

                    </div>

                  </div>


                  <div className="settings-field">

                    <label>
                      Closing time
                    </label>

                    <div className="settings-input-icon">

                      <Clock3 size={14} />

                      <input
                        type="text"
                        name="closingTime"
                        value={
                          clinic.closingTime
                        }
                        onChange={
                          handleClinicChange
                        }
                      />

                    </div>

                  </div>

                </div>


                <div className="settings-field settings-full-field">

                  <label>
                    Clinic address
                  </label>

                  <textarea
                    name="address"
                    rows="3"
                    value={clinic.address}
                    onChange={
                      handleClinicChange
                    }
                  />

                </div>

              </div>

            )}


            {/* ADMIN */}

            {activeTab === "admin" && (

              <div className="settings-section">

                <div className="settings-section-header">

                  <div className="settings-section-icon">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <h3>
                      Admin Profile
                    </h3>

                    <p>
                      Manage your administrator
                      account information.
                    </p>
                  </div>

                </div>


                <div className="settings-profile-card">

                  <div className="settings-profile-avatar">
                    {admin.name.charAt(0)}
                  </div>

                  <div>
                    <strong>
                      {admin.name}
                    </strong>

                    <span>
                      Clinic Administrator
                    </span>
                  </div>

                </div>


                <div className="settings-form-grid">

                  <div className="settings-field">

                    <label>
                      Full name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={admin.name}
                      onChange={
                        handleAdminChange
                      }
                    />

                  </div>


                  <div className="settings-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={admin.email}
                      onChange={
                        handleAdminChange
                      }
                    />

                  </div>


                  <div className="settings-field">

                    <label>
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={admin.phone}
                      onChange={
                        handleAdminChange
                      }
                    />

                  </div>

                </div>

              </div>

            )}


            {/* IVY */}

            {activeTab === "ivy" && (

              <div className="settings-section">

                <div className="settings-section-header">

                  <div className="settings-section-icon ivy-setting-icon">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <h3>
                      Ivy Settings
                    </h3>

                    <p>
                      Configure your AI receptionist.
                    </p>
                  </div>

                </div>


                <div className="ivy-main-toggle">

                  <div>

                    <strong>
                      Enable Ivy
                    </strong>

                    <span>
                      Allow Ivy to handle
                      patient conversations.
                    </span>

                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      ivy.enabled
                        ? "on"
                        : ""
                    }`}
                    onClick={toggleIvy}
                  >
                    <span />
                  </button>

                </div>


                <div className="settings-field">

                  <label>
                    Ivy greeting
                  </label>

                  <textarea
                    rows="4"
                    value={ivy.greeting}
                    name="greeting"
                    onChange={
                      handleIvyChange
                    }
                  />

                </div>


                <div className="settings-options">

                  <div className="settings-option">

                    <div>
                      <strong>
                        Automatic appointment booking
                      </strong>

                      <span>
                        Let Ivy book appointments
                        automatically.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        ivy.autoBooking
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleIvyOption(
                          "autoBooking"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>


                  <div className="settings-option">

                    <div>
                      <strong>
                        After-hours support
                      </strong>

                      <span>
                        Allow Ivy to respond
                        outside clinic hours.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        ivy.afterHours
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleIvyOption(
                          "afterHours"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>

                </div>

              </div>

            )}


            {/* NOTIFICATIONS */}

            {activeTab ===
              "notifications" && (

              <div className="settings-section">

                <div className="settings-section-header">

                  <div className="settings-section-icon">
                    <Bell size={18} />
                  </div>

                  <div>
                    <h3>
                      Notifications
                    </h3>

                    <p>
                      Choose which clinic
                      updates you want to receive.
                    </p>
                  </div>

                </div>


                <div className="settings-options">

                  <div className="settings-option">

                    <div>
                      <strong>
                        Appointment notifications
                      </strong>

                      <span>
                        Get notified about new
                        and updated appointments.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        notifications.appointments
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleNotification(
                          "appointments"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>


                  <div className="settings-option">

                    <div>
                      <strong>
                        New lead notifications
                      </strong>

                      <span>
                        Get notified when Ivy
                        captures a new lead.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        notifications.newLeads
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleNotification(
                          "newLeads"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>


                  <div className="settings-option">

                    <div>
                      <strong>
                        Review notifications
                      </strong>

                      <span>
                        Get notified when a patient
                        submits a review.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        notifications.reviews
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleNotification(
                          "reviews"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>


                  <div className="settings-option">

                    <div>
                      <strong>
                        Ivy conversation notifications
                      </strong>

                      <span>
                        Get notified about important
                        Ivy conversations.
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`settings-toggle ${
                        notifications.ivyConversations
                          ? "on"
                          : ""
                      }`}
                      onClick={() =>
                        toggleNotification(
                          "ivyConversations"
                        )
                      }
                    >
                      <span />
                    </button>

                  </div>

                </div>

              </div>

            )}

          </main>

        </section>

      </div>
    </AdminLayout>
  );
};

export default Settings;