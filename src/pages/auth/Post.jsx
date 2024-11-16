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
      <p className="bf-post-expanded-content">
        {state.content}
      </p>

      <div className="bf-divider"></div>
      <div className="bf-comment-section">
        <form>
          <textarea rows="4" placeholder="Add comment ...">
          </textarea>
          <button>Submit</button>
        </form>
        <div className="bf-comment-header">
          <h3>Comments</h3>
          <div>0</div>
        </div>
        <div className="bf-comments">
          <div className="bf-comment">
            <div className="bf-comment-quick-info">
              <div
                className="todo-actually-change-to-user-profile"
                style={
                  {
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--main-colour3)"
                  }
                }
              >
              </div>
              <div>usernamehere</div>
            </div>
            <p>
              Actual Comment is written here!!!!! Amazing Comment about the post!
            </p>
            <div className="bf-comment-interaction">
              <div>Like</div>
              <div>Dislike</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default PostPage; 
