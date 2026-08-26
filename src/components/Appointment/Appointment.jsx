import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

import "./Appointment.css";

const treatmentOptions = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Dental Implants",
  "Root Canal",
  "Crowns & Bridges",
  "Clear Aligners",
  "Not Sure Yet",
];

const timeOptions = [
  "Morning — 9 AM to 12 PM",
  "Afternoon — 12 PM to 4 PM",
  "Evening — 4 PM to 7 PM",
];

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [openSelect, setOpenSelect] =
    useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectOption = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setOpenSelect(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      treatment: "",
      date: "",
      time: "",
      message: "",
    });

    setSubmitted(false);
  };

  return (
    <section
      className="appointment-section"
      id="appointment"
    >
      <div className="appointment-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="appointment-header"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="appointment-label">
            <span>13</span>
            <i />
            <p>BOOK A VISIT</p>
          </div>

          <div className="appointment-heading">

            <h2>
              Your next
              <br />
              <em>smile starts here.</em>
            </h2>

            <p>
              Tell us a little about what you're
              looking for and our team will help
              you find the right appointment.
            </p>

          </div>
        </motion.div>


        {/* =====================================
            BOOKING AREA
        ===================================== */}

        <motion.div
          className="appointment-main"
          initial={{
            opacity: 0,
            y: 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
          }}
        >

          {/* LEFT SIDE */}

          <div className="appointment-info">

            <div className="appointment-info-top">

              <div className="appointment-icon">
                <CalendarDays size={19} />
              </div>

              <span>
                APPOINTMENT REQUEST
              </span>

            </div>

            <h3>
              Let's find a time
              <br />
              that works <em>for you.</em>
            </h3>

            <p>
              Share your preferred details and our
              team will get back to you to confirm
              availability.
            </p>


            {/* INFO ITEMS */}

            <div className="appointment-details">

              <div>
                <span>
                  <Clock3 size={14} />
                </span>

                <div>
                  <strong>
                    Flexible scheduling
                  </strong>

                  <p>
                    Morning, afternoon or evening
                  </p>
                </div>
              </div>


              <div>
                <span>
                  <Phone size={14} />
                </span>

                <div>
                  <strong>
                    Prefer to call?
                  </strong>

                  <p>
                    +91 98765 43210
                  </p>
                </div>
              </div>


              <div>
                <span>
                  <Sparkles size={14} />
                </span>

                <div>
                  <strong>
                    Not sure what you need?
                  </strong>

                  <p>
                    Ivy can help guide you
                  </p>
                </div>
              </div>

            </div>


            <a
              href="#ivy"
              className="appointment-ivy"
            >
              Talk to Ivy

              <ArrowRight size={14} />
            </a>

          </div>


          {/* FORM */}

          <div className="appointment-form-wrapper">

            <AnimatePresence mode="wait">

              {!submitted ? (

                <motion.form
                  key="form"
                  className="appointment-form"
                  onSubmit={handleSubmit}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >

                  {/* NAME */}

                  <div className="appointment-field">

                    <label>
                      YOUR NAME
                    </label>

                    <div className="appointment-input">

                      <UserRound size={14} />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />

                    </div>

                  </div>


                  {/* PHONE + EMAIL */}

                  <div className="appointment-two-columns">

                    <div className="appointment-field">

                      <label>
                        PHONE
                      </label>

                      <div className="appointment-input">

                        <Phone size={14} />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91"
                          required
                        />

                      </div>

                    </div>


                    <div className="appointment-field">

                      <label>
                        EMAIL
                      </label>

                      <div className="appointment-input">

                        <Mail size={14} />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                        />

                      </div>

                    </div>

                  </div>


                  {/* TREATMENT */}

                  <div className="appointment-field">

                    <label>
                      WHAT CAN WE HELP WITH?
                    </label>

                    <div className="appointment-select">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenSelect(
                            openSelect === "treatment"
                              ? null
                              : "treatment"
                          )
                        }
                      >
                        <span>
                          {formData.treatment ||
                            "Select a treatment"}
                        </span>

                        <ChevronDown
                          size={15}
                          className={
                            openSelect === "treatment"
                              ? "select-open"
                              : ""
                          }
                        />
                      </button>

                      <AnimatePresence>

                        {openSelect ===
                          "treatment" && (
                          <motion.div
                            className="select-menu"
                            initial={{
                              opacity: 0,
                              y: -5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -5,
                            }}
                          >

                            {treatmentOptions.map(
                              (option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() =>
                                    selectOption(
                                      "treatment",
                                      option
                                    )
                                  }
                                >
                                  {option}
                                </button>
                              )
                            )}

                          </motion.div>
                        )}

                      </AnimatePresence>

                    </div>

                  </div>


                  {/* DATE + TIME */}

                  <div className="appointment-two-columns">

                    <div className="appointment-field">

                      <label>
                        PREFERRED DATE
                      </label>

                      <div className="appointment-input">

                        <CalendarDays size={14} />

                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />

                      </div>

                    </div>


                    <div className="appointment-field">

                      <label>
                        PREFERRED TIME
                      </label>

                      <div className="appointment-select">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenSelect(
                              openSelect === "time"
                                ? null
                                : "time"
                            )
                          }
                        >
                          <span>
                            {formData.time ||
                              "Select a time"}
                          </span>

                          <ChevronDown
                            size={15}
                            className={
                              openSelect === "time"
                                ? "select-open"
                                : ""
                            }
                          />
                        </button>

                        <AnimatePresence>

                          {openSelect === "time" && (
                            <motion.div
                              className="select-menu"
                              initial={{
                                opacity: 0,
                                y: -5,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: -5,
                              }}
                            >

                              {timeOptions.map(
                                (option) => (
                                  <button
                                    type="button"
                                    key={option}
                                    onClick={() =>
                                      selectOption(
                                        "time",
                                        option
                                      )
                                    }
                                  >
                                    {option}
                                  </button>
                                )
                              )}

                            </motion.div>
                          )}

                        </AnimatePresence>

                      </div>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div className="appointment-field">

                    <label>
                      ANYTHING WE SHOULD KNOW?
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us anything that may help us prepare..."
                      rows="4"
                    />

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="appointment-submit"
                  >
                    Request an appointment

                    <span>
                      <ArrowRight size={15} />
                    </span>
                  </button>


                  <p className="appointment-note">
                    By submitting this form, you're
                    requesting an appointment. Our team
                    will contact you to confirm availability.
                  </p>

                </motion.form>

              ) : (

                <motion.div
                  key="success"
                  className="appointment-success"
                  initial={{
                    opacity: 0,
                    scale: .96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: .45,
                  }}
                >

                  <div className="success-icon">
                    <Check size={25} />
                  </div>

                  <span>
                    REQUEST RECEIVED
                  </span>

                  <h3>
                    You're one step
                    <br />
                    closer to <em>your smile.</em>
                  </h3>

                  <p>
                    Thanks, {formData.name || "there"}.
                    Our team will review your request
                    and contact you to confirm your
                    appointment.
                  </p>

                  <div className="success-summary">

                    <div>
                      <span>TREATMENT</span>
                      <strong>
                        {formData.treatment ||
                          "Not specified"}
                      </strong>
                    </div>

                    <div>
                      <span>DATE</span>
                      <strong>
                        {formData.date ||
                          "Flexible"}
                      </strong>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="appointment-again"
                  >
                    Make another request
                  </button>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </motion.div>


        {/* BOTTOM */}

        <motion.div
          className="appointment-bottom"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .7,
          }}
        >
          <span>
            NEED HELP CHOOSING A TREATMENT?
          </span>

          <a href="#ivy">
            Ask Ivy
            <ArrowRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Appointment;