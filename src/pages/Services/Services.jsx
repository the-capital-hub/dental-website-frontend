import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock3,
  HeartPulse,
  ScanLine,
  Sparkles,
  Stethoscope,
  WandSparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Services.css";

/* =====================================================
   TREATMENTS
===================================================== */

const treatments = [
  {
    number: "01",
    category: "GENERAL DENTISTRY",
    title: "General Dentistry",
    text:
      "Preventive check-ups, professional cleaning, fillings and everyday dental care designed to keep your oral health in good shape.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "02",
    category: "COSMETIC DENTISTRY",
    title: "Cosmetic Dentistry",
    text:
      "Thoughtful cosmetic treatments designed to improve the appearance of your smile while keeping the result natural and personal.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "03",
    category: "RESTORATIVE",
    title: "Dental Implants",
    text:
      "A long-term solution for missing teeth, planned carefully to restore comfort, function and a natural-looking smile.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "04",
    category: "ENDODONTICS",
    title: "Root Canal Treatment",
    text:
      "Care focused on treating infection inside the tooth while preserving as much of the natural tooth as possible.",
    image:
      "https://files.cdn-files-a.com/uploads/8877709/2000_665564ac9d57c.jpg",
  },
  {
    number: "05",
    category: "RESTORATIVE",
    title: "Crowns & Bridges",
    text:
      "Restorative solutions that help protect damaged teeth and replace missing teeth while supporting a natural smile.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "06",
    category: "ORTHODONTICS",
    title: "Clear Aligners",
    text:
      "A discreet approach to gradually improving tooth alignment with a treatment plan tailored to your smile.",
    image:
      "https://static.multiesthetique.fr/site/company/62/365735/images/792952/792952_ci.jpg",
  },
  {
    number: "07",
    category: "ORAL SURGERY",
    title: "Wisdom Tooth Removal",
    text:
      "Assessment and removal of problematic wisdom teeth when they cause pain, crowding, infection or other concerns.",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "08",
    category: "EMERGENCY",
    title: "Emergency Dentistry",
    text:
      "Clear and calm support when unexpected dental problems need prompt attention and the right next step.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=90",
  },
];


/* =====================================================
   CATEGORIES
===================================================== */

const categories = [
  {
    icon: Stethoscope,
    number: "01",
    title: "General Dentistry",
    text:
      "Everyday preventive and restorative care designed to protect your oral health.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Cosmetic Dentistry",
    text:
      "Subtle treatments designed to help you feel more confident about your smile.",
  },
  {
    icon: ScanLine,
    number: "03",
    title: "Dental Implants",
    text:
      "Modern implant solutions designed to restore function, comfort and confidence.",
  },
  {
    icon: WandSparkles,
    number: "04",
    title: "Clear Aligners",
    text:
      "A discreet way to improve tooth alignment with a personalised treatment plan.",
  },
  {
    icon: HeartPulse,
    number: "05",
    title: "Emergency Dentistry",
    text:
      "Clear, calm support when unexpected dental problems need attention.",
  },
];


/* =====================================================
   JOURNEY
===================================================== */

const journey = [
  {
    number: "01",
    title: "Listen",
    text:
      "We start with you. Your concerns, goals and expectations shape the conversation.",
  },
  {
    number: "02",
    title: "Understand",
    text:
      "We assess your dental health and explain what we find in straightforward language.",
  },
  {
    number: "03",
    title: "Plan",
    text:
      "Together, we create a treatment plan that makes sense for your needs and priorities.",
  },
  {
    number: "04",
    title: "Care",
    text:
      "We deliver treatment with precision, comfort and attention to every detail.",
  },
];


const Services = () => {
  return (
    <>
      <Navbar />

      <main className="services-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="services-hero">

          <div className="services-container">

            <motion.div
              className="services-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>OUR SERVICES</p>
            </motion.div>


            <div className="services-hero-grid">

              <motion.div
                className="services-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                <div className="services-kicker">
                  <Sparkles size={15} />
                  <span>CARE, TAILORED TO YOU</span>
                </div>

                <h1>
                  Dentistry
                  <br />
                  with <em>intention.</em>
                </h1>

                <p>
                  From preventive care to complete smile
                  transformations, every treatment begins
                  with understanding what you need—not
                  simply what can be done.
                </p>

                <a
                  href="#treatments"
                  className="services-hero-link"
                >
                  Explore our treatments

                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>

              </motion.div>


              <motion.div
                className="services-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=90"
                  alt="Modern dental treatment room"
                />

                <div className="services-hero-overlay" />

                <div className="services-hero-card">

                  <span>OUR APPROACH</span>

                  <strong>
                    Precise.
                    <br />
                    Personal.
                    <br />
                    Considered.
                  </strong>

                </div>

                <div className="services-hero-caption">

                  <span>OAK & IVORY</span>

                  <p>
                    Care designed
                    <br />
                    around you.
                  </p>

                </div>

              </motion.div>

            </div>



          </div>

        </section>


        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section className="services-categories">

          <div className="services-container">

            <motion.div
              className="services-heading-center"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              

              <h2>
                The right care
                <br />
                for <em>your journey.</em>
              </h2>

              <p>
                Whether you're maintaining a healthy smile,
                improving its appearance or addressing a
                specific concern, we start where you are.
              </p>

            </motion.div>


            <div className="services-category-grid">

              {categories.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.article
                    className="services-category-card"
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
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                  >

                    <div className="services-category-top">

                      <span>
                        {item.number}
                      </span>

                      <div>
                        <Icon size={18} />
                      </div>

                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                    <a href="#treatments">
                      Explore
                      <ArrowUpRight size={14} />
                    </a>

                  </motion.article>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            ALL TREATMENTS
        ===================================================== */}

        <section
          className="services-treatments"
          id="treatments"
        >

          <div className="services-container">

            <div className="services-treatment-header">

              <div>


                <h2>
                  Care that
                  <br />
                  <em>fits you.</em>
                </h2>

              </div>

              <p>
                From everyday preventive care to
                advanced restorative and cosmetic
                treatments, every recommendation is
                made with your health, comfort and
                long-term goals in mind.
              </p>

            </div>


            <div className="services-treatment-list">

              {treatments.map((item, index) => (

                <motion.article
                  className="services-treatment"
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                >

                  <div className="services-treatment-image">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <span>
                      {item.number}
                    </span>

                  </div>


                  <div className="services-treatment-info">

                    <span className="services-treatment-category">
                      {item.category}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                    <a href="/appointment">
                      Discuss this treatment
                      <ArrowUpRight size={14} />
                    </a>

                  </div>

                </motion.article>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW WE PLAN CARE
        ===================================================== */}

       


        {/* =====================================================
            JOURNEY
        ===================================================== */}

        <section className="services-journey">

          <div className="services-container">

            <div className="services-heading-center">

              

              <h2>
                From first conversation
                <br />
                to <em>confident smile.</em>
              </h2>

            </div>


            <div className="services-journey-grid">

              {journey.map((item, index) => (

                <motion.div
                  className="services-journey-item"
                  key={item.number}
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

                  <span>
                    {item.number}
                  </span>

                  <div className="services-journey-line" />

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            TRUST
        ===================================================== */}

        <section className="services-trust">

          <div className="services-container">

            <div className="services-trust-grid">

              <div className="services-trust-content">

                

                <h2>
                  More than
                  <br />
                  treatment.
                  <br />
                  <em>A relationship.</em>
                </h2>

                <p>
                  Good dentistry solves a problem. Great
                  dentistry also makes you feel looked after.
                  That's the standard we aim for at every visit.
                </p>

              </div>


              <div className="services-trust-list">

                <div>
                  <Check size={15} />
                  <span>
                    Clear treatment explanations
                  </span>
                </div>

                <div>
                  <Check size={15} />
                  <span>
                    Comfort-focused appointments
                  </span>
                </div>

                <div>
                  <Check size={15} />
                  <span>
                    Transparent recommendations
                  </span>
                </div>

                <div>
                  <Check size={15} />
                  <span>
                    Modern clinical technology
                  </span>
                </div>

                <div>
                  <Check size={15} />
                  <span>
                    Personalised treatment plans
                  </span>
                </div>

                <div>
                  <Check size={15} />
                  <span>
                    Support beyond your appointment
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="services-cta">

          <div className="services-container">

            <motion.div
              className="services-cta-inner"
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
                  NOT SURE WHERE TO START?
                </span>

                <h2>
                  Let's find the
                  <br />
                  right care for <em>you.</em>
                </h2>

              </div>

              <a href="/appointment">

                Book a consultation

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

export default Services;