import { useState } from "react";
import { useLocation } from "react-router-dom";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "./components/input-helper.jsx";
import "./auth-pages.css";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { search } = useLocation();
  const equalsIdx = search.search("=");
  const signUpSuccess = (equalsIdx !== -1) ? search.slice(equalsIdx + 1, search.length) === "true" : false;

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
    <section className="bf-sign-in-section">
      <form method="post" onSubmit={handleSubmit}>
        <h1>Sign In To <BlogForgeEmphasis /></h1>
        {
          (signUpSuccess && !error) ? (
            <p className={`form-error-msg success`}>Successful Sign Up</p>
          ) : (
            <p className={`form-error-msg ${error ? 'error' : ''}`}>{error}</p>
          )
        }
        <LabelInputPair
          inputType="email"
          labelName="email"
          inputName="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabelInputPair
          inputType="password"
          labelName="password"
          inputName="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </section>
  );
}
