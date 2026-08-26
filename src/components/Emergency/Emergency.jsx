import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Clock3,
  Phone,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import "./Emergency.css";

const Emergency = () => {
  return (
    <section
      className="emergency-section"
      id="emergency"
    >
      <div className="emergency-container">

        {/* =====================================
            TOP LABEL
        ===================================== */}

        


        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <div className="emergency-main">

          {/* LEFT */}

          <motion.div
            className="emergency-content"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
            }}
          >

            <div className="emergency-icon">
              <AlertCircle size={21} />
            </div>

            <span className="emergency-eyebrow">
              SOMETHING FEELS WRONG?
            </span>

            <h2>
              Don't wait
              <br />
              in <em>pain.</em>
            </h2>

            <p>
              Dental emergencies can happen unexpectedly.
              If you're experiencing sudden pain, swelling,
              bleeding or a dental injury, our team can help
              you understand what to do next.
            </p>


            {/* QUICK POINTS */}

            <div className="emergency-points">

              <div>
                <span>
                  <Clock3 size={13} />
                </span>

                <p>
                  Same-day urgent care
                </p>
              </div>

              <div>
                <span>
                  <Stethoscope size={13} />
                </span>

                <p>
                  Experienced dental team
                </p>
              </div>

              <div>
                <span>
                  <Sparkles size={13} />
                </span>

                <p>
                  Calm, guided support
                </p>
              </div>

            </div>


            {/* ACTIONS */}

            <div className="emergency-actions">

              <a
                href="tel:+919876543210"
                className="emergency-call"
              >
                <Phone size={15} />

                <span>
                  Call the clinic
                </span>
              </a>

              <a
                href="#ivy"
                className="emergency-ivy"
              >
                Talk to Ivy
                <ArrowUpRight size={15} />
              </a>

            </div>

          </motion.div>


          {/* RIGHT IMAGE */}

          <motion.div
            className="emergency-image"
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
              amount: 0.2,
            }}
            transition={{
              duration: 1,
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=90"
              alt="Dental care consultation"
            />

            <div className="emergency-image-overlay" />


            {/* IMAGE BADGE */}

            <div className="emergency-badge">

              <div className="emergency-badge-icon">
                <Phone size={16} />
              </div>

              <div>
                <span>
                  NEED HELP?
                </span>

                <strong>
                  We're here.
                </strong>
              </div>

            </div>


            {/* BOTTOM TEXT */}

            <div className="emergency-image-text">

              <span>
                URGENT CARE
              </span>

              <strong>
                Fast guidance.
                <br />
                Gentle care.
              </strong>

            </div>

          </motion.div>

        </div>


        {/* =====================================
            EMERGENCY WARNING STRIP
        ===================================== */}

        <motion.div
          className="emergency-strip"
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
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="emergency-strip-icon">
            <AlertCircle size={16} />
          </div>

          <div>
            <strong>
              Experiencing a dental emergency?
            </strong>

            <p>
              Call our clinic directly for immediate
              guidance on your next step.
            </p>
          </div>

          <a href="tel:+919876543210">
            +91 98765 43210
            <Phone size={14} />
          </a>

        </motion.div>


        {/* =====================================
            DISCLAIMER
        ===================================== */}

        <p className="emergency-disclaimer">
          For severe medical emergencies requiring
          immediate hospital care, please contact
          your local emergency medical service.
        </p>

      </div>
    </section>
  );
};

export default Emergency;