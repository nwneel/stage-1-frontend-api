import "./ForgetPassword.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ForgetPassword = ({ isOpen, onClose, onSubmit }) => {
  const defaultValues = {
    email: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    document.addEventListener("resetPasswordForm", resetForm);
    return () => {
      document.removeEventListener("resetPasswordForm", resetForm);
    };
  }, [resetForm]);

  const handleSubmit = () => {
    if (!isValid) return;
    if (typeof onSubmit === "function") {
      onSubmit(values);
    }
  };

  return (
    <ModalWithForm
      className="forget-password__title"
      isOpen={isOpen}
      isSubmitDisabled={!isValid}
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
        <span className="modal__error">{errors.email}</span>
      </label>
    </ModalWithForm>
  );
};

export default ForgetPassword;
