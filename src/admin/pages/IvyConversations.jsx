import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/IvyConversations.css";

const API_URL =
  "https://dental-website-backend.onrender.com/api/ivy-conversations";

const IvyConversations = () => {
  const [conversations, setConversations] =
    useState([]);

  const [isOnline, setIsOnline] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH REAL IVY CONVERSATIONS
  // =====================================================

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(API_URL);

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch Ivy conversations"
        );
      }

      const formatted =
        (result.data || []).map(
          (conversation) => {
            const name =
              conversation.patientName ||
              "Guest";

            const initials =
              name
                .split(" ")
                .filter(Boolean)
                .map(
                  (part) =>
                    part.charAt(0)
                )
                .join("")
                .slice(0, 2)
                .toUpperCase();

            const messages =
              conversation.messages || [];

            const lastMessage =
              messages.length > 0
                ? messages[
                    messages.length - 1
                  ].text
                : "No messages yet";

            return {
              id:
                conversation._id,

              name,

              initials,

              time:
                conversation.createdAt
                  ? new Date(
                      conversation.createdAt
                    ).toLocaleString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "Just now",

              intent:
                conversation.intent ||
                "General Query",

              status:
                conversation.status ||
                "Active",

              messages:
                messages.length,

              lastMessage,

              phone:
                conversation.phone ||
                "",

              email:
                conversation.email ||
                "",

              conversationMessages:
                messages,

              appointment:
                conversation.appointment ||
                null,
            };
          }
        );

      setConversations(formatted);
    } catch (error) {
      console.error(
        "Fetch Ivy Conversations Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load Ivy conversations."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    fetchConversations();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredConversations =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      if (!value) {
        return conversations;
      }

      return conversations.filter(
        (conversation) =>
          conversation.name
            .toLowerCase()
            .includes(value) ||
          conversation.intent
            .toLowerCase()
            .includes(value) ||
          conversation.lastMessage
            .toLowerCase()
            .includes(value)
      );
    },
    [conversations, search]);

  // =====================================================
  // COUNTS
  // =====================================================

  const bookedCount =
    conversations.filter(
      (item) =>
        item.status ===
        "Appointment Booked"
    ).length;

  const resolvedCount =
    conversations.filter(
      (item) =>
        item.status ===
        "Resolved"
    ).length;

  const followUpCount =
    conversations.filter(
      (item) =>
        item.status ===
        "Needs Follow-up"
    ).length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <AdminLayout
      title="Ivy"
      subtitle="AI receptionist and patient conversations."
      activePage="Ivy"
    >
      <div className="ivy-page">

        {/* =========================
            HEADER
        ========================= */}

        <section className="ivy-page-header">

          <div>
            <span className="ivy-eyebrow">
              AI RECEPTIONIST
            </span>

            <div className="ivy-title-row">

              <div className="ivy-title-icon">
                <Bot size={22} />
              </div>

              <div>
                <h2>
                  Ivy
                </h2>

                <p>
                  Your AI receptionist is
                  handling patient conversations.
                </p>
              </div>

            </div>
          </div>

          <button
            type="button"
            className={`ivy-online-button ${
              isOnline
                ? "ivy-online"
                : "ivy-offline"
            }`}
            onClick={() =>
              setIsOnline(
                (previous) =>
                  !previous
              )
            }
          >
            <span />

            {isOnline
              ? "Ivy is Online"
              : "Ivy is Offline"}
          </button>

        </section>


        {/* =========================
            IVY STATUS
        ========================= */}

        <section className="ivy-status-card">

          <div className="ivy-status-content">

            <div className="ivy-bot-orb">

              <div className="ivy-orb-inner">
                <Sparkles size={23} />
              </div>

              <span className="ivy-orb-ring" />

            </div>

            <div>

              <span className="ivy-status-label">
                CURRENT STATUS
              </span>

              <h3>
                {isOnline
                  ? "Ivy is ready to help"
                  : "Ivy is currently offline"}
              </h3>

              <p>
                {isOnline
                  ? "Ivy can answer patient questions, collect lead details and book appointments."
                  : "Turn Ivy back on to resume AI receptionist conversations."}
              </p>

            </div>

          </div>

          <div className="ivy-status-stats">

            <div>
              <strong>
                98%
              </strong>

              <span>
                Response rate
              </span>
            </div>

            <div>
              <strong>
                4.9s
              </strong>

              <span>
                Avg. response
              </span>
            </div>

          </div>

        </section>


        {/* =========================
            SUMMARY
        ========================= */}

        <section className="ivy-summary">

          <div className="ivy-summary-card">

            <div className="ivy-summary-icon">
              <MessageCircle size={16} />
            </div>

            <div>
              <span>
                Conversations
              </span>

              <strong>
                {conversations.length}
              </strong>
            </div>

          </div>


          <div className="ivy-summary-card">

            <div className="ivy-summary-icon">
              <CalendarDays size={16} />
            </div>

            <div>
              <span>
                Appointments
              </span>

              <strong>
                {bookedCount}
              </strong>
            </div>

          </div>


          <div className="ivy-summary-card">

            <div className="ivy-summary-icon">
              <CheckCircle2 size={16} />
            </div>

            <div>
              <span>
                Resolved
              </span>

              <strong>
                {resolvedCount}
              </strong>
            </div>

          </div>


          <div className="ivy-summary-card">

            <div className="ivy-summary-icon">
              <Clock3 size={16} />
            </div>

            <div>
              <span>
                Follow-ups
              </span>

              <strong>
                {followUpCount}
              </strong>
            </div>

          </div>

        </section>


        {/* =========================
            CONVERSATIONS
        ========================= */}

        <section className="ivy-conversations-panel">

          <div className="ivy-panel-header">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h3>
                Conversations
              </h3>

            </div>


            <div className="ivy-search">

              <Search size={15} />

              <input
                type="search"
                placeholder="Search conversations..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}

            </div>

          </div>


          <div className="ivy-conversation-list">

            {/* LOADING */}

            {loading && (
              <div className="ivy-empty">

                <div className="ivy-empty-icon">
                  <Bot size={22} />
                </div>

                <h3>
                  Loading conversations...
                </h3>

                <p>
                  Fetching Ivy's latest conversations.
                </p>

              </div>
            )}


            {/* ERROR */}

            {!loading && error && (
              <div className="ivy-empty">

                <div className="ivy-empty-icon">
                  <X size={22} />
                </div>

                <h3>
                  Unable to load conversations
                </h3>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  onClick={
                    fetchConversations
                  }
                  style={{
                    marginTop: "12px",
                    border: "0",
                    padding:
                      "8px 14px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Try again
                </button>

              </div>
            )}


            {/* REAL DATA */}

            {!loading &&
              !error &&
              filteredConversations.map(
                (conversation) => (

                  <article
                    className="ivy-conversation"
                    key={
                      conversation.id
                    }
                    onClick={() =>
                      setSelectedConversation(
                        conversation
                      )
                    }
                  >

                    <div className="ivy-conversation-avatar">
                      {
                        conversation.initials
                      }
                    </div>


                    <div className="ivy-conversation-main">

                      <div className="ivy-conversation-name-row">

                        <h4>
                          {
                            conversation.name
                          }
                        </h4>

                        <span>
                          {
                            conversation.time
                          }
                        </span>

                      </div>


                      <p>
                        {
                          conversation.lastMessage
                        }
                      </p>


                      <div className="ivy-conversation-meta">

                        <span className="ivy-intent">
                          {
                            conversation.intent
                          }
                        </span>

                        <span
                          className={`ivy-conversation-status ivy-status-${conversation.status
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-"
                            )}`}
                        >
                          {
                            conversation.status
                          }
                        </span>

                      </div>

                    </div>


                    <div className="ivy-conversation-right">

                      <span>
                        {
                          conversation.messages
                        }{" "}
                        messages
                      </span>

                      <ArrowUpRight size={15} />

                    </div>

                  </article>

                )
              )}

          </div>


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredConversations.length ===
              0 && (

              <div className="ivy-empty">

                <div className="ivy-empty-icon">
                  <MessageCircle size={22} />
                </div>

                <h3>
                  No conversations found
                </h3>

                <p>
                  {search
                    ? "Try another search."
                    : "Ivy has no conversations yet."}
                </p>

              </div>
            )}

        </section>


        {/* =========================
            CONVERSATION MODAL
        ========================= */}

        {selectedConversation && (

          <div
            className="ivy-modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedConversation(
                  null
                );
              }

            }}
          >

            <div className="ivy-modal">

              <div className="ivy-modal-header">

                <div>

                  <span>
                    IVY CONVERSATION
                  </span>

                  <h3>
                    Conversation details
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedConversation(
                      null
                    )
                  }
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

              </div>


              {/* PATIENT PROFILE */}

              <div className="ivy-modal-profile">

                <div className="ivy-modal-avatar">
                  {
                    selectedConversation.initials
                  }
                </div>

                <div>

                  <h4>
                    {
                      selectedConversation.name
                    }
                  </h4>

                  <p>
                    {
                      selectedConversation.intent
                    }
                  </p>

                </div>

              </div>


              {/* CONTACT DETAILS */}

              {(selectedConversation.phone ||
                selectedConversation.email) && (

                <div
                  style={{
                    padding:
                      "10px 0",
                    display:
                      "flex",
                    gap: "14px",
                    flexWrap:
                      "wrap",
                    fontSize:
                      "12px",
                    color:
                      "#6f7b76",
                  }}
                >

                  {selectedConversation.phone && (
                    <span>
                      📞{" "}
                      {
                        selectedConversation.phone
                      }
                    </span>
                  )}

                  {selectedConversation.email && (
                    <span>
                      ✉️{" "}
                      {
                        selectedConversation.email
                      }
                    </span>
                  )}

                </div>
              )}


              {/* REAL CHAT */}

              <div className="ivy-message-box">

                {(
                  selectedConversation.conversationMessages ||
                  []
                ).length === 0 ? (

                  <div className="ivy-message ivy-message-ai">

                    <div className="ivy-message-label">
                      Ivy
                    </div>

                    <p>
                      No messages available
                      for this conversation.
                    </p>

                  </div>

                ) : (

                  (
                    selectedConversation.conversationMessages ||
                    []
                  ).map(
                    (
                      message,
                      index
                    ) => (

                      <div
                        key={index}
                        className={`ivy-message ${
                          message.role ===
                          "user"
                            ? "ivy-message-patient"
                            : "ivy-message-ai"
                        }`}
                      >

                        <div className="ivy-message-label">

                          {message.role ===
                          "user"
                            ? "Patient"
                            : "Ivy"}

                        </div>

                        <p>
                          {
                            message.text
                          }
                        </p>

                      </div>

                    )
                  )

                )}

              </div>


              {/* INFO */}

              <div className="ivy-modal-info">

                <div>

                  <span>
                    STATUS
                  </span>

                  <strong>
                    {
                      selectedConversation.status
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    MESSAGES
                  </span>

                  <strong>
                    {
                      selectedConversation.messages
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    LAST ACTIVE
                  </span>

                  <strong>
                    {
                      selectedConversation.time
                    }
                  </strong>

                </div>

              </div>


              {/* FOOTER */}

              <div className="ivy-modal-footer">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedConversation(
                      null
                    )
                  }
                >
                  Close
                </button>

                <a href="/admin/appointments">
                  View appointments
                  <ArrowUpRight size={13} />
                </a>

              </div>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default IvyConversations;