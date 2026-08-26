import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import "./Cosmetic.css";
import { Link } from "react-router-dom";

const treatments = [
  {
    number: "01",
    title: "Porcelain Veneers",
    description:
      "Ultra-thin custom veneers designed to refine the shape, colour and balance of your smile.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=90",
  },
  {
    number: "02",
    title: "Professional Whitening",
    description:
      "A brighter, natural-looking smile with professional whitening tailored to your teeth.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=90",
  },
  {
    number: "03",
    title: "Smile Makeover",
    description:
      "A personalised combination of treatments designed around your facial features and smile goals.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=90",
  },
];

const Cosmetic = () => {
  return (
    <section
      className="cosmetic-section"
      id="cosmetic"
    >
      <div className="cosmetic-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="cosmetic-header"
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

          

          <div className="cosmetic-heading">

            <h2>
              Your smile,
              <br />
              <em>refined.</em>
            </h2>

            <div className="cosmetic-intro">

              <Sparkles size={17} />

              <p>
                Subtle enhancements. Thoughtful design.
                Natural-looking results that still feel
                completely like you.
              </p>

            </div>

          </div>

        </motion.div>


        {/* =====================================
            HERO SHOWCASE
        ===================================== */}

        <motion.div
          className="cosmetic-showcase"
          initial={{
            opacity: 0,
            y: 55,
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
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          <div className="cosmetic-showcase-image">

            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=90"
              alt="Cosmetic dentistry smile"
            />

            <div className="cosmetic-image-overlay" />

            <div className="cosmetic-showcase-copy">

              <span>
                SMILE DESIGN
              </span>

              <h3>
                Small changes.
                <br />
                <em>Big confidence.</em>
              </h3>

              <p>
                We believe cosmetic dentistry should
                enhance what already makes your smile
                uniquely yours.
              </p>

            </div>

            <div className="cosmetic-floating-badge">
              <Sparkles size={15} />

              <span>
                NATURAL
                <br />
                RESULTS
              </span>
            </div>

          </div>


          {/* RIGHT CONTENT */}

          <div className="cosmetic-showcase-content">

            <span className="cosmetic-eyebrow">
              DESIGNED FOR YOU
            </span>

            <h3>
              A smile that
              <br />
              feels <em>like you.</em>
            </h3>

            <p>
              Cosmetic dentistry isn't about creating
              a perfect-looking smile. It's about creating
              a smile that works naturally with your face,
              personality and confidence.
            </p>

            <div className="cosmetic-checks">

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Personalised smile assessment
                </p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Natural-looking treatment plans
                </p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>

                <p>
                  Clear treatment guidance
                </p>
              </div>

            </div>

            <Link
  to="/appointment"
  className="cosmetic-button"
>
  Explore your options

  <span>
    <ArrowUpRight size={15} />
  </span>
</Link>

          </div>

        </motion.div>


        {/* =====================================
            TREATMENT CARDS
        ===================================== */}

        <div className="cosmetic-treatments">

          {treatments.map(
            (treatment, index) => (

              <motion.article
                className="cosmetic-card"
                key={treatment.number}
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
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                }}
              >

                <div className="cosmetic-card-image">

                  <img
                    src={treatment.image}
                    alt={treatment.title}
                  />

                  <div className="cosmetic-card-overlay" />

                  <span>
                    {treatment.number}
                  </span>

                  <button
                    type="button"
                    aria-label={`Learn more about ${treatment.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </button>

                </div>

                <div className="cosmetic-card-content">

                  <h4>
                    {treatment.title}
                  </h4>

                  <p>
                    {treatment.description}
                  </p>

                </div>

              </motion.article>

            )
          )}

        </div>


        {/* =====================================
            BOTTOM CTA
        ===================================== */}

        <motion.div
          className="cosmetic-bottom"
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
            <span>
              COSMETIC CONSULTATION
            </span>

            <p>
              Ready to feel more confident
              <br />
              about your smile?
            </p>
          </div>

          <Link to="/appointment">
  Book a consultation
  <ArrowUpRight size={16} />
</Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Cosmetic;