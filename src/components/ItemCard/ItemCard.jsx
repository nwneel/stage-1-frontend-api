import "../ItemCard/ItemCard.css";
import shoppingCart from "../../assets/Shopping cart.png";

function ItemCard({
  displayedNewArrivals = [],
  onProductSelect,
  handleAddToCart,
}) {
  return (
    <>
      <section className="item-card__new-arrivals-header">
        <h2 className="item-card__new-arrivals">New Arrivals</h2>
      </section>
      <section className="item-card__new-arrivals-products">
        <ul className="item-card__new-arrivals-cards">
          {displayedNewArrivals.map((item) => (
            <li
              className="item-card__new-arrival"
              key={item._id}
              onClick={() => onProductSelect?.(item)}
            >
              <button
                aria-label={`View ${item.name}`}
                className="item-card__product-link"
                onClick={(event) => {
                  event.stopPropagation();
                  onProductSelect?.(item);
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
                    handleAddToCart?.(event, item);
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
      </section>
    </>
  );
}

export default ItemCard;
