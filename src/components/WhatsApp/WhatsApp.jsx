import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import "./WhatsApp.css";

const WhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "919876543210";

  const defaultMessage =
    "Hi Oak & Ivory, I'd like to book a dental appointment.";

  const openWhatsApp = (customMessage = defaultMessage) => {
    const encodedMessage =
      encodeURIComponent(customMessage);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSend = (e) => {
    e.preventDefault();

    const finalMessage =
      message.trim() || defaultMessage;

    openWhatsApp(finalMessage);

    setMessage("");
  };

  return (
    <>
      {/* =====================================
          FLOATING BUTTON
      ===================================== */}

      <motion.button
        type="button"
        className={`whatsapp-float ${
          isOpen ? "whatsapp-float-open" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          isOpen
            ? "Close WhatsApp"
            : "Open WhatsApp"
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        {isOpen ? (
          <X size={21} />
        ) : (
          <MessageCircle size={22} />
        )}

        {!isOpen && (
          <span className="whatsapp-ping" />
        )}
      </motion.button>


      {/* =====================================
          WHATSAPP PANEL
      ===================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="whatsapp-panel"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.94,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* HEADER */}

            <div className="whatsapp-header">

              <div className="whatsapp-profile">

                <div className="whatsapp-avatar">
                  <MessageCircle size={17} />
                </div>

                <div>
                  <strong>
                    Oak & Ivory
                  </strong>

                  <span>
                    <i />
                    Typically replies quickly
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="whatsapp-close"
                onClick={() =>
                  setIsOpen(false)
                }
                aria-label="Close WhatsApp"
              >
                <X size={14} />
              </button>

            </div>


            {/* MESSAGE */}

            <div className="whatsapp-body">

              <span className="whatsapp-time">
                TODAY
              </span>

              <div className="whatsapp-message">
                <p>
                  Hi there 👋
                  <br />
                  How can we help with your
                  dental care today?
                </p>

                <small>
                  Now
                </small>
              </div>


              {/* QUICK ACTIONS */}

              <div className="whatsapp-actions">

                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      "Hi Oak & Ivory, I'd like to book an appointment."
                    )
                  }
                >
                  Book an appointment
                  <ArrowUpRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      "Hi Oak & Ivory, I'd like to know more about your dental services."
                    )
                  }
                >
                  Ask about treatments
                  <ArrowUpRight size={13} />
                </button>

              </div>

            </div>


            {/* INPUT */}

            <form
              className="whatsapp-input"
              onSubmit={handleSend}
            >

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Write a message..."
              />

              <button
                type="submit"
                aria-label="Send WhatsApp message"
              >
                <Send size={14} />
              </button>

            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsApp;