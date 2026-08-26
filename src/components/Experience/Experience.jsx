import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import "./Experience.css";

const experiencePoints = [
  {
    number: "01",
    title: "A calmer first visit",
    text: "From the moment you arrive, our team keeps your experience simple, welcoming and comfortable.",
  },
  {
    number: "02",
    title: "Clear treatment plans",
    text: "We explain your options clearly so you understand your treatment before making a decision.",
  },
  {
    number: "03",
    title: "Modern technology",
    text: "Advanced diagnostics and modern techniques help us deliver precise, comfortable care.",
  },
  {
    number: "04",
    title: "Care beyond the chair",
    text: "Our relationship with you continues with guidance, follow-ups and ongoing preventive care.",
  },
];

const Experience = () => {
  return (
    <section
      className="experience-section"
      id="experience"
    >
      <div className="experience-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="experience-top"
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
            duration: 0.7,
          }}
        >
          

          <div className="experience-heading">

            <h2>
              Care that feels
              <br />
              <em>different.</em>
            </h2>

            <p>
              Every part of your visit is thoughtfully
              designed around comfort, clarity and
              confidence.
            </p>

          </div>
        </motion.div>


        {/* =====================================
            FEATURE
        ===================================== */}

        <motion.div
          className="experience-feature"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* IMAGE */}

          <div className="experience-image">

            <img
              src="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=1400&q=90"
              alt="Dentist caring for a patient"
              loading="lazy"
            />

            <div className="experience-image-overlay" />

            <div className="experience-image-caption">

              <span>
                THE OAK & IVORY EXPERIENCE
              </span>

              <strong>
                Your comfort
                <br />
                comes first.
              </strong>

            </div>

          </div>


          {/* CONTENT */}

          <div className="experience-content">

            <div className="experience-content-top">

              <div className="experience-icon">
                <Sparkles size={17} />
              </div>

              <span>
                MORE THAN A DENTAL VISIT
              </span>

            </div>


            <h3>
              Designed around
              <br />
              <em>you.</em>
            </h3>


            <p>
              We have created an experience that
              makes modern dental care feel more
              human. From your first conversation
              to your follow-up, every detail has
              been considered.
            </p>


            {/* CHECKS */}

            <div className="experience-checks">

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Transparent communication
                </p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Personalised treatment
                </p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Comfortable environment
                </p>
              </div>

            </div>


            {/* CTA */}

            <a
              href="#appointment"
              className="experience-button"
            >
              <span>
                Start your journey
              </span>

              <strong>
                <ArrowUpRight size={14} />
              </strong>
            </a>

          </div>

        </motion.div>


        {/* =====================================
            EXPERIENCE POINTS
        ===================================== */}

        <div className="experience-points">

          {experiencePoints.map(
            (point, index) => (

              <motion.article
                className="experience-point"
                key={point.number}
                initial={{
                  opacity: 0,
                  y: 20,
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
                  delay: index * 0.07,
                  duration: 0.6,
                }}
              >

                <span className="experience-point-number">
                  {point.number}
                </span>

                <div className="experience-point-content">

                  <h4>
                    {point.title}
                  </h4>

                  <p>
                    {point.text}
                  </p>

                </div>

                <ArrowUpRight
                  className="experience-point-arrow"
                  size={17}
                />

              </motion.article>

            )
          )}

        </div>


        {/* =====================================
            BOTTOM STATEMENT
        ===================================== */}

        

      </div>
    </section>
  );
};

export default Experience;