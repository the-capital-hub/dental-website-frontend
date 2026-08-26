import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Mail,
  Phone,
  Plus,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Patients.css";

// =====================================================
// API
// =====================================================

const API_URL = "https://dental-website-backend.onrender.com/api/patients";

// =====================================================
// EMPTY FORM
// =====================================================

const EMPTY_FORM = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  treatment: "",
};

// =====================================================
// STATUS
// =====================================================

const STATUS_OPTIONS = [
  "All",
  "Active",
  "Inactive",
];

// =====================================================
// AUTH
// =====================================================

const getToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken")
  );
};

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");

  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminData");

  window.location.href = "/admin/login";
};


// =====================================================
// COMPONENT
// =====================================================

const Patients = () => {

  // ===================================================
  // STATE
  // ===================================================

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState(null);

  const [formData, setFormData] =
    useState(EMPTY_FORM);


  // ===================================================
  // FETCH PATIENTS
  // ===================================================

  const fetchPatients = async () => {
    try {

      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        logout();
        return;
      }

      const response = await fetch(
        API_URL,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();
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

    } catch (err) {

      console.error(
        "Fetch patients error:",
        err
      );

      setError(
        err.message ||
          "Unable to load patients."
      );

    } finally {

      setLoading(false);

    }
  };


  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchPatients();
  }, []);


  // ===================================================
  // OPEN FORM
  // ===================================================

  const openAddPatient = () => {

    setError("");

    setFormData({
      ...EMPTY_FORM,
    });

    setShowForm(true);
  };


  // ===================================================
  // CLOSE FORM
  // ===================================================

  const closeAddPatient = () => {

    if (saving) {
      return;
    }

    setShowForm(false);

    setFormData({
      ...EMPTY_FORM,
    });
  };


  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleChange = (event) => {

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
  // CREATE PATIENT
  // ===================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    const name =
      formData.name.trim();

    const phone =
      formData.phone.trim();

    const email =
      formData.email.trim();

    const treatment =
      formData.treatment.trim();

    if (!name) {
      alert(
        "Please enter patient name."
      );
      return;
    }

    if (!phone) {
      alert(
        "Please enter patient phone number."
      );
      return;
    }

    if (!treatment) {
      alert(
        "Please select treatment."
      );
      return;
    }


    try {

      setSaving(true);
      setError("");

      const token = getToken();

      if (!token) {
        logout();
        return;
      }


      // -----------------------------------------------
      // PATIENT ONLY
      // -----------------------------------------------

      const payload = {
        name: name,

        age: formData.age
          ? Number(formData.age)
          : undefined,

        gender:
          formData.gender ||
          "Other",

        phone: phone,

        email: email,

        treatment: treatment,

        status: "Active",
      };


      console.log(
        "POST /api/patients",
        payload
      );


      // -----------------------------------------------
      // CREATE PATIENT
      // -----------------------------------------------

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: getHeaders(),

          body: JSON.stringify(
            payload
          ),
        }
      );


      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();
        return;
      }


      const result =
        await response.json();


      console.log(
        "Patient API response:",
        result
      );


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to create patient"
        );
      }


      // -----------------------------------------------
      // ADD TO LIST
      // -----------------------------------------------

      if (result.data) {

        setPatients(
          (previous) => [
            result.data,
            ...previous,
          ]
        );

      } else {

        await fetchPatients();

      }


      // -----------------------------------------------
      // RESET
      // -----------------------------------------------

      setFormData({
        ...EMPTY_FORM,
      });

      setShowForm(false);


      alert(
        "Patient added successfully."
      );


    } catch (err) {

      console.error(
        "Create patient error:",
        err
      );

      setError(
        err.message ||
          "Unable to create patient."
      );

      alert(
        err.message ||
          "Unable to create patient."
      );

    } finally {

      setSaving(false);

    }
  };


  // ===================================================
  // DELETE PATIENT
  // ===================================================

  const handleDelete = async (
    patientId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this patient?"
      );

    if (!confirmed) {
      return;
    }


    try {

      const token = getToken();

      if (!token) {
        logout();
        return;
      }


      const response =
        await fetch(
          `${API_URL}/${patientId}`,
          {
            method: "DELETE",
            headers: getHeaders(),
          }
        );


      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();
        return;
      }


      const result =
        await response.json();


      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete patient"
        );
      }


      setPatients(
        (previous) =>
          previous.filter(
            (patient) =>
              patient._id !==
              patientId
          )
      );


      setSelectedPatient(null);


      alert(
        "Patient deleted successfully."
      );


    } catch (err) {

      console.error(
        "Delete patient error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete patient."
      );
    }
  };


  // ===================================================
  // UPDATE STATUS
  // ===================================================

  const handleStatusToggle =
    async (patient) => {

      const newStatus =
        patient.status === "Active"
          ? "Inactive"
          : "Active";


      try {

        const response =
          await fetch(
            `${API_URL}/${patient._id}`,
            {
              method: "PUT",
              headers: getHeaders(),

              body: JSON.stringify({
                status:
                  newStatus,
              }),
            }
          );


        if (
          response.status === 401 ||
          response.status === 403
        ) {
          logout();
          return;
        }


        const result =
          await response.json();


        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to update patient"
          );
        }


        setPatients(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                patient._id
                  ? result.data
                  : item
            )
        );


        if (
          selectedPatient &&
          selectedPatient._id ===
            patient._id
        ) {

          setSelectedPatient(
            result.data
          );
        }


      } catch (err) {

        console.error(
          "Update patient error:",
          err
        );

        alert(
          err.message ||
            "Unable to update patient."
        );
      }
    };


  // ===================================================
  // FILTER PATIENTS
  // ===================================================

  const filteredPatients =
    useMemo(() => {

      return patients.filter(
        (patient) => {

          const query =
            search
              .trim()
              .toLowerCase();


          const name =
            patient.name
              ?.toLowerCase() ||
            "";

          const phone =
            patient.phone
              ?.toLowerCase() ||
            "";

          const email =
            patient.email
              ?.toLowerCase() ||
            "";

          const treatment =
            patient.treatment
              ?.toLowerCase() ||
            "";


          const matchesSearch =
            !query ||
            name.includes(query) ||
            phone.includes(query) ||
            email.includes(query) ||
            treatment.includes(query);


          const matchesStatus =
            statusFilter === "All" ||
            patient.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      patients,
      search,
      statusFilter,
    ]);


  // ===================================================
  // DATE
  // ===================================================

  const formatDate = (
    value
  ) => {

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ===================================================
  // COUNTS
  // ===================================================

  const activeCount =
    patients.filter(
      (patient) =>
        patient.status === "Active"
    ).length;


  const inactiveCount =
    patients.filter(
      (patient) =>
        patient.status === "Inactive"
    ).length;


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <AdminLayout
      title="Patients"
      subtitle="Manage patient records and treatment history."
      activePage="Patients"
    >

      <div className="patients-page">


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="patients-page-header">

          <div>

            <span className="patients-eyebrow">
              PATIENT MANAGEMENT
            </span>

            <h2>
              Patients
            </h2>

            <p>
              Manage patient records and
              treatment history.
            </p>

          </div>


          <button
            type="button"
            className="patients-add-button"
            onClick={
              openAddPatient
            }
          >

            <Plus size={16} />

            <span>
              Add Patient
            </span>

          </button>

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            style={{
              padding:
                "12px 16px",
              marginBottom:
                "18px",
              borderRadius:
                "10px",
              background:
                "#fff4f2",
              color:
                "#b42318",
            }}
          >
            {error}
          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="patients-summary">

          <div className="patients-summary-card">

            <div className="patients-summary-icon">
              <Users size={17} />
            </div>

            <div>

              <span>
                Total Patients
              </span>

              <strong>
                {patients.length}
              </strong>

            </div>

          </div>


          <div className="patients-summary-card">

            <div className="patients-summary-icon">
              <UserRound size={17} />
            </div>

            <div>

              <span>
                Active
              </span>

              <strong>
                {activeCount}
              </strong>

            </div>

          </div>


          <div className="patients-summary-card">

            <div className="patients-summary-icon">
              <CalendarDays size={17} />
            </div>

            <div>

              <span>
                Inactive
              </span>

              <strong>
                {inactiveCount}
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            PATIENT PANEL
        ================================================= */}

        <section className="patients-panel">


          {/* TOOLBAR */}

          <div className="patients-toolbar">

            <div className="patients-search">

              <Search size={16} />

              <input
                type="search"
                placeholder="Search patients..."
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


            <div className="patients-filter">

              <span>
                Status
              </span>

              <select
                value={
                  statusFilter
                }
                onChange={(
                  event
                ) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >

                {STATUS_OPTIONS.map(
                  (status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  )
                )}

              </select>

              <ChevronDown
                size={14}
              />

            </div>

          </div>


          {/* TABLE */}

          {loading ? (

            <div
              style={{
                padding:
                  "60px",
                textAlign:
                  "center",
              }}
            >
              Loading patients...
            </div>

          ) : (

            <div className="patients-table-wrapper">

              <table className="patients-table">

                <thead>

                  <tr>

                    <th>
                      PATIENT
                    </th>

                    <th>
                      CONTACT
                    </th>

                    <th>
                      TREATMENT
                    </th>

                    <th>
                      LAST VISIT
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th />

                  </tr>

                </thead>


                <tbody>

                  {filteredPatients.map(
                    (patient) => (

                      <tr
                        key={
                          patient._id
                        }
                      >

                        <td>

                          <div className="patient-table-name">

                            <div className="patient-avatar">

                              {patient.name
                                ?.charAt(0)
                                ?.toUpperCase()}

                            </div>

                            <div>

                              <strong>
                                {
                                  patient.name
                                }
                              </strong>

                              <span>
                                {patient.age
                                  ? `${patient.age} years`
                                  : "Age not provided"}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <div className="patient-contact">

                            <span>
                              <Phone
                                size={11}
                              />
                              {
                                patient.phone
                              }
                            </span>

                            {patient.email && (

                              <span>
                                <Mail
                                  size={11}
                                />
                                {
                                  patient.email
                                }
                              </span>

                            )}

                          </div>

                        </td>


                        <td>

                          <span className="patient-treatment">

                            {
                              patient.treatment ||
                              "General Consultation"
                            }

                          </span>

                        </td>


                        <td>

                          {formatDate(
                            patient.lastVisit
                          )}

                        </td>


                        <td>

                          <button
                            type="button"
                            className={`patient-status ${
                              patient.status ===
                              "Active"
                                ? "patient-status-active"
                                : "patient-status-inactive"
                            }`}
                            onClick={() =>
                              handleStatusToggle(
                                patient
                              )
                            }
                          >

                            <span />

                            {
                              patient.status ||
                              "Active"
                            }

                          </button>

                        </td>


                        <td>

                          <button
                            type="button"
                            className="patient-view-button"
                            onClick={() =>
                              setSelectedPatient(
                                patient
                              )
                            }
                          >

                            View

                            <ArrowUpRight
                              size={13}
                            />

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>


              {filteredPatients.length ===
                0 && (

                <div
                  style={{
                    padding:
                      "50px",
                    textAlign:
                      "center",
                  }}
                >

                  <Users
                    size={30}
                  />

                  <h3>
                    No patients found
                  </h3>

                  <p>
                    Add your first
                    patient.
                  </p>

                </div>

              )}

            </div>

          )}

        </section>


        {/* =================================================
            ADD PATIENT MODAL
        ================================================= */}

        {showForm && (

          <div
            className="patient-modal-overlay"
            onMouseDown={(
              event
            ) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                closeAddPatient();
              }

            }}
          >

            <div
              className="patient-modal"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >


              {/* HEADER */}

              <div className="patient-modal-header">

                <div>

                  <span>
                    PATIENT MANAGEMENT
                  </span>

                  <h3>
                    Add New Patient
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={
                    closeAddPatient
                  }
                  disabled={saving}
                >
                  <X size={18} />
                </button>

              </div>


              {/* FORM */}

              <form
                className="patient-form"
                onSubmit={
                  handleSubmit
                }
              >

                <div className="patient-form-grid">


                  {/* NAME */}

                  <div className="patient-form-field">

                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter patient name"
                      required
                    />

                  </div>


                  {/* PHONE */}

                  <div className="patient-form-field">

                    <label>
                      Phone *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="+91 98765 43210"
                      required
                    />

                  </div>


                  {/* AGE */}

                  <div className="patient-form-field">

                    <label>
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      value={
                        formData.age
                      }
                      onChange={
                        handleChange
                      }
                      min="1"
                      max="120"
                      placeholder="25"
                    />

                  </div>


                  {/* GENDER */}

                  <div className="patient-form-field">

                    <label>
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={
                        formData.gender
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="">
                        Select gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>


                  {/* EMAIL */}

                  <div className="patient-form-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="patient@email.com"
                    />

                  </div>


                  {/* TREATMENT */}

                  <div className="patient-form-field">

                    <label>
                      Primary Treatment *
                    </label>

                    <select
                      name="treatment"
                      value={
                        formData.treatment
                      }
                      onChange={
                        handleChange
                      }
                      required
                    >

                      <option value="">
                        Select treatment
                      </option>

                      <option value="Dental Checkup">
                        Dental Checkup
                      </option>

                      <option value="Dental Cleaning">
                        Dental Cleaning
                      </option>

                      <option value="Root Canal">
                        Root Canal
                      </option>

                      <option value="Teeth Whitening">
                        Teeth Whitening
                      </option>

                      <option value="Dental Implant">
                        Dental Implant
                      </option>

                      <option value="Braces">
                        Braces
                      </option>

                      <option value="Clear Aligners">
                        Clear Aligners
                      </option>

                      <option value="General Consultation">
                        General Consultation
                      </option>

                    </select>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="patient-form-actions">

                  <button
                    type="button"
                    className="patient-form-cancel"
                    onClick={
                      closeAddPatient
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="patient-form-submit"
                    disabled={saving}
                  >

                    {saving
                      ? "Adding..."
                      : "Add Patient"}

                    {!saving && (
                      <Plus
                        size={14}
                      />
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}


        {/* =================================================
            PATIENT DETAILS MODAL
        ================================================= */}

        {selectedPatient && (

          <div
            className="patient-modal-overlay"
            onMouseDown={(
              event
            ) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedPatient(
                  null
                );
              }

            }}
          >

            <div
              className="patient-modal"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >

              <div className="patient-modal-header">

                <div>

                  <span>
                    PATIENT PROFILE
                  </span>

                  <h3>
                    {
                      selectedPatient.name
                    }
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPatient(
                      null
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <div
                style={{
                  display:
                    "grid",
                  gap:
                    "14px",
                }}
              >

                <div>

                  <strong>
                    Phone
                  </strong>

                  <p>
                    {
                      selectedPatient.phone
                    }
                  </p>

                </div>


                <div>

                  <strong>
                    Email
                  </strong>

                  <p>
                    {
                      selectedPatient.email ||
                      "Not provided"
                    }
                  </p>

                </div>


                <div>

                  <strong>
                    Age
                  </strong>

                  <p>
                    {
                      selectedPatient.age ||
                      "Not provided"
                    }
                  </p>

                </div>


                <div>

                  <strong>
                    Gender
                  </strong>

                  <p>
                    {
                      selectedPatient.gender ||
                      "Not provided"
                    }
                  </p>

                </div>


                <div>

                  <strong>
                    Treatment
                  </strong>

                  <p>
                    {
                      selectedPatient.treatment ||
                      "General Consultation"
                    }
                  </p>

                </div>


                <div>

                  <strong>
                    Status
                  </strong>

                  <p>
                    {
                      selectedPatient.status ||
                      "Active"
                    }
                  </p>

                </div>

              </div>


              <div
                className="patient-form-actions"
                style={{
                  marginTop:
                    "24px",
                }}
              >

                <button
                  type="button"
                  className="patient-form-cancel"
                  onClick={() =>
                    setSelectedPatient(
                      null
                    )
                  }
                >
                  Close
                </button>


                <button
                  type="button"
                  className="patient-form-submit"
                  onClick={() =>
                    handleDelete(
                      selectedPatient._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>
  );
};

export default Patients;