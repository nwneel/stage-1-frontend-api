import "./ProductList.css";
import { useEffect, useState } from "react";
import StoreLogo from "../StoreLogo/StoreLogo";
import "../ItemCard/ItemCard.css";
import shoppingCart from "../../assets/Shopping cart.png";

const franchises = [
  "Batman",
  "Blade Runner",
  "Cyberpunk",
  "Doom",
  "Fallout",
  "Halo",
  "Gears of War",
  "Kill Bill",
  "Legend of Zelda",
  "Lord of the Rings",
  "Marvel",
  "Rambo",
  "Silent Hill",
  "Star Wars",
];

function ProductListItemCard({ item, onProductSelect, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImageIndex, setHoverImageIndex] = useState(0);

  const images =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : [item.image];

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setHoverImageIndex(0);
      return;
    }

    const intervalId = setInterval(() => {
      setHoverImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1200);

    return () => clearInterval(intervalId);
  }, [isHovered, images.length]);

  const currentImage = images[hoverImageIndex] || item.image;

  return (
    <li
      className="item-card__new-arrival"
      key={item._id}
      onClick={() => onProductSelect(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverImageIndex(0);
      }}
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
          src={currentImage}
        />
      </button>
      <h2 className="item-card__name">{item.name}</h2>
      {item.price !== undefined && item.price !== null && (
        <p className="item-card__price">${item.price.toFixed(2)}</p>
      )}
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
          onClick={(event) => onAddToCart(event, item)}
          type="button"
        >
          <img
            className="product-list__shopping-cart-button"
            alt="Add to cart"
            src={shoppingCart}
          />
        </button>
      </div>
    </li>
  );
}

function ProductList({
  categoryName,
  products = [],
  onProductSelect,
  onAddToCart,
  onBack,
  onFranchiseSelect,
}) {
  const [sortOrder, setSortOrder] = useState("default");
  const [displayCount, setDisplayCount] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  function handleAddToCart(event, item) {
    event.stopPropagation();
    const quantityInput = event.currentTarget.parentElement.querySelector(
      ".item-card__quantity",
    );
    const quantity = Number(quantityInput?.value || 1);
    onAddToCart(item, quantity > 0 ? quantity : 1);
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortOrder === "price-desc") {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  const itemsPerPage =
    displayCount === "all" ? sortedProducts.length : Number(displayCount);
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(sortedProducts.length / itemsPerPage) : 1;
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const displayedProducts =
    displayCount === "all"
      ? sortedProducts
      : sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <main className="product-list-page">
        <StoreLogo />
        <section className="store-logo__name">
          <p className="store-logo__text">
            Nate&apos;s Books, Games, Toys, and Hobby Store
          </p>
        </section>
        <div className="product-list-page__navigation">
          <div className="product-list-page__franchise">
            <h3 className="product-list-page__franchise-title">Franchise</h3>
          </div>

          {products.length > 0 && (
            <div className="product-list-page__controls">
              <div className="product-list-page__control-group">
                <label
                  htmlFor="product-list-display"
                  className="product-list-page__control-label"
                >
                  Per Page:
                </label>
                <select
                  id="product-list-display"
                  className="product-list-page__control-select"
                  value={displayCount}
                  onChange={(e) => {
                    setDisplayCount(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
                  <option value="40">40</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="product-list-page__control-group">
                <label
                  htmlFor="product-list-sort"
                  className="product-list-page__control-label"
                >
                  Sort by:
                </label>
                <select
                  id="product-list-sort"
                  className="product-list-page__control-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <section className="product-list-page__content">
          <div>
            <ul className="product-list-page__franchise-list">
              {franchises.map((franchise) => (
                <li key={franchise}>
                  <button
                    type="button"
                    className="product-list-page__franchise-button"
                    onClick={() => onFranchiseSelect?.(franchise)}
                  >
                    {franchise}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="product-list-page__heading">
              {categoryName || "All Products"}
            </h2>

            {displayedProducts.length > 0 ? (
              <ul className="item-card__new-arrivals-cards product-list-page__cards">
                {displayedProducts.map((item) => (
                  <ProductListItemCard
                    item={item}
                    key={item._id}
                    onAddToCart={handleAddToCart}
                    onProductSelect={onProductSelect}
                  />
                ))}
              </ul>
            ) : (
              <div className="product-list-page__empty">
                <p>No products currently available in &quot;{categoryName}&quot;.</p>
                <button
                  type="button"
                  className="product-list-page__home-btn"
                  onClick={onBack}
                >
                  Explore Other Products
                </button>
              </div>
            )}
          </div>
        </section>
        {totalPages > 1 && (
          <div className="product-list-page__pagination">
            <button
              type="button"
              className="product-list-page__pagination-btn"
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              ← Previous Page
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
              Next Page →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductList;
