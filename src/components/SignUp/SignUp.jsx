import "./SignUp.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const SignUp = ({ isOpen, onClose, onSubmit, onSignInClick }) => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    document.addEventListener("resetsignupForm", resetForm);
    return () => {
      document.removeEventListener("resetsignupForm", resetForm);
    };
  }, [resetForm]);

  const handleInputChange = (e) => {
    const { name, value, form } = e.target;
    const currentPassword = name === "password" ? value : values.password;
    const currentConfirmPassword =
      name === "confirmPassword" ? value : values.confirmPassword;

    form.elements.confirmPassword.setCustomValidity(
      currentConfirmPassword && currentPassword !== currentConfirmPassword
        ? "Passwords don't match"
        : "",
    );
    handleChange(e);
  };

  const handleSubmit = () => {
    if (!isValid) return;
    if (typeof onSubmit === "function") onSubmit(values);
  };

  const handleSignInClick = () => {
    onClose();
    if (typeof onSignInClick === "function") {
      onSignInClick();
    }
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      className="signup-modal__signup"
      title="Sign Up"
      name="sign-up"
      isOpen={isOpen}
      isSubmitDisabled={!isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="or Sign In"
      onSecondaryButtonClick={handleSignInClick}
      secondaryButtonClassName="modal__signup-button"
    >
      <label htmlFor="username" className="signup-modal__label">
        Username
        <input
          type="text"
          name="username"
          className="signup-modal__input"
          id="username"
          placeholder="Username"
          required
          minLength="1"
          maxLength="30"
          value={values.username}
          onChange={handleInputChange}
        />
        <span className="modal__error">{errors.username}</span>
      </label>
      <label htmlFor="email" className="signup-modal__label">
        Email
        <input
          type="email"
          name="email"
          className="signup-modal__input"
          id="email"
          placeholder="Email"
          required
          maxLength="30"
          value={values.email}
          onChange={handleInputChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label htmlFor="password" className="signup-modal__label">
        Password
        <input
          type="password"
          name="password"
          className="signup-modal__input"
          id="password"
          placeholder="Password"
          required
          minLength="8"
          maxLength="30"
          value={values.password}
          onChange={handleInputChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label htmlFor="confirmPassword" className="signup-modal__label">
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          className="signup-modal__input"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
          maxLength="30"
          value={values.confirmPassword}
          onChange={handleInputChange}
        />
        <span className="modal__error">{errors.confirmPassword}</span>
      </label>
    </ModalWithForm>
  );
};

export default SignUp;
