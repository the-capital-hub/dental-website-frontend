import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import "./Doctors.css";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: "01",
    name: "Dr. Ananya Rao",
    role: "Founder & Lead Dentist",
    qualification: "BDS, MDS",
    experience: "11+ Years",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=90",
    featured: false,
  },
  {
    id: "02",
    name: "Dr. Rohan Mehta",
    role: "Associate Dentist",
    qualification: "BDS, MDS",
    experience: "8+ Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=90",
    featured: true,
  },
  {
    id: "03",
    name: "Dr. Meera Shah",
    role: "Cosmetic Dentist",
    qualification: "BDS, MDS",
    experience: "7+ Years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=90",
    featured: false,
  },
  {
    id: "04",
    name: "Dr. Arjun Kapoor",
    role: "Restorative Dentist",
    qualification: "BDS, MDS",
    experience: "9+ Years",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=90",
    featured: false,
  },
];

const Doctors = () => {
  return (
    <section className="doctors-section" id="doctors">

      <div className="doctors-container">

        {/* =====================================
            SECTION HEADER
        ===================================== */}


        {/* =====================================
            DOCTOR CARDS
        ===================================== */}

        <div className="doctors-grid">

          {doctors.map((doctor, index) => (

            <motion.article
              className={`doctor-card ${
                doctor.featured
                  ? "doctor-card-featured"
                  : ""
              }`}
              key={doctor.id}
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
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Image */}

              <div className="doctor-image">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                />

                <div className="doctor-image-overlay" />

                <span className="doctor-number">
                  {doctor.id}
                </span>


                <a
                  href="#appointment"
                  className="doctor-view-button"
                  aria-label={`Book appointment with ${doctor.name}`}
                >
                  <ArrowUpRight size={17} />
                </a>

              </div>


              {/* Info */}

              <div className="doctor-info">

                <span className="doctor-role">
                  {doctor.role}
                </span>

                <h3>
                  {doctor.name}
                </h3>

                <div className="doctor-meta">

                  <span>
                    {doctor.qualification}
                  </span>

                  <i />

                  <span>
                    {doctor.experience}
                  </span>

                </div>

              </div>


              {/* Featured indicator */}

              {doctor.featured && (
                <div className="doctor-featured-tag">
                  Lead Dentist
                </div>
              )}

            </motion.article>

          ))}

        </div>


        {/* =====================================
            BOTTOM CTA
        ===================================== */}

        <motion.div
          className="doctors-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <span>
            TRUSTED EXPERTS · PERSONAL CARE
          </span>

          <Link to="/appointment">
  Book with our team
  <ArrowUpRight size={15} />
</Link>

        </motion.div>

      </div>

    </section>
  );
};

export default Doctors;