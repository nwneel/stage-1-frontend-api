import { useState } from "react";
import StoreLogo from "../StoreLogo/StoreLogo";
import { defaultProductItems, defaultNewArrivals } from "../../utils/constants";
import "./Main.css";
import "../ItemCard/ItemCard.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({ onAddToCart, onProductSelect }) {
  // Lines 8-14 helps make the images change when clicked
  const [imageIndex, setImageIndex] = useState(0);
  const sortOrder = "default";
  const displayCount = "all";
  const currentPage = 1;

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
    <main className="main__page">
      <StoreLogo
        handleImageClick={handleImageClick}
        handlePreviousImageClick={handlePreviousImageClick}
        imageIndex={imageIndex}
        showBannerImage={true}
      />
      <ItemCard
        displayedNewArrivals={displayedNewArrivals}
        onProductSelect={onProductSelect}
        handleAddToCart={handleAddToCart}
      />
    </main>
  );
}

export default Main;
