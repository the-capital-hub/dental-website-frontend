import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Contact.css";


const Contact = () => {

  // =====================================================
  // STATE
  // =====================================================

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
  });


  // =====================================================
  // HANDLE INPUT CHANGE
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
  // HANDLE FORM SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setSubmitting(true);

    setError("");


    try {

      const response = await fetch(
        "https://dental-website-backend.onrender.com/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            name: formData.name,

            phone: formData.phone,

            email: formData.email,

            // Backend uses "service"
            service:
              formData.treatment,

            // Contact page enquiry
            // automatically comes from Website
            source: "Website",

            // Store appointment preference
            // and message inside notes
            notes: `
Preferred Date: ${formData.date}

Preferred Time: ${formData.time}

Message:
${formData.message}
            `.trim(),

          }),
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Unable to submit your request."
        );

      }


      // =================================================
      // SUCCESS
      // =================================================

      setSubmitted(true);


      // Reset form

      setFormData({
        name: "",
        phone: "",
        email: "",
        treatment: "",
        date: "",
        time: "",
        message: "",
      });


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );


      setError(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  };


  // =====================================================
  // RESET SUCCESS SCREEN
  // =====================================================

  const handleSubmitAnother = () => {

    setSubmitted(false);

    setError("");

  };


  return (
    <>
      <Navbar />


      <main className="contact-page">


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="contact-hero">

          <div className="contact-container">


            <motion.div
              className="contact-label"

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.7,
              }}
            >

              <span>
                01
              </span>

              <i />

              <p>
                GET IN TOUCH
              </p>

            </motion.div>


            <div className="contact-hero-grid">


              {/* HERO CONTENT */}

              <motion.div
                className="contact-hero-content"

                initial={{
                  opacity: 0,
                  x: -35,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  duration: 0.9,
                }}
              >

                <div className="contact-kicker">

                  <CalendarDays
                    size={15}
                  />

                  <span>
                    YOUR NEXT STEP STARTS HERE
                  </span>

                </div>


                <h1>

                  Let's start

                  <br />

                  a{" "}

                  <em>
                    conversation.
                  </em>

                </h1>


                <p>

                  Whether you have a question,
                  need advice or are ready to
                  book your first visit, we're
                  here to make getting started
                  simple.

                </p>


                <a
                  href="#appointment"
                  className="contact-scroll-link"
                >

                  Book an appointment

                  <span>
                    <ArrowDown size={14} />
                  </span>

                </a>

              </motion.div>


              {/* HERO IMAGE */}

              <motion.div
                className="contact-hero-image"

                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 1,
                }}
              >

                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=90"
                  alt="Modern dental clinic"
                />


                <div className="contact-image-overlay" />


                <div className="contact-image-card">

                  <span>
                    WE'RE HERE TO HELP
                  </span>

                  <strong>

                    Questions.

                    <br />

                    Appointments.

                    <br />

                    Guidance.

                  </strong>

                </div>

              </motion.div>

            </div>


            <div className="contact-scroll">

              <span>
                SCROLL TO BOOK
              </span>

              <ArrowDown size={14} />

              <span>
                01 — 03
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            APPOINTMENT
        ===================================================== */}

        <section
          className="contact-booking"
          id="appointment"
        >

          <div className="contact-container">

            <div className="contact-booking-grid">


              {/* =================================================
                  FORM
              ================================================= */}

              <motion.div
                className="contact-form-wrapper"

                initial={{
                  opacity: 0,
                  x: -35,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                }}
              >

                <div className="contact-label">

                  <span>
                    02
                  </span>

                  <i />

                  <p>
                    BOOK A VISIT
                  </p>

                </div>


                <h2>

                  Tell us a little

                  <br />

                  <em>
                    about you.
                  </em>

                </h2>


                <p className="contact-form-intro">

                  Complete the form and our team
                  can follow up with you regarding
                  your preferred appointment.

                </p>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "13px 15px",
                      borderRadius: "10px",
                      background: "#fff5f4",
                      border:
                        "1px solid #ecd4d1",
                      color: "#a24840",
                      fontSize: "12px",
                      lineHeight: "1.5",
                    }}
                  >

                    {error}

                  </div>

                )}


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {submitted ? (

                  <motion.div
                    className="contact-success"

                    initial={{
                      opacity: 0,
                      scale: 0.96,
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                  >

                    <div className="contact-success-icon">

                      <CheckCircle2
                        size={26}
                      />

                    </div>


                    <h3>
                      Request received.
                    </h3>


                    <p>

                      Thank you. Your appointment
                      request has been submitted
                      successfully.

                      <br />

                      Our clinic team can contact
                      you to confirm the final
                      appointment details.

                    </p>


                    <button
                      type="button"
                      onClick={
                        handleSubmitAnother
                      }
                    >
                      Submit another request
                    </button>

                  </motion.div>

                ) : (


                  /* =================================================
                     FORM
                  ================================================= */

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >


                    {/* NAME + PHONE */}

                    <div className="contact-form-row">


                      <div className="contact-field">

                        <label htmlFor="name">
                          FULL NAME
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={
                            formData.name
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />

                      </div>


                      <div className="contact-field">

                        <label htmlFor="phone">
                          PHONE NUMBER
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={
                            formData.phone
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL */}

                    <div className="contact-field">

                      <label htmlFor="email">
                        EMAIL ADDRESS
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>


                    {/* TREATMENT */}

                    <div className="contact-field">

                      <label htmlFor="treatment">
                        WHAT CAN WE HELP WITH?
                      </label>

                      <select
                        id="treatment"
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
                          Select a treatment
                        </option>

                        <option value="General Dentistry">
                          General Dentistry
                        </option>

                        <option value="Cosmetic Dentistry">
                          Cosmetic Dentistry
                        </option>

                        <option value="Dental Implants">
                          Dental Implants
                        </option>

                        <option value="Orthodontics">
                          Orthodontics
                        </option>

                        <option value="Preventive Care">
                          Preventive Care
                        </option>

                        <option value="Not sure yet">
                          Not sure yet
                        </option>

                      </select>

                    </div>


                    {/* DATE + TIME */}

                    <div className="contact-form-row">


                      <div className="contact-field">

                        <label htmlFor="date">
                          PREFERRED DATE
                        </label>

                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={
                            formData.date
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />

                      </div>


                      <div className="contact-field">

                        <label htmlFor="time">
                          PREFERRED TIME
                        </label>

                        <select
                          id="time"
                          name="time"
                          value={
                            formData.time
                          }
                          onChange={
                            handleChange
                          }
                          required
                        >

                          <option value="">
                            Select time
                          </option>

                          <option value="Morning">
                            Morning
                          </option>

                          <option value="Afternoon">
                            Afternoon
                          </option>

                          <option value="Evening">
                            Evening
                          </option>

                        </select>

                      </div>

                    </div>


                    {/* MESSAGE */}

                    <div className="contact-field">

                      <label htmlFor="message">
                        ANYTHING WE SHOULD KNOW?
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell us briefly how we can help..."
                        value={
                          formData.message
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>


                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="contact-submit"
                      disabled={submitting}
                    >

                      {submitting
                        ? "Sending request..."
                        : "Send appointment request"}


                      <span>

                        {submitting ? (
                          <span
                            style={{
                              display:
                                "inline-block",
                              width: "13px",
                              height: "13px",
                              border:
                                "2px solid rgba(255,255,255,.35)",
                              borderTopColor:
                                "#fff",
                              borderRadius:
                                "50%",
                              animation:
                                "contactSpin .7s linear infinite",
                            }}
                          />
                        ) : (
                          <Send size={14} />
                        )}

                      </span>

                    </button>


                    <p className="contact-form-note">

                      Your request will be securely
                      sent to the clinic team.

                    </p>

                  </form>

                )}

              </motion.div>


              {/* =================================================
                  CONTACT INFO
              ================================================= */}

              <motion.aside
                className="contact-info"

                initial={{
                  opacity: 0,
                  x: 35,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                }}
              >

                <div className="contact-info-image">

                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=90"
                    alt="Welcoming clinic interior"
                  />


                  <div className="contact-info-image-overlay" />


                  <div className="contact-info-image-text">

                    <span>
                      OAK & IVORY
                    </span>

                    <strong>

                      A calmer way

                      <br />

                      to visit the dentist.

                    </strong>

                  </div>

                </div>


                <div className="contact-details">


                  {/* ADDRESS */}

                  <div className="contact-detail">

                    <div className="contact-detail-icon">
                      <MapPin size={16} />
                    </div>

                    <div>

                      <span>
                        VISIT US
                      </span>

                      <strong>

                        24 Example Avenue

                        <br />

                        Your City, India

                      </strong>

                    </div>

                  </div>


                  {/* PHONE */}

                  <div className="contact-detail">

                    <div className="contact-detail-icon">
                      <Phone size={16} />
                    </div>

                    <div>

                      <span>
                        CALL US
                      </span>

                      <strong>
                        +91 00000 00000
                      </strong>

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div className="contact-detail">

                    <div className="contact-detail-icon">
                      <Mail size={16} />
                    </div>

                    <div>

                      <span>
                        EMAIL
                      </span>

                      <strong>
                        hello@oakandivory.com
                      </strong>

                    </div>

                  </div>


                  {/* HOURS */}

                  <div className="contact-detail">

                    <div className="contact-detail-icon">
                      <Clock3 size={16} />
                    </div>

                    <div>

                      <span>
                        CLINIC HOURS
                      </span>

                      <strong>

                        Mon — Fri · 9:00 AM — 6:00 PM

                        <br />

                        Sat · 9:00 AM — 2:00 PM

                      </strong>

                    </div>

                  </div>


                </div>

              </motion.aside>

            </div>

          </div>

        </section>


        {/* =====================================================
            SIMPLE PROCESS
        ===================================================== */}

        <section className="contact-process">

          <div className="contact-container">


            <motion.div
              className="contact-process-heading"

              initial={{
                opacity: 0,
                y: 25,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}
            >

              <div className="contact-label centered">

                <span>
                  03
                </span>

                <i />

                <p>
                  WHAT HAPPENS NEXT
                </p>

              </div>


              <h2>

                Simple from

                <br />

                <em>
                  the beginning.
                </em>

              </h2>

            </motion.div>


            <div className="contact-process-grid">


              <div className="contact-process-card">

                <span>
                  01
                </span>

                <div>
                  <CalendarDays size={20} />
                </div>

                <h3>
                  Request a visit
                </h3>

                <p>

                  Tell us when you'd like to
                  visit and what you'd like
                  help with.

                </p>

              </div>


              <div className="contact-process-card">

                <span>
                  02
                </span>

                <div>
                  <Phone size={20} />
                </div>

                <h3>
                  We'll connect
                </h3>

                <p>

                  Our team can contact you
                  to discuss your request
                  and available options.

                </p>

              </div>


              <div className="contact-process-card">

                <span>
                  03
                </span>

                <div>
                  <CheckCircle2 size={20} />
                </div>

                <h3>
                  Confirm your visit
                </h3>

                <p>

                  Once the details are
                  confirmed, you're ready
                  for your appointment.

                </p>

              </div>


            </div>

          </div>

        </section>


        {/* =====================================================
            EMERGENCY
        ===================================================== */}

        <section className="contact-emergency">

          <div className="contact-container">

            <motion.div
              className="contact-emergency-inner"

              initial={{
                opacity: 0,
                y: 25,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}
            >

              <div className="contact-emergency-icon">

                <Sparkles size={20} />

              </div>


              <div>

                <span>
                  NEED HELP URGENTLY?
                </span>

                <h2>

                  If you're unsure what to do,

                  <em>
                    {" "}talk to us.
                  </em>

                </h2>

                <p>

                  For urgent dental concerns,
                  contact the clinic directly
                  so the team can guide you
                  towards the appropriate
                  next step.

                </p>

              </div>


              <a href="tel:+910000000000">

                Call the clinic

                <ArrowUpRight size={15} />

              </a>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="contact-final">

          <div className="contact-container">

            <motion.div
              className="contact-final-inner"

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}
            >

              <span>
                YOUR NEXT STEP
              </span>

              <h2>

                Ready when

                <br />

                <em>
                  you are.
                </em>

              </h2>


              <a href="#appointment">

                Book your visit

                <span>
                  <ArrowUpRight size={16} />
                </span>

              </a>

            </motion.div>

          </div>

        </section>


      </main>


      <Footer />


      {/* =====================================================
          SPINNER ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes contactSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </>
  );
};


export default Contact;