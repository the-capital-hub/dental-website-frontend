import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import "./About.css";

const About = () => {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* =================================================
            SECTION LABEL
        ================================================= */}



        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="about-main">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <h2>
              Dentistry with a
              <br />
              <em>more human</em>
              <br />
              approach.
            </h2>


            <p>
              We believe dental care should feel
              personal, clear and comfortable
              never clinical or rushed.
            </p>


            <a
              href="#services"
              className="about-button"
            >
              <span>
                Discover our approach
              </span>

              <span className="about-button-icon">
                <ArrowUpRight size={16} />
              </span>
            </a>

          </motion.div>


          {/* =================================================
              IMAGE
          ================================================= */}

          <motion.div
            className="about-image-wrap"
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <div className="about-image">

              <img
                src="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=1400&q=90"
                alt="Dentist caring for a patient"
              />

              <div className="about-image-overlay" />

              <div className="about-image-label">
                <span>
                  OAK & IVORY
                </span>

                <strong>
                  APPROACH
                </strong>
              </div>

            </div>


            {/* =================================================
                IMAGE NOTE
            ================================================= */}

            <motion.div
              className="about-image-note"
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
                duration: 0.6,
              }}
            >

              <Sparkles size={14} />

              <span>
                Care designed around people.
              </span>

            </motion.div>

          </motion.div>

        </div>


        {/* =================================================
            VALUES
        ================================================= */}

        <motion.div
          className="about-values" style={{padding:"0px"}}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="about-value-intro">
            <Sparkles size={14} />

            <span>
              WHAT MATTERS
            </span>
          </div>


          <div className="about-value">

            <span>
              01
            </span>

            <div>
              <h3>
                Personal
              </h3>

              <p>
                Care shaped around your needs,
                concerns and goals.
              </p>
            </div>

          </div>


          <div className="about-value">

            <span>
              02
            </span>

            <div>
              <h3>
                Clear
              </h3>

              <p>
                Honest guidance for confident
                treatment decisions.
              </p>
            </div>

          </div>


          <div className="about-value">

            <span>
              03
            </span>

            <div>
              <h3>
                Comfortable
              </h3>

              <p>
                A calm environment designed
                around your experience.
              </p>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default About;