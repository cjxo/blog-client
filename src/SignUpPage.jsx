import { useState } from "react";
import PropTypes from "prop-types";
import Footer from "./components/HomepageFooter.jsx";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";
import "./sign-up.css";

function getServerUrl(route) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/${route}`;
  } else if (process.env.NODE_ENV === "production") {
    return `Not Yet!`;
  }

  return ``;
}

function LabelInputPair({ inputType, labelName, inputName, value, onChange }) {
  const onFocusDate = (e) => {
    e.target.type = "date";
  };

  const onBlurDate = (e) => {
    e.target.type = "text";
  };

  return (
    <div class="label-input-pair">
      {
        inputType === "date" ? (
          <input
            type="text"
            onFocus={onFocusDate}
            onBlur={onBlurDate}
            id={labelName}
            name={labelName}
            placeholder={inputName}
            required
          />
        ) : (
          <input
            type={inputType}
            id={labelName}
            name={labelName}
            placeholder={inputName}
            value={value}
            onChange={onChange}
            required
          />
        )
      }
    </div>
  );
}

export default function SignUpPage() {
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
  return (
    <>
      <section class="bf-sign-up-section">
        <form method="post" action={getServerUrl("sign-up")} onSubmit={handleSubmit}>
          <h1>Sign Up To <BlogForgeEmphasis /></h1>
          <p class={`form-error-msg ${error ? 'visible' : ''}`}>{error}</p>
          <LabelInputPair inputType="text" labelName="first-name" inputName="First Name" />
          <LabelInputPair inputType="text" labelName="last-name" inputName="Last Name" />
          <LabelInputPair inputType="date" labelName="birth-date" inputName="Birth Date" />
          <LabelInputPair inputType="text" labelName="username" inputName="Username" />
          <LabelInputPair inputType="email" labelName="email" inputName="Email" />
          <LabelInputPair
            inputType="password"
            labelName="password"
            inputName="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <LabelInputPair
            inputType="password"
            labelName="confirm-password"
            inputName="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
}
