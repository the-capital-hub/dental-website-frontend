import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Quote,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import "./Testimonials.css";

const testimonials = [
  {
    id: "01",
    quote: "I finally stopped being nervous about the dentist.",
    text:
      "I had avoided going to the dentist for years because I was anxious. Everyone at Oak & Ivory was incredibly patient and never made me feel uncomfortable. Dr. Ananya explained everything clearly.",
    name: "Sneha R.",
    treatment: "General Dentistry",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "02",
    quote: "The entire process was so smooth.",
    text:
      "From booking the appointment to completing my treatment, the team was professional and genuinely caring. I always knew what was happening and what the next step was.",
    name: "Rahul M.",
    treatment: "Dental Treatment",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "03",
    quote: "My smile has completely changed my confidence.",
    text:
      "I had been thinking about improving my smile for years. Dr. Meera understood exactly what I wanted and helped me choose a treatment that looked natural.",
    name: "Priya S.",
    treatment: "Cosmetic Dentistry",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "04",
    quote: "Excellent experience from start to finish.",
    text:
      "The clinic is modern, the staff is friendly and the doctors take the time to actually listen. I would definitely recommend Oak & Ivory.",
    name: "Arjun K.",
    treatment: "Patient Experience",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex(
      (prev) => (prev + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + testimonials.length) %
        testimonials.length
    );
  };

  return (
    <section
      className="testimonials-section"
      id="testimonials"
    >
      <div className="testimonials-container">

        {/* HEADER */}

        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="testimonials-label">
            <span>05</span>
            <i />
            <p>TESTIMONIALS</p>
          </div>

          <div className="testimonials-heading">
            <h2>
              What our
              <br />
              <em>patients say.</em>
            </h2>

            <div className="testimonials-intro">
              <Sparkles size={17} />

              <p>
                Real experiences matter. Here's what
                patients love about their Oak & Ivory
                experience.
              </p>
            </div>
          </div>
        </motion.div>


        {/* MAIN TESTIMONIAL */}

        <div className="testimonial-main">

          {/* LEFT */}

          <div className="testimonial-quote">

            <Quote
              className="quote-icon"
              size={42}
            />

            <div className="testimonial-counter">
              <span>{current.id}</span>
              <i />
              <span>
                0{testimonials.length}
              </span>
            </div>


            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.35,
                }}
              >

                <h3>
                  “{current.quote}”
                </h3>

                <p>
                  {current.text}
                </p>

                <div className="testimonial-person">

                  <div className="person-avatar">
                    <img
                      src={current.image}
                      alt={current.name}
                    />
                  </div>

                  <div>
                    <strong>
                      {current.name}
                    </strong>

                    <span>
                      {current.treatment}
                    </span>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

          </div>


          {/* RIGHT STORY */}

          <div className="testimonial-story">

            <AnimatePresence mode="wait">

              <motion.img
                key={current.id}
                src={current.image}
                alt={`${current.name} testimonial`}
                initial={{
                  opacity: 0,
                  scale: 1.06,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.5,
                }}
              />

            </AnimatePresence>

            <div className="story-overlay" />

            <div className="story-top">
              <span>PATIENT STORY</span>

              <span>
                {current.id} / 04
              </span>
            </div>

            <button
              className="story-play"
              type="button"
              aria-label="Play patient story"
            >
              <Play
                size={17}
                fill="currentColor"
              />
            </button>

            <div className="story-bottom">

              <div>
                <small>
                  {current.treatment.toUpperCase()}
                </small>

                <strong>
                  {current.name}'s story
                </strong>
              </div>

              <ArrowRight size={18} />

            </div>

          </div>

        </div>


        {/* OTHER TESTIMONIALS */}

        <div className="testimonial-list">

          {testimonials.map(
            (testimonial, index) => (

              <button
                type="button"
                className={`testimonial-item ${
                  activeIndex === index
                    ? "testimonial-item-active"
                    : ""
                }`}
                key={testimonial.id}
                onClick={() =>
                  setActiveIndex(index)
                }
              >

                <span className="testimonial-item-number">
                  {testimonial.id}
                </span>

                <div className="testimonial-item-content">

                  <span>
                    {testimonial.treatment}
                  </span>

                  <h4>
                    “{testimonial.quote}”
                  </h4>

                  <p>
                    {testimonial.text}
                  </p>

                  <strong>
                    — {testimonial.name}
                  </strong>

                </div>

                <div className="testimonial-item-arrow">
                  <ArrowRight size={17} />
                </div>

              </button>

            )
          )}

        </div>


        {/* CONTROLS */}

        <div className="testimonials-bottom">

          <span>
            YOUR EXPERIENCE MATTERS
          </span>

          <div className="testimonial-controls">

            <button
              type="button"
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ArrowRight size={15} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;