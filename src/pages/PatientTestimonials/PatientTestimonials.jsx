import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Heart,
  Quote,
  Star,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./PatientTestimonials.css";

const testimonials = [
  {
    number: "01",
    rating: "4.8",
 
    name: "Sneha R.",
    treatment: "General Dentistry",
    quote:
      "The team was warm, professional and made me feel comfortable throughout my visit.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=90",
  },
  {
    number: "02",
        rating: "4.3",
 
    name: "Rahul M.",
    treatment: "Dental Care",
    quote:
      "I had been putting off treatment for a long time. The experience was much easier than I expected.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90",
  },
  {
    number: "03",
        rating: "4.6",
 
    name: "Priya S.",
    treatment: "Cosmetic Dentistry",
    quote:
      "Everything was explained clearly and I always felt involved in the decisions about my care.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=90",
  },
  {
    number: "04",
        rating: "4.5",
 
    name: "Arjun K.",
    treatment: "Dental Implants",
    quote:
      "The clinic felt modern and welcoming, and the team took the time to understand what I needed.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=90",
  },
];

const experiencePoints = [
  "A calm first conversation",
  "Clear treatment explanations",
  "Time to consider your options",
  "Care designed around your needs",
  "Support throughout treatment",
  "Thoughtful follow-up afterwards",
];

const PatientTestimonials = () => {
  return (
    <>
      <Navbar />

      <main className="patient-stories-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="stories-hero">

          <div className="stories-container">

            <motion.div
              className="stories-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>PATIENT TESTIMONIALS</p>
            </motion.div>

            <div className="stories-hero-grid">

              <motion.div
                className="stories-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                

                <h1>
                  Real stories.
                  <br />
                  <em>Real confidence.</em>
                </h1>

                <p>
                  Every patient experience is different.
                  What remains consistent is our focus on
                  thoughtful care, clear communication and
                  making every visit feel comfortable.
                </p>

                <a
                  href="#stories"
                  className="stories-hero-link"
                >
                  Explore testimonials

                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>

              </motion.div>


              <motion.div
                className="stories-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=90"
                  alt="Patient experience"
                />

                <div className="stories-hero-overlay" />

                <div className="stories-hero-card">

                  <span>THE EXPERIENCE</span>

                  <strong>
                    Heard.
                    <br />
                    Supported.
                    <br />
                    Confident.
                  </strong>

                </div>

                <div className="stories-hero-caption">

                  <span>OAK & IVORY</span>

                  <p>
                    Care that starts
                    <br />
                    with listening.
                  </p>

                </div>

              </motion.div>

            </div>

            

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="stories-intro">

          <div className="stories-container">

            <motion.div
              className="stories-intro-inner"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              

              <h2>
                A better dental visit
                <br />
                starts with <em>being heard.</em>
              </h2>

              <p>
                Our patients' experiences are an important
                part of the care we create. We want every
                person to feel comfortable asking questions,
                understanding their choices and taking an
                active role in their care.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            FEATURED TESTIMONIAL
        ===================================================== */}

        <section className="stories-featured">

          <div className="stories-container">

            <div className="stories-section-heading">

              

              <h2>
                From hesitation
                <br />
                to <em>confidence.</em>
              </h2>

            </div>


            <div className="featured-story-grid">

              <motion.div
                className="featured-story-image"
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
                  src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1300&q=90"
                  alt="Patient consultation"
                />

                <div className="featured-story-number">
                  01
                </div>

              </motion.div>


              <motion.div
                className="featured-story-content"
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

                <div className="quote-icon">
                  <Quote size={21} />
                </div>

                <blockquote>
                  “The team was warm, professional and
                  made me feel comfortable throughout
                  my visit.”
                </blockquote>

                <p className="featured-story-text">
                  A positive dental experience is about
                  more than the treatment itself. It is
                  about feeling listened to and supported.
                </p>

                <p className="featured-story-text">
                  We aim to create an environment where
                  patients can ask questions, understand
                  their options and move forward with
                  confidence.
                </p>

                <div className="featured-story-person">

                  <div className="story-avatar">
                    S
                  </div>

                  <div>

                    <strong>
                      Sneha R.
                    </strong>

                    <span>
                      Patient testimonial · General Dentistry
                    </span>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* =====================================================
            JOURNEY
        ===================================================== */}

        <section className="stories-journey">

          <div className="stories-container">

            <motion.div
              className="stories-heading-center"
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
                Every transformation
                <br />
                starts with a <em>conversation.</em>
              </h2>

              <p>
                Great outcomes are built through
                understanding, planning, treatment
                and continued care.
              </p>

            </motion.div>


            <div className="stories-journey-track">

              {[
                {
                  number: "01",
                  title: "Before",
                  text:
                    "You arrive with a concern, a goal or sometimes simply a question.",
                },
                {
                  number: "02",
                  title: "Understand",
                  text:
                    "We listen, assess and explain what is happening and what your options are.",
                },
                {
                  number: "03",
                  title: "Treatment",
                  text:
                    "Your care is delivered with attention to comfort, precision and detail.",
                },
                {
                  number: "04",
                  title: "Confidence",
                  text:
                    "You leave with a clearer understanding of your health and your next step.",
                },
              ].map((step) => (

                <motion.div
                  className="journey-step"
                  key={step.number}
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

                  <span>{step.number}</span>

                  <div className="journey-dot" />

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.text}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            TESTIMONIAL GRID
        ===================================================== */}

        <section
          className="stories-grid-section"
          id="stories"
        >

          <div className="stories-container">

            <div className="stories-grid-heading">

              

              <h2>
                Different people.
                <br />
                Different reasons.
                <br />
                <em>One experience.</em>
              </h2>

            </div>


            <div className="stories-cards">

              {testimonials.map((testimonial, index) => (

                <motion.article
                  className="story-card"
                  key={testimonial.number}
                  initial={{
                    opacity: 0,
                    y: 35,
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
                    delay: index * 0.1,
                  }}
                >

                  <div className="story-card-image">

                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} testimonial`}
                    />

                    <span>
                      {testimonial.number}
                    </span>

                  </div>


                  <div className="story-card-content">

                    <div className="story-stars">

                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          fill="currentColor"
                        />
                      ))}

                      <strong style={{textAlign:"end"}}>
    {testimonial.rating}
  </strong>

  


                    </div>

                    <blockquote>
                      “{testimonial.quote}”
                    </blockquote>

                    <div className="story-card-footer">

                      <div>

                        <strong>
                          {testimonial.name}
                        </strong>

                        <span>
                          {testimonial.treatment}
                        </span>

                      </div>

                      <ArrowUpRight size={15} />

                    </div>

                  </div>

                </motion.article>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            EXPERIENCE
        ===================================================== */}

        <section className="stories-experience">

          <div className="stories-container">

            <div className="stories-experience-grid">

              <motion.div
                className="stories-experience-image"
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
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1300&q=90"
                  alt="Comfortable dental clinic"
                />

                <div className="experience-image-caption">

                  <span>
                    THE OAK & IVORY EXPERIENCE
                  </span>

                  <strong>
                    Designed to feel
                    <br />
                    different.
                  </strong>

                </div>

              </motion.div>


              <motion.div
                className="stories-experience-content"
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
                  Thoughtful from
                  <br />
                  <em>start to finish.</em>
                </h2>

                <p>
                  The little details matter. We want you
                  to know what to expect before, during
                  and after your visit.
                </p>

                <div className="experience-list">

                  {experiencePoints.map((item) => (

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
            STATEMENT
        ===================================================== */}

        {/* <section className="stories-statement">

          <div className="stories-container">

            <motion.div
              className="stories-statement-inner"
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
            >

              <div className="statement-quote">
                <Quote size={22} />
              </div>

              <h2>
                The best result isn't
                <br />
                just a healthier smile.
                <br />
                It's <em>feeling good about it.</em>
              </h2>

              <p>
                That's the experience we're here to create.
              </p>

            </motion.div>

          </div>

        </section> */}


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="stories-cta">

          <div className="stories-container">

            <motion.div
              className="stories-cta-inner"
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
                  YOUR STORY STARTS HERE
                </span>

                <h2>
                  Ready to feel
                  <br />
                  <em>the difference?</em>
                </h2>

              </div>

              <a href="/appointment">

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
    </>
  );
};

export default PatientTestimonials;