import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="dental-hero" id="home">

      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <div className="dental-hero-image">
        <img
          src="https://chatgpt.com/c/6a8c39b4-a1f8-83ee-961b-d21cb8090c5c"
          alt="Modern dental care"
        />
      </div>


      {/* =================================================
          IMAGE OVERLAY
      ================================================= */}

      <div className="dental-hero-overlay" />


      {/* =================================================
          HERO CONTENT
      ================================================= */}

      <div className="dental-hero-container">

        <motion.div
          className="dental-hero-content"

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* =============================================
              EYEBROW
          ============================================= */}

          <motion.div
            className="dental-hero-label"

            initial={{
              opacity: 0,
              y: 15,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
          >
            

            MODERN DENTISTRY
          </motion.div>


          {/* =============================================
              HEADING
          ============================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.25,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Exceptional care,
            <br />
            designed around
            <br />
            <em>your smile.</em>
          </motion.h1>


          {/* =============================================
              DESCRIPTION
          ============================================= */}

          <motion.p
            className="dental-hero-description"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.45,
              duration: 0.7,
            }}
          >
            Modern dentistry, thoughtfully designed around
            you from preventive care to cosmetic and
            restorative treatments.
          </motion.p>


          {/* =============================================
              ACTIONS
          ============================================= */}

          <motion.div
            className="dental-hero-actions"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.6,
              duration: 0.7,
            }}
          >

            {/* PRIMARY CTA */}

            <Link
  to="/appointment"
  className="dental-main-button"
>
              <span>
                Book an Appointment
              </span>

              <span className="dental-main-button-icon">
                <ArrowUpRight size={16} />
              </span>
            </Link>


            {/* SECONDARY CTA */}

            <a
              href="#ivy"
              className="dental-ivy-button"
            >
              <span className="ivy-live" />

              Talk to Ivy
            </a>

          </motion.div>

        </motion.div>


        {/* =================================================
            RIGHT VISUAL CARD
        ================================================= */}

        <motion.div
          className="dental-hero-card"

          initial={{
            opacity: 0,
            x: 35,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            delay: 0.75,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div className="dental-hero-card-top">

            <div className="dental-hero-card-icon">
              <Sparkles size={15} />
            </div>

            <span>
              PERSONALIZED CARE
            </span>

          </div>


          <strong>
            A calmer,
            <br />
            better dental experience.
          </strong>


          <p>
            Thoughtful treatment,
            modern technology and care
            that puts you first.
          </p>


          <a
            href="#about"
            className="dental-hero-card-link"
          >
            <span>
              Discover our approach
            </span>

            <ArrowUpRight size={15} />
          </a>

        </motion.div>

      </div>


      {/* =================================================
          HERO BOTTOM
      ================================================= */}

      

    </section>
  );
};

export default Hero;