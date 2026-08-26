import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  MessageSquareQuote,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Reviews.css";

const initialReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    treatment: "Dental Implant",
    rating: 5,
    date: "17 Aug 2026",
    status: "Published",
    review:
      "The entire experience was comfortable and professional. The doctors explained everything clearly.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    treatment: "Teeth Whitening",
    rating: 5,
    date: "15 Aug 2026",
    status: "Published",
    review:
      "Beautiful clinic and a very friendly team. Ivy also made booking my appointment really easy.",
  },
  {
    id: 3,
    name: "Neha Gupta",
    treatment: "Root Canal",
    rating: 4,
    date: "13 Aug 2026",
    status: "Pending",
    review:
      "Very smooth treatment and the staff was supportive throughout the process.",
  },
  {
    id: 4,
    name: "Amit Kumar",
    treatment: "Dental Cleaning",
    rating: 5,
    date: "11 Aug 2026",
    status: "Published",
    review:
      "One of the best dental experiences I have had. Highly recommended.",
  },
  {
    id: 5,
    name: "Riya Singh",
    treatment: "Dental Checkup",
    rating: 4,
    date: "09 Aug 2026",
    status: "Pending",
    review:
      "The appointment was on time and the doctor was very attentive.",
  },
  {
    id: 6,
    name: "Karan Mehta",
    treatment: "Dental Implant",
    rating: 5,
    date: "06 Aug 2026",
    status: "Published",
    review:
      "Excellent service and very modern approach to dental care.",
  },
];

const Reviews = () => {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    treatment: "",
    rating: "5",
    review: "",
  });

  const filteredReviews = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    return reviews.filter((item) => {
      const matchesSearch =
        !value ||
        item.name
          .toLowerCase()
          .includes(value) ||
        item.treatment
          .toLowerCase()
          .includes(value) ||
        item.review
          .toLowerCase()
          .includes(value);

      const matchesFilter =
        filter === "All" ||
        item.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [reviews, search, filter]);

  const publishedCount =
    reviews.filter(
      (item) =>
        item.status === "Published"
    ).length;

  const pendingCount =
    reviews.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const averageRating =
    reviews.length === 0
      ? "0.0"
      : (
          reviews.reduce(
            (total, item) =>
              total + item.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddReview = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.treatment ||
      !formData.review
    ) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: formData.name,
      treatment:
        formData.treatment,
      rating: Number(
        formData.rating
      ),
      date: "17 Aug 2026",
      status: "Pending",
      review: formData.review,
    };

    setReviews((previous) => [
      newReview,
      ...previous,
    ]);

    setFormData({
      name: "",
      treatment: "",
      rating: "5",
      review: "",
    });

    setShowForm(false);
  };

  const updateStatus = (
    id,
    status
  ) => {
    setReviews((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    setSelectedReview(null);
  };

  const deleteReview = (id) => {
    setReviews((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    setSelectedReview(null);
  };

  const renderStars = (rating) => {
    return (
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <Star
              key={star}
              size={12}
              fill={
                star <= rating
                  ? "currentColor"
                  : "none"
                }
              />
          )
        )}
      </div>
    );
  };

  return (
    <AdminLayout
      title="Reviews"
      subtitle="Manage patient feedback and testimonials."
      activePage="Reviews"
    >
      <div className="reviews-page">

        {/* HEADER */}

        <section className="reviews-page-header">

          <div>
            <span className="reviews-eyebrow">
              PATIENT FEEDBACK
            </span>

            <h2>
              Reviews
            </h2>

            <p>
              Review, approve and manage
              patient testimonials.
            </p>
          </div>

          <button
            type="button"
            className="reviews-add-button"
            onClick={() =>
              setShowForm(true)
            }
          >
            <Plus size={16} />
            Add Review
          </button>

        </section>


        {/* SUMMARY */}

        <section className="reviews-summary">

          <div className="reviews-summary-card">

            <div className="reviews-summary-icon">
              <MessageSquareQuote
                size={17}
              />
            </div>

            <div>
              <span>
                Total Reviews
              </span>

              <strong>
                {reviews.length}
              </strong>
            </div>

          </div>


          <div className="reviews-summary-card">

            <div className="reviews-summary-icon">
              <Star size={17} />
            </div>

            <div>
              <span>
                Average Rating
              </span>

              <strong>
                {averageRating}
              </strong>
            </div>

          </div>


          <div className="reviews-summary-card">

            <div className="reviews-summary-icon">
              <Check size={17} />
            </div>

            <div>
              <span>
                Published
              </span>

              <strong>
                {publishedCount}
              </strong>
            </div>

          </div>


          <div className="reviews-summary-card">

            <div className="reviews-summary-icon">
              <MessageSquareQuote
                size={17}
              />
            </div>

            <div>
              <span>
                Pending
              </span>

              <strong>
                {pendingCount}
              </strong>
            </div>

          </div>

        </section>


        {/* TOOLBAR */}

        <section className="reviews-toolbar">

          <div className="reviews-search">

            <Search size={16} />

            <input
              type="search"
              placeholder="Search reviews..."
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
              >
                <X size={14} />
              </button>
            )}

          </div>


          <div className="reviews-filter">

            {[
              "All",
              "Published",
              "Pending",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  filter === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </section>


        {/* REVIEWS GRID */}

        <section className="reviews-grid">

          {filteredReviews.map(
            (item) => (

              <article
                className="review-card"
                key={item.id}
              >

                <div className="review-card-header">

                  <div className="review-user">

                    <div className="review-avatar">
                      {item.name.charAt(0)}
                    </div>

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        {item.date}
                      </span>

                    </div>

                  </div>


                  <span
                    className={`review-status review-status-${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>

                </div>


                <div className="review-rating-row">

                  {renderStars(
                    item.rating
                  )}

                  <span>
                    {item.treatment}
                  </span>

                </div>


                <p className="review-text">
                  “{item.review}”
                </p>


                <div className="review-card-footer">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedReview(
                        item
                      )
                    }
                  >
                    View review

                    <ArrowUpRight
                      size={13}
                    />
                  </button>

                </div>

              </article>

            )
          )}

        </section>


        {filteredReviews.length ===
          0 && (

          <div className="reviews-empty">

            <MessageSquareQuote
              size={25}
            />

            <h3>
              No reviews found
            </h3>

            <p>
              Try changing your search
              or filter.
            </p>

          </div>

        )}


        {/* REVIEW MODAL */}

        {selectedReview && (

          <div
            className="review-modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedReview(null);
              }
            }}
          >

            <div className="review-modal">

              <div className="review-modal-header">

                <div>
                  <span>
                    PATIENT REVIEW
                  </span>

                  <h3>
                    Review details
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedReview(
                      null
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <div className="review-modal-user">

                <div className="review-modal-avatar">
                  {selectedReview.name.charAt(
                    0
                  )}
                </div>

                <div>
                  <h4>
                    {selectedReview.name}
                  </h4>

                  <p>
                    {selectedReview.treatment}
                  </p>
                </div>

              </div>


              <div className="review-modal-rating">

                {renderStars(
                  selectedReview.rating
                )}

                <strong>
                  {selectedReview.rating}/5
                </strong>

              </div>


              <div className="review-full-text">
                “{selectedReview.review}”
              </div>


              <div className="review-modal-actions">

                {selectedReview.status ===
                  "Pending" && (
                  <button
                    type="button"
                    className="review-approve"
                    onClick={() =>
                      updateStatus(
                        selectedReview.id,
                        "Published"
                      )
                    }
                  >
                    <Check size={14} />
                    Approve & Publish
                  </button>
                )}

                {selectedReview.status ===
                  "Published" && (
                  <button
                    type="button"
                    className="review-pending"
                    onClick={() =>
                      updateStatus(
                        selectedReview.id,
                        "Pending"
                      )
                    }
                  >
                    Move to Pending
                  </button>
                )}

                <button
                  type="button"
                  className="review-delete"
                  onClick={() =>
                    deleteReview(
                      selectedReview.id
                    )
                  }
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}


        {/* ADD REVIEW MODAL */}

        {showForm && (

          <div
            className="review-modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowForm(false);
              }
            }}
          >

            <div className="review-modal">

              <div className="review-modal-header">

                <div>
                  <span>
                    PATIENT FEEDBACK
                  </span>

                  <h3>
                    Add review
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  <X size={18} />
                </button>

              </div>


              <form
                className="review-form"
                onSubmit={
                  handleAddReview
                }
              >

                <div className="review-form-field">

                  <label>
                    Patient name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="review-form-field">

                  <label>
                    Treatment
                  </label>

                  <input
                    type="text"
                    name="treatment"
                    placeholder="Dental Implant"
                    value={
                      formData.treatment
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="review-form-field">

                  <label>
                    Rating
                  </label>

                  <select
                    name="rating"
                    value={
                      formData.rating
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option value="5">
                      5 Stars
                    </option>

                    <option value="4">
                      4 Stars
                    </option>

                    <option value="3">
                      3 Stars
                    </option>

                    <option value="2">
                      2 Stars
                    </option>

                    <option value="1">
                      1 Star
                    </option>
                  </select>

                </div>


                <div className="review-form-field">

                  <label>
                    Review
                  </label>

                  <textarea
                    name="review"
                    rows="5"
                    placeholder="Write patient review..."
                    value={
                      formData.review
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="review-form-actions">

                  <button
                    type="button"
                    className="review-form-cancel"
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="review-form-submit"
                  >
                    Add Review
                    <Plus size={14} />
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default Reviews;