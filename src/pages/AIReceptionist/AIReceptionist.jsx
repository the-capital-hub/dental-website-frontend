import { useEffect, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Minus,
  Phone,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import "./AIReceptionist.css";

const AI_API =
  "https://dental-website-backend.onrender.com/api/ai/chat";

const APPOINTMENT_API =
  "https://dental-website-backend.onrender.com/api/appointments";

const IVY_CONVERSATION_API =
  "https://dental-website-backend.onrender.com/api/ivy-conversations";

const SERVICES = [
  "Dental Check-up",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Consultation",
];

const TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const firstMessage = {
  id: 1,
  role: "assistant",
  text:
    "Hello! I'm Ivy, your personal dental concierge. How may I assist you today?",
};

const AIReceptionist = () => {
  const [open, setOpen] = useState(false);

  const [minimized, setMinimized] =
    useState(false);

  const [messages, setMessages] =
    useState([firstMessage]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [bookingMode, setBookingMode] =
    useState(false);

  const [step, setStep] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
    });

  const [bookingSuccess, setBookingSuccess] =
    useState(false);

  const bottomRef =
    useRef(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    if (!minimized) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [
    messages,
    loading,
    minimized,
  ]);

  // =====================================================
  // ADD MESSAGE
  // =====================================================

  const addMessage = (
    role,
    text
  ) => {
    setMessages((previous) => [
      ...previous,
      {
        id:
          Date.now() +
          Math.random(),

        role,

        text,
      },
    ]);
  };

  // =====================================================
  // START BOOKING
  // =====================================================

  const startBooking = () => {
    setBookingMode(true);

    setBookingSuccess(false);

    setForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
    });

    setStep("name");

    addMessage(
      "user",
      "I'd like to book an appointment."
    );

    setTimeout(() => {
      addMessage(
        "assistant",
        "Of course. Let's get your visit scheduled. May I have your full name?"
      );
    }, 350);
  };

  // =====================================================
  // ASK NEXT QUESTION
  // =====================================================

  const askNext = (
    nextStep
  ) => {
    setStep(nextStep);

    const questions = {
      phone:
        "Thank you. What's the best phone number to reach you?",

      email:
        "Great. And what is your email address?",

      date:
        "Wonderful. Please choose your preferred appointment date.",

      time:
        "Perfect. Now choose a convenient time.",

      service:
        "Almost there. Which dental service would you like?",
    };

    setTimeout(() => {
      addMessage(
        "assistant",
        questions[nextStep]
      );
    }, 300);
  };

  // =====================================================
  // TEXT ANSWER
  // =====================================================

  const handleTextAnswer = (
    value
  ) => {
    if (!value.trim()) {
      return;
    }

    if (step === "name") {
      setForm((previous) => ({
        ...previous,
        name: value,
      }));

      addMessage(
        "user",
        value
      );

      askNext("phone");

      return;
    }

    if (step === "phone") {
      setForm((previous) => ({
        ...previous,
        phone: value,
      }));

      addMessage(
        "user",
        value
      );

      askNext("email");

      return;
    }

    if (step === "email") {
      setForm((previous) => ({
        ...previous,
        email:
          value.toLowerCase() ===
          "skip"
            ? ""
            : value,
      }));

      addMessage(
        "user",
        value
      );

      askNext("date");
    }
  };

  // =====================================================
  // SELECT DATE
  // =====================================================

  const selectDate = (
    event
  ) => {
    const value =
      event.target.value;

    if (!value) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      date: value,
    }));

    addMessage(
      "user",
      value
    );

    askNext("time");
  };

  // =====================================================
  // SELECT TIME
  // =====================================================

  const selectTime = (
    time
  ) => {
    setForm((previous) => ({
      ...previous,
      time,
    }));

    addMessage(
      "user",
      time
    );

    askNext("service");
  };

  // =====================================================
  // SELECT SERVICE
  // =====================================================

  const selectService = (
    service
  ) => {
    const updated = {
      ...form,
      service,
    };

    setForm(updated);

    addMessage(
      "user",
      service
    );

    setStep("confirm");

    setTimeout(() => {
      addMessage(
        "assistant",
        `Everything looks good, ${updated.name}. Please review your appointment details below and confirm your request.`
      );
    }, 350);
  };

  // =====================================================
  // SAVE IVY CONVERSATION
  // =====================================================

  const saveIvyConversation = async ({
    appointmentId = null,
    finalMessages = [],
  }) => {
    try {
      const response =
        await fetch(
          IVY_CONVERSATION_API,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              patientName:
                form.name,

              phone:
                form.phone,

              email:
                form.email,

              intent:
                "Book Appointment",

              status:
                "Appointment Booked",

              messages:
                finalMessages.map(
                  (message) => ({
                    role:
                      message.role,

                    text:
                      message.text,
                  })
                ),

              appointment:
                appointmentId,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save Ivy conversation"
        );
      }

      console.log(
        "Ivy conversation saved:",
        result
      );

      return result;
    } catch (error) {
      console.error(
        "Ivy Conversation Save Error:",
        error
      );

      // Conversation save fail hone par
      // appointment ko fail nahi karenge.

      return null;
    }
  };

  // =====================================================
  // CONFIRM APPOINTMENT
  // =====================================================

  const confirmAppointment =
    async () => {
      try {
        setLoading(true);

        // =================================================
        // 1. CREATE APPOINTMENT
        // =================================================

        const response =
          await fetch(
            APPOINTMENT_API,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                patientName:
                  form.name,

                phone:
                  form.phone,

                email:
                  form.email,

                appointmentDate:
                  form.date,

                appointmentTime:
                  form.time,

                service:
                  form.service,

                message:
                  "Appointment booked through Ivy AI Receptionist.",

                status:
                  "Pending",
              }),
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Appointment booking failed"
          );
        }

        // =================================================
        // 2. GET APPOINTMENT ID
        // =================================================

        const appointmentId =
          result.data?._id ||
          result.data?.id ||
          null;

        // =================================================
        // 3. CREATE SUCCESS MESSAGE
        // =================================================

        const successMessage = {
          id:
            Date.now() +
            Math.random(),

          role: "assistant",

          text:
            `You're all set, ${form.name}. Your appointment request has been submitted successfully.`,
        };

        // =================================================
        // 4. BUILD FINAL CONVERSATION
        // =================================================

        const finalMessages = [
          ...messages,
          successMessage,
        ];

        // =================================================
        // 5. UPDATE CHAT UI
        // =================================================

        setMessages(
          finalMessages
        );

        // =================================================
        // 6. SAVE CONVERSATION
        // =================================================

        await saveIvyConversation({
          appointmentId,
          finalMessages,
        });

        // =================================================
        // 7. SHOW SUCCESS
        // =================================================

        setBookingSuccess(
          true
        );

        setStep("success");

      } catch (error) {
        console.error(
          "Appointment booking error:",
          error
        );

        addMessage(
          "assistant",
          "I'm sorry, I couldn't complete your appointment request right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // NORMAL AI MESSAGE
  // =====================================================

  const sendNormalMessage =
    async () => {
      const text =
        input.trim();

      if (!text || loading) {
        return;
      }

      setInput("");

      addMessage(
        "user",
        text
      );

      try {
        setLoading(true);

        const response =
          await fetch(
            AI_API,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                message: text,

                history:
                  messages
                    .slice(-10)
                    .map(
                      (item) => ({
                        role:
                          item.role,

                        content:
                          item.text,
                      })
                    ),
              }),
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "AI request failed"
          );
        }

        addMessage(
          "assistant",
          result.data?.reply ||
            "I'm sorry, I couldn't process that."
        );

      } catch (error) {
        console.error(
          "Ivy AI Error:",
          error
        );

        addMessage(
          "assistant",
          "I'm having trouble connecting right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // SEND
  // =====================================================

  const handleSend = () => {
    if (
      bookingMode &&
      (
        step === "name" ||
        step === "phone" ||
        step === "email"
      )
    ) {
      const value =
        input.trim();

      if (!value) {
        return;
      }

      setInput("");

      handleTextAnswer(
        value
      );

      return;
    }

    sendNormalMessage();
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetConversation =
    () => {
      setMessages([
        firstMessage,
      ]);

      setInput("");

      setBookingMode(false);

      setBookingSuccess(false);

      setStep(null);

      setForm({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        service: "",
      });
    };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "";
    }

    const formatted =
      new Date(
        `${date}T00:00:00`
      );

    return formatted.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LAUNCHER
  // =====================================================

  if (!open) {
    return (
      <button
        className="ivy-launcher"
        onClick={() =>
          setOpen(true)
        }
        aria-label="Open Ivy"
      >
        <div className="ivy-launcher-inner">
          <Sparkles size={21} />
        </div>

        <span className="ivy-launcher-dot" />

        <span className="ivy-launcher-label">
          Ask Ivy
        </span>
      </button>
    );
  }

  // =====================================================
  // MAIN WIDGET
  // =====================================================

  return (
    <div
      className={`ivy-widget ${
        minimized
          ? "ivy-widget-minimized"
          : ""
      }`}
    >

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="ivy-topbar">

        <div className="ivy-brand">

          <div className="ivy-logo">
            <Bot size={20} />
            <span />
          </div>

          <div>

            <div className="ivy-brand-name">
              Ivy
              <Sparkles size={11} />
            </div>

            <div className="ivy-brand-status">
              <span />
              AI Dental Concierge
            </div>

          </div>

        </div>


        <div className="ivy-controls">

          <button
            type="button"
            onClick={() =>
              setMinimized(
                (previous) =>
                  !previous
              )
            }
            aria-label="Minimize Ivy"
          >
            <Minus size={17} />
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setMinimized(false);
            }}
            aria-label="Close Ivy"
          >
            <X size={17} />
          </button>

        </div>

      </div>


      {!minimized && (
        <>

          {/* =================================================
              INTRO
          ================================================= */}

          <div className="ivy-intro">

            <div className="ivy-intro-icon">
              <Sparkles size={16} />
            </div>

            <div>

              <strong>
                Your care, made simple.
              </strong>

              <p>
                I can help with
                appointments and
                general dental
                enquiries.
              </p>

            </div>

          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="ivy-content">

            <div className="ivy-messages">

              {messages.map(
                (message) => (

                  <div
                    key={
                      message.id
                    }
                    className={`ivy-message-row ${
                      message.role ===
                      "user"
                        ? "ivy-user-row"
                        : "ivy-ai-row"
                    }`}
                  >

                    {message.role ===
                      "assistant" && (
                      <div className="ivy-message-avatar">
                        <Bot size={12} />
                      </div>
                    )}

                    <div
                      className={`ivy-message-bubble ${
                        message.role ===
                        "user"
                          ? "ivy-user-message"
                          : "ivy-ai-message"
                      }`}
                    >
                      {message.text}
                    </div>

                  </div>

                )
              )}


              {loading && (
                <div className="ivy-message-row ivy-ai-row">

                  <div className="ivy-message-avatar">
                    <Bot size={12} />
                  </div>

                  <div className="ivy-typing">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>
              )}


              <div
                ref={
                  bottomRef
                }
              />

            </div>


            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            {!bookingMode &&
              messages.length ===
                1 && (

              <div className="ivy-quick-actions">

                <button
                  type="button"
                  onClick={
                    startBooking
                  }
                >

                  <CalendarDays
                    size={16}
                  />

                  <div>

                    <strong>
                      Book an appointment
                    </strong>

                    <span>
                      Schedule your visit
                    </span>

                  </div>

                  <ChevronRight
                    size={15}
                  />

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setInput(
                      "What dental services do you offer?"
                    )
                  }
                >

                  <Sparkles
                    size={16}
                  />

                  <div>

                    <strong>
                      Explore services
                    </strong>

                    <span>
                      Discover our care
                    </span>

                  </div>

                  <ChevronRight
                    size={15}
                  />

                </button>

              </div>
            )}


            {/* =================================================
                DATE
            ================================================= */}

            {bookingMode &&
              step === "date" && (

              <div className="ivy-selection-card">

                <div className="ivy-selection-title">

                  <CalendarDays
                    size={15}
                  />

                  <span>
                    Choose a date
                  </span>

                </div>

                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={
                    selectDate
                  }
                />

              </div>
            )}


            {/* =================================================
                TIME
            ================================================= */}

            {bookingMode &&
              step === "time" && (

              <div className="ivy-selection-card">

                <div className="ivy-selection-title">

                  <Clock3
                    size={15}
                  />

                  <span>
                    Choose a time
                  </span>

                </div>

                <div className="ivy-time-grid">

                  {TIMES.map(
                    (time) => (

                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          selectTime(
                            time
                          )
                        }
                      >
                        {time}
                      </button>

                    )
                  )}

                </div>

              </div>
            )}


            {/* =================================================
                SERVICE
            ================================================= */}

            {bookingMode &&
              step ===
                "service" && (

              <div className="ivy-selection-card">

                <div className="ivy-selection-title">

                  <Sparkles
                    size={15}
                  />

                  <span>
                    Choose a service
                  </span>

                </div>

                <div className="ivy-service-list">

                  {SERVICES.map(
                    (service) => (

                      <button
                        key={
                          service
                        }
                        type="button"
                        onClick={() =>
                          selectService(
                            service
                          )
                        }
                      >

                        <span>
                          {
                            service
                          }
                        </span>

                        <ChevronRight
                          size={14}
                        />

                      </button>

                    )
                  )}

                </div>

              </div>
            )}


            {/* =================================================
                CONFIRMATION
            ================================================= */}

            {step ===
              "confirm" && (

              <div className="ivy-confirm-card">

                <div className="ivy-confirm-header">

                  <div>

                    <strong>
                      Appointment summary
                    </strong>

                    <span>
                      Please review
                    </span>

                  </div>

                  <Check
                    size={18}
                  />

                </div>


                <div className="ivy-summary">

                  <div>
                    <UserRound
                      size={13}
                    />

                    <span>
                      {form.name}
                    </span>
                  </div>


                  <div>
                    <Phone
                      size={13}
                    />

                    <span>
                      {form.phone}
                    </span>
                  </div>


                  {form.email && (
                    <div>

                      <Mail
                        size={13}
                      />

                      <span>
                        {form.email}
                      </span>

                    </div>
                  )}


                  <div>

                    <CalendarDays
                      size={13}
                    />

                    <span>
                      {formatDate(
                        form.date
                      )}
                    </span>

                  </div>


                  <div>

                    <Clock3
                      size={13}
                    />

                    <span>
                      {form.time}
                    </span>

                  </div>


                  <div>

                    <Sparkles
                      size={13}
                    />

                    <span>
                      {form.service}
                    </span>

                  </div>

                </div>


                <button
                  type="button"
                  className="ivy-confirm"
                  onClick={
                    confirmAppointment
                  }
                  disabled={
                    loading
                  }
                >

                  <Check
                    size={15}
                  />

                  {loading
                    ? "Submitting..."
                    : "Confirm appointment"}

                </button>

              </div>
            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {bookingSuccess &&
              step ===
                "success" && (

              <div className="ivy-success-card">

                <div className="ivy-success-icon">
                  <Check size={20} />
                </div>

                <strong>
                  You're all set!
                </strong>

                <p>
                  Your appointment
                  request has been
                  submitted
                  successfully.
                </p>

                <button
                  type="button"
                  onClick={
                    resetConversation
                  }
                >
                  Start new conversation
                </button>

              </div>
            )}

          </div>


          {/* =================================================
              COMPOSER
          ================================================= */}

          {step !== "success" && (

            <div className="ivy-composer">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder={
                  bookingMode
                    ? "Type your answer..."
                    : "Message Ivy..."
                }
                rows={1}
                disabled={
                  loading
                }
              />

              <button
                type="button"
                onClick={
                  handleSend
                }
                disabled={
                  !input.trim() ||
                  loading
                }
                aria-label="Send"
              >
                <Send size={15} />
              </button>

            </div>
          )}


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="ivy-footer">

            <span>
              <Sparkles size={9} />
              Oak & Ivory Dental Clinic
            </span>

            {bookingMode &&
              step !== "success" && (

              <button
                type="button"
                onClick={
                  resetConversation
                }
              >
                Start over
              </button>

            )}

          </div>

        </>
      )}


      {/* =================================================
          MINIMIZED
      ================================================= */}

      {minimized && (

        <button
          className="ivy-minimized-bar"
          onClick={() =>
            setMinimized(false)
          }
        >

          <div>
            <Bot size={15} />
          </div>

          <span>
            Continue with Ivy
          </span>

          <ChevronRight
            size={15}
          />

        </button>
      )}

    </div>
  );
};

export default AIReceptionist;