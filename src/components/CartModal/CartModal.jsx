import "./CartModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { SALES_TAX_RATE } from "../../utils/constants";

function CartModal({
  isOpen,
  onClose,
  cartItems = [],
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const salesTax = subtotal * SALES_TAX_RATE;
  const totalCost = subtotal + salesTax;

  const handleSubmit = () => {
    if (typeof onCheckout === "function") {
      onCheckout();
    } else {
      onClose();
    }
  };

  return (
    <ModalWithForm
      title="Shopping Cart"
      name="cart"
      className="cart-modal__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Checkout"
      buttonClassName="cart-modal__checkout-btn"
      secondaryButtonText="Continue Shopping"
      onSecondaryButtonClick={onClose}
      secondaryButtonClassName="cart-modal__continue-btn"
    >
      <div className="cart-modal__items">
        {cartItems.map((item) => (
          <div className="cart-modal__item" key={item._id}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="cart-modal__item-image"
              />
            )}
            <div className="cart-modal__item-info">
              <h3 className="cart-modal__item-name">{item.name}</h3>
              <p className="cart-modal__item-details">
                ${item.price.toFixed(2)} each
              </p>
              {typeof onUpdateQuantity === "function" && (
                <div className="cart-modal__quantity">
                  <button
                    type="button"
                    className="cart-modal__quantity-btn"
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity - 1)
                    }
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    &minus;
                  </button>
                  <span className="cart-modal__quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="cart-modal__quantity-btn"
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    &#43;
                  </button>
                </div>
              )}
            </div>
            <div className="cart-modal__item-cost">
              <span className="cart-modal__item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              {typeof onRemoveItem === "function" && (
                <button
                  type="button"
                  className="cart-modal__remove-btn"
                  onClick={() => onRemoveItem(item._id)}
                  aria-label={`Remove ${item.name}`}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-modal__summary">
        <span className="cart-modal__summary-label">Subtotal:</span>
        <span className="cart-modal__summary-value">
          ${subtotal.toFixed(2)}
        </span>
      </div>
      <div className="cart-modal__summary">
        <span className="cart-modal__summary-label">Sales Tax (7.25%):</span>
        <span className="cart-modal__summary-value">
          ${salesTax.toFixed(2)}
        </span>
      </div>
      <div className="cart-modal__summary">
        <span className="cart-modal__summary-label">Total Cost:</span>
        <span className="cart-modal__summary-value">
          ${totalCost.toFixed(2)}
        </span>
      </div>
    </ModalWithForm>
  );
}

export default CartModal;
