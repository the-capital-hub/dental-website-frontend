import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CreditCard,
  FileText,
  HeartHandshake,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Pricing.css";

const consultationPoints = [
  {
    number: "01",
    title: "Recommended treatment",
    text: "Understand the treatment recommended for your dental needs.",
  },
  {
    number: "02",
    title: "Available alternatives",
    text: "Explore suitable treatment alternatives before making a decision.",
  },
  {
    number: "03",
    title: "Expected treatment timeline",
    text: "Understand how long your treatment may take.",
  },
  {
    number: "04",
    title: "Estimated cost",
    text: "Get clarity around the estimated cost of your treatment.",
  },
  {
    number: "05",
    title: "Number of appointments",
    text: "Know how many appointments may be required.",
  },
  {
    number: "06",
    title: "Payment options",
    text: "Discuss the available payment options with our team.",
  },
];

const paymentOptions = [
  {
    icon: CreditCard,
    title: "Card Payments",
    text: "Commonly used card payment methods can be accepted.",
  },
  {
    icon: IndianRupee,
    title: "Digital Payments",
    text: "Digital payment methods such as UPI may be available.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Guidance",
    text: "Our team can help you understand available insurance-related options.",
  },
];

const Pricing = () => {
  return (
    <>
      <Navbar />

      <main className="pricing-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="pricing-hero">

          <div className="pricing-container">

            <motion.div
              className="pricing-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>PRICING & PAYMENT</p>
            </motion.div>

            <div className="pricing-hero-grid">

              <motion.div
                className="pricing-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                <div className="pricing-kicker">
                  <HeartHandshake size={15} />
                  <span>CLEAR CONVERSATIONS</span>
                </div>

                <h1>
                  Clear care.
                  <br />
                  <em>Clear costs.</em>
                </h1>

                <p>
                  We believe patients should understand
                  their treatment before making a decision.
                  Our team takes the time to explain what
                  you need and what to expect.
                </p>

                <a
                  href="/appointment"
                  className="pricing-hero-link"
                >
                  Book a consultation

                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>

              </motion.div>


              <motion.div
                className="pricing-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1400&q=90"
                  alt="Dental consultation"
                />

                <div className="pricing-hero-overlay" />

                <div className="pricing-hero-card">

                  <span>OUR PROMISE</span>

                  <strong>
                    No hidden
                    <br />
                    conversations.
                  </strong>

                </div>

                <div className="pricing-hero-caption">

                  <span>OAK & IVORY</span>

                  <p>
                    Understand first.
                    <br />
                    Decide with confidence.
                  </p>

                </div>

              </motion.div>

            </div>

            

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="pricing-intro">

          <div className="pricing-container">

            <motion.div
              className="pricing-intro-inner"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              

              <h2>
                You deserve to know
                <br />
                <em>what you're choosing.</em>
              </h2>

              <p>
                During your consultation, our team will
                explain your treatment options clearly so
                you can make an informed decision about
                your dental care.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            CONSULTATION
        ===================================================== */}

        <section className="pricing-consultation">

          <div className="pricing-container">

            <div className="pricing-section-heading">

              

              <h2>
                What we'll
                <br />
                <em>explain.</em>
              </h2>

            </div>


            <div className="pricing-points-grid">

              {consultationPoints.map((item, index) => (

                <motion.article
                  className="pricing-point-card"
                  key={item.number}
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

                  <span className="pricing-point-number">
                    {item.number}
                  </span>

                  <div className="pricing-point-icon">
                    <FileText size={17} />
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </motion.article>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            COST MESSAGE
        ===================================================== */}

        <section className="pricing-message">

          <div className="pricing-container">

            <div className="pricing-message-grid">

              <motion.div
                className="pricing-message-image"
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
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=90"
                  alt="Dental care"
                />

                <div className="pricing-image-caption">

                  <span>
                    PATIENT FIRST
                  </span>

                  <strong>
                    Understand
                    <br />
                    before you decide.
                  </strong>

                </div>

              </motion.div>


              <motion.div
                className="pricing-message-content"
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

                <div className="pricing-label">

                  <span>04</span>
                  <i />
                  <p>TRANSPARENT COMMUNICATION</p>

                </div>

                <h2>
                  No confusing
                  <br />
                  <em>cost conversations.</em>
                </h2>

                <p>
                  We want you to have a clear understanding
                  of your recommended treatment, available
                  alternatives and expected costs before
                  you make a decision.
                </p>

                <div className="pricing-check-list">

                  {[
                    "Recommended treatment explained",
                    "Available alternatives discussed",
                    "Expected timeline explained",
                    "Estimated cost discussed",
                    "Number of appointments explained",
                    "Payment options discussed",
                  ].map((item) => (

                    <div key={item}>

                      <Check size={15} />

                      <span>
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PAYMENT OPTIONS
        ===================================================== */}

        <section className="pricing-payment">

          <div className="pricing-container">

            <motion.div
              className="pricing-heading-center"
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

              

              <h2>
                Making payment
                <br />
                <em>easier to understand.</em>
              </h2>

              <p>
                Our team can discuss available payment and
                insurance-related options with you. Final
                payment options should be confirmed with
                the clinic.
              </p>

            </motion.div>


            <div className="pricing-payment-grid">

              {paymentOptions.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.article
                    className="pricing-payment-card"
                    key={item.title}
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
                    transition={{
                      delay: index * 0.1,
                    }}
                  >

                    <div className="pricing-payment-icon">
                      <Icon size={20} />
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </motion.article>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            INSURANCE NOTE
        ===================================================== */}

        <section className="pricing-insurance">

          <div className="pricing-container">

            <motion.div
              className="pricing-insurance-inner"
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

              <ShieldCheck size={25} />

              <div>

                <span>
                  INSURANCE
                </span>

                <h3>
                  Need help understanding
                  insurance-related options?
                </h3>

                <p>
                  We can help you understand available
                  payment and insurance-related options.
                  Coverage and reimbursement depend on
                  your individual insurance plan.
                </p>

              </div>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="pricing-cta">

          <div className="pricing-container">

            <motion.div
              className="pricing-cta-inner"
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

              <div>

                <span>
                  HAVE QUESTIONS?
                </span>

                <h2>
                  Talk to our
                  <br />
                  <em>team.</em>
                </h2>

              </div>

              <a href="/contact">

                Talk to our team

                <span>
                  <ArrowUpRight size={16} />
                </span>

              </a>

            </motion.div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Pricing;