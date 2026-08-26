import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Check,
  Heart,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Doctors.css";

const doctors = [
  {
    number: "01",
    name: "Dr. Maya Sharma",
    role: "Lead Dentist",
    specialty: "Cosmetic & Restorative Dentistry",
    experience: "12+ YEARS",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=90",
    bio:
      "Focused on creating natural looking results through thoughtful treatment planning and a calm, patient-first approach.",
  },
  {
    number: "02",
    name: "Dr. Arjun Mehta",
    role: "Consultant Dentist",
    specialty: "Implant & Restorative Dentistry",
    experience: "10+ YEARS",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=90",
    bio:
      "Combines restorative expertise with modern planning techniques to help patients regain comfort, function and confidence.",
  },
  {
    number: "03",
    name: "Dr. Anika Rao",
    role: "Aesthetic Dentist",
    specialty: "Smile Design & Preventive Care",
    experience: "8+ YEARS",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1000&q=90",
    bio:
      "Believes the best smile transformations are subtle, personal and designed around each patient's natural features.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Listen before treating",
    text:
      "Every consultation starts with understanding the person, not simply identifying a dental issue.",
  },
  {
    icon: Sparkles,
    title: "Think beyond today",
    text:
      "Our doctors consider long-term oral health when discussing treatment options and outcomes.",
  },
  {
    icon: Award,
    title: "Keep improving",
    text:
      "We believe great clinical care requires curiosity, continued learning and attention to evolving techniques.",
  },
];

const Doctors = () => {
  return (
    <>
      <Navbar />

      <main className="doctors-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="doctors-hero">

          <div className="doctors-container">

            <motion.div
              className="doctors-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>OUR DENTISTS</p>
            </motion.div>

            <div className="doctors-hero-grid">

              <motion.div
                className="doctors-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                <div className="doctors-kicker">
                  <Stethoscope size={15} />
                  <span>THE PEOPLE BEHIND THE CARE</span>
                </div>

                <h1>
                  Meet the
                  <br />
                  people who
                  <br />
                  <em>care.</em>
                </h1>

                <p>
                  Experienced clinicians who bring together
                  technical expertise, thoughtful communication
                  and a genuinely personal approach to dentistry.
                </p>

                <a
                  href="#our-doctors"
                  className="doctors-hero-link"
                >
                  Meet our team

                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>

              </motion.div>


              <motion.div
                className="doctors-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=90"
                  alt="Dental care professional"
                />

                <div className="doctors-hero-overlay" />

                <div className="doctors-hero-card">
                  <span>OUR STANDARD</span>

                  <strong>
                    Expertise.
                    <br />
                    Empathy.
                    <br />
                    Precision.
                  </strong>
                </div>

                <div className="doctors-hero-caption">
                  <span>OAK & IVORY</span>

                  <p>
                    Skilled hands.
                    <br />
                    Human care.
                  </p>
                </div>

              </motion.div>

            </div>

           

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        


        {/* =====================================================
            DOCTORS
        ===================================================== */}

        <section
          className="doctors-team"
          id="our-doctors"
        >

          <div className="doctors-container">

            <div className="doctors-team-heading">

              

              <h2>
                Clinicians with
                <br />
                <em>purpose.</em>
              </h2>

            </div>


            <div className="doctors-list">

              {doctors.map((doctor, index) => (

                <motion.article
                  className="doctor-profile"
                  key={doctor.number}
                  initial={{
                    opacity: 0,
                    y: 40,
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

                  <div className="doctor-profile-image">

                    <img
                      src={doctor.image}
                      alt={doctor.name}
                    />

                    <span className="doctor-number">
                      {doctor.number}
                    </span>

                    <span className="doctor-experience">
                      {doctor.experience}
                    </span>

                  </div>


                  <div className="doctor-profile-content">

                    <span className="doctor-role">
                      {doctor.role}
                    </span>

                    <h3>
                      {doctor.name}
                    </h3>

                    <p className="doctor-specialty">
                      {doctor.specialty}
                    </p>

                    <p className="doctor-bio">
                      {doctor.bio}
                    </p>

                    <div className="doctor-profile-bottom">

                      <span>
                        VIEW PROFILE
                      </span>

                      <div>
                        <ArrowUpRight size={15} />
                      </div>

                    </div>

                  </div>

                </motion.article>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            APPROACH
        ===================================================== */}

        <section className="doctors-approach">

          <div className="doctors-container">

            <div className="doctors-approach-grid">

              <motion.div
                className="doctors-approach-image"
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
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1300&q=90"
                  alt="Dentist consulting with patient"
                />

                <div className="doctors-approach-badge">
                  <span>OUR APPROACH</span>
                  <strong>
                    Listen.
                    <br />
                    Explain.
                    <br />
                    Care.
                  </strong>
                </div>

              </motion.div>


              <motion.div
                className="doctors-approach-content"
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


                <h2>
                  Your dentist
                  <br />
                  should feel like
                  <br />
                  <em>your partner.</em>
                </h2>

                <p className="doctors-approach-lead">
                  We don't believe in rushing people into
                  treatment. The best decisions happen when
                  patients have time, clarity and confidence.
                </p>

                <div className="doctors-approach-points">

                  <div>
                    <span>01</span>
                    <p>
                      We listen carefully to your concerns.
                    </p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>
                      We explain what we find in plain language.
                    </p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>
                      We discuss options rather than prescribe
                      a single path.
                    </p>
                  </div>

                  <div>
                    <span>04</span>
                    <p>
                      We support you throughout your treatment.
                    </p>
                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* =====================================================
            VALUES
        ===================================================== */}

        <section className="doctors-values">

          <div className="doctors-container">

            <motion.div
              className="doctors-values-heading"
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
                Good care is
                <br />
                <em>more than expertise.</em>
              </h2>

            </motion.div>


            <div className="doctors-values-grid">

              {values.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.article
                    className="doctors-value-card"
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
                      delay: index * 0.1,
                    }}
                  >

                    <div className="doctors-value-icon">
                      <Icon size={19} />
                    </div>

                    <span>
                      0{index + 1}
                    </span>

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
            CREDENTIALS / STANDARD
        ===================================================== */}

        <section className="doctors-standard">

          <div className="doctors-container">

            <div className="doctors-standard-grid">

              <div className="doctors-standard-heading">


                <h2>
                  Skill that keeps
                  <br />
                  <em>moving forward.</em>
                </h2>

              </div>


              <div className="doctors-standard-content">

                <p>
                  Dentistry continues to evolve. Our team believes
                  staying current is part of providing responsible,
                  confident care.
                </p>

                <div className="doctors-standard-list">

                  <div>
                    <Check size={15} />
                    <span>Continued professional development</span>
                  </div>

                  <div>
                    <Check size={15} />
                    <span>Evidence informed treatment planning</span>
                  </div>

                  <div>
                    <Check size={15} />
                    <span>Modern diagnostic technology</span>
                  </div>

                  <div>
                    <Check size={15} />
                    <span>Collaborative clinical decision-making</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="doctors-cta">

          <div className="doctors-container">

            <motion.div
              className="doctors-cta-inner"
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
                  FIND THE RIGHT STARTING POINT
                </span>

                <h2>
                  Meet your dentist.
                  <br />
                  Start with a <em>conversation.</em>
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

export default Doctors;