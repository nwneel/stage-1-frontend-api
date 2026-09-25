import { useState } from "react";
import StoreLogo from "../StoreLogo/StoreLogo";
import { defaultProductItems, defaultNewArrivals } from "../../utils/constants";
import "./Main.css";
import "../ItemCard/ItemCard.css";
import leftArrowImage from "../../assets/left arrow.png";
import rightArrowImage from "../../assets/right arrow.png";
import shoppingCart from "../../assets/Shopping cart.png";

function Main({ onAddToCart, onProductSelect }) {
  // Lines 8-14 helps make the images change when clicked
  const [imageIndex, setImageIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("default");
  const [displayCount, setDisplayCount] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  function handleImageClick() {
    setImageIndex(
      (currentIndex) => (currentIndex + 1) % defaultProductItems.length,
    );
  }

  function handlePreviousImageClick() {
    setImageIndex(
      (currentIndex) =>
        (currentIndex - 1 + defaultProductItems.length) %
        defaultProductItems.length,
    );
  }

  function handleAddToCart(event, item) {
    const quantityInput = event.currentTarget.parentElement.querySelector(
      ".item-card__quantity",
    );
    const quantity = Number(quantityInput.value);

    onAddToCart(item, quantity > 0 ? quantity : 1);
  }

  const sortedNewArrivals = [...defaultNewArrivals].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortOrder === "price-desc") {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  const itemsPerPage =
    displayCount === "all" ? sortedNewArrivals.length : Number(displayCount);
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(sortedNewArrivals.length / itemsPerPage) : 1;
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const displayedNewArrivals =
    displayCount === "all"
      ? sortedNewArrivals
      : sortedNewArrivals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main>
      <StoreLogo />
      <section className="store-logo__name">
        <p className="store-logo__text">
          Nate's Books, Games, Toys, and Hobby Store
        </p>
      </section>
      <section className="store-logo__image-section">
        {/* Help the images change when clicked which is called on lines 8-14 */}
        <div className="store-logo__image-container">
          <button
            aria-label="Previous product image"
            className="store-logo__image-arrow store-logo__image-arrow_left"
            onClick={handlePreviousImageClick}
            type="button"
          >
            <img alt="" src={leftArrowImage} />
          </button>
          <img
            alt={defaultProductItems[imageIndex].name}
            className="store-logo__product-image"
            onClick={handleImageClick}
            src={defaultProductItems[imageIndex].image}
          />
          <button
            aria-label="Next product image"
            className="store-logo__image-arrow store-logo__image-arrow_right"
            onClick={handleImageClick}
            type="button"
          >
            <img alt="" src={rightArrowImage} />
          </button>
        </div>
      </section>
      <section className="item-card__new-arrivals-header">
        <h2 className="item-card__new-arrivals">New Arrivals</h2>
      </section>
      <section className="item-card__new-arrivals-products">
        <ul className="item-card__new-arrivals-cards">
          {displayedNewArrivals.map((item) => (
            <li
              className="item-card__new-arrival"
              key={item._id}
              onClick={() => onProductSelect(item)}
            >
              <button
                aria-label={`View ${item.name}`}
                className="item-card__product-link"
                onClick={(event) => {
                  event.stopPropagation();
                  onProductSelect(item);
                }}
                type="button"
              >
                <img
                  alt={item.name}
                  className="item-card__new-arrival-image"
                  src={item.image}
                />
              </button>
              <h2 className="item-card__name">{item.name}</h2>
              <p className="item-card__price">${item.price.toFixed(2)}</p>
              <div
                className="item-card__cart-controls"
                onClick={(event) => event.stopPropagation()}
              >
                <label
                  className="item-card__quantity-label"
                  htmlFor={`quantity-${item._id}`}
                >
                  Quantity
                </label>
                <input
                  className="item-card__quantity"
                  defaultValue="1"
                  id={`quantity-${item._id}`}
                  min="1"
                  type="number"
                />
                <button
                  className="item-card__add-to-cart"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart(event, item);
                  }}
                  type="button"
                >
                  <img
                    className="item-card__shopping-cart-button"
                    alt="Add to cart"
                    src={shoppingCart}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="product-list-page__pagination">
            <button
              type="button"
              className="product-list-page__pagination-btn"
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              ←
            </button>
            <div className="product-list-page__pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`product-list-page__page-num ${
                      pageNum === validCurrentPage
                        ? "product-list-page__page-num_active"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ),
              )}
            </div>
            <button
              type="button"
              className="product-list-page__pagination-btn"
              disabled={validCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;
