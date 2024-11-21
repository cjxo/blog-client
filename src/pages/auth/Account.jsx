import {
  useState,
  useEffect,
} from "react";
import useAuth from "../../components/AuthProvider.jsx";
import DisplayPostsPage from "./DisplayPosts.jsx";

import api from "../../api/api.js";

const AccountPage = () => {
  const auth = useAuth();
  const [selectedStuff, setSelectedStuff] = useState(0);

  const userStuff = ["Posts", "Hearts", "Follows"];

  const handleSelected = (idx) => {
    setSelectedStuff(idx);
  };

  return (
    <section className="bf-post-account-root">
      <header>
        <p className="bf-profile-username">Whiggle</p>
        <div className="todo-actually-change-to-user-profile"></div>
      </header>
      <button
        className="bf-main-button-design"
        onClick={() => auth.signout()}
      >
        Signout
      </button>
      <ul className="bf-user-stuff-list">
        {
          userStuff.map((stuff, idx) => {
            return (
              <li key={stuff}>
                <button
                  className={(selectedStuff === idx) ? "selected" : ""}
                  onClick={() => handleSelected(idx)}>
                  {stuff}
                </button>
              </li>
            )
          })
        }
      </ul>
      <div>
        {
          (selectedStuff === 0) ? (
            <DisplayPostsPage userId={auth.user.id} />
          ) : (
            <>TODO: IMPLE!</>
          )
        }
      </div>
    </section> 
  );
};

export default AccountPage;
