import "./ForgetPassword.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/hooks";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ForgetPassword = ({ isOpen, onClose, onSubmit, onSignInClick }) => {
  const defaultValues = {
    email: "",
  };

  const { values, setValues, handleChange } = useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  useEffect(() => {
    const handleExternalReset = () => setValues(defaultValues);
    document.addEventListener("resetPasswordForm", handleExternalReset);
    return () => {
      document.removeEventListener("resetPasswordForm", handleExternalReset);
    };
  }, [setValues]);

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit(values);
    }
  };

  const handleSignInClick = () => {
    onClose();
    if (typeof onSignInClick === "function") {
      onSignInClick();
    }
  };

  return (
    <ModalWithForm
      className="forget-password__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Reset Password"
      buttonClassName="forget-password__reset-btn"
    >
      <label htmlFor="reset-email" className="forget-password-modal__label">
        Email
        <input
          type="email"
          name="email"
          className="forget-password-modal__input"
          id="reset-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default ForgetPassword;
