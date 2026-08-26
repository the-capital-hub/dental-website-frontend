import { useEffect, useMemo, useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Mail,
  Phone,
  Plus,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Leads.css";


// =========================================================
// API
// =========================================================

const API_URL =
  "https://dental-website-backend.onrender.com/api/leads";


// =========================================================
// STATUS OPTIONS
// =========================================================

const statusOptions = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Lost",
];


// =========================================================
// EMPTY FORM
// =========================================================

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  source: "Website",
  notes: "",
};


// =========================================================
// COMPONENT
// =========================================================

const Leads = () => {

  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  const [submitting, setSubmitting] =
    useState(false);

  const [convertingId, setConvertingId] =
    useState(null);


  // =======================================================
  // FETCH LEADS
  // =======================================================

  const fetchLeads = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await fetch(API_URL);

      const result =
        await response.json();

      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to fetch leads"
        );

      }

      setLeads(
        result.data || []
      );

    } catch (error) {

      console.error(
        "Fetch Leads Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load leads."
      );

    } finally {

      setLoading(false);

    }

  };


  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {

    fetchLeads();

  }, []);


  // =======================================================
  // FORM CHANGE
  // =======================================================

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


  // =======================================================
  // ADD LEAD
  // =======================================================

  const handleAddLead = async (
    event
  ) => {

    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.service
    ) {
      return;
    }


    try {

      setSubmitting(true);
      setError("");


      const response =
        await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                formData.name.trim(),

              phone:
                formData.phone.trim(),

              email:
                formData.email.trim(),

              service:
                formData.service,

              source:
                formData.source,

              notes:
                formData.notes.trim(),
            }),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to create lead"
        );

      }


      setLeads(
        (previous) => [
          result.data,
          ...previous,
        ]
      );


      setFormData(
        emptyForm
      );

      setShowForm(false);


    } catch (error) {

      console.error(
        "Add Lead Error:",
        error
      );

      setError(
        error.message ||
          "Unable to create lead."
      );

    } finally {

      setSubmitting(false);

    }

  };


  // =======================================================
  // UPDATE STATUS
  // =======================================================

  const handleStatusChange = async (
    id,
    newStatus
  ) => {

    try {

      setError("");


      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status:
                newStatus,
            }),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to update lead"
        );

      }


      setLeads(
        (previous) =>
          previous.map(
            (lead) =>
              lead._id === id
                ? result.data
                : lead
          )
      );


      setSelectedLead(
        (previous) =>
          previous &&
          previous._id === id
            ? result.data
            : previous
      );


    } catch (error) {

      console.error(
        "Update Lead Error:",
        error
      );

      setError(
        error.message ||
          "Unable to update lead."
      );

    }

  };


  // =======================================================
  // CONVERT LEAD TO PATIENT
  // =======================================================

  const handleConvertToPatient =
    async (lead) => {

      if (!lead?._id) {
        return;
      }


      if (
        lead.status === "Converted" ||
        lead.patient
      ) {

        alert(
          "This lead has already been converted."
        );

        return;

      }


      const confirmed =
        window.confirm(
          `Convert ${lead.name} into a patient?`
        );


      if (!confirmed) {
        return;
      }


      try {

        setConvertingId(
          lead._id
        );

        setError("");


        const response =
          await fetch(
            `${API_URL}/${lead._id}/convert`,
            {
              method: "POST",
            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to convert lead"
          );

        }


        // Update lead in list

        setLeads(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                lead._id
                  ? result.data.lead
                  : item
            )
        );


        // Update opened modal

        setSelectedLead(
          (previous) =>
            previous &&
            previous._id ===
              lead._id
              ? result.data.lead
              : previous
        );


        alert(
          `${lead.name} has been converted to a patient successfully.`
        );


      } catch (error) {

        console.error(
          "Convert Lead Error:",
          error
        );

        setError(
          error.message ||
            "Unable to convert lead."
        );

      } finally {

        setConvertingId(null);

      }

    };


  // =======================================================
  // DELETE LEAD
  // =======================================================

  const handleDeleteLead = async (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");


      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to delete lead"
        );

      }


      setLeads(
        (previous) =>
          previous.filter(
            (lead) =>
              lead._id !== id
          )
      );


      setSelectedLead(null);


    } catch (error) {

      console.error(
        "Delete Lead Error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete lead."
      );

    }

  };


  // =======================================================
  // FILTER
  // =======================================================

  const filteredLeads =
    useMemo(() => {

      return leads.filter(
        (lead) => {

          const searchValue =
            search
              .trim()
              .toLowerCase();


          const name =
            lead.name
              ?.toLowerCase() || "";

          const phone =
            lead.phone
              ?.toLowerCase() || "";

          const email =
            lead.email
              ?.toLowerCase() || "";

          const service =
            lead.service
              ?.toLowerCase() || "";

          const source =
            lead.source
              ?.toLowerCase() || "";


          const matchesSearch =
            !searchValue ||
            name.includes(
              searchValue
            ) ||
            phone.includes(
              searchValue
            ) ||
            email.includes(
              searchValue
            ) ||
            service.includes(
              searchValue
            ) ||
            source.includes(
              searchValue
            );


          const matchesStatus =
            statusFilter ===
              "All" ||
            lead.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      leads,
      search,
      statusFilter,
    ]);


  // =======================================================
  // COUNTS
  // =======================================================

  const newLeads =
    leads.filter(
      (lead) =>
        lead.status === "New"
    ).length;


  const contactedLeads =
    leads.filter(
      (lead) =>
        lead.status === "Contacted"
    ).length;


  const qualifiedLeads =
    leads.filter(
      (lead) =>
        lead.status === "Qualified"
    ).length;


  const convertedLeads =
    leads.filter(
      (lead) =>
        lead.status === "Converted"
    ).length;


  // =======================================================
  // DATE FORMAT
  // =======================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "—";
    }

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

  };


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <AdminLayout
      title="Leads"
      subtitle="Manage prospects and follow-up opportunities."
      activePage="Leads"
    >

      <div className="leads-page">


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="leads-page-header">

          <div>

            <span className="leads-eyebrow">
              LEAD MANAGEMENT
            </span>

            <h2>
              Leads
            </h2>

            <p>
              Track new enquiries and turn them
              into patients.
            </p>

          </div>


          <button
            type="button"
            className="leads-add-button"
            onClick={() =>
              setShowForm(true)
            }
          >

            <Plus size={16} />

            <span>
              Add Lead
            </span>

          </button>

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            style={{
              marginBottom:
                "18px",

              padding:
                "12px 15px",

              borderRadius:
                "10px",

              background:
                "#fff5f4",

              border:
                "1px solid #ecd4d1",

              color:
                "#a24840",

              fontSize:
                "12px",
            }}
          >

            {error}

          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="leads-summary">


          <div className="leads-summary-card">

            <div className="leads-summary-icon">
              <Users size={17} />
            </div>

            <div>

              <span>
                Total Leads
              </span>

              <strong>
                {leads.length}
              </strong>

            </div>

          </div>


          <div className="leads-summary-card">

            <div className="leads-summary-icon">
              <Sparkles size={17} />
            </div>

            <div>

              <span>
                New Leads
              </span>

              <strong>
                {newLeads}
              </strong>

            </div>

          </div>


          <div className="leads-summary-card">

            <div className="leads-summary-icon">
              <Phone size={17} />
            </div>

            <div>

              <span>
                Follow-ups
              </span>

              <strong>
                {contactedLeads}
              </strong>

            </div>

          </div>


          <div className="leads-summary-card">

            <div className="leads-summary-icon">
              <CalendarDays size={17} />
            </div>

            <div>

              <span>
                Converted
              </span>

              <strong>
                {convertedLeads}
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            FUNNEL
        ================================================= */}

        <section className="leads-funnel">

          <div className="leads-funnel-header">

            <div>

              <span>
                LEAD PIPELINE
              </span>

              <h3>
                Conversion journey
              </h3>

            </div>

            <strong>
              {leads.length} total
            </strong>

          </div>


          <div className="leads-funnel-track">

            <div
              className="leads-funnel-step"
              style={{
                width: "100%",
              }}
            >

              <span>
                New
              </span>

              <strong>
                {newLeads}
              </strong>

            </div>


            <div
              className="leads-funnel-step"
              style={{
                width: "80%",
              }}
            >

              <span>
                Contacted
              </span>

              <strong>
                {contactedLeads}
              </strong>

            </div>


            <div
              className="leads-funnel-step"
              style={{
                width: "65%",
              }}
            >

              <span>
                Qualified
              </span>

              <strong>
                {qualifiedLeads}
              </strong>

            </div>


            <div
              className="leads-funnel-step"
              style={{
                width: "50%",
              }}
            >

              <span>
                Converted
              </span>

              <strong>
                {convertedLeads}
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            MAIN PANEL
        ================================================= */}

        <section className="leads-panel">

          <div className="leads-toolbar">


            {/* SEARCH */}

            <div className="leads-search">

              <Search size={16} />

              <input
                type="search"
                placeholder="Search leads..."
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


            {/* FILTER */}

            <div className="leads-filter">

              <span>
                Status
              </span>

              <select
                value={
                  statusFilter
                }
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >

                {statusOptions.map(
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

              <ChevronDown size={14} />

            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="leads-empty">

              <div className="leads-empty-icon">
                <Users size={22} />
              </div>

              <h3>
                Loading leads...
              </h3>

              <p>
                Fetching lead data from the server.
              </p>

            </div>

          ) : (

            <>


              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="leads-table-wrapper">

                <table className="leads-table">

                  <thead>

                    <tr>

                      <th>
                        LEAD
                      </th>

                      <th>
                        TREATMENT
                      </th>

                      <th>
                        SOURCE
                      </th>

                      <th>
                        DATE
                      </th>

                      <th>
                        STATUS
                      </th>

                      <th />

                    </tr>

                  </thead>


                  <tbody>

                    {filteredLeads.map(
                      (lead) => (

                        <tr
                          key={
                            lead._id
                          }
                        >


                          {/* LEAD */}

                          <td>

                            <div className="lead-table-name">

                              <div className="lead-avatar">

                                {lead.name
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase()}

                              </div>

                              <div>

                                <strong>
                                  {lead.name}
                                </strong>

                                <span>
                                  {lead.phone}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* TREATMENT */}

                          <td>

                            <span className="lead-treatment">

                              {lead.service ||
                                "General Consultation"}

                            </span>

                          </td>


                          {/* SOURCE */}

                          <td>

                            <span
                              className={`lead-source lead-source-${lead.source?.toLowerCase()}`}
                            >

                              {lead.source ===
                                "Ivy" && (
                                <Sparkles
                                  size={10}
                                />
                              )}

                              {lead.source}

                            </span>

                          </td>


                          {/* DATE */}

                          <td>

                            <span className="lead-date">

                              {formatDate(
                                lead.createdAt
                              )}

                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <select
                              className={`lead-status lead-status-${lead.status?.toLowerCase()}`}
                              value={
                                lead.status
                              }
                              onChange={(
                                event
                              ) =>
                                handleStatusChange(
                                  lead._id,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >

                              {statusOptions
                                .filter(
                                  (
                                    status
                                  ) =>
                                    status !==
                                    "All"
                                )
                                .map(
                                  (
                                    status
                                  ) => (

                                    <option
                                      key={
                                        status
                                      }
                                      value={
                                        status
                                      }
                                    >
                                      {status}
                                    </option>

                                  )
                                )}

                            </select>

                          </td>


                          {/* VIEW */}

                          <td>

                            <button
                              type="button"
                              className="lead-view-button"
                              onClick={() =>
                                setSelectedLead(
                                  lead
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


                {filteredLeads.length ===
                  0 && (

                  <div className="leads-empty">

                    <div className="leads-empty-icon">
                      <Users size={22} />
                    </div>

                    <h3>
                      No leads found
                    </h3>

                    <p>
                      Try changing your search
                      or status filter.
                    </p>

                  </div>

                )}

              </div>


              {/* =================================================
                  MOBILE
              ================================================= */}

              <div className="leads-mobile-list">

                {filteredLeads.map(
                  (lead) => (

                    <article
                      className="lead-mobile-card"
                      key={
                        lead._id
                      }
                    >

                      <div className="lead-mobile-top">

                        <div className="lead-table-name">

                          <div className="lead-avatar">

                            {lead.name
                              ?.charAt(
                                0
                              )
                              ?.toUpperCase()}

                          </div>

                          <div>

                            <strong>
                              {lead.name}
                            </strong>

                            <span>
                              {lead.phone}
                            </span>

                          </div>

                        </div>


                        <span
                          className={`lead-status lead-status-${lead.status?.toLowerCase()}`}
                        >
                          {lead.status}
                        </span>

                      </div>


                      <div className="lead-mobile-details">

                        <div>

                          <span>
                            Treatment
                          </span>

                          <strong>
                            {lead.service}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Source
                          </span>

                          <strong>
                            {lead.source}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Date
                          </span>

                          <strong>
                            {formatDate(
                              lead.createdAt
                            )}
                          </strong>

                        </div>

                      </div>


                      <button
                        type="button"
                        className="lead-mobile-view"
                        onClick={() =>
                          setSelectedLead(
                            lead
                          )
                        }
                      >

                        View lead details

                        <ArrowUpRight
                          size={14}
                        />

                      </button>

                    </article>

                  )
                )}

              </div>

            </>

          )}

        </section>


        {/* =================================================
            LEAD DETAILS MODAL
        ================================================= */}

        {selectedLead && (

          <div
            className="lead-modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedLead(
                  null
                );
              }

            }}
          >

            <div className="lead-modal">


              <div className="lead-modal-header">

                <div>

                  <span>
                    LEAD PROFILE
                  </span>

                  <h3>
                    Lead details
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedLead(
                      null
                    )
                  }
                  aria-label="Close"
                >

                  <X size={18} />

                </button>

              </div>


              {/* PROFILE */}

              <div className="lead-profile">

                <div className="lead-profile-avatar">

                  {selectedLead.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <div>

                  <h4>
                    {selectedLead.name}
                  </h4>

                  <p>
                    Interested in{" "}
                    {selectedLead.service}
                  </p>

                </div>

              </div>


              {/* DETAILS */}

              <div className="lead-profile-grid">

                <div>

                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedLead.phone}
                  </strong>

                </div>


                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {selectedLead.email ||
                      "Not provided"}
                  </strong>

                </div>


                <div>

                  <span>
                    Treatment
                  </span>

                  <strong>
                    {selectedLead.service}
                  </strong>

                </div>


                <div>

                  <span>
                    Source
                  </span>

                  <strong>
                    {selectedLead.source}
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    {selectedLead.status}
                  </strong>

                </div>


                <div>

                  <span>
                    Created
                  </span>

                  <strong>
                    {formatDate(
                      selectedLead.createdAt
                    )}
                  </strong>

                </div>

              </div>


              {/* NOTES */}

              {selectedLead.notes && (

                <div
                  style={{
                    marginTop:
                      "20px",

                    padding:
                      "14px",

                    borderRadius:
                      "10px",

                    background:
                      "#f7f7f3",

                    fontSize:
                      "12px",

                    lineHeight:
                      "1.6",

                    color:
                      "#626a65",
                  }}
                >

                  <strong
                    style={{
                      display:
                        "block",

                      marginBottom:
                        "5px",

                      color:
                        "#343d37",
                    }}
                  >

                    Notes

                  </strong>

                  {selectedLead.notes}

                </div>

              )}


              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="lead-modal-footer">


                <button
                  type="button"
                  onClick={() =>
                    setSelectedLead(
                      null
                    )
                  }
                >
                  Close
                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleDeleteLead(
                      selectedLead._id
                    )
                  }
                  style={{
                    border:
                      "1px solid #ead5d2",

                    background:
                      "#fff6f5",

                    color:
                      "#a24840",

                    cursor:
                      "pointer",
                  }}
                >

                  Delete

                </button>


                {/* =================================================
                    CONVERT BUTTON
                ================================================= */}

                {selectedLead.status !==
                  "Converted" &&
                  !selectedLead.patient && (

                  <button
                    type="button"
                    onClick={() =>
                      handleConvertToPatient(
                        selectedLead
                      )
                    }
                    disabled={
                      convertingId ===
                      selectedLead._id
                    }
                    style={{
                      border:
                        "1px solid #d9c7a5",

                      background:
                        "#f5efe3",

                      color:
                        "#725c3b",

                      cursor:
                        convertingId ===
                        selectedLead._id
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        convertingId ===
                        selectedLead._id
                          ? 0.6
                          : 1,
                    }}
                  >

                    {convertingId ===
                    selectedLead._id
                      ? "Converting..."
                      : "Convert to Patient"}

                  </button>

                )}


                {/* ALREADY CONVERTED */}

                {(selectedLead.status ===
                  "Converted" ||
                  selectedLead.patient) && (

                  <span
                    style={{
                      padding:
                        "9px 14px",

                      borderRadius:
                        "8px",

                      background:
                        "#edf7ef",

                      color:
                        "#3f7650",

                      fontSize:
                        "12px",

                      fontWeight:
                        "600",
                    }}
                  >

                    ✓ Patient Created

                  </span>

                )}


                <a
                  href={`tel:${selectedLead.phone}`}
                >

                  <Phone size={13} />

                  Call lead

                </a>

              </div>


            </div>

          </div>

        )}


        {/* =================================================
            ADD LEAD MODAL
        ================================================= */}

        {showForm && (

          <div
            className="lead-modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                setShowForm(false);
              }

            }}
          >

            <div className="lead-modal">


              <div className="lead-modal-header">

                <div>

                  <span>
                    LEAD MANAGEMENT
                  </span>

                  <h3>
                    Add new lead
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  aria-label="Close"
                >

                  <X size={18} />

                </button>

              </div>


              <form
                className="lead-form"
                onSubmit={
                  handleAddLead
                }
              >

                <div className="lead-form-grid">


                  {/* NAME */}

                  <div className="lead-form-field">

                    <label>
                      Full name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter lead name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleFormChange
                      }
                      required
                    />

                  </div>


                  {/* PHONE */}

                  <div className="lead-form-field">

                    <label>
                      Phone number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
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

                  <div className="lead-form-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="lead@email.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleFormChange
                      }
                    />

                  </div>


                  {/* SERVICE */}

                  <div className="lead-form-field">

                    <label>
                      Treatment interest
                    </label>

                    <select
                      name="service"
                      value={
                        formData.service
                      }
                      onChange={
                        handleFormChange
                      }
                      required
                    >

                      <option value="">
                        Select treatment
                      </option>

                      <option value="Dental Cleaning">
                        Dental Cleaning
                      </option>

                      <option value="Dental Checkup">
                        Dental Checkup
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

                      <option value="General Consultation">
                        General Consultation
                      </option>

                    </select>

                  </div>


                  {/* SOURCE */}

                  <div className="lead-form-field">

                    <label>
                      Lead source
                    </label>

                    <select
                      name="source"
                      value={
                        formData.source
                      }
                      onChange={
                        handleFormChange
                      }
                    >

                      <option value="Website">
                        Website
                      </option>

                      <option value="WhatsApp">
                        WhatsApp
                      </option>

                      <option value="Ivy">
                        Ivy
                      </option>

                      <option value="Google">
                        Google
                      </option>

                      <option value="Referral">
                        Referral
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>


                  {/* NOTES */}

                  <div className="lead-form-field">

                    <label>
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      rows="3"
                      placeholder="Add notes about this lead..."
                      value={
                        formData.notes
                      }
                      onChange={
                        handleFormChange
                      }
                    />

                  </div>

                </div>


                <div className="lead-form-actions">

                  <button
                    type="button"
                    className="lead-form-cancel"
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="lead-form-submit"
                    disabled={
                      submitting
                    }
                  >

                    {submitting
                      ? "Adding..."
                      : "Add lead"}

                    {!submitting && (
                      <Plus size={14} />
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


export default Leads;