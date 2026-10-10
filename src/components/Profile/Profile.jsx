import { useEffect, useState } from "react";
import "./Profile.css";

function Profile({ profile, onSave, onBack }) {
  const [values, setValues] = useState(profile);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setValues(profile);
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSaveMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
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
        <form className="profile-page__form" onSubmit={handleSubmit}>
          <label className="profile-page__field" htmlFor="profile-username">
            Username
            <input
              autoComplete="username"
              id="profile-username"
              maxLength={30}
              name="username"
              onChange={handleChange}
              required
              value={values.username}
            />
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
