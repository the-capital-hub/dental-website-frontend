import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./WhatsApp.css";

const whatsappOptions = [
  {
    icon: CalendarDays,
    title: "Request an appointment",
    text: "Tell us when you'd like to visit and our team can help with your appointment request.",
  },
  {
    icon: MessageCircle,
    title: "Ask a question",
    text: "Have a question about treatment or your visit? Send us a message.",
  },
  {
    icon: UserRound,
    title: "Share appointment details",
    text: "Share important information with our team before your visit.",
  },
  {
    icon: PhoneCall,
    title: "Request a callback",
    text: "Prefer to speak with someone? Request a callback from our team.",
  },
  {
    icon: MapPin,
    title: "Get directions",
    text: "Need help finding the clinic? We can help you with directions.",
  },
  {
    icon: Sparkles,
    title: "Speak with our team",
    text: "Connect directly with Oak & Ivory Dental through WhatsApp.",
  },
];

const steps = [
  {
    number: "01",
    title: "Send a message",
    text: "Tell us what you need help with.",
  },
  {
    number: "02",
    title: "Our team responds",
    text: "We'll review your message and guide you.",
  },
  {
    number: "03",
    title: "Choose your next step",
    text: "Book, ask a question or speak with our team.",
  },
];

const WhatsApp = () => {
  const whatsappNumber = "919000012345";

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Navbar />

      <main className="whatsapp-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="whatsapp-hero">

          <div className="whatsapp-container">

            <motion.div
              className="whatsapp-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>WHATSAPP</p>
            </motion.div>

            <div className="whatsapp-hero-grid">

              <motion.div
                className="whatsapp-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                <div className="whatsapp-kicker">
                  <MessageCircle size={15} />
                  <span>PREFER WHATSAPP?</span>
                </div>

                <h1>
                  Let's make
                  <br />
                  <em>connecting</em>
                  <br />
                  simple.
                </h1>

                <p>
                  We've made it easy to connect with
                  Oak & Ivory Dental. Message our team
                  whenever you need help.
                </p>

                <button
                  className="whatsapp-main-button"
                  onClick={openWhatsApp}
                >
                  Chat on WhatsApp

                  <span>
                    <ArrowUpRight size={16} />
                  </span>
                </button>

              </motion.div>


              <motion.div
                className="whatsapp-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=90"
                  alt="Patient communicating with clinic"
                />

                <div className="whatsapp-hero-overlay" />

                <div className="whatsapp-floating-card">

                  <MessageCircle size={18} />

                  <div>
                    <span>OAK & IVORY</span>
                    <strong>We're here to help.</strong>
                  </div>

                </div>

                <div className="whatsapp-hero-caption">

                  <span>QUICK & CONVENIENT</span>

                  <p>
                    One message.
                    <br />
                    The right next step.
                  </p>

                </div>

              </motion.div>

            </div>


            <div className="whatsapp-scroll">

              <span>SCROLL TO EXPLORE</span>

              <ArrowDown size={14} />

              <span>6 WAYS TO CONNECT</span>

            </div>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="whatsapp-intro">

          <div className="whatsapp-container">

            <motion.div
              className="whatsapp-intro-inner"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              <div className="whatsapp-label centered">

                <span>02</span>
                <i />
                <p>CONNECT WITH US</p>

              </div>

              <h2>
                One message can
                <br />
                <em>start everything.</em>
              </h2>

              <p>
                Whether you're looking to book an appointment,
                ask a question or simply speak with our team,
                WhatsApp gives you a simple way to reach us.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            OPTIONS
        ===================================================== */}

        <section className="whatsapp-options">

          <div className="whatsapp-container">

            <div className="whatsapp-section-heading">

              <div className="whatsapp-label">

                <span>03</span>
                <i />
                <p>HOW WE CAN HELP</p>

              </div>

              <h2>
                Message us
                <br />
                <em>for anything.</em>
              </h2>

            </div>


            <div className="whatsapp-options-grid">

              {whatsappOptions.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.article
                    className="whatsapp-option-card"
                    key={item.title}
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
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                  >

                    <div className="whatsapp-option-top">

                      <span>
                        0{index + 1}
                      </span>

                      <div className="whatsapp-option-icon">
                        <Icon size={18} />
                      </div>

                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                    <button
                      onClick={openWhatsApp}
                      className="whatsapp-option-link"
                    >
                      Message us
                      <ArrowUpRight size={14} />
                    </button>

                  </motion.article>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            PROCESS
        ===================================================== */}

        <section className="whatsapp-process">

          <div className="whatsapp-container">

            <div className="whatsapp-process-grid">

              <motion.div
                className="whatsapp-process-image"
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

                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90"
                  alt="Clinic team communication"
                />

                <div className="whatsapp-process-badge">

                  <Clock3 size={15} />

                  <span>
                    SIMPLE & CONVENIENT
                  </span>

                </div>

              </motion.div>


              <motion.div
                className="whatsapp-process-content"
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

                <div className="whatsapp-label">

                  <span>04</span>
                  <i />
                  <p>WHAT HAPPENS NEXT?</p>

                </div>

                <h2>
                  From your
                  <br />
                  message to the
                  <br />
                  <em>right next step.</em>
                </h2>

                <div className="whatsapp-steps">

                  {steps.map((step) => (

                    <div
                      className="whatsapp-step"
                      key={step.number}
                    >

                      <span>
                        {step.number}
                      </span>

                      <div>

                        <h3>
                          {step.title}
                        </h3>

                        <p>
                          {step.text}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK CONTACT
        ===================================================== */}

        <section className="whatsapp-contact">

          <div className="whatsapp-container">

            <motion.div
              className="whatsapp-contact-inner"
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

              <div className="whatsapp-contact-icon">

                <MessageCircle size={27} />

              </div>

              <div className="whatsapp-contact-copy">

                <span>
                  OAK & IVORY DENTAL
                </span>

                <h2>
                  Ready to talk?
                </h2>

                <p>
                  Send us a message on WhatsApp and
                  our team will help you with the next step.
                </p>

              </div>

              <button
                className="whatsapp-contact-button"
                onClick={openWhatsApp}
              >
                Start a conversation

                <ArrowUpRight size={15} />

              </button>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="whatsapp-cta">

          <div className="whatsapp-container">

            <motion.div
              className="whatsapp-cta-inner"
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

              <div>

                <span>
                  HAVE A QUESTION?
                </span>

                <h2>
                  We're just
                  <br />
                  <em>a message away.</em>
                </h2>

              </div>

              <button
                onClick={openWhatsApp}
                className="whatsapp-cta-button"
              >

                Chat on WhatsApp

                <span>
                  <Send size={15} />
                </span>

              </button>

            </motion.div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default WhatsApp;