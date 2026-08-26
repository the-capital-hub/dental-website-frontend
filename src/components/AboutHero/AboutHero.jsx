import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero">

      <div className="about-hero-container">

        {/* TOP LABEL */}

        <motion.div
          className="about-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span>01</span>

          <i />

          <p>ABOUT OAK & IVORY</p>
        </motion.div>


        {/* MAIN */}

        <div className="about-hero-main">

          {/* LEFT */}

          <motion.div
            className="about-hero-content"
            initial={{
              opacity: 0,
              x: -35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
            }}
          >

            <div className="about-hero-small">

              <Sparkles size={15} />

              <span>
                DENTISTRY, REIMAGINED
              </span>

            </div>


            <h1>
              Care that
              <br />
              feels <em>different.</em>
            </h1>


            <p>
              We believe going to the dentist should
              feel less clinical and more human.
              Thoughtful care, modern dentistry and
              a team that genuinely listens.
            </p>


            <a
              href="#philosophy"
              className="about-hero-link"
            >
              Discover our approach

              <span>
                <ArrowUpRight size={15} />
              </span>
            </a>

          </motion.div>


          {/* RIGHT IMAGE */}

          <motion.div
            className="about-hero-visual"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=90"
              alt="Modern dental clinic"
            />


            <div className="about-hero-overlay" />


            {/* FLOATING CARD */}

            <motion.div
              className="about-hero-card"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.9,
              }}
            >

              <span>
                OUR APPROACH
              </span>

              <strong>
                Calm.
                <br />
                Personal.
                <br />
                Precise.
              </strong>

            </motion.div>


            {/* IMAGE CAPTION */}

            <div className="about-hero-caption">

              <span>
                OAK & IVORY
              </span>

              <p>
                A different kind
                <br />
                of dental experience.
              </p>

            </div>

          </motion.div>

        </div>


        {/* BOTTOM */}

        <motion.div
          className="about-hero-bottom"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
        >

          <span>
            SCROLL TO EXPLORE
          </span>

          <ArrowDown size={14} />

          <span>
            EST. 2026
          </span>

        </motion.div>

      </div>

    </section>
  );
};

export default AboutHero;