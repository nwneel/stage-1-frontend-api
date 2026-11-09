import "./ForgetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { forgetPassword } from "../../utils/auth";

const ForgetPassword = ({ onSignInClick, isConfirmation = false }) => {
  const navigate = useNavigate();
  const { values, handleChange, isValid } = useForm({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await forgetPassword({ email: values.email.trim() });
    } catch (error) {
      console.error("Failed to request a password reset.", error);
    } finally {
      setIsSubmitting(false);
    }
    navigate("/forgot-password/sent");
  };

  if (isConfirmation) {
    return (
      <main className="forget-password">
        <section className="forget-password__form">
          <h1 className="forget-password__title">Check your email</h1>
          <p className="forget-password__message" role="status">
            If an account exists for this email, a password reset link will be
            sent shortly.
          </p>
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
      <form className="forget-password__form" onSubmit={handleSubmit} noValidate>
        <h1 className="forget-password__title">Forgot Password?</h1>
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
            value={values.email}
            onChange={handleChange}
          />
        </label>
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
