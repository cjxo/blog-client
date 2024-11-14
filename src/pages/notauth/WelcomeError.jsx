import { useRouteError } from "react-router-dom";
import { NavTop } from "../../components/HomepageNav.jsx";
import Footer from "../../components/HomepageFooter.jsx";

const WelcomeErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <nav>
        <NavTop />
      </nav>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default WelcomeErrorPage;
