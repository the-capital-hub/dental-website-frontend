import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

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
          result.message || "Unable to book appointment."
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
      <Navbar />

      <main className="appointment-page">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="appointment-hero">

          {/* BACKGROUND IMAGE */}

          <div className="appointment-hero-image">

            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=85"
              alt="Modern dental clinic"
            />

          </div>


          {/* DARK OVERLAY */}

          <div className="appointment-hero-overlay" />


          {/* DECORATIVE CIRCLES */}

          <div className="appointment-hero-orb appointment-hero-orb-one" />

          <div className="appointment-hero-orb appointment-hero-orb-two" />


          {/* HERO CONTENT */}

          <div className="appointment-hero-content">

            <div className="appointment-hero-copy">

              <span className="appointment-eyebrow">

                <span className="appointment-eyebrow-line" />

                BOOK YOUR VISIT

              </span>


              <h1>

                Your healthier

                <br />

                smile starts <em>here.</em>

              </h1>


              <p>

                A simple first step toward thoughtful,
                comfortable dental care. Tell us what
                you need and our team will take care of
                the rest.

              </p>


              <div className="appointment-hero-meta">

                <div>
                  <CheckCircle2 size={15} />
                  <span>Personalised care</span>
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  <span>Modern dentistry</span>
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  <span>Comfort first</span>
                </div>

              </div>

            </div>


            {/* HERO FLOATING CARD */}

            <div className="appointment-hero-card">

              <div className="appointment-hero-card-icon">

                <CalendarDays size={20} />

              </div>


              <div>

                <span>
                  READY WHEN YOU ARE
                </span>

                <strong>
                  Request your appointment
                </strong>

              </div>


              <ArrowUpRight size={18} />

            </div>

          </div>

        </section>


        {/* ==================================================
            APPOINTMENT SECTION
        ================================================== */}

        <section className="appointment-section">

          <div className="appointment-container">


            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="appointment-info">

              <span className="appointment-section-label">
                APPOINTMENT REQUEST
              </span>


              <h2>

                Let's find a time

                <br />

                that works <em>for you.</em>

              </h2>


              <p className="appointment-info-description">

                Complete the short form and our clinic
                team will review your request and contact
                you to confirm the details.

              </p>


              {/* TRUST CARD */}

              <div className="appointment-trust-card">

                <div className="appointment-trust-icon">

                  <ShieldCheck size={19} />

                </div>


                <div>

                  <strong>
                    Your information is safe.
                  </strong>

                  <p>
                    We only use your details to arrange
                    and confirm your appointment.
                  </p>

                </div>

              </div>


              {/* CONTACT LIST */}

              <div className="appointment-contact-list">


                {/* PHONE */}

                <a
                  href="tel:+919876543210"
                  className="appointment-contact-item"
                >

                  <div className="appointment-contact-icon">

                    <Phone size={17} />

                  </div>


                  <div className="appointment-contact-content">

                    <small>
                      CALL US
                    </small>

                    <strong>
                      +91 98765 43210
                    </strong>

                  </div>


                  <ArrowUpRight
                    size={14}
                    className="appointment-contact-arrow"
                  />

                </a>


                {/* EMAIL */}

                <a
                  href="mailto:hello@oakandivory.com"
                  className="appointment-contact-item"
                >

                  <div className="appointment-contact-icon">

                    <Mail size={17} />

                  </div>


                  <div className="appointment-contact-content">

                    <small>
                      EMAIL US
                    </small>

                    <strong>
                      hello@oakandivory.com
                    </strong>

                  </div>


                  <ArrowUpRight
                    size={14}
                    className="appointment-contact-arrow"
                  />

                </a>


                {/* HOURS */}

                <div className="appointment-contact-item">

                  <div className="appointment-contact-icon">

                    <Clock3 size={17} />

                  </div>


                  <div className="appointment-contact-content">

                    <small>
                      CLINIC HOURS
                    </small>

                    <strong>
                      Mon – Sat · 9:00 AM – 7:00 PM
                    </strong>

                  </div>

                </div>

              </div>


              {/* LOCATION */}

              <div className="appointment-location">

                <div className="appointment-location-icon">

                  <MapPin size={16} />

                </div>


                <div>

                  <span>
                    VISIT OUR CLINIC
                  </span>

                  <strong>
                    New Delhi, India
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <div className="appointment-form-card">


              {/* FORM HEADER */}

              <div className="appointment-form-top">

                <div className="appointment-form-heading">

                  <div className="appointment-form-heading-icon">

                    <Sparkles size={18} />

                  </div>


                  <div>

                    <span>
                      LET'S GET STARTED
                    </span>

                    <h3>
                      Request an appointment
                    </h3>

                    <p>
                      Fields marked with * are required.
                    </p>

                  </div>

                </div>


                <div className="appointment-step">

                  <span>
                    01
                  </span>

                  <small>
                    of 01
                  </small>

                </div>

              </div>


              {/* SUCCESS MESSAGE */}

              {success && (

                <div className="appointment-success">

                  <div className="appointment-success-icon">

                    <CheckCircle2 size={20} />

                  </div>


                  <div>

                    <strong>
                      Appointment request received!
                    </strong>

                    <p>
                      Our clinic team will contact you
                      shortly to confirm your appointment.
                    </p>

                  </div>

                </div>

              )}


              {/* ERROR MESSAGE */}

              {error && (

                <div className="appointment-error">

                  {error}

                </div>

              )}


              {/* FORM */}

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
                      value={formData.patientName}
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
                        value={formData.phone}
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
                        value={formData.email}
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
                        value={formData.appointmentDate}
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
                        value={formData.appointmentTime}
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
                    value={formData.message}
                    onChange={handleChange}
                  />

                </div>


                {/* SUBMIT BUTTON */}

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


                  

                </button>


                <p className="appointment-form-note">

                  By submitting this form, you agree to be
                  contacted by our clinic team regarding your
                  appointment request.

                </p>

              </form>

            </div>

          </div>

        </section>

      </main>


      <Footer />

    </>
  );
};

export default Appointment;