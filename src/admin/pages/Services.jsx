import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Edit3,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Services.css";

const initialServices = [
  {
    id: 1,
    name: "General Dental Checkup",
    category: "Preventive Care",
    duration: "30 min",
    price: "₹800",
    patients: 186,
    status: "Active",
    description:
      "Complete oral examination with professional dental assessment.",
  },
  {
    id: 2,
    name: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    duration: "60 min",
    price: "₹4,500",
    patients: 94,
    status: "Active",
    description:
      "Professional whitening treatment for a brighter and healthier smile.",
  },
  {
    id: 3,
    name: "Root Canal Treatment",
    category: "Restorative Dentistry",
    duration: "90 min",
    price: "₹6,500",
    patients: 72,
    status: "Active",
    description:
      "Advanced root canal treatment designed to save damaged teeth.",
  },
  {
    id: 4,
    name: "Dental Implants",
    category: "Implant Dentistry",
    duration: "120 min",
    price: "₹25,000",
    patients: 48,
    status: "Active",
    description:
      "Natural-looking dental implant solutions for missing teeth.",
  },
  {
    id: 5,
    name: "Orthodontic Consultation",
    category: "Orthodontics",
    duration: "45 min",
    price: "₹1,200",
    patients: 61,
    status: "Active",
    description:
      "Personalized consultation for braces and teeth alignment.",
  },
  {
    id: 6,
    name: "Dental Cleaning",
    category: "Preventive Care",
    duration: "45 min",
    price: "₹1,500",
    patients: 143,
    status: "Inactive",
    description:
      "Professional cleaning to remove plaque and maintain oral health.",
  },
];

const ServicesA = () => {
  const [services, setServices] =
    useState(initialServices);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [editingService, setEditingService] =
    useState(null);

  const [selectedService, setSelectedService] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
  });

  const filteredServices = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !value ||
        service.name
          .toLowerCase()
          .includes(value) ||
        service.category
          .toLowerCase()
          .includes(value);

      const matchesFilter =
        filter === "All" ||
        service.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [services, search, filter]);

  const activeServices =
    services.filter(
      (service) =>
        service.status === "Active"
    ).length;

  const totalPatients =
    services.reduce(
      (total, service) =>
        total + service.patients,
      0
    );

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingService(null);

    setFormData({
      name: "",
      category: "",
      duration: "",
      price: "",
      description: "",
    });

    setShowForm(true);
  };

  const openEditForm = (service) => {
    setEditingService(service);

    setFormData({
      name: service.name,
      category: service.category,
      duration: service.duration,
      price: service.price,
      description: service.description,
    });

    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price
    ) {
      return;
    }

    if (editingService) {
      setServices((previous) =>
        previous.map((service) =>
          service.id ===
          editingService.id
            ? {
                ...service,
                ...formData,
              }
            : service
        )
      );
    } else {
      const newService = {
        id: Date.now(),
        ...formData,
        patients: 0,
        status: "Active",
      };

      setServices((previous) => [
        newService,
        ...previous,
      ]);
    }

    setShowForm(false);
    setEditingService(null);
  };

  const toggleStatus = (id) => {
    setServices((previous) =>
      previous.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : service
      )
    );
  };

  const deleteService = (id) => {
    setServices((previous) =>
      previous.filter(
        (service) =>
          service.id !== id
      )
    );

    setSelectedService(null);
  };

  return (
    <AdminLayout
      title="Services"
      subtitle="Manage treatments and dental services."
      activePage="Services"
    >
      <div className="services-page">

        {/* HEADER */}

        <section className="services-page-header">

          <div>
            <span className="services-eyebrow">
              CLINIC SERVICES
            </span>

            <h2>
              Services
            </h2>

            <p>
              Manage treatments, pricing and
              availability.
            </p>
          </div>

          <button
            type="button"
            className="services-add-button"
            onClick={openAddForm}
          >
            <Plus size={16} />
            Add Service
          </button>

        </section>


        {/* SUMMARY */}

        <section className="services-summary">

          <div className="services-summary-card">

            <div className="services-summary-icon">
              <Stethoscope size={17} />
            </div>

            <div>
              <span>
                Total Services
              </span>

              <strong>
                {services.length}
              </strong>
            </div>

          </div>


          <div className="services-summary-card">

            <div className="services-summary-icon">
              <Check size={17} />
            </div>

            <div>
              <span>
                Active Services
              </span>

              <strong>
                {activeServices}
              </strong>
            </div>

          </div>


          <div className="services-summary-card">

            <div className="services-summary-icon">
              <Stethoscope size={17} />
            </div>

            <div>
              <span>
                Patients Served
              </span>

              <strong>
                {totalPatients}
              </strong>
            </div>

          </div>

        </section>


        {/* TOOLBAR */}

        <section className="services-toolbar">

          <div className="services-search">

            <Search size={16} />

            <input
              type="search"
              placeholder="Search services..."
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


          <div className="services-filter">

            {[
              "All",
              "Active",
              "Inactive",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  filter === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </section>


        {/* SERVICES GRID */}

        <section className="services-grid">

          {filteredServices.map(
            (service) => (

              <article
                className="service-card"
                key={service.id}
              >

                <div className="service-card-header">

                  <div className="service-icon">
                    <Stethoscope
                      size={19}
                    />
                  </div>

                  <button
                    type="button"
                    className={`service-status ${
                      service.status ===
                      "Active"
                        ? "service-status-active"
                        : "service-status-inactive"
                    }`}
                    onClick={() =>
                      toggleStatus(
                        service.id
                      )
                    }
                  >
                    <span />
                    {service.status}
                  </button>

                </div>


                <div className="service-card-content">

                  <span className="service-category">
                    {service.category}
                  </span>

                  <h3>
                    {service.name}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                </div>


                <div className="service-details">

                  <div>
                    <span>
                      DURATION
                    </span>

                    <strong>
                      {service.duration}
                    </strong>
                  </div>

                  <div>
                    <span>
                      PRICE
                    </span>

                    <strong>
                      {service.price}
                    </strong>
                  </div>

                  <div>
                    <span>
                      PATIENTS
                    </span>

                    <strong>
                      {service.patients}
                    </strong>
                  </div>

                </div>


                <div className="service-card-footer">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedService(
                        service
                      )
                    }
                  >
                    View details
                    <ArrowUpRight
                      size={13}
                    />
                  </button>

                  <button
                    type="button"
                    className="service-edit-button"
                    onClick={() =>
                      openEditForm(
                        service
                      )
                    }
                  >
                    <Edit3 size={13} />
                  </button>

                </div>

              </article>

            )
          )}

        </section>


        {filteredServices.length ===
          0 && (

          <div className="services-empty">

            <Stethoscope size={25} />

            <h3>
              No services found
            </h3>

            <p>
              Try changing your search
              or filter.
            </p>

          </div>

        )}


        {/* SERVICE DETAILS MODAL */}

        {selectedService && (

          <div
            className="service-modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedService(null);
              }
            }}
          >

            <div className="service-modal">

              <div className="service-modal-header">

                <div>
                  <span>
                    SERVICE DETAILS
                  </span>

                  <h3>
                    {selectedService.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedService(
                      null
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <div className="service-modal-icon">
                <Stethoscope size={22} />
              </div>


              <span className="service-modal-category">
                {selectedService.category}
              </span>

              <p className="service-modal-description">
                {selectedService.description}
              </p>


              <div className="service-modal-info">

                <div>
                  <span>
                    PRICE
                  </span>

                  <strong>
                    {selectedService.price}
                  </strong>
                </div>

                <div>
                  <span>
                    DURATION
                  </span>

                  <strong>
                    {selectedService.duration}
                  </strong>
                </div>

                <div>
                  <span>
                    PATIENTS
                  </span>

                  <strong>
                    {selectedService.patients}
                  </strong>
                </div>

              </div>


              <div className="service-modal-actions">

                <button
                  type="button"
                  className="service-modal-edit"
                  onClick={() => {
                    openEditForm(
                      selectedService
                    );
                    setSelectedService(
                      null
                    );
                  }}
                >
                  <Edit3 size={14} />
                  Edit Service
                </button>

                <button
                  type="button"
                  className="service-modal-delete"
                  onClick={() =>
                    deleteService(
                      selectedService.id
                    )
                  }
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}


        {/* ADD / EDIT MODAL */}

        {showForm && (

          <div
            className="service-modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowForm(false);
              }
            }}
          >

            <div className="service-modal">

              <div className="service-modal-header">

                <div>

                  <span>
                    SERVICE MANAGEMENT
                  </span>

                  <h3>
                    {editingService
                      ? "Edit Service"
                      : "Add Service"}
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <form
                className="service-form"
                onSubmit={handleSubmit}
              >

                <div className="service-form-field">

                  <label>
                    Service name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Dental Cleaning"
                    value={formData.name}
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="service-form-field">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="Preventive Care"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="service-form-row">

                  <div className="service-form-field">

                    <label>
                      Duration
                    </label>

                    <input
                      type="text"
                      name="duration"
                      placeholder="45 min"
                      value={
                        formData.duration
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>


                  <div className="service-form-field">

                    <label>
                      Price
                    </label>

                    <input
                      type="text"
                      name="price"
                      placeholder="₹1,500"
                      value={
                        formData.price
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>


                <div className="service-form-field">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Describe the dental service..."
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div className="service-form-actions">

                  <button
                    type="button"
                    className="service-form-cancel"
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="service-form-submit"
                  >
                    {editingService
                      ? "Save Changes"
                      : "Add Service"}

                    <Check size={14} />
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

export default ServicesA;