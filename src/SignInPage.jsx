import { useState } from "react";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "./components/input-helper.jsx";
import "./auth-pages.css";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <section className="bf-sign-in-section">
      <form method="post" onSubmit={handleSubmit}>
        <h1>Sign In To <BlogForgeEmphasis /></h1>
        <p className={`form-error-msg ${error ? 'visible' : ''}`}>{error}</p>
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
