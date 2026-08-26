import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./FAQ.css";

const faqGroups = [
  {
    title: "Before your visit",
    questions: [
      {
        question: "What should I expect at my first appointment?",
        answer:
          "Your first visit is an opportunity to talk about your concerns, understand your current dental health and discuss what you would like to achieve. We take time to explain the findings and possible next steps clearly.",
      },
      {
        question: "Do I need to know which treatment I need?",
        answer:
          "Not at all. If you're unsure what kind of treatment may be appropriate, simply tell us what you're experiencing. Our team can help you understand the options available.",
      },
      {
        question: "How long does a first appointment take?",
        answer:
          "Appointment times can vary depending on your needs and the type of consultation. When you contact the clinic, our team can provide the expected duration for your appointment.",
      },
      {
        question: "What should I bring to my appointment?",
        answer:
          "Bring any relevant dental records, previous reports or information about medications you are currently taking. If you are unsure, our team can guide you before your visit.",
      },
    ],
  },
  {
    title: "Treatment & care",
    questions: [
      {
        question: "How do I know which treatment is right for me?",
        answer:
          "Treatment decisions should be based on your individual needs, clinical findings and personal goals. Your dentist will explain the available options so you can make an informed decision.",
      },
      {
        question: "Will my treatment be explained before it starts?",
        answer:
          "Yes. We believe patients should understand what is being recommended, why it may be appropriate and what they can expect before moving forward.",
      },
      {
        question: "Can I ask questions during my treatment?",
        answer:
          "Absolutely. Questions are always welcome. Clear communication is an important part of creating a comfortable and confident treatment experience.",
      },
      {
        question: "What happens after treatment?",
        answer:
          "Depending on the treatment, your dentist may recommend follow-up care, maintenance or another appointment. Your team will explain the appropriate next step for you.",
      },
    ],
  },
  {
    title: "Appointments",
    questions: [
      {
        question: "How can I book an appointment?",
        answer:
          "You can use our online appointment form or contact the clinic directly. If you're not sure what type of appointment you need, our team can help.",
      },
      {
        question: "Can I request a particular dentist?",
        answer:
          "You can let our team know which dentist you would prefer when requesting an appointment. Availability will determine the final appointment time.",
      },
      {
        question: "Can I reschedule my appointment?",
        answer:
          "Yes. Please contact the clinic as early as possible if you need to change your appointment so the team can help you find another suitable time.",
      },
      {
        question: "What if I need urgent dental care?",
        answer:
          "If you have an urgent dental concern, contact the clinic directly. The team can ask about your situation and guide you towards the appropriate next step.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState("0-0");

  const toggleItem = (id) => {
    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <>
      <Navbar />

      <main className="faq-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="faq-hero">

          <div className="faq-container">

            <motion.div
              className="faq-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>01</span>
              <i />
              <p>FREQUENTLY ASKED QUESTIONS</p>
            </motion.div>

            <div className="faq-hero-grid">

              <motion.div
                className="faq-hero-content"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >

                <div className="faq-kicker">
                  <HelpCircle size={15} />
                  <span>ANSWERS, WITHOUT THE GUESSWORK</span>
                </div>

                <h1>
                  Questions?
                  <br />
                  We've got
                  <br />
                  <em>answers.</em>
                </h1>

                <p>
                  Everything you need to know before your
                  visit, during treatment and when planning
                  your next step.
                </p>

                <a
                  href="#questions"
                  className="faq-hero-link"
                >
                  Explore questions

                  <span>
                    <ArrowDown size={14} />
                  </span>
                </a>

              </motion.div>


              <motion.div
                className="faq-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >

                <img
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=90"
                  alt="Dental care"
                />

                <div className="faq-hero-overlay" />

                <div className="faq-hero-card">

                  <span>NEED HELP?</span>

                  <strong>
                    Ask.
                    <br />
                    Understand.
                    <br />
                    Decide.
                  </strong>

                </div>

                <div className="faq-hero-caption">

                  <span>OAK & IVORY</span>

                  <p>
                    Clear answers.
                    <br />
                    Confident choices.
                  </p>

                </div>

              </motion.div>

            </div>

            

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

      


        {/* =====================================================
            FAQ SECTION
        ===================================================== */}

        <section
          className="faq-questions"
          id="questions"
        >

          <div className="faq-container">

            <div className="faq-section-heading">

              

              <h2>
                Let's clear up
                <br />
                the <em>important things.</em>
              </h2>

            </div>


            <div className="faq-groups">

              {faqGroups.map((group, groupIndex) => (

                <div
                  className="faq-group"
                  key={group.title}
                >

                  <div className="faq-group-title">

                    <span>
                      0{groupIndex + 1}
                    </span>

                    <h3>
                      {group.title}
                    </h3>

                  </div>


                  <div className="faq-list">

                    {group.questions.map((item, questionIndex) => {

                      const id =
                        `${groupIndex}-${questionIndex}`;

                      const isOpen =
                        openItem === id;

                      return (
                        <motion.div
                          className={`faq-item ${
                            isOpen ? "is-open" : ""
                          }`}
                          key={item.question}
                          layout
                        >

                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => toggleItem(id)}
                            aria-expanded={isOpen}
                          >

                            <span className="faq-question-number">
                              {String(questionIndex + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <strong>
                              {item.question}
                            </strong>

                            <span className="faq-chevron">
                              <ChevronDown size={16} />
                            </span>

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
                              >

                                <div className="faq-answer">

                                  <p>
                                    {item.answer}
                                  </p>

                                </div>

                              </motion.div>

                            )}

                          </AnimatePresence>

                        </motion.div>
                      );
                    })}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            IVY SECTION
        ===================================================== */}

        <section className="faq-ivy">

          <div className="faq-container">

            <div className="faq-ivy-grid">

              <motion.div
                className="faq-ivy-content"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >

               

                <h2>
                  Just ask
                  <br />
                  <em>Ivy.</em>
                </h2>

                <p>
                  Our AI receptionist can help answer common
                  questions, guide you through treatment options
                  and help you find the right next step.
                </p>

                <a href="/ai-receptionist">

                  Talk to Ivy

                  <span>
                    <ArrowUpRight size={14} />
                  </span>

                </a>

              </motion.div>


              <motion.div
                className="faq-ivy-card"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >

                <div className="faq-ivy-header">

                  <div className="faq-ivy-avatar">
                    <Sparkles size={15} />
                  </div>

                  <div>
                    <strong>Ivy</strong>
                    <span>AI Receptionist</span>
                  </div>

                  <div className="faq-ivy-online">
                    <span />
                    ONLINE
                  </div>

                </div>


                <div className="faq-ivy-messages">

                  <div className="faq-ivy-message ai">
                    Hi, I'm Ivy. What would you
                    like to know?
                  </div>

                  <div className="faq-ivy-message user">
                    Can I book an appointment online?
                  </div>

                  <div className="faq-ivy-message ai">
                    Absolutely. I can help you get
                    started with an appointment request.
                  </div>

                </div>


                <div className="faq-ivy-input">

                  <span>
                    Ask Ivy anything...
                  </span>

                  <MessageCircle size={14} />

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK LINKS
        ===================================================== */}

        <section className="faq-links">

          <div className="faq-container">

            <div className="faq-links-heading">

              

              <h2>
                Find your
                 
                <em> next step.</em>
              </h2>

            </div>


            <div className="faq-links-grid">

              <a
                href="/services"
                className="faq-link-card"
              >

                <span>01</span>

                <strong>
                  Explore treatments
                </strong>

                <p>
                  Discover the care options available
                  at the clinic.
                </p>

                <ArrowUpRight size={16} />

              </a>


              <a
                href="/doctors"
                className="faq-link-card"
              >

                <span>02</span>

                <strong>
                  Meet our dentists
                </strong>

                <p>
                  Get to know the clinicians behind
                  your care.
                </p>

                <ArrowUpRight size={16} />

              </a>


              <a
                href="/contact"
                className="faq-link-card"
              >

                <span>03</span>

                <strong>
                  Book an appointment
                </strong>

                <p>
                  Take the first step towards your
                  next visit.
                </p>

                <ArrowUpRight size={16} />

              </a>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="faq-cta">

          <div className="faq-container">

            <motion.div
              className="faq-cta-inner"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              <div>

                <span>
                  STILL NOT SURE?
                </span>

                <h2>
                  You don't need
                  <br />
                  all the answers.
                  <br />
                  <em>Just start.</em>
                </h2>

              </div>

              <a href="/contact">

                Book a conversation

                <span>
                  <ArrowUpRight size={16} />
                </span>

              </a>

            </motion.div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default FAQ;