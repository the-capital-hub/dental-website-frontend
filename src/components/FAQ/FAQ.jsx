import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

import "./FAQ.css";

const faqs = [
  {
    id: "01",
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through our online booking option, contact the clinic directly, or speak with Ivy, our AI receptionist, for help finding the right next step.",
  },
  {
    id: "02",
    question: "What should I expect at my first visit?",
    answer:
      "Your first visit is focused on understanding your concerns, discussing your dental goals and assessing your oral health. Your dentist will explain the recommended options clearly before treatment begins.",
  },
  {
    id: "03",
    question: "Do you offer cosmetic dentistry?",
    answer:
      "Yes. Cosmetic options can include professional whitening, veneers and personalised smile-makeover planning. Your dentist can recommend an approach based on your smile and goals.",
  },
  {
    id: "04",
    question: "Do you offer dental implants?",
    answer:
      "Yes. Dental implants can be considered for replacing missing teeth. Treatment starts with a consultation and personalised assessment to understand whether implants are suitable for you.",
  },
  {
    id: "05",
    question: "What if I have a dental emergency?",
    answer:
      "If you have sudden dental pain, swelling, bleeding or a dental injury, contact the clinic as soon as possible. Our team can help guide you on the appropriate next step.",
  },
  {
    id: "06",
    question: "Can Ivy help me book an appointment?",
    answer:
      "Yes. Ivy is designed to help patients with common questions and appointment-related requests. You can also contact the clinic directly whenever you prefer to speak with the team.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState("01");

  const toggleFAQ = (id) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      className="faq-section"
      id="faq"
    >
      <div className="faq-container">

        {/* HEADER */}

        <motion.div
          className="faq-header"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="faq-label">
            <span>12</span>
            <i />
            <p>FAQ</p>
          </div>

          <div className="faq-heading">

            <h2>
              Questions,
              <br />
              <em>answered.</em>
            </h2>

            <div className="faq-intro">
              <MessageCircleQuestion size={17} />

              <p>
                Everything you need to know before
                your visit. And if you still have a
                question, Ivy is always available.
              </p>
            </div>

          </div>
        </motion.div>


        {/* FAQ AREA */}

        <div className="faq-layout">

          {/* LEFT SIDE */}

          <motion.div
            className="faq-side"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="faq-side-icon">
              <Sparkles size={19} />
            </div>

            <span>
              STILL CURIOUS?
            </span>

            <h3>
              Ask Ivy.
            </h3>

            <p>
              Can't find what you're looking for?
              Our AI receptionist can help answer
              questions and guide you towards the
              right next step.
            </p>

            <a href="#ivy">
              Talk to Ivy
              <ArrowUpRight size={15} />
            </a>

          </motion.div>


          {/* QUESTIONS */}

          <motion.div
            className="faq-list"
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
              duration: 0.8,
            }}
          >

            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  className={`faq-item ${
                    isOpen
                      ? "faq-item-open"
                      : ""
                  }`}
                  key={faq.id}
                >

                  <button
                    type="button"
                    className="faq-question"
                    onClick={() =>
                      toggleFAQ(faq.id)
                    }
                    aria-expanded={isOpen}
                  >

                    <div className="faq-question-left">

                      <span>
                        {faq.id}
                      </span>

                      <h3>
                        {faq.question}
                      </h3>

                    </div>

                    <div className="faq-chevron">
                      <ChevronDown size={17} />
                    </div>

                  </button>


                  <AnimatePresence initial={false}>

                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrapper"
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >

                        <div className="faq-answer">

                          <p>
                            {faq.answer}
                          </p>

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>
              );
            })}

          </motion.div>

        </div>


        {/* BOTTOM CTA */}

        <motion.div
          className="faq-bottom"
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

          <span>
            DIDN'T FIND YOUR ANSWER?
          </span>

          <a href="#contact">
            Contact our team
            <ArrowUpRight size={15} />
          </a>

        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;