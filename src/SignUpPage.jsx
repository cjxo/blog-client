import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/HomepageFooter.jsx";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "./components/input-helper.jsx";
import "./auth-pages.css";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: use Navigate in react-router-dom to prevent signinig up again!
    // TODO: FETCHING HERE!
    fetch("http://localhost:3000/auth/sign-up", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            setError(errorData.message || 'Something went wrong. Please try again.');
            throw new Error(errorData.message || 'Something went wrong. Please try again.');
          });
        } else {
          setError('');
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        navigate("/sign-in?signUpSuccess=true");
      })
      .catch(err => console.error(err));
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
          <p className={`form-error-msg ${error ? 'error' : ''}`}>{error}</p>
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
