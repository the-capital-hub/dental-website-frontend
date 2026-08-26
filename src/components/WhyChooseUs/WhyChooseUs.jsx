import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  HeartHandshake,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./WhyChooseUs.css";

const reasons = [
  {
    number: "01",
    title: "Patient-first care",
    description:
      "Every treatment plan starts with listening to your concerns, goals and comfort.",
    icon: HeartHandshake,
  },
  {
    number: "02",
    title: "Modern technology",
    description:
      "We use modern diagnostic tools and treatment techniques for precise, efficient care.",
    icon: ScanLine,
  },
  {
    number: "03",
    title: "Clear & transparent",
    description:
      "We explain your options, costs and next steps clearly before treatment begins.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Long-term results",
    description:
      "Our goal is not just a beautiful smile today, but healthier teeth for years to come.",
    icon: Sparkles,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="why-section"
      id="why-choose-us"
    >
      <div className="why-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="why-header"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          

          <div className="why-heading">

            <h2>
              Dentistry with
              <br />
              <em>more intention.</em>
            </h2>

            <p>
              Because choosing a dentist should be about
              more than convenience. It should be about
              trust, expertise and feeling genuinely cared for.
            </p>

          </div>
        </motion.div>


        {/* =====================================
            MAIN FEATURE
        ===================================== */}

        <motion.div
          className="why-feature"
          initial={{
            opacity: 0,
            y: 50,
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
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* IMAGE */}

          <div className="why-image">

            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=90"
              alt="Modern dental clinic"
            />

            <div className="why-image-overlay" />

            <div className="why-image-copy">

              <span>
                THE OAK & IVORY STANDARD
              </span>

              <strong>
                Thoughtful care.
                <br />
                Every time.
              </strong>

            </div>

          </div>


          {/* CONTENT */}

          <div className="why-feature-content">

            <div className="why-feature-icon">
              <Sparkles size={18} />
            </div>

            <span className="why-eyebrow">
              WHAT MAKES US DIFFERENT
            </span>

            <h3>
              A better kind
              <br />
              of <em>dentistry.</em>
            </h3>

            <p>
              From the way we communicate to the way
              we plan your treatment, every detail is
              designed to make dental care feel easier,
              clearer and more personal.
            </p>

            <div className="why-check-list">

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Experienced dental team</p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Modern clinical environment</p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Personalised treatment plans</p>
              </div>

            </div>

          </div>

        </motion.div>


        {/* =====================================
            REASONS GRID
        ===================================== */}

        <div className="why-grid">

          {reasons.map((reason, index) => {

            const Icon = reason.icon;

            return (
              <motion.article
                className="why-card"
                key={reason.number}
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
                  delay: index * 0.1,
                  duration: 0.7,
                }}
              >

                <div className="why-card-top">

                  <span>
                    {reason.number}
                  </span>

                  <Icon size={19} />

                </div>

                <h4>
                  {reason.title}
                </h4>

                <p>
                  {reason.description}
                </p>

                <div className="why-card-arrow">
                  <ArrowUpRight size={16} />
                </div>

              </motion.article>
            );
          })}

        </div>


        {/* =====================================
            BOTTOM STATS
        ===================================== */}

        <motion.div
          className="why-stats"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <div>
            <strong>11+</strong>
            <span>Years of expertise</span>
          </div>

          <div>
            <strong>5K+</strong>
            <span>Patients cared for</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Ivy AI support</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Patient focused</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;