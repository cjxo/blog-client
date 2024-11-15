import { useLocation } from "react-router-dom";
const PostPage = () => {
  const { state } = useLocation();
  return (
    <div className="bf-post-expanded-root">
      <h1>{state.title}</h1>
      <div className="bf-post-details">
        <p>
          {
            new Date(state.created_at).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          }
        </p>
        <p>By {state.author}</p>
      </div>
      <p>
        {state.content}
      </p>
    </div>
  )
};
export default PostPage; 
