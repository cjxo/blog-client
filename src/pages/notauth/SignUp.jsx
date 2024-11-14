import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BlogForgeEmphasis from "../../components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "../../components/input-helper.jsx";
import useAuth from "../../components/AuthProvider.jsx";
import "./auth-pages.css";

const SignUpPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);

    const firstName = fd.get("first-name");
    const lastName = fd.get("last-name");
    const username = fd.get("username");
    const email = fd.get("email");
    const password = fd.get("password");
    const confirmPassword = fd.get("confirm-password");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: use Navigate in react-router-dom to prevent signinig up again!
    auth
      .signup(firstName, lastName, username, email, password)
      .then(result => {
        if (!result.ok) {
          setError(result.message);
        } else {
          navigate("/sign-in?signUpSuccess=true");
          setError("");
        }
      });
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
          <h1 className="bf-auth-header">Sign Up To <BlogForgeEmphasis /></h1>
          <p className={`form-error-msg ${error ? 'error' : ''}`}>{error}</p>
          <LabelInputPair inputType="text" labelName="first-name" inputName="First Name" />
          <LabelInputPair inputType="text" labelName="last-name" inputName="Last Name" />
          <LabelInputPair inputType="text" labelName="username" inputName="Username" />
          <LabelInputPair inputType="email" labelName="email" inputName="Email" />
          <LabelInputPair inputType="password" labelName="password" inputName="Password" />
          <LabelInputPair inputType="password" labelName="confirm-password" inputName="Confirm Password" />
          <button className="bf-submit-fields">Submit</button>
        </form>
      </section>
    </>
  );
}

export default SignUpPage;
