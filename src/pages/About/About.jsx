import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./About.css";

const values = [
  {
    number: "01",
    title: "Listen first",
    text: "We take the time to understand your concerns, your goals and what matters most to you before recommending treatment.",
    icon: Heart,
  },
  {
    number: "02",
    title: "Explain clearly",
    text: "No confusing jargon and no pressure. We make sure you understand your options and feel confident about your decision.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Care personally",
    text: "Every treatment plan is shaped around the individual, not simply the dental problem in front of us.",
    icon: Users,
  },
];

const differences = [
  "Personalised treatment planning",
  "Modern dental technology",
  "Clear and honest communication",
  "Comfort-focused appointments",
  "Experienced clinical team",
  "Thoughtful aftercare",
];

const About = () => {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="about-hero">
          <div className="about-container">


            <div className="about-hero-grid">

              <motion.div
                className="about-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="about-kicker">
                  <Sparkles size={15} />
                  <span>DENTISTRY, REIMAGINED</span>
                </div>

                <h1>
                  Care that
                  <br />
                  feels <em>different.</em>
                </h1>

                <p>
                  We believe great dentistry is about more than
                  healthy teeth. It is about feeling heard,
                  understood and completely at ease.
                </p>

                <a
                  href="#philosophy"
                  className="about-primary-link"
                >
                  Discover our approach
                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </motion.div>


              <motion.div
                className="about-hero-image"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=90"
                  alt="Modern dental clinic"
                />

                <div className="about-image-overlay" />

                <div className="about-floating-card">
                  <span>OUR APPROACH</span>

                  <strong>
                    Calm.
                    <br />
                    Personal.
                    <br />
                    Precise.
                  </strong>
                </div>

                <div className="about-image-caption">
                  <span>OAK & IVORY</span>
                  <p>
                    A different kind
                    <br />
                    of dental experience.
                  </p>
                </div>
              </motion.div>

            </div>

            

          </div>
        </section>


        {/* ==================================================
            PHILOSOPHY
        ================================================== */}

        <section
          className="about-philosophy"
          id="philosophy"
        >
          <div className="about-container">

            <div className="about-philosophy-grid">

              <motion.div
                className="about-philosophy-image"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=90"
                  alt="Dentist speaking with a patient"
                />

                <div className="about-image-number">
                  <span>02</span>
                  <p>OUR PHILOSOPHY</p>
                </div>
              </motion.div>


              <motion.div
                className="about-philosophy-content"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <div className="about-small-label">
                
                  <span>WHY WE DO THINGS DIFFERENTLY</span>
                </div>

                <h2>
                  Dentistry should
                  <br />
                  feel <em>human.</em>
                </h2>

                <p className="about-large-text">
                  A dental appointment should never feel like
                  something you simply have to get through.
                </p>

                <p>
                  We created Oak & Ivory around a simple belief:
                  exceptional clinical care and a warm human
                  experience should go hand in hand.
                </p>

                <p>
                  From the first conversation to the final
                  follow-up, we take time to listen, explain
                  and make every decision feel clear.
                </p>

                <div className="about-signature">
                  <span>OUR PROMISE</span>
                  <strong>
                    Your care. Your comfort. Your confidence.
                  </strong>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* ==================================================
            VALUES
        ================================================== */}

       


        {/* ==================================================
            OUR STORY
        ================================================== */}

        <section className="about-story">
          <div className="about-container">

            


            <div className="about-story-grid">

              <motion.div
                className="about-story-copy"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="about-story-year">
                  THE BEGINNING
                </span>

                <h3>
                  Modern dentistry,
                  <br />
                  without the coldness.
                </h3>

                <p>
                  Oak & Ivory was created for people who wanted
                  something different from the traditional dental
                  experience.
                </p>

                <p>
                  A place where advanced dentistry could exist
                  alongside genuine warmth. Where technology
                  could make care better without making it feel
                  less personal.
                </p>

                <p>
                  That idea continues to shape everything we do
                  today from the way our team communicates to
                  the way we design every patient's journey.
                </p>
              </motion.div>


              <motion.div
                className="about-story-image"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=90"
                  alt="Contemporary dental clinic interior"
                />

                <div className="about-story-image-caption">
                  <span>DESIGNED FOR PEOPLE</span>

                  <strong>
                    Clinical excellence.
                    <br />
                    Human connection.
                  </strong>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* ==================================================
            DIFFERENCE
        ================================================== */}

        <section className="about-difference">
          <div className="about-container">

            <div className="about-difference-grid">

              <motion.div
                className="about-difference-heading"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                

                <h2>
                  Better care
                  <br />
                  starts with
                  <br />
                  <em>better details.</em>
                </h2>

                <p>
                  Every part of the experience has been
                  considered to help you feel informed,
                  comfortable and cared for.
                </p>
              </motion.div>


              <motion.div
                className="about-difference-list"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {differences.map((item, index) => (
                  <div
                    className="about-difference-item"
                    key={item}
                  >
                    <span>0{index + 1}</span>

                    <p>{item}</p>

                    <Check size={15} />
                  </div>
                ))}
              </motion.div>

            </div>

          </div>
        </section>


        {/* ==================================================
            TEAM
        ================================================== */}

        <section className="about-team">
          <div className="about-container">

            <div className="about-team-heading">

              

              <div>
                <h2>
                  Meet the
                  <br />
                  <em>people who care.</em>
                </h2>

                <p>
                  Experienced professionals who combine
                  clinical expertise with a genuinely personal
                  approach.
                </p>
              </div>

            </div>


            <div className="about-team-grid">

              <div className="about-doctor-card">
                <div className="about-doctor-image">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=90"
                    alt="Dental professional"
                  />

                  <span>01</span>
                </div>

                <div className="about-doctor-info">
                  <h3>Dr. Maya Sharma</h3>
                  <p>Lead Dentist · Cosmetic & Restorative</p>
                </div>
              </div>


              <div className="about-doctor-card">
                <div className="about-doctor-image">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=90"
                    alt="Dental professional"
                  />

                  <span>02</span>
                </div>

                <div className="about-doctor-info">
                  <h3>Dr. Arjun Mehta</h3>
                  <p>Implant Dentistry · Oral Rehabilitation</p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            TECHNOLOGY
        ================================================== */}

        <section className="about-technology">
          <div className="about-container">

            <div className="about-technology-grid">

              <div className="about-technology-content">

                

                <h2>
                  Precision
                  <br />
                  with a
                  <br />
                  <em>human touch.</em>
                </h2>

                <p>
                  We use modern dental technology where it
                  genuinely improves the patient experience 
                  helping our clinicians plan more precisely,
                  communicate more clearly and deliver care
                  with confidence.
                </p>

                <div className="about-tech-points">

                  <div>
                    <Stethoscope size={16} />
                    <span>Modern diagnostics</span>
                  </div>

                  <div>
                    <Sparkles size={16} />
                    <span>Digital treatment planning</span>
                  </div>

                  <div>
                    <ShieldCheck size={16} />
                    <span>Precision-focused care</span>
                  </div>

                </div>

              </div>


              <div className="about-technology-image">

                <img
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=90"
                  alt="Modern dental equipment"
                />

                <div className="about-tech-badge">
                  <span>TECHNOLOGY</span>
                  <strong>Used with purpose.</strong>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            PATIENT PROMISE
        ================================================== */}



        {/* ==================================================
            CTA
        ================================================== */}

        <section className="about-cta">
          <div className="about-container">

            <motion.div
              className="about-cta-inner"
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
                  READY WHEN YOU ARE
                </span>

                <h2>
                  Let's take care
                  <br />
                  of your <em>smile.</em>
                </h2>

              </div>

              <a href="/appointment">
                Book an appointment

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

export default About;