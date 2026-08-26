import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  Plus,
  Search,
  Stethoscope,
  Users,
  X,
  Pencil,
  Trash2,
  LoaderCircle,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Doctors.css";

const API_URL = "https://dental-website-backend.onrender.com/api/doctors";

const emptyForm = {
  name: "",
  specialization: "",
  experience: "",
  phone: "",
  email: "",
  schedule: "",
  timing: "",
};

const DoctorsA = () => {
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [editingDoctor, setEditingDoctor] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token") ||
      ""
    );
  };

  // =====================================================
  // AUTH HEADERS
  // =====================================================

  const getHeaders = () => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchDoctors();
  }, []);

  // =====================================================
  // FETCH DOCTORS
  // =====================================================

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session not found. Please login again."
        );
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch doctors"
        );
      }

      setDoctors(result.data || []);
    } catch (error) {
      console.error(
        "Fetch Doctors Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load doctors."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredDoctors = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return doctors;
    }

    return doctors.filter((doctor) => {
      const name =
        doctor.name?.toLowerCase() || "";

      const specialization =
        doctor.specialization?.toLowerCase() ||
        "";

      const email =
        doctor.email?.toLowerCase() || "";

      return (
        name.includes(value) ||
        specialization.includes(value) ||
        email.includes(value)
      );
    });
  }, [doctors, search]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const activeDoctors = doctors.filter(
    (doctor) =>
      doctor.status === "Active"
  ).length;

  const totalPatients = doctors.reduce(
    (total, doctor) =>
      total +
      Number(doctor.patients || 0),
    0
  );

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingDoctor(null);
    setShowForm(false);
  };

  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setError("");
    setSuccess("");

    setEditingDoctor(null);

    setFormData(emptyForm);

    setShowForm(true);
  };

  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const openEditForm = (doctor) => {
    setError("");
    setSuccess("");

    setEditingDoctor(doctor);

    setFormData({
      name: doctor.name || "",
      specialization:
        doctor.specialization || "",
      experience:
        doctor.experience !== undefined &&
        doctor.experience !== null
          ? String(doctor.experience)
          : "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      schedule:
        doctor.schedule || "",
      timing:
        doctor.timing || "",
    });

    setSelectedDoctor(null);

    setShowForm(true);
  };

  // =====================================================
  // CREATE / UPDATE DOCTOR
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.specialization.trim()
    ) {
      setError(
        "Doctor name and specialization are required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const experienceValue =
        formData.experience.trim() === ""
          ? 0
          : Number(
              formData.experience
                .replace(/[^\d.]/g, "")
            );

      if (
        Number.isNaN(experienceValue)
      ) {
        throw new Error(
          "Experience must be a valid number."
        );
      }

      const payload = {
        name: formData.name.trim(),

        specialization:
          formData.specialization.trim(),

        experience:
          experienceValue,

        phone:
          formData.phone.trim(),

        email:
          formData.email.trim(),

        schedule:
          formData.schedule.trim() ||
          "Mon - Fri",

        timing:
          formData.timing.trim() ||
          "09:00 AM - 05:00 PM",
      };

      let response;

      if (editingDoctor) {
        response = await fetch(
          `${API_URL}/${editingDoctor._id}`,
          {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(
              payload
            ),
          }
        );
      } else {
        response = await fetch(
          API_URL,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(
              payload
            ),
          }
        );
      }

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save doctor"
        );
      }

      if (editingDoctor) {
        setDoctors((previous) =>
          previous.map((doctor) =>
            doctor._id ===
            editingDoctor._id
              ? result.data
              : doctor
          )
        );

        setSuccess(
          "Doctor updated successfully."
        );
      } else {
        setDoctors((previous) => [
          result.data,
          ...previous,
        ]);

        setSuccess(
          "Doctor added successfully."
        );
      }

      resetForm();

      // Keep success message visible
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "Save Doctor Error:",
        error
      );

      setError(
        error.message ||
          "Failed to save doctor."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE DOCTOR
  // =====================================================

  const handleDelete = async (doctor) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${doctor.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(doctor._id);

      setError("");
      setSuccess("");

      const response =
        await fetch(
          `${API_URL}/${doctor._id}`,
          {
            method: "DELETE",
            headers: getHeaders(),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete doctor"
        );
      }

      setDoctors((previous) =>
        previous.filter(
          (item) =>
            item._id !== doctor._id
        )
      );

      if (
        selectedDoctor?._id ===
        doctor._id
      ) {
        setSelectedDoctor(null);
      }

      setSuccess(
        "Doctor deleted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "Delete Doctor Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete doctor."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus = async (doctor) => {
    try {
      setError("");
      setSuccess("");

      const newStatus =
        doctor.status === "Active"
          ? "Inactive"
          : "Active";

      const response =
        await fetch(
          `${API_URL}/${doctor._id}`,
          {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update status"
        );
      }

      setDoctors((previous) =>
        previous.map((item) =>
          item._id === doctor._id
            ? result.data
            : item
        )
      );

      setSuccess(
        `Doctor marked ${newStatus}.`
      );

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      console.error(
        "Toggle Status Error:",
        error
      );

      setError(
        error.message ||
          "Failed to update status."
      );
    }
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return "DR";
    }

    const parts = name
      .replace(/^Dr\.\s*/i, "")
      .trim()
      .split(/\s+/);

    return parts
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .toUpperCase();
  };

  // =====================================================
  // FORMAT EXPERIENCE
  // =====================================================

  const formatExperience = (
    experience
  ) => {
    if (
      experience === undefined ||
      experience === null ||
      experience === ""
    ) {
      return "0 years";
    }

    return `${experience} years`;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <AdminLayout
      title="Doctors"
      subtitle="Manage your dental team and availability."
      activePage="Doctors"
    >
      <div className="doctors-page">

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="admin-alert admin-alert-error">
            {error}

            <button
              type="button"
              onClick={() =>
                setError("")
              }
            >
              <X size={15} />
            </button>
          </div>
        )}

        {success && (
          <div className="admin-alert admin-alert-success">
            {success}

            <button
              type="button"
              onClick={() =>
                setSuccess("")
              }
            >
              <X size={15} />
            </button>
          </div>
        )}


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="doctors-page-header">

          <div>
            <span className="doctors-eyebrow">
              CLINIC TEAM
            </span>

            <h2>
              Our Doctors
            </h2>

            <p>
              Manage doctors, specialties and
              clinic availability.
            </p>
          </div>

          <button
            type="button"
            className="doctors-add-button"
            onClick={
              openAddForm
            }
          >
            <Plus size={16} />

            <span>
              Add Doctor
            </span>
          </button>

        </section>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="doctors-summary">

          <div className="doctors-summary-card">

            <div className="doctors-summary-icon">
              <Stethoscope size={17} />
            </div>

            <div>
              <span>
                Total Doctors
              </span>

              <strong>
                {doctors.length}
              </strong>
            </div>

          </div>


          <div className="doctors-summary-card">

            <div className="doctors-summary-icon">
              <Users size={17} />
            </div>

            <div>
              <span>
                Active Doctors
              </span>

              <strong>
                {activeDoctors}
              </strong>
            </div>

          </div>


          <div className="doctors-summary-card">

            <div className="doctors-summary-icon">
              <CalendarDays size={17} />
            </div>

            <div>
              <span>
                Patients Managed
              </span>

              <strong>
                {totalPatients}
              </strong>
            </div>

          </div>

        </section>


        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="doctors-toolbar">

          <div className="doctors-search">

            <Search size={16} />

            <input
              type="search"
              placeholder="Search doctor or specialization..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={14} />
              </button>
            )}

          </div>

        </section>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="doctors-empty">

            <LoaderCircle
              size={28}
              className="doctors-loading-icon"
            />

            <h3>
              Loading doctors...
            </h3>

            <p>
              Fetching your clinic team.
            </p>

          </div>
        ) : (
          <>
            {/* =============================================
                DOCTOR CARDS
            ============================================= */}

            <section className="doctors-grid">

              {filteredDoctors.map(
                (doctor) => (

                  <article
                    className="doctor-card"
                    key={doctor._id}
                  >

                    <div className="doctor-card-top">

                      <div className="doctor-avatar">
                        {getInitials(
                          doctor.name
                        )}
                      </div>

                      <button
                        type="button"
                        className={`doctor-status ${
                          doctor.status ===
                          "Active"
                            ? "doctor-status-active"
                            : "doctor-status-inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(
                            doctor
                          )
                        }
                      >
                        <span />
                        {doctor.status ||
                          "Active"}
                      </button>

                    </div>


                    <div className="doctor-info">

                      <h3>
                        {doctor.name}
                      </h3>

                      <p>
                        {
                          doctor.specialization
                        }
                      </p>

                    </div>


                    <div className="doctor-meta">

                      <div>
                        <span>
                          EXPERIENCE
                        </span>

                        <strong>
                          {formatExperience(
                            doctor.experience
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          PATIENTS
                        </span>

                        <strong>
                          {doctor.patients ||
                            0}
                        </strong>
                      </div>

                    </div>


                    <div className="doctor-schedule">

                      <div>
                        <CalendarDays
                          size={13}
                        />

                        <span>
                          {doctor.schedule ||
                            "Mon - Fri"}
                        </span>
                      </div>

                      <div>
                        <Clock3
                          size={13}
                        />

                        <span>
                          {doctor.timing ||
                            "09:00 AM - 05:00 PM"}
                        </span>
                      </div>

                    </div>


                    {/* =======================================
                        CARD ACTIONS
                    ======================================= */}

                    <div className="doctor-card-footer">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDoctor(
                            doctor
                          )
                        }
                      >
                        View profile

                        <ArrowUpRight
                          size={13}
                        />
                      </button>

                      <div className="doctor-card-actions">

                        <button
                          type="button"
                          title="Edit doctor"
                          onClick={() =>
                            openEditForm(
                              doctor
                            )
                          }
                        >
                          <Pencil
                            size={14}
                          />
                        </button>

                        <button
                          type="button"
                          title="Delete doctor"
                          disabled={
                            deletingId ===
                            doctor._id
                          }
                          onClick={() =>
                            handleDelete(
                              doctor
                            )
                          }
                        >
                          {deletingId ===
                          doctor._id ? (
                            <LoaderCircle
                              size={14}
                              className="doctors-loading-icon"
                            />
                          ) : (
                            <Trash2
                              size={14}
                            />
                          )}
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </section>


            {/* =============================================
                EMPTY
            ============================================= */}

            {filteredDoctors.length ===
              0 && (
                <div className="doctors-empty">

                  <div className="doctors-empty-icon">
                    <Stethoscope
                      size={22}
                    />
                  </div>

                  <h3>
                    No doctors found
                  </h3>

                  <p>
                    {search
                      ? "Try changing your search."
                      : "Add your first doctor to get started."}
                  </p>

                </div>
              )}
          </>
        )}


        {/* =================================================
            DOCTOR PROFILE MODAL
        ================================================= */}

        {selectedDoctor && (

          <div
            className="doctor-modal-overlay"
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedDoctor(
                  null
                );
              }
            }}
          >

            <div className="doctor-modal">

              <div className="doctor-modal-header">

                <div>
                  <span>
                    DOCTOR PROFILE
                  </span>

                  <h3>
                    Team member
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDoctor(
                      null
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <div className="doctor-profile">

                <div className="doctor-profile-avatar">
                  {getInitials(
                    selectedDoctor.name
                  )}
                </div>

                <div>

                  <h4>
                    {
                      selectedDoctor.name
                    }
                  </h4>

                  <p>
                    {
                      selectedDoctor.specialization
                    }
                  </p>

                </div>

              </div>


              <div className="doctor-profile-grid">

                <div>
                  <span>
                    Experience
                  </span>

                  <strong>
                    {formatExperience(
                      selectedDoctor.experience
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Patients
                  </span>

                  <strong>
                    {selectedDoctor.patients ||
                      0}
                  </strong>
                </div>

                <div>
                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedDoctor.phone ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>
                    Email
                  </span>

                  <strong>
                    {selectedDoctor.email ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>
                    Schedule
                  </span>

                  <strong>
                    {selectedDoctor.schedule ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>
                    Timing
                  </span>

                  <strong>
                    {selectedDoctor.timing ||
                      "Not provided"}
                  </strong>
                </div>

              </div>


              <div className="doctor-modal-footer">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDoctor(
                      null
                    )
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openEditForm(
                      selectedDoctor
                    )
                  }
                >
                  Edit doctor
                  <Pencil size={13} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedDoctor
                    )
                  }
                >
                  Delete
                  <Trash2 size={13} />
                </button>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            ADD / EDIT DOCTOR MODAL
        ================================================= */}

        {showForm && (

          <div
            className="doctor-modal-overlay"
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                resetForm();
              }
            }}
          >

            <div className="doctor-modal">

              <div className="doctor-modal-header">

                <div>
                  <span>
                    TEAM MANAGEMENT
                  </span>

                  <h3>
                    {editingDoctor
                      ? "Edit doctor"
                      : "Add doctor"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <form
                className="doctor-form"
                onSubmit={
                  handleSubmit
                }
              >

                <div className="doctor-form-grid">

                  {/* NAME */}

                  <div className="doctor-form-field">

                    <label>
                      Doctor name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Dr. John Smith"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>


                  {/* SPECIALIZATION */}

                  <div className="doctor-form-field">

                    <label>
                      Specialization
                    </label>

                    <input
                      type="text"
                      name="specialization"
                      placeholder="Orthodontist"
                      value={
                        formData.specialization
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>


                  {/* EXPERIENCE */}

                  <div className="doctor-form-field">

                    <label>
                      Experience
                    </label>

                    <input
                      type="number"
                      name="experience"
                      min="0"
                      placeholder="5"
                      value={
                        formData.experience
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>


                  {/* PHONE */}

                  <div className="doctor-form-field">

                    <label>
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="doctor-form-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="doctor@clinic.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>


                  {/* SCHEDULE */}

                  <div className="doctor-form-field">

                    <label>
                      Schedule
                    </label>

                    <input
                      type="text"
                      name="schedule"
                      placeholder="Mon - Sat"
                      value={
                        formData.schedule
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>


                  {/* TIMING */}

                  <div className="doctor-form-field doctor-form-full">

                    <label>
                      Clinic timing
                    </label>

                    <input
                      type="text"
                      name="timing"
                      placeholder="09:00 AM - 05:00 PM"
                      value={
                        formData.timing
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>


                <div className="doctor-form-actions">

                  <button
                    type="button"
                    className="doctor-form-cancel"
                    onClick={
                      resetForm
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="doctor-form-submit"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <LoaderCircle
                          size={14}
                          className="doctors-loading-icon"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        {editingDoctor
                          ? "Update Doctor"
                          : "Add Doctor"}

                        {editingDoctor ? (
                          <Pencil
                            size={14}
                          />
                        ) : (
                          <Plus
                            size={14}
                          />
                        )}
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default DoctorsA;