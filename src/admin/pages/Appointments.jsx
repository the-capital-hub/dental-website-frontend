import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  MoreHorizontal,
  Plus,
  Search,
  UserRound,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Appointments.css";

// =====================================================
// API
// =====================================================

const API_URL =
  "https://dental-website-backend.onrender.com/api/appointments";

const PATIENT_API_URL =
  "https://dental-website-backend.onrender.com/api/patients";

// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [
  "All",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

// =====================================================
// INITIAL FORM
// =====================================================

const initialFormData = {
  patientId: "",
  patient: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  treatment: "",
  doctor: "",
  message: "",
};

// =====================================================
// AUTH
// =====================================================

const getAdminToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken")
  );
};

const getAuthHeaders = () => {
  const token = getAdminToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const clearAdminSession = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");

  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminData");
};

const redirectToLogin = () => {
  clearAdminSession();

  window.location.href =
    "/admin/login";
};


// =====================================================
// COMPONENT
// =====================================================

const Appointments = () => {

  // ===================================================
  // STATE
  // ===================================================

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [appointments, setAppointments] =
    useState([]);

  const [patients, setPatients] =
    useState([]);

  const [formData, setFormData] =
    useState(initialFormData);

  const [loading, setLoading] =
    useState(true);

  const [patientsLoading, setPatientsLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);


  // ===================================================
  // GET APPOINTMENTS
  // ===================================================

  const fetchAppointments = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        getAdminToken();

      if (!token) {
        redirectToLogin();
        return;
      }

      const response =
        await fetch(
          API_URL,
          {
            method: "GET",
            headers:
              getAuthHeaders(),
          }
        );


      if (
        response.status === 401 ||
        response.status === 403
      ) {
        redirectToLogin();
        return;
      }


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to fetch appointments"
        );

      }


      setAppointments(
        Array.isArray(result.data)
          ? result.data
          : []
      );

    } catch (error) {

      console.error(
        "Fetch appointments error:",
        error
      );

      setError(
        error.message ||
          "Unable to load appointments."
      );

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // GET PATIENTS
  // ===================================================

  const fetchPatients = async () => {

    try {

      setPatientsLoading(true);

      const token =
        getAdminToken();

      if (!token) {
        redirectToLogin();
        return;
      }


      const response =
        await fetch(
          PATIENT_API_URL,
          {
            method: "GET",
            headers:
              getAuthHeaders(),
          }
        );


      if (
        response.status === 401 ||
        response.status === 403
      ) {
        redirectToLogin();
        return;
      }


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to fetch patients"
        );

      }


      setPatients(
        Array.isArray(result.data)
          ? result.data
          : []
      );

    } catch (error) {

      console.error(
        "Fetch patients error:",
        error
      );

      setError(
        error.message ||
          "Unable to load patients."
      );

    } finally {

      setPatientsLoading(false);

    }

  };


  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {

    fetchAppointments();

  }, []);


  // ===================================================
  // LOAD PATIENTS WHEN FORM OPENS
  // ===================================================

  useEffect(() => {

    if (showForm) {
      fetchPatients();
    }

  }, [showForm]);


  // ===================================================
  // OPEN NEW APPOINTMENT
  // ===================================================

  const openNewAppointment = () => {

    setError("");

    setFormData({
      ...initialFormData,
    });

    setShowForm(true);

  };


  // ===================================================
  // CLOSE NEW APPOINTMENT
  // ===================================================

  const closeNewAppointment = () => {

    if (saving) {
      return;
    }

    setShowForm(false);

    setFormData({
      ...initialFormData,
    });

  };


  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleFormChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  // ===================================================
  // PATIENT SELECT
  // ===================================================

  const handlePatientSelect = (
    event
  ) => {

    const patientId =
      event.target.value;


    if (!patientId) {

      setFormData(
        (previous) => ({
          ...previous,

          patientId: "",
          patient: "",
          phone: "",
          email: "",
        })
      );

      return;

    }


    const selected =
      patients.find(
        (patient) =>
          String(patient._id) ===
          String(patientId)
      );


    if (!selected) {

      setFormData(
        (previous) => ({
          ...previous,

          patientId: "",
          patient: "",
          phone: "",
          email: "",
        })
      );

      return;

    }


    setFormData(
      (previous) => ({
        ...previous,

        patientId:
          selected._id,

        patient:
          selected.name || "",

        phone:
          selected.phone || "",

        email:
          selected.email || "",
      })
    );

  };


  // ===================================================
  // CREATE APPOINTMENT
  // ===================================================

  const handleCreateAppointment =
    async (event) => {

      event.preventDefault();


      // -------------------------------------------------
      // CLEAN VALUES
      // -------------------------------------------------

      const patientId =
        String(
          formData.patientId || ""
        ).trim();

      const patientName =
        String(
          formData.patient || ""
        ).trim();

      const phone =
        String(
          formData.phone || ""
        ).trim();

      const date =
        String(
          formData.date || ""
        ).trim();

      const time =
        String(
          formData.time || ""
        ).trim();

      const treatment =
        String(
          formData.treatment || ""
        ).trim();

      const doctor =
        String(
          formData.doctor || ""
        ).trim();

      const email =
        String(
          formData.email || ""
        ).trim();

      const message =
        String(
          formData.message || ""
        ).trim();


      // -------------------------------------------------
      // VALIDATION
      // -------------------------------------------------

      if (!patientId) {

        alert(
          "Please select a patient."
        );

        return;

      }


      if (!patientName) {

        alert(
          "Patient information is missing."
        );

        return;

      }


      if (!phone) {

        alert(
          "Patient phone number is required."
        );

        return;

      }


      if (!date) {

        alert(
          "Please select appointment date."
        );

        return;

      }


      if (!time) {

        alert(
          "Please select appointment time."
        );

        return;

      }


      if (!treatment) {

        alert(
          "Please select a treatment."
        );

        return;

      }


      try {

        setSaving(true);
        setError("");


        const token =
          getAdminToken();


        if (!token) {

          redirectToLogin();
          return;

        }


        // -------------------------------------------------
        // REQUEST BODY
        // -------------------------------------------------

        const appointmentPayload = {

          patient:
            patientId,

          patientName:
            patientName,

          phone:
            phone,

          email:
            email,

          appointmentDate:
            date,

          appointmentTime:
            time,

          service:
            treatment,

          doctor:
            doctor ||
            "Any available dentist",

          message:
            message,

          status:
            "Pending",

        };


        console.log(
          "Creating appointment:",
          appointmentPayload
        );


        // -------------------------------------------------
        // API
        // -------------------------------------------------

        const response =
          await fetch(
            API_URL,
            {
              method: "POST",

              headers:
                getAuthHeaders(),

              body:
                JSON.stringify(
                  appointmentPayload
                ),

            }
          );


        if (
          response.status === 401 ||
          response.status === 403
        ) {

          redirectToLogin();
          return;

        }


        const result =
          await response.json();


        console.log(
          "Create appointment response:",
          result
        );


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to create appointment"
          );

        }


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        setAppointments(
          (previous) => [

            result.data,
            ...previous,

          ]
        );


        setFormData({
          ...initialFormData,
        });


        setShowForm(false);


        alert(
          "Appointment created successfully."
        );


      } catch (error) {

        console.error(
          "Create appointment error:",
          error
        );


        setError(
          error.message ||
            "Unable to create appointment."
        );


        alert(
          error.message ||
            "Unable to create appointment."
        );

      } finally {

        setSaving(false);

      }

    };


  // ===================================================
  // UPDATE STATUS
  // ===================================================

  const handleStatusChange =
    async (
      id,
      newStatus
    ) => {

      try {

        setError("");


        const token =
          getAdminToken();


        if (!token) {

          redirectToLogin();
          return;

        }


        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: "PUT",

              headers:
                getAuthHeaders(),

              body:
                JSON.stringify({
                  status:
                    newStatus,
                }),

            }
          );


        if (
          response.status === 401 ||
          response.status === 403
        ) {

          redirectToLogin();
          return;

        }


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to update appointment"
          );

        }


        setAppointments(
          (previous) =>
            previous.map(
              (appointment) =>
                appointment._id === id
                  ? result.data
                  : appointment
            )
        );


        setSelectedAppointment(
          (previous) =>
            previous &&
            previous._id === id
              ? result.data
              : previous
        );


      } catch (error) {

        console.error(
          "Update status error:",
          error
        );


        alert(
          error.message ||
            "Unable to update appointment status."
        );

      }

    };


  // ===================================================
  // DELETE APPOINTMENT
  // ===================================================

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this appointment?"
        );


      if (!confirmed) {
        return;
      }


      try {

        setError("");


        const token =
          getAdminToken();


        if (!token) {

          redirectToLogin();
          return;

        }


        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: "DELETE",

              headers:
                getAuthHeaders(),

            }
          );


        if (
          response.status === 401 ||
          response.status === 403
        ) {

          redirectToLogin();
          return;

        }


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to delete appointment"
          );

        }


        setAppointments(
          (previous) =>
            previous.filter(
              (appointment) =>
                appointment._id !== id
            )
        );


        setSelectedAppointment(
          null
        );


        alert(
          "Appointment deleted successfully."
        );


      } catch (error) {

        console.error(
          "Delete appointment error:",
          error
        );


        alert(
          error.message ||
            "Unable to delete appointment."
        );

      }

    };


  // ===================================================
  // SEARCH + FILTER
  // ===================================================

  const filteredAppointments =
    useMemo(() => {

      return appointments.filter(
        (appointment) => {

          const searchValue =
            search
              .trim()
              .toLowerCase();


          const patient =
            appointment.patientName ||
            appointment.patient?.name ||
            "";


          const treatment =
            appointment.service ||
            "";


          const doctor =
            appointment.doctor ||
            "";


          const phone =
            appointment.phone ||
            appointment.patient?.phone ||
            "";


          const matchesSearch =
            !searchValue ||

            patient
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            treatment
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            doctor
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            phone
              .toLowerCase()
              .includes(
                searchValue
              );


          const matchesStatus =
            statusFilter ===
              "All" ||
            appointment.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      appointments,
      search,
      statusFilter,
    ]);


  // ===================================================
  // COUNTS
  // ===================================================

  const totalAppointments =
    appointments.length;


  const confirmedCount =
    appointments.filter(
      (item) =>
        item.status ===
        "Confirmed"
    ).length;


  const pendingCount =
    appointments.filter(
      (item) =>
        item.status ===
        "Pending"
    ).length;


  const completedCount =
    appointments.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;


  // ===================================================
  // FORMAT TIME
  // ===================================================

  const formatTime = (
    time
  ) => {

    if (!time) {
      return "—";
    }

    return time;

  };


  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (
    date
  ) => {

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
  // RETURN
  // ===================================================

  return (

    <AdminLayout
      title="Appointments"
      subtitle="Manage and track your clinic appointments."
      activePage="Appointments"
    >

      <div className="appointments-page">


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="appointments-page-header">

          <div>

            <span className="appointments-eyebrow">
              CLINIC SCHEDULE
            </span>

            <h2>
              Appointments
            </h2>

            <p>
              Keep track of patient bookings and
              today's schedule.
            </p>

          </div>


          <button
            type="button"
            className="appointments-add-button"
            onClick={
              openNewAppointment
            }
          >

            <Plus size={16} />

            <span>
              New Appointment
            </span>

          </button>

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            style={{
              padding: "12px 16px",
              marginBottom: "18px",
              borderRadius: "10px",
              background: "#fff4f2",
              color: "#b42318",
              fontSize: "14px",
            }}
          >

            {error}

          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="appointments-summary">

          <div className="appointments-summary-card">

            <div className="appointments-summary-icon">
              <CalendarDays size={17} />
            </div>

            <div>

              <span>
                Total
              </span>

              <strong>
                {totalAppointments}
              </strong>

            </div>

          </div>


          <div className="appointments-summary-card">

            <div className="appointments-summary-icon">
              <Clock3 size={17} />
            </div>

            <div>

              <span>
                Confirmed
              </span>

              <strong>
                {confirmedCount}
              </strong>

            </div>

          </div>


          <div className="appointments-summary-card">

            <div className="appointments-summary-icon">
              <UserRound size={17} />
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {pendingCount}
              </strong>

            </div>

          </div>


          <div className="appointments-summary-card">

            <div className="appointments-summary-icon">
              <CalendarDays size={17} />
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {completedCount}
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            TABLE
        ================================================= */}

        <section className="appointments-panel">


          {/* FILTERS */}

          <div className="appointments-toolbar">

            <div className="appointments-search">

              <Search size={16} />

              <input
                type="search"
                placeholder="Search patient, treatment or doctor..."
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
                  aria-label="Clear search"
                >

                  <X size={14} />

                </button>

              )}

            </div>


            <div className="appointments-filter">

              <span>
                Status
              </span>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >

                {statusOptions.map(
                  (status) => (

                    <option
                      value={status}
                      key={status}
                    >
                      {status}
                    </option>

                  )
                )}

              </select>

              <ChevronDown size={14} />

            </div>

          </div>


          {/* LOADING */}

          {loading ? (

            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#777",
              }}
            >

              Loading appointments...

            </div>

          ) : filteredAppointments.length ===
            0 ? (

            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#777",
              }}
            >

              <CalendarDays
                size={32}
              />

              <p>
                No appointments found.
              </p>

              <button
                type="button"
                className="appointments-add-button"
                onClick={
                  openNewAppointment
                }
              >

                <Plus size={15} />

                New Appointment

              </button>

            </div>

          ) : (

            <div className="appointments-table-wrapper">

              <table className="appointments-table">

                <thead>

                  <tr>

                    <th>
                      TIME
                    </th>

                    <th>
                      PATIENT
                    </th>

                    <th>
                      TREATMENT
                    </th>

                    <th>
                      DOCTOR
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th />

                  </tr>

                </thead>


                <tbody>

                  {filteredAppointments.map(
                    (appointment) => {

                      const patient =
                        appointment.patientName ||
                        appointment.patient?.name ||
                        "Unknown Patient";


                      const treatment =
                        appointment.service ||
                        "General Consultation";


                      const doctor =
                        appointment.doctor ||
                        "Any available dentist";


                      const status =
                        appointment.status ||
                        "Pending";


                      return (

                        <tr
                          key={
                            appointment._id
                          }
                        >

                          {/* TIME */}

                          <td>

                            <div className="appointment-time">

                              <Clock3 size={13} />

                              <strong>
                                {formatTime(
                                  appointment.appointmentTime
                                )}
                              </strong>

                            </div>

                          </td>


                          {/* PATIENT */}

                          <td>

                            <div className="appointment-patient">

                              <div className="appointment-avatar">

                                {patient
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>

                              <div>

                                <strong>
                                  {patient}
                                </strong>

                                <span>
                                  {appointment.phone ||
                                    appointment.patient?.phone ||
                                    "Not provided"}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* TREATMENT */}

                          <td>

                            <div>

                              <span className="appointment-treatment">

                                {treatment}

                              </span>

                              <small
                                style={{
                                  display:
                                    "block",
                                  marginTop:
                                    "4px",
                                  opacity:
                                    0.6,
                                }}
                              >

                                {formatDate(
                                  appointment.appointmentDate
                                )}

                              </small>

                            </div>

                          </td>


                          {/* DOCTOR */}

                          <td>

                            <span className="appointment-doctor">

                              {doctor}

                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <select
                              className={`appointment-status-select status-${status.toLowerCase()}`}
                              value={
                                status
                              }
                              onChange={(
                                event
                              ) =>
                                handleStatusChange(
                                  appointment._id,
                                  event.target.value
                                )
                              }
                              aria-label={`Change status for ${patient}`}
                            >

                              {statusOptions
                                .filter(
                                  (item) =>
                                    item !==
                                    "All"
                                )
                                .map(
                                  (item) => (

                                    <option
                                      key={
                                        item
                                      }
                                      value={
                                        item
                                      }
                                    >
                                      {item}
                                    </option>

                                  )
                                )}

                            </select>

                          </td>


                          {/* ACTION */}

                          <td>

                            <div className="appointment-actions">

                              <button
                                type="button"
                                className="appointment-more"
                                title="View / Delete appointment"
                                onClick={() =>
                                  setSelectedAppointment(
                                    appointment
                                  )
                                }
                              >

                                <MoreHorizontal
                                  size={17}
                                />

                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* =================================================
            DETAILS MODAL
        ================================================= */}

        {selectedAppointment && (

          <div
            className="appointment-modal-overlay"
            onClick={() =>
              setSelectedAppointment(
                null
              )
            }
          >

            <div
              className="appointment-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="appointment-modal-header">

                <div>

                  <span>
                    APPOINTMENT DETAILS
                  </span>

                  <h3>
                    {selectedAppointment.patientName ||
                      selectedAppointment.patient?.name ||
                      "Patient"}
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedAppointment(
                      null
                    )
                  }
                  aria-label="Close"
                >

                  <X size={18} />

                </button>

              </div>


              <div
                style={{
                  display: "grid",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >

                <div>

                  <strong>
                    Treatment
                  </strong>

                  <p>
                    {selectedAppointment.service ||
                      "Not provided"}
                  </p>

                </div>


                <div>

                  <strong>
                    Date & Time
                  </strong>

                  <p>

                    {formatDate(
                      selectedAppointment.appointmentDate
                    )}

                    {" · "}

                    {selectedAppointment.appointmentTime ||
                      "—"}

                  </p>

                </div>


                <div>

                  <strong>
                    Phone
                  </strong>

                  <p>
                    {selectedAppointment.phone ||
                      selectedAppointment.patient?.phone ||
                      "Not provided"}
                  </p>

                </div>


                <div>

                  <strong>
                    Email
                  </strong>

                  <p>
                    {selectedAppointment.email ||
                      selectedAppointment.patient?.email ||
                      "Not provided"}
                  </p>

                </div>


                <div>

                  <strong>
                    Doctor
                  </strong>

                  <p>
                    {selectedAppointment.doctor ||
                      "Any available dentist"}
                  </p>

                </div>


                <div>

                  <strong>
                    Status
                  </strong>

                  <select
                    className={`appointment-status-select status-${(
                      selectedAppointment.status ||
                      "Pending"
                    ).toLowerCase()}`}
                    value={
                      selectedAppointment.status ||
                      "Pending"
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        selectedAppointment._id,
                        event.target.value
                      )
                    }
                  >

                    {statusOptions
                      .filter(
                        (item) =>
                          item !==
                          "All"
                      )
                      .map(
                        (item) => (

                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>

                        )
                      )}

                  </select>

                </div>


                {selectedAppointment.message && (

                  <div>

                    <strong>
                      Additional Information
                    </strong>

                    <p>
                      {
                        selectedAppointment.message
                      }
                    </p>

                  </div>

                )}

              </div>


              <div className="appointment-form-actions">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedAppointment(
                      null
                    )
                  }
                >
                  Close
                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedAppointment._id
                    )
                  }
                  style={{
                    background:
                      "#fff4f2",
                    color:
                      "#b42318",
                    border:
                      "1px solid #ead5d2",
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            NEW APPOINTMENT MODAL
        ================================================= */}

        {showForm && (

          <div
            className="appointment-modal-overlay"
            onClick={
              closeNewAppointment
            }
          >

            <div
              className="appointment-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="appointment-modal-header">

                <div>

                  <span>
                    CLINIC WORKSPACE
                  </span>

                  <h3>
                    New Appointment
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={
                    closeNewAppointment
                  }
                  aria-label="Close"
                >

                  <X size={18} />

                </button>

              </div>


              <form
                onSubmit={
                  handleCreateAppointment
                }
              >

                {/* PATIENT */}

                <div className="appointment-form-group">

                  <label>
                    Select Patient *
                  </label>

                  <select
                    name="patientId"
                    value={
                      formData.patientId
                    }
                    onChange={
                      handlePatientSelect
                    }
                    required
                    disabled={
                      patientsLoading
                    }
                  >

                    <option value="">

                      {patientsLoading
                        ? "Loading patients..."
                        : "Select existing patient"}

                    </option>


                    {patients.map(
                      (patient) => (

                        <option
                          key={
                            patient._id
                          }
                          value={
                            patient._id
                          }
                        >

                          {patient.name}

                          {" — "}

                          {patient.phone}

                        </option>

                      )
                    )}

                  </select>


                  {!patientsLoading &&
                    patients.length ===
                      0 && (

                      <small
                        style={{
                          display:
                            "block",
                          marginTop:
                            "7px",
                          color:
                            "#8a7068",
                        }}
                      >

                        No patients found.
                        Create a patient first
                        from the Patients page.

                      </small>

                    )}

                </div>


                {/* PHONE */}

                <div className="appointment-form-group">

                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleFormChange
                    }
                    required
                  />

                </div>


                {/* EMAIL */}

                <div className="appointment-form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="patient@email.com"
                    value={
                      formData.email
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                </div>


                {/* DATE + TIME */}

                <div className="appointment-form-row">

                  <div className="appointment-form-group">

                    <label>
                      Date *
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={
                        formData.date
                      }
                      onChange={
                        handleFormChange
                      }
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      required
                    />

                  </div>


                  <div className="appointment-form-group">

                    <label>
                      Time *
                    </label>

                    <input
                      type="time"
                      name="time"
                      value={
                        formData.time
                      }
                      onChange={
                        handleFormChange
                      }
                      required
                    />

                  </div>

                </div>


                {/* TREATMENT */}

                <div className="appointment-form-group">

                  <label>
                    Treatment *
                  </label>

                  <select
                    name="treatment"
                    value={
                      formData.treatment
                    }
                    onChange={
                      handleFormChange
                    }
                    required
                  >

                    <option value="">
                      Select treatment
                    </option>

                    <option value="New Patient Consultation">
                      New Patient Consultation
                    </option>

                    <option value="Routine Dental Check-up">
                      Routine Dental Check-up
                    </option>

                    <option value="Teeth Cleaning">
                      Teeth Cleaning
                    </option>

                    <option value="Tooth Pain">
                      Tooth Pain
                    </option>

                    <option value="Root Canal">
                      Root Canal
                    </option>

                    <option value="Dental Implant Consultation">
                      Dental Implant Consultation
                    </option>

                    <option value="Teeth Whitening">
                      Teeth Whitening
                    </option>

                    <option value="Veneers">
                      Veneers
                    </option>

                    <option value="Clear Aligners">
                      Clear Aligners
                    </option>

                    <option value="Wisdom Tooth">
                      Wisdom Tooth
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                {/* DOCTOR */}

                <div className="appointment-form-group">

                  <label>
                    Doctor
                  </label>

                  <input
                    type="text"
                    name="doctor"
                    placeholder="e.g. Dr. Ananya"
                    value={
                      formData.doctor
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                </div>


                {/* MESSAGE */}

                <div className="appointment-form-group">

                  <label>
                    Additional Information
                  </label>

                  <textarea
                    name="message"
                    placeholder="Anything the clinic should know..."
                    rows="3"
                    value={
                      formData.message
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                </div>


                {/* ACTIONS */}

                <div className="appointment-form-actions">

                  <button
                    type="button"
                    onClick={
                      closeNewAppointment
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={
                      saving ||
                      patientsLoading
                    }
                  >

                    {saving
                      ? "Creating..."
                      : "Create Appointment"}

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

export default Appointments;