import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import BlogForgePng from "../../public/icons/Blog-Forge-Cropped.png";

function NavLogo() {
  return (
    <Link to="/">
      <img
        className="bf-logo"
        src={BlogForgePng}
        alt="blog forge logo"
      />
    </Link>
  );
}

function NavButtonStartPosting() {
  return (
    <Link
      className="bf-button-link bf-button-link-start-posting"
      to="/sign-up"
      >
      Start Posting
    </Link>
  );
}

function NavButtonSignIn() {
  return (
    <Link
      className="bf-button-link bf-button-link-sign-in"
      to="/sign-in">
      Sign In
    </Link>
  );
}

function NavButtonExploreUserPosts() {
  return (
    <Link
      className="bf-button-link bf-button-link-sign-in"
      to="/home/posts"
      >
      Explore User Posts
    </Link>
  );
}

function NavLinks({ children }) {
  return (
    <div className="bf-button-links">
      { children }
    </div>
  );
}

function NavTop({ forSignIn=false, forSignUp=false }) {
  let renderables = null;

  if (!(forSignIn || forSignUp)) {
    renderables = (
      <>
        <NavButtonStartPosting />
        <NavButtonSignIn />
      </>
    );
  } else if (forSignIn) {
    renderables = (
      <>
        <p style={{ color: "gray" }}>Do not have an account?</p>
        <NavButtonStartPosting />
      </>
    );
  } else if (forSignUp) {
    renderables = (
      <>
        <p style={{ color: "gray" }}>Already have an account?</p>
        <NavButtonSignIn />
      </>
    );
  }

  return (
    <section className="bf-homepage-nav-top">
      <NavLogo />
      <NavLinks>
        { renderables }
      </NavLinks>
    </section>
  );
}

export {
  NavLogo,
  NavButtonStartPosting,
  NavButtonSignIn,
  NavButtonExploreUserPosts,
  NavLinks,
  NavTop,
};

NavTop.propTypes = {
  forSignIn: PropTypes.bool,
  forSignUp: PropTypes.bool,
};
