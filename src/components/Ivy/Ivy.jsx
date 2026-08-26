import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import "./Ivy.css";

const quickOptions = [
  {
    id: "appointment",
    title: "Book an appointment",
    subtitle: "Find a convenient time",
    icon: CalendarDays,
  },
  {
    id: "services",
    title: "Explore treatments",
    subtitle: "See what we offer",
    icon: Sparkles,
  },
  {
    id: "timings",
    title: "Clinic timings",
    subtitle: "When are you open?",
    icon: Clock3,
  },
  {
    id: "question",
    title: "Ask a question",
    subtitle: "We're here to help",
    icon: MessageCircle,
  },
];

const responses = {
  appointment:
    "Absolutely. I can help you find the right appointment. Choose a preferred day and we'll take it from there.",
  services:
    "We offer general, cosmetic and restorative dentistry, including implants, root canals, crowns, veneers, whitening and clear aligners.",
  timings:
    "Our team is available Monday to Saturday. You can contact the clinic to confirm today's available appointment slots.",
  question:
    "Of course. Tell me what you'd like to know and I'll help you find the right information.",
};

const Ivy = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ivy",
      text:
        "Hi, I'm Ivy. How can I help you with your dental care today?",
    },
  ]);

  const [input, setInput] = useState("");

  const [activeOption, setActiveOption] =
    useState(null);

  const handleQuickOption = (option) => {
    setActiveOption(option.id);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        text: option.title,
      },
      {
        id: Date.now() + 1,
        type: "ivy",
        text: responses[option.id],
      },
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();

    const message = input.trim();

    if (!message) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        text: message,
      },
      {
        id: Date.now() + 1,
        type: "ivy",
        text:
          "Thanks for reaching out. I can help you with appointments, treatments, clinic information or connecting with our team.",
      },
    ]);

    setInput("");
  };

  return (
    <section
      className="ivy-section"
      id="ivy"
    >
      <div className="ivy-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="ivy-header"
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


          <div className="ivy-heading">

            <h2>
              Your dental care,
              <br />
              <em>always within reach.</em>
            </h2>

            <p>
              Ivy is your 24/7 AI dental receptionist,
              ready to answer questions and help you
              take the next step.
            </p>

          </div>

        </motion.div>


        {/* =====================================
            MAIN IVY EXPERIENCE
        ===================================== */}

        <motion.div
          className="ivy-main"
          initial={{
            opacity: 0,
            y: 60,
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

          {/* LEFT CONTENT */}

          <div className="ivy-info">

            <div className="ivy-orb-wrapper">

              <motion.div
                className="ivy-orb"
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="ivy-orb-inner">
                  <Sparkles size={27} />
                </div>
              </motion.div>

              <span className="ivy-orb-dot dot-one" />
              <span className="ivy-orb-dot dot-two" />
              <span className="ivy-orb-dot dot-three" />

            </div>


            
              AI RECEPTIONIST
            

            <h3>
              Meet
            
              <em> Ivy.</em>
            </h3>

            <p>
              A smarter front desk for a modern
              dental practice. Ivy helps patients
              get answers and take action without
              waiting for a call back.
            </p>


            <div className="ivy-benefits">

              <div>
                <span>01</span>
                <p>Available 24/7</p>
              </div>

              <div>
                <span>02</span>
                <p>Answers instantly</p>
              </div>

              <div>
                <span>03</span>
                <p>Helps with appointments</p>
              </div>

            </div>


            <a
              href="#appointment"
              className="ivy-book-link"
            >
              Book an appointment

              <ArrowUpRight size={15} />
            </a>

          </div>


          {/* CHAT */}

          <div className="ivy-chat">

            <div className="ivy-chat-header">

              <div className="ivy-chat-person">

                <div className="ivy-avatar">
                  <Sparkles size={14} />
                </div>

                <div>
                  <strong>Ivy</strong>

                  <span>
                    <i />
                    Online now
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="ivy-close"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>

            </div>


            {/* MESSAGES */}

            <div className="ivy-messages">

              <AnimatePresence initial={false}>

                {messages.map((message) => (

                  <motion.div
                    key={message.id}
                    className={`ivy-message ${
                      message.type === "user"
                        ? "ivy-message-user"
                        : "ivy-message-bot"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >

                    {message.type === "ivy" && (
                      <div className="message-avatar">
                        <Sparkles size={10} />
                      </div>
                    )}

                    <div className="message-bubble">
                      {message.text}
                    </div>

                  </motion.div>

                ))}

              </AnimatePresence>

            </div>


            {/* QUICK OPTIONS */}

            <div className="ivy-options">

              <span>
                HOW CAN I HELP?
              </span>

              <div className="ivy-option-grid">

                {quickOptions.map((option) => {

                  const Icon = option.icon;

                  return (
                    <button
                      type="button"
                      key={option.id}
                      className={
                        activeOption === option.id
                          ? "ivy-option active"
                          : "ivy-option"
                      }
                      onClick={() =>
                        handleQuickOption(option)
                      }
                    >

                      <Icon size={15} />

                      <div>
                        <strong>
                          {option.title}
                        </strong>

                        <small>
                          {option.subtitle}
                        </small>
                      </div>

                    </button>
                  );
                })}

              </div>

            </div>


            {/* INPUT */}

            <form
              className="ivy-input"
              onSubmit={handleSend}
            >

              <UserRound size={15} />

              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Type your question..."
              />

              <button
                type="submit"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>

            </form>

          </div>

        </motion.div>


        {/* =====================================
            BOTTOM STRIP
        ===================================== */}

        <motion.div
          className="ivy-bottom"
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
            <Phone size={15} />

            <span>
              Prefer to speak with our team?
            </span>
          </div>

          <a href="tel:+919876543210">
            Call the clinic
            <ArrowUpRight size={15} />
          </a>

        </motion.div>

      </div>
    </section>
  );
};

export default Ivy;