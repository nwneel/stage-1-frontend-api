import "./ProductPage.css";
import { useEffect, useState } from "react";
import StoreLogo from "../StoreLogo/StoreLogo";
import shoppingCart from "../../assets/Shopping cart.png";
import leftArrowImage from "../../assets/left arrow.png";
import rightArrowImage from "../../assets/right arrow.png";

function getReviewsStorageKey(productId) {
  return `product-reviews:${productId}`;
}

function ProductPage({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(getReviewsStorageKey(product._id));
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to load reviews:", err);
      return [];
    }
  });
  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(getReviewsStorageKey(product._id));
      setReviews(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setReviews([]);
    }
  }, [product._id]);

  useEffect(() => {
    try {
      localStorage.setItem(
        getReviewsStorageKey(product._id),
        JSON.stringify(reviews),
      );
    } catch (err) {
      console.error("Failed to save reviews:", err);
    }
  }, [product._id, reviews]);

  function handleAddToCart() {
    onAddToCart(product, quantity > 0 ? quantity : 1);
  }

  function handleReviewSubmit(event) {
    event.preventDefault();

    if (selectedRating === 0) {
      setReviewError("Please select a rating.");
      return;
    }

    setReviews((prevReviews) => [
      ...prevReviews,
      {
        id: Date.now(),
        rating: selectedRating,
        comment: reviewComment,
        name: reviewName,
        title: reviewTitle,
      },
    ]);
    setSelectedRating(0);
    setReviewComment("");
    setReviewName("");
    setReviewTitle("");
    setReviewError("");
    setIsReviewOpen(false);
  }

  return (
    <main className="product-page">
      <StoreLogo />
      <article className="product-page__details">
        <div className="product-page__gallery">
          <img
            alt={product.name}
            className="product-page__image"
            src={selectedImage}
          />
          {productImages.length > 1 && (
            <div className="product-page__thumbnails">
              {productImages.map((image, index) => (
                <button
                  aria-label={`View ${product.name} image ${index + 1}`}
                  aria-pressed={image === selectedImage}
                  className={`product-page__thumbnail${
                    image === selectedImage
                      ? " product-page__thumbnail--selected"
                      : ""
                  }`}
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  type="button"
                >
                  <img alt="" src={image} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-page__information">
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__price">${product.price.toFixed(2)}</p>
          <div className="product-page__cart-controls">
            <label htmlFor="product-quantity">Quantity</label>
            <input
              id="product-quantity"
              min="1"
              onChange={(event) => setQuantity(Number(event.target.value))}
              type="number"
              value={quantity}
            />
            <button
              className="product-page__add-to-cart"
              onClick={handleAddToCart}
              type="button"
            >
              {/* Makes shopping cart image visible */}
              <img
                className="product-page__shopping-cart"
                alt="Add to cart"
                src={shoppingCart}
              />
            </button>
          </div>
          <h2 className="product-page__description-title">Description</h2>
          {product.description && (
            <p className="product-page__description">{product.description}</p>
          )}
        </div>
      </article>

      <section className="product-page__review-section">
        <h2 className="product-page__review">Reviews</h2>
        <button
          className="product-page__add-review-btn"
          onClick={() => setIsReviewOpen(true)}
          type="button"
        >
          Write a Review
        </button>
        {isReviewOpen && (
          <form
            className="product-page__review-form"
            onSubmit={handleReviewSubmit}
          >
            <div className="product-page__review-rating">
              <label htmlFor="review-rating">Rating</label>
              <div
                aria-label="Rating"
                className="product-page__review-stars"
                id="review-rating"
                role="radiogroup"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hoveredRating || selectedRating);

                  return (
                    <button
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      aria-pressed={isActive}
                      className={`product-page__review-star${
                        isActive ? " product-page__review-star--selected" : ""
                      }`}
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      type="button"
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>
            <label htmlFor="review-comment">Your Name</label>
            <textarea
              id="review-name"
              onChange={(event) => setReviewName(event.target.value)}
              placeholder="Your Name"
              required
              rows="4"
              value={reviewName}
            />
            <label htmlFor="review-comment">Title</label>
            <textarea
              id="review-title"
              onChange={(event) => setReviewTitle(event.target.value)}
              placeholder="Title"
              required
              rows="4"
              value={reviewTitle}
            />
            <label htmlFor="review-comment">Review</label>
            <textarea
              id="review-comment"
              onChange={(event) => setReviewComment(event.target.value)}
              placeholder="Write your review"
              required
              rows="4"
              value={reviewComment}
            />
            {reviewError && (
              <p className="product-page__review-error">{reviewError}</p>
            )}
            <div className="product-page__review-actions">
              <button type="submit">Submit Review</button>
              <button
                onClick={() => {
                  setIsReviewOpen(false);
                  setSelectedRating(0);
                  setReviewComment("");
                  setReviewName("");
                  setReviewTitle("");
                  setReviewError("");
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {reviews.length > 0 && (
          <ul className="product-page__review-list">
            {reviews.map((review) => (
              <li className="product-page__review-item" key={review.id}>
                <span className="product-page__review-item-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                {review.name && (
                  <p className="product-page__review-item-name">
                    {review.name}
                  </p>
                )}
                {review.title && (
                  <p className="product-page__review-item-title">
                    {review.title}
                  </p>
                )}
                <p className="product-page__review-item-comment">
                  {review.comment}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default ProductPage;
