import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";
import useAuth from "../../components/AuthProvider.jsx";

const CreatePostPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const title = fd.get("title");
    const content = fd.get("content");
    api
      .createPost(title, content, true, auth.token)
      .then(creationResult => {
        if (!creationResult.ok) {
          console.error(creationResult.message);
        } else {
          navigate("/home");
        }
      })
  };

  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="bf-create-post"
    >
      <input
        type="text"
        placeholder="Add a title..."
        name="title"
        id="bf-post-title"
      />
      <textarea
        type="text"
        placeholder="Add content..."
        name="content"
        id="bf-post-body"
        rows="20"
      ></textarea>
      <button className="bf-submit-post bf-main-button-design">Post</button>
    </form>
  );
};

export default CreatePostPage;
