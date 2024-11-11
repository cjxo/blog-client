import { useState } from "react";
import Footer from "./components/HomepageFooter.jsx";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "./components/input-helper.jsx";
import "./auth-pages.css";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: FETCHING HERE!
    setError('');
  };

  const toOnChange = (fn) => {
    return (e) => {
      fn(e.target.value);
    };
  };

  return (
    <>
      <section className="bf-sign-up-section">
        <form method="post" onSubmit={handleSubmit}>
          <h1>Sign Up To <BlogForgeEmphasis /></h1>
          <p className={`form-error-msg ${error ? 'visible' : ''}`}>{error}</p>
          <LabelInputPair
            inputType="text"
            labelName="first-name"
            inputName="First Name"
            value={firstName}
            onChange={toOnChange(setFirstName)}
          />
          <LabelInputPair
            inputType="text"
            labelName="last-name"
            inputName="Last Name"
            value={lastName}
            onChange={toOnChange(setLastName)}
          />
          <LabelInputPair
            inputType="date"
            labelName="birth-date"
            inputName="Birth Date"
            value={birthDate}
            onChange={toOnChange(setBirthDate)}
          />
          <LabelInputPair
            inputType="text"
            labelName="username"
            inputName="Username"
            value={username}
            onChange={toOnChange(setUsername)}
          />
          <LabelInputPair
            inputType="email"
            labelName="email"
            inputName="Email"
            value={email}
            onChange={toOnChange(setEmail)}
          />
          <LabelInputPair
            inputType="password"
            labelName="password"
            inputName="Password"
            value={password}
            onChange={toOnChange(setPassword)}
          />
          <LabelInputPair
            inputType="password"
            labelName="confirm-password"
            inputName="Confirm Password"
            value={confirmPassword}
            onChange={toOnChange(setConfirmPassword)}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
}
