import "./EmptyCartModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EmptyCartModal({ isOpen, onClose, onSignInClick }) {
  const handleSignIn = () => {
    onClose();
    if (typeof onSignInClick === "function") {
      onSignInClick();
    }
  };

  return (
    <ModalWithForm
      title="Your Cart"
      name="empty-cart"
      className="empty-cart-modal__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSignIn}
      buttonText="Sign In"
      buttonClassName="empty-cart-modal__button"
    >
      <p className="empty-cart-modal__message">Your shopping cart is empty</p>
    </ModalWithForm>
  );
}

export default EmptyCartModal;
