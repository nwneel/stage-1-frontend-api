import { useEffect } from "react";
import "./ModalWithForm.css";
import closeButton from "../../assets/closebutton.png";

function ModalWithForm({
  children,
  buttonText = "Save",
  buttonClassName = "modal__submit",
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  name,
  className,
  formClassName,
  contentClassName,
  secondaryButtonText,
  onSecondaryButtonClick,
  secondaryButtonClassName = "modal__login-button",
  thirdButtonText,
  onThirdButtonClick,
  thirdButtonClassName = "modal__forget-password-button",
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents reloading
    onSubmit(); // just call it here without any arguments
  };

  return (
    <div
      onMouseDown={handleOverlayClick}
      className={`modal ${isOpen ? "modal__opened" : ""} ${name ? `modal_type_${name}` : ""}`.trim()}
    >
      <div className={`modal__content ${contentClassName || ""}`.trim()}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`modal__form ${formClassName || ""} ${name ? `modal__form_${name}` : ""}`.trim()}
        >
          {title && (
            <h2 className={`modal__title ${className || ""}`.trim()}>
              {title}
            </h2>
          )}
          <button onClick={onClose} type="button" className="modal__close">
            <img className="modal__close-icon" src={closeButton} alt="Close" />
          </button>
          {children}
          <div className="modal__btns">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`modal__submit ${buttonClassName !== "modal__submit" ? buttonClassName : ""}`.trim()}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className={secondaryButtonClassName}
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
            {thirdButtonText && (
              <button
                type="button"
                className={thirdButtonClassName}
                onClick={onThirdButtonClick}
              >
                {thirdButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
