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
  const [errorMsg, setErrorMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editUname, setEditUname] = useState(auth.user.name);

  const userStuff = ["Posts", "Hearts", "Follows"];

  const handleSelected = (idx) => {
    console.log(idx);
    setSelectedStuff(idx);
  };

  const handleSetEdit = () => {
    if (editMode) {
      if ((editUname.length > 0) && (editUname !== auth.user.name)) {
        auth
          .editUserDetail(editUname)
          .then(result => {
            if (result.ok) {
              setEditMode(false);
              setErrorMsg("");
            } else {
              setErrorMsg(result.message);
            }
          });
      } else {
        setEditMode(false);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <section className="bf-post-account-root">
      <header>
        <div className="bf-user-details">
          {
            editMode ? (
              <>
                <span
                  className={errorMsg ? "form-error-msg error" : "form-error-msg"}
                >
                  {errorMsg}
                </span>
                <input
                  type="text"
                  value={editUname}
                  className="bf-edit-uname"
                  onChange={(e) => setEditUname(e.target.value)}
                />
              </>
            ) : (
              <p className="bf-profile-username">{auth.user.name}</p>
            )
          }
        </div>
        <div className="todo-actually-change-to-user-profile"></div>
      </header>
      <button
        className="bf-main-button-design"
        onClick={() => auth.signout()}
        style={
          {
            marginRight: "12px"
          }
        }
      >
        Signout
      </button>
      <button
        className="bf-main-button-design"
        onClick={handleSetEdit}
      >
        {editMode ? "Done" : "Edit"}
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
          ) : (selectedStuff === 1) ? (
            <DisplayPostsPage userId={auth.user.id} filterBy="hearts" />
          ) : (
            <p style={{fontSize: "32px"}}>No Impl Yet!</p>
          )
        }
      </div>
    </section> 
  );
};

export default AccountPage;
