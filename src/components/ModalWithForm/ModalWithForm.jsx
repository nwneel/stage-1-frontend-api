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
  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents reloading
    onSubmit(); // just call it here without any arguments
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""} ${name ? `modal_type_${name}` : ""}`.trim()}
    >
      <div className={`modal__content ${contentClassName || ""}`.trim()}>
        <form
          onSubmit={handleSubmit}
          className={`modal__form ${formClassName || ""} ${name ? `modal__form_${name}` : ""}`.trim()}
        >
          {title && (
            <h2 className={`modal__title ${className || ""}`.trim()}>
              {title}
            </h2>
          )}
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeButton} alt="Close" />
          </button>
          {children}
          <div className="modal__btns">
            <button
              type="submit"
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
