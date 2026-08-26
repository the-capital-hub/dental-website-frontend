import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Plus,
} from "lucide-react";

import "./Services.css";
import { Link } from "react-router-dom";


/* =====================================================
   SERVICES DATA
===================================================== */

const services = [
  
  {
    number: "01",
    title: "Cosmetic Dentistry",
    description:
      "Thoughtful treatments designed to enhance your smile naturally.",
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    title: "Dental Implants",
    description:
      "Natural-looking tooth replacement designed for comfort and confidence.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    title: "Root Canal Treatment",
    description:
      "Modern care that relieves discomfort while preserving your natural tooth.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    title: "Crowns & Bridges",
    description:
      "Custom restorations designed for function, comfort and appearance.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "05",
    title: "Clear Aligners",
    description:
      "A discreet modern approach to creating a straighter, healthier smile.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=85",
  },
];


const additionalServices = [
  "Teeth Cleaning",
  "Veneers",
  "Teeth Whitening",
  "Wisdom Tooth Treatment",
  "Emergency Dentistry",
  "Family Dentistry",
];


/* =====================================================
   SERVICES
===================================================== */

const Services = () => {
  return (
    <section
      className="services-section"
      id="services"
    >

      <div className="services-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="services-header"

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
            amount: 0.25,
          }}

          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          


          <div className="services-heading-row">

            <h2>
              Complete dental care
              <br />
              <em>
                under one roof.
              </em>
            </h2>


            <p>
              From preventive care to cosmetic and
              restorative treatments, thoughtful care
              for every stage of your smile journey.
            </p>

          </div>

        </motion.div>


        {/* =================================================
            FEATURED SERVICE
        ================================================= */}


        {/* =================================================
            SERVICE LIST
        ================================================= */}

        <div className="services-list">

          {services.slice(1).map(
            (service, index) => (

              <motion.article
                className="service-row"
                key={service.number}

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
                  delay: index * 0.06,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* NUMBER */}

                <div className="service-number">
                  {service.number}
                </div>


                {/* CONTENT */}

                <div className="service-main">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                </div>


                {/* IMAGE */}

                <div className="service-image">

                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                  />

                </div>


                {/* ACTION */}

                <Link
  to="/appointment"
  className="service-arrow"
  aria-label={`Book ${service.title}`}
>
  <ArrowUpRight size={17} />
</Link>

              </motion.article>

            )
          )}

        </div>


        {/* =================================================
            ADDITIONAL SERVICES
        ================================================= */}

        <motion.div
          className="additional-services"

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
            duration: 0.7,
          }}
        >

          <div className="additional-heading">

            <span>
              MORE WAYS WE CAN HELP
            </span>

            <Sparkles size={14} />

          </div>


          <div className="additional-grid">

            {additionalServices.map(
              (service, index) => (

                <motion.div
                  className="additional-item"
                  key={service}

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                  }}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {service}
                  </strong>

                  <Plus size={14} />

                </motion.div>

              )
            )}

          </div>

        </motion.div>


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          className="services-bottom"

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
            duration: 0.7,
          }}
        >

          <span>
            HAVE QUESTIONS ABOUT A TREATMENT?
          </span>

          <a href="#ivy">

            Ask Ivy

            <ArrowUpRight size={15} />

          </a>

        </motion.div>

      </div>

    </section>
  );
};

export default Services;