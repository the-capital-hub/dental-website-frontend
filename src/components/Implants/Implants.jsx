import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./Implants.css";

const implantSteps = [
  {
    number: "01",
    title: "Consultation",
    text: "We understand your dental needs and assess your smile, bite and overall oral health.",
  },
  {
    number: "02",
    title: "Personalised plan",
    text: "Your implant treatment is planned around your specific needs and long-term goals.",
  },
  {
    number: "03",
    title: "Gentle placement",
    text: "Our experienced team focuses on a precise and comfortable treatment experience.",
  },
  {
    number: "04",
    title: "Natural finish",
    text: "Your final restoration is designed to look, feel and function naturally.",
  },
];

const Implants = () => {
  return (
    <section
      className="implants-section"
      id="implants"
    >
      <div className="implants-container">

        {/* HEADER */}

        <motion.div
          className="implants-header"
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
          

          <div className="implants-heading">

            <h2>
              Rebuild your
              <br />
              <em>confidence.</em>
            </h2>

            <p>
              A missing tooth doesn't have to change
              the way you smile, eat or live. Modern
              implant dentistry can help restore all three.
            </p>

          </div>
        </motion.div>


        {/* MAIN FEATURE */}

        <motion.div
          className="implants-feature"
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

          {/* IMAGE */}

          <div className="implants-image">

            <img
              src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1500&q=90"
              alt="Dental implant treatment"
            />

            <div className="implants-image-overlay" />

            <div className="implants-image-copy">

              <span>
                RESTORE • REPLACE • SMILE
              </span>

              <strong>
                Designed for
                <br />
                everyday life.
              </strong>

            </div>

          </div>


          {/* CONTENT */}

          <div className="implants-content">

            <div className="implants-icon">
              <ShieldCheck size={19} />
            </div>

            <span className="implants-eyebrow">
              A LONG-TERM SOLUTION
            </span>

            <h3>
              Feel like
              <br />
              yourself <em>again.</em>
            </h3>

            <p>
              Dental implants are designed to replace
              missing teeth with a stable, natural-looking
              solution that helps restore everyday
              confidence.
            </p>

            <div className="implants-checks">

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Natural-looking results</p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Designed around your bite</p>
              </div>

              <div>
                <span>
                  <Check size={11} />
                </span>
                <p>Personalised treatment planning</p>
              </div>

            </div>

            <a
              href="#appointment"
              className="implants-button"
            >
              Discuss your options

              <span>
                <ArrowUpRight size={15} />
              </span>
            </a>

          </div>

        </motion.div>


        {/* STEPS */}

        <div className="implants-process">

          <div className="implants-process-heading">

            <span>
              YOUR JOURNEY
            </span>

            <h3>
              Simple steps.
              <br />
              Thoughtful care.
            </h3>

          </div>


          <div className="implants-steps">

            {implantSteps.map(
              (step, index) => (

                <motion.article
                  className="implant-step"
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
                    amount: 0.15,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.65,
                  }}
                >

                  <div className="implant-step-top">

                    <span>
                      {step.number}
                    </span>

                    <CircleCheck size={17} />

                  </div>

                  <h4>
                    {step.title}
                  </h4>

                  <p>
                    {step.text}
                  </p>

                </motion.article>

              )
            )}

          </div>

        </div>


        {/* BOTTOM */}

        

      </div>
    </section>
  );
};

export default Implants;