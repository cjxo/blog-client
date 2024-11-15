import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import BlogForgeEmphasis from "../../components/BlogForgeEmphasis.jsx";
import { LabelInputPair } from "../../components/input-helper.jsx";
import { NavTop } from "../../components/HomepageNav.jsx";
import useAuth from "../../components/AuthProvider.jsx";
import Footer from "../../components/HomepageFooter.jsx";
import "./auth-pages.css";

const SignInPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { search } = useLocation();
  const equalsIdx = search.search("=");
  const signUpSuccess = (equalsIdx !== -1) ? search.slice(equalsIdx + 1, search.length) === "true" : false;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const fd = new FormData(e.target);
    const username = fd.get("username");
    const password = fd.get("password");
    auth
      .signin(username, password)
      .then(result => {
        if (!result.ok) {
          setError(result.message);
        } else {
          navigate("/");
          setError("");
        }
      });
  };

  return (
    <>
      <section className="bf-auth-section bf-sign-in-section">
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="bf-auth-header">Sign In To <BlogForgeEmphasis /></h1>
          {
            (signUpSuccess && !error) ? (
              <p className={`form-error-msg success`}>Successful Sign Up</p>
            ) : (
              <p className={`form-error-msg ${error ? 'error' : ''}`}>{error}</p>
            )
          }
          <LabelInputPair inputType="text" labelName="username" inputName="Username" />
          <LabelInputPair inputType="password" labelName="password" inputName="Password" />
          <button className="bf-submit-fields">Submit</button>
        </form>
      </section>
    </>
  );
}

export default SignInPage;
