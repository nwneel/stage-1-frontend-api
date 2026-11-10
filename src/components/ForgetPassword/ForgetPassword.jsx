import "./ForgetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { forgetPassword } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ForgetPassword = ({
  onSignInClick,
  isConfirmation = false,
  isModal = false,
  onClose,
}) => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useForm({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      await forgetPassword({ email: values.email.trim() });
      if (isModal) {
        setIsSent(true);
      } else {
        navigate("/forgot-password/sent");
      }
    } catch (error) {
      console.error("Failed to request a password reset.", error);
      setSubmitError("Unable to send a reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmationMessage = (
    <p className="forget-password__message" role="status">
      If an account exists for this email, a password reset link will be
      sent shortly.
    </p>
  );

  const emailFields = (
    <>
      <p className="forget-password__description">
        Enter the email address associated with your account and we&apos;ll
        send you a link to reset your password.
      </p>
      <label htmlFor="reset-email" className="forget-password__label">
        Email
        <input
          type="email"
          name="email"
          className="forget-password__input"
          id="reset-email"
          placeholder="Email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="reset-email-error"
        />
        <span
          id="reset-email-error"
          className="forget-password__field-error"
        >
          {errors.email}
        </span>
      </label>
      {submitError && (
        <p className="forget-password__error" role="alert">
          {submitError}
        </p>
      )}
    </>
  );

  if (isModal) {
    return (
      <ModalWithForm
        title={isSent ? "Check your email" : "Forgot Password?"}
        className="forget-password__modal-title"
        name="forget-password"
        isOpen
        onClose={onClose}
        onSubmit={isSent ? onSignInClick : handleSubmit}
        isSubmitDisabled={!isSent && (!isValid || isSubmitting)}
        buttonText={
          isSent
            ? "Back to Sign In"
            : isSubmitting
              ? "Sending..."
              : "Send Reset Link"
        }
        buttonClassName="forget-password__submit"
        secondaryButtonText={!isSent ? "Back to Sign In" : undefined}
        onSecondaryButtonClick={onSignInClick}
        secondaryButtonClassName="forget-password__signin"
      >
        {isSent ? confirmationMessage : emailFields}
      </ModalWithForm>
    );
  }

  if (isConfirmation) {
    return (
      <main className="forget-password">
        <section className="forget-password__form">
          <h1 className="forget-password__title">Check your email</h1>
          {confirmationMessage}
          <button
            type="button"
            className="forget-password__signin"
            onClick={onSignInClick}
          >
            Back to Sign In
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="forget-password">
      <form
        className="forget-password__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        <h1 className="forget-password__title">Forgot Password?</h1>
        {emailFields}
        <button
          type="submit"
          className="forget-password__submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
        <button
          type="button"
          className="forget-password__signin"
          onClick={onSignInClick}
        >
          Back to Sign In
        </button>
      </form>
    </main>
  );
};

export default ForgetPassword;
