import { useEffect, useState } from "react";
import { useFieldErrors } from "../../hooks/useForm";
import "./Profile.css";

function Profile({ profile, onSave, onBack }) {
  const [values, setValues] = useState(profile);
  const [saveMessage, setSaveMessage] = useState("");
  const { errors, validateField, validateForm, resetErrors } = useFieldErrors();

  useEffect(() => {
    setValues(profile);
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSaveMessage("");
    validateField(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm(event.currentTarget)) return;
    try {
      onSave({
        username: values.username.trim(),
        email: values.email.trim(),
      });
      setSaveMessage("Your profile has been saved.");
    } catch {
      setSaveMessage("Could not save your profile. Please try again.");
    }
  }

  function handleCancel() {
    setValues(profile);
    setSaveMessage("");
    resetErrors();
    if (typeof onBack === "function") {
      onBack();
    }
  }

  return (
    <main className="profile-page">
      <section className="profile-page__container">
        <h1 className="profile-page__title">My Profile</h1>
        <p className="profile-page__description">
          Update the name and email address associated with your profile.
        </p>
        <form className="profile-page__form" onSubmit={handleSubmit} noValidate>
          <label className="profile-page__field" htmlFor="profile-username">
            Username
            <input
              className="profile-page__username-input"
              autoComplete="username"
              id="profile-username"
              maxLength={30}
              name="username"
              onChange={handleChange}
              required
              value={values.username}
            />
            <span className="profile-page__error">{errors.username}</span>
          </label>
          <label className="profile-page__field" htmlFor="profile-email">
            Email
            <input
              autoComplete="email"
              id="profile-email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={values.email}
            />
            <span className="profile-page__error">{errors.email}</span>
          </label>
          {saveMessage && (
            <p aria-live="polite" className="profile-page__message">
              {saveMessage}
            </p>
          )}
          <div className="profile-page__actions">
            <button className="profile-page__button" type="submit">
              Save Profile
            </button>
            <button
              className="profile-page__button profile-page__button_secondary"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
