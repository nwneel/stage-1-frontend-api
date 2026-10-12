import "../StoreLogo/StoreLogo.css";
import "../Main/Main.css";
import leftArrowImage from "../../assets/left arrow.png";
import rightArrowImage from "../../assets/right arrow.png";
import { defaultProductItems } from "../../utils/constants";

function StoreLogo({
  handleImageClick,
  handlePreviousImageClick,
  imageIndex = 0,
  showBannerImage = false,
}) {
  return (
    <section className="store-logo">
      <section className="store-logo__name">
        <p className="store-logo__text">
          Nate&apos;s Books, Games, Toys, and Hobby Store
        </p>
      </section>
      {showBannerImage && (
        <section className="store-logo__image-section store-logo__image-container">
          {/* Help the images change when clicked which is called on lines 8-14 */}
          <button
            aria-label="Previous product image"
            className="store-logo__image-arrow store-logo__image-arrow_left"
            onClick={handlePreviousImageClick}
            type="button"
          >
            <img
              className="store-logo__arrow-icon"
              alt="left arrow"
              src={leftArrowImage}
            />
          </button>
          <img
            alt={defaultProductItems[imageIndex]?.name}
            className="store-logo__product-image"
            onClick={handleImageClick}
            src={defaultProductItems[imageIndex]?.image}
          />
          <button
            aria-label="Next product image"
            className="store-logo__image-arrow store-logo__image-arrow_right"
            onClick={handleImageClick}
            type="button"
          >
            <img alt="right arrow" src={rightArrowImage} />
          </button>
        </section>
      )}
    </section>
  );
}

export default StoreLogo;
