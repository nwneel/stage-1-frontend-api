import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignIn.css";

const SignIn = ({
  isOpen,
  onClose,
  onSubmit,
  onSignUpClick,
  onForgetPasswordClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, setValues, handleChange } = useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  useEffect(() => {
    const handleExternalReset = () => setValues(defaultValues);
    document.addEventListener("resetSignInForm", handleExternalReset);
    return () => {
      document.removeEventListener("resetSignInForm", handleExternalReset);
    };
  }, [setValues]);

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleSignUpClick = () => {
    if (typeof onSignUpClick === "function") {
      onSignUpClick();
    }
  };

  const handleForgetPasswordClick = () => {
    if (typeof onForgetPasswordClick === "function") {
      onForgetPasswordClick();
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      className="signin__title"
      name="sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={handleSignUpClick}
      secondaryButtonClassName="modal__signup-button"
      thirdButtonText="Forget Password"
      onThirdButtonClick={handleForgetPasswordClick}
      thirdButtonClassName="modal__forget-password-button"
      buttonText="Log in"
    >
      <label htmlFor="email" className="signin-modal__label">
        Email
        <input
          type="text"
          name="email"
          className="signin-modal__input"
          id="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="signin-modal__label">
        Password
        <input
          type="password"
          name="password"
          className="signin-modal__input"
          id="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default SignIn;
