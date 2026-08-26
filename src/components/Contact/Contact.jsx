import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSent(true);
  };

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="contact-header"
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
          <div className="contact-label">
            <span>14</span>
            <i />
            <p>CONTACT</p>
          </div>

          <div className="contact-heading">

            <h2>
              Come say
              <br />
              <em>hello.</em>
            </h2>

            <p>
              Whether you're ready to book, have a
              question or simply want to learn more,
              we'd love to hear from you.
            </p>

          </div>
        </motion.div>


        {/* =====================================
            MAIN
        ===================================== */}

        <div className="contact-main">

          {/* ===================================
              LEFT — CLINIC INFO
          =================================== */}

          <motion.div
            className="contact-info"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="contact-info-top">

              <div className="contact-icon">
                <MapPin size={19} />
              </div>

              <span>
                FIND US
              </span>

            </div>

            <h3>
              Let's make
              <br />
              your visit <em>easy.</em>
            </h3>

            <p>
              Our clinic is designed to make every
              part of your dental experience feel
              calm, considered and comfortable.
            </p>


            {/* ADDRESS */}

            <div className="contact-detail">

              <span>
                <MapPin size={14} />
              </span>

              <div>
                <small>
                  CLINIC ADDRESS
                </small>

                <strong>
                  Oak & Ivory Dental
                </strong>

                <p>
                  24 Green Avenue,
                  <br />
                  New Delhi, India
                </p>
              </div>

            </div>


            {/* PHONE */}

            <div className="contact-detail">

              <span>
                <Phone size={14} />
              </span>

              <div>
                <small>
                  CALL US
                </small>

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </div>

            </div>


            {/* EMAIL */}

            <div className="contact-detail">

              <span>
                <Mail size={14} />
              </span>

              <div>
                <small>
                  EMAIL
                </small>

                <a href="mailto:hello@oakandivory.com">
                  hello@oakandivory.com
                </a>
              </div>

            </div>


            {/* HOURS */}

            <div className="contact-hours">

              <div className="contact-hours-title">

                <Clock3 size={14} />

                <span>
                  CLINIC HOURS
                </span>

              </div>

              <div className="hours-row">
                <span>
                  Monday – Saturday
                </span>

                <strong>
                  9:00 AM – 7:00 PM
                </strong>
              </div>

              <div className="hours-row">
                <span>
                  Sunday
                </span>

                <strong>
                  By appointment
                </strong>
              </div>

            </div>


            {/* WHATSAPP */}

            <button
              type="button"
              className="contact-whatsapp"
              onClick={() =>
                window.open(
                  "https://wa.me/919876543210?text=Hi%20Oak%20%26%20Ivory%2C%20I'd%20like%20to%20know%20more.",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <MessageCircle size={15} />

              Chat on WhatsApp

              <ArrowUpRight size={14} />

            </button>

          </motion.div>


          {/* ===================================
              RIGHT — CONTACT FORM
          =================================== */}

          <motion.div
            className="contact-form-area"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* MAP VISUAL */}

            <div className="contact-map">

              <div className="map-grid" />

              <div className="map-road map-road-one" />
              <div className="map-road map-road-two" />
              <div className="map-road map-road-three" />

              <div className="map-pin">

                <div>
                  <MapPin size={17} />
                </div>

                <span>
                  OAK & IVORY
                </span>

              </div>

              <div className="map-label map-label-one">
                GREEN AVENUE
              </div>

              <div className="map-label map-label-two">
                CENTRAL ROAD
              </div>

              <div className="map-label map-label-three">
                CLINIC
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Oak+and+Ivory+Dental+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="map-link"
              >
                Open in Maps
                <ArrowUpRight size={13} />
              </a>

            </div>


            {/* FORM */}

            <div className="contact-form-card">

              <div className="contact-form-heading">

                <div>
                  <Sparkles size={16} />
                </div>

                <span>
                  SEND A MESSAGE
                </span>

              </div>


              <AnimatePresence mode="wait">

                {!sent ? (

                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="contact-form"
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

                    <div className="contact-form-grid">

                      <div className="contact-field">

                        <label>
                          YOUR NAME
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />

                      </div>


                      <div className="contact-field">

                        <label>
                          EMAIL
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          required
                        />

                      </div>

                    </div>


                    <div className="contact-field">

                      <label>
                        PHONE
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91"
                      />

                    </div>


                    <div className="contact-field">

                      <label>
                        MESSAGE
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        rows="5"
                        required
                      />

                    </div>


                    <button
                      type="submit"
                      className="contact-submit"
                    >
                      Send message

                      <span>
                        <Send size={14} />
                      </span>

                    </button>

                  </motion.form>

                ) : (

                  <motion.div
                    key="contact-success"
                    className="contact-success"
                    initial={{
                      opacity: 0,
                      scale: .97,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                  >

                    <div className="contact-success-icon">
                      <Check size={22} />
                    </div>

                    <span>
                      MESSAGE SENT
                    </span>

                    <h3>
                      Thanks for
                      <br />
                      reaching <em>out.</em>
                    </h3>

                    <p>
                      We've received your message.
                      Our team will get back to you
                      as soon as possible.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSent(false)
                      }
                    >
                      Send another message
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </motion.div>

        </div>


        {/* =====================================
            BOTTOM
        ===================================== */}

        <motion.div
          className="contact-bottom"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >

          <span>
            OAK & IVORY DENTAL
          </span>

          <div>
            <span>
              MON – SAT
            </span>

            <strong>
              9 AM — 7 PM
            </strong>
          </div>

          <a href="tel:+919876543210">
            Call the clinic
            <Phone size={14} />
          </a>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;