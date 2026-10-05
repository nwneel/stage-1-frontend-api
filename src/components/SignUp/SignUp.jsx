import "./SignUp.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

const SignUp = ({ isOpen, onClose, onSubmit, onSignInClick }) => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, setValues, handleChange } = useForm(defaultValues);
  // Helps check if the passwords match
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setValues(defaultValues);
      setPasswordError("");
    }
  }, [isOpen, setValues]);

  useEffect(() => {
    const handleExternalReset = () => {
      setValues(defaultValues);
      setPasswordError("");
    };
    document.addEventListener("resetsignupForm", handleExternalReset);
    return () => {
      document.removeEventListener("resetsignupForm", handleExternalReset);
    };
  }, [setValues]);

  const handleInputChange = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    const currentPassword = name === "password" ? value : values.password;
    const currentConfirmPassword =
      name === "confirmPassword" ? value : values.confirmPassword;

    if (currentConfirmPassword && currentPassword !== currentConfirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    if (values.password !== values.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    setPasswordError("");
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
      </label>
      <label htmlFor="email" className="signup-modal__label">
        Email
        <input
          type="text"
          name="email"
          className="signup-modal__input"
          id="email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          value={values.email}
          onChange={handleInputChange}
        />
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
          minLength="1"
          maxLength="30"
          value={values.password}
          onChange={handleInputChange}
        />
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
          minLength="1"
          maxLength="30"
          value={values.confirmPassword}
          onChange={handleInputChange}
        />
        {passwordError && (
          <span className="signup-modal__error">{passwordError}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default SignUp;
