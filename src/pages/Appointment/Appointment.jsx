import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import "./Appointment.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL =
  "https://dental-website-backend.onrender.com/api/appointments";

const Appointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    service: "",
    appointmentDate: "",
    appointmentTime: "",
    doctor: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to book appointment."
        );
      }

      setSuccess(true);

      setFormData({
        patientName: "",
        phone: "",
        email: "",
        service: "",
        appointmentDate: "",
        appointmentTime: "",
        doctor: "",
        message: "",
      });

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <Navbar/>
    <main className="appointment-page">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="appointment-hero">

        <div className="appointment-hero-content">

          <span className="appointment-eyebrow">
            BOOK YOUR VISIT
          </span>

          <h1>
            Your healthier
            <br />
            smile starts here.
          </h1>

          <p>
            Tell us when you'd like to visit
            and our team will take care of
            the rest.
          </p>

        </div>

      </section>


      {/* ========================================
          BOOKING SECTION
      ======================================== */}

      <section className="appointment-section">

        <div className="appointment-container">

          {/* LEFT INFO */}

          <div className="appointment-info">

            <span className="appointment-section-label">
              APPOINTMENT REQUEST
            </span>

            <h2>
              Let's find a time
              <br />
              that works for you.
            </h2>

            <p>
              Complete the form and our clinic
              team will confirm your appointment.
            </p>


            <div className="appointment-contact-list">

              <div className="appointment-contact-item">

                <div className="appointment-contact-icon">
                  <Phone size={17} />
                </div>

                <div>
                  <small>
                    CALL US
                  </small>

                  <strong>
                    +91 98765 43210
                  </strong>
                </div>

              </div>


              <div className="appointment-contact-item">

                <div className="appointment-contact-icon">
                  <Mail size={17} />
                </div>

                <div>
                  <small>
                    EMAIL
                  </small>

                  <strong>
                    hello@oakandivory.com
                  </strong>
                </div>

              </div>


              <div className="appointment-contact-item">

                <div className="appointment-contact-icon">
                  <Clock3 size={17} />
                </div>

                <div>
                  <small>
                    CLINIC HOURS
                  </small>

                  <strong>
                    Mon – Sat · 9:00 AM – 7:00 PM
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="appointment-form-card">

            <div className="appointment-form-heading">

              <div className="appointment-form-heading-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <h3>
                  Request an appointment
                </h3>

                <p>
                  Fields marked with * are required.
                </p>
              </div>

            </div>


            {/* SUCCESS */}

            {success && (

              <div className="appointment-success">

                <CheckCircle2 size={20} />

                <div>

                  <strong>
                    Appointment request received!
                  </strong>

                  <p>
                    Our clinic team will contact you
                    to confirm your appointment.
                  </p>

                </div>

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="appointment-error">
                {error}
              </div>

            )}


            <form
              onSubmit={handleSubmit}
              className="appointment-form"
            >

              {/* NAME */}

              <div className="appointment-field">

                <label>
                  Full Name *
                </label>

                <div className="appointment-input-wrap">

                  <UserRound size={16} />

                  <input
                    type="text"
                    name="patientName"
                    placeholder="Enter your full name"
                    value={
                      formData.patientName
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PHONE + EMAIL */}

              <div className="appointment-form-grid">

                <div className="appointment-field">

                  <label>
                    Mobile Number *
                  </label>

                  <div className="appointment-input-wrap">

                    <Phone size={16} />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={
                        formData.phone
                      }
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="appointment-field">

                  <label>
                    Email Address
                  </label>

                  <div className="appointment-input-wrap">

                    <Mail size={16} />

                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      value={
                        formData.email
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>


              {/* SERVICE */}

              <div className="appointment-field">

                <label>
                  Service *
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a service
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

                  <option value="Dental Implant">
                    Dental Implant
                  </option>

                  <option value="Teeth Whitening">
                    Teeth Whitening
                  </option>

                  <option value="Clear Aligners">
                    Clear Aligners
                  </option>

                  <option value="Veneers">
                    Veneers
                  </option>

                  <option value="General Consultation">
                    General Consultation
                  </option>

                </select>

              </div>


              {/* DATE + TIME */}

              <div className="appointment-form-grid">

                <div className="appointment-field">

                  <label>
                    Preferred Date *
                  </label>

                  <div className="appointment-input-wrap">

                    <CalendarDays size={16} />

                    <input
                      type="date"
                      name="appointmentDate"
                      value={
                        formData.appointmentDate
                      }
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="appointment-field">

                  <label>
                    Preferred Time *
                  </label>

                  <div className="appointment-input-wrap">

                    <Clock3 size={16} />

                    <input
                      type="time"
                      name="appointmentTime"
                      value={
                        formData.appointmentTime
                      }
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </div>


              {/* DOCTOR */}

              <div className="appointment-field">

                <label>
                  Preferred Dentist
                </label>

                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                >

                  <option value="">
                    Any available dentist
                  </option>

                  <option value="Dr. Ananya">
                    Dr. Ananya
                  </option>

                  <option value="Dr. Arjun">
                    Dr. Arjun
                  </option>

                </select>

              </div>


              {/* MESSAGE */}

              <div className="appointment-field">

                <label>
                  Additional Information
                </label>

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us anything you'd like us to know..."
                  value={
                    formData.message
                  }
                  onChange={handleChange}
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="appointment-submit"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Sending Request..."
                    : "Request Appointment"}
                </span>

                <ArrowUpRight size={17} />

              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
    <Footer/>
    </>
  );
};

export default Appointment;