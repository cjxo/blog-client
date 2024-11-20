import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../components/AuthProvider.jsx";
import api from "../../api/api.js";
import utils from "../../utils/utils.js";
import PropTypes from "prop-types";

const PostInteractableButton = ({ defaultColour="#697565", hoveredColour="#e0a01f", type="thumbs-up", activated=false, setActivated=()=>{} }) => {
  const [hovered, setHovered] = useState(false);

  let renderables = null;
  switch (type) {
    case "thumbs-up": {
      if (hovered || activated) {
        renderables = (
          <svg className="bf-post-interactables" width="800px" height="800px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.31176 2.99451C9.78718 2.04368 9.45039 0.887134 8.53883 0.340197C7.59324 -0.227152 6.3678 0.0621374 5.77577 0.992466L3 5.3544V12.5C3 13.8807 4.11929 15 5.5 15H10.5C11.2869 15 12.0279 14.6295 12.5 14L15 10.6667V7.5C15 6.11929 13.8807 5 12.5 5H8.30902L9.31176 2.99451Z" fill={hoveredColour} />
            <path d="M0 5V15H1V5H0Z" fill={hoveredColour} />
          </svg>
        );
      } else {
        renderables = (
          <svg className="bf-post-interactables" width="800px" height="800px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 5.49999L3.07817 5.23156L3 5.35439V5.49999H3.5ZM6.19761 1.2609L6.61944 1.52934L6.19761 1.2609ZM8.86455 2.7709L8.41734 2.54729V2.54729L8.86455 2.7709ZM7.5 5.49999L7.05279 5.27639C6.97529 5.43138 6.98357 5.61545 7.07467 5.76286C7.16578 5.91027 7.32671 5.99999 7.5 5.99999V5.49999ZM14.5 10.5L14.9 10.8L15 10.6667V10.5H14.5ZM12.1 13.7L12.5 14L12.1 13.7ZM8.28158 0.768941L8.53883 0.340194L8.53883 0.340194L8.28158 0.768941ZM0 4.99999V15H1V4.99999H0ZM3.92183 5.76843L6.61944 1.52934L5.77577 0.992463L3.07817 5.23156L3.92183 5.76843ZM8.41734 2.54729L7.05279 5.27639L7.94721 5.7236L9.31176 2.9945L8.41734 2.54729ZM7.5 5.99999H12.5V4.99999H7.5V5.99999ZM14 7.49999V10.5H15V7.49999H14ZM14.1 10.2L11.7 13.4L12.5 14L14.9 10.8L14.1 10.2ZM10.5 14H5.5V15H10.5V14ZM4 12.5V5.49999H3V12.5H4ZM12.5 5.99999C13.3284 5.99999 14 6.67157 14 7.49999H15C15 6.11928 13.8807 4.99999 12.5 4.99999V5.99999ZM5.5 14C4.67157 14 4 13.3284 4 12.5H3C3 13.8807 4.11929 15 5.5 15V14ZM8.02433 1.19769C8.48782 1.47578 8.65906 2.06384 8.41734 2.54729L9.31176 2.9945C9.78718 2.04368 9.45039 0.887131 8.53883 0.340194L8.02433 1.19769ZM11.7 13.4C11.4167 13.7777 10.9721 14 10.5 14V15C11.2869 15 12.0279 14.6295 12.5 14L11.7 13.4ZM6.61944 1.52934C6.92046 1.05631 7.54354 0.909215 8.02433 1.19769L8.53883 0.340194C7.59324 -0.227155 6.3678 0.0621342 5.77577 0.992463L6.61944 1.52934Z" fill={defaultColour} />
          </svg>
        );
      }
    } break;

    case "thumbs-down": {
      if (hovered || activated) {
        renderables = (
          <svg className="bf-post-interactables" width="800px" height="800px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10V0H0V10H1Z" fill={hoveredColour}/>
            <path d="M5.5 0C4.11929 0 3 1.11929 3 2.5V9.6456L5.77577 14.0075C6.3678 14.9379 7.59324 15.2271 8.53883 14.6598C9.45039 14.1129 9.78718 12.9563 9.31176 12.0055L8.30902 10H12.5C13.8807 10 15 8.88071 15 7.5V4.33333L12.5 1C12.0279 0.370486 11.2869 0 10.5 0H5.5Z" fill={hoveredColour}/>
          </svg>
        );
      } else {
        renderables = (
          <svg className="bf-post-interactables" width="800px" height="800px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 9.5H3V9.6456L3.07817 9.76844L3.5 9.5ZM6.19761 13.7391L6.61944 13.4707L6.19761 13.7391ZM8.86455 12.2291L8.41734 12.4527L8.86455 12.2291ZM7.5 9.5V9C7.32671 9 7.16578 9.08973 7.07467 9.23713C6.98357 9.38454 6.97529 9.56861 7.05279 9.72361L7.5 9.5ZM14.5 4.5H15V4.33333L14.9 4.2L14.5 4.5ZM12.1 1.3L12.5 1V1L12.1 1.3ZM8.28158 14.2311L8.53883 14.6598H8.53883L8.28158 14.2311ZM1 10V0H0V10H1ZM3.07817 9.76844L5.77577 14.0075L6.61944 13.4707L3.92183 9.23156L3.07817 9.76844ZM9.31176 12.0055L7.94721 9.27639L7.05279 9.72361L8.41734 12.4527L9.31176 12.0055ZM7.5 10H12.5V9H7.5V10ZM15 7.5V4.5H14V7.5H15ZM14.9 4.2L12.5 1L11.7 1.6L14.1 4.8L14.9 4.2ZM10.5 0H5.5V1H10.5V0ZM3 2.5V9.5H4V2.5H3ZM12.5 10C13.8807 10 15 8.88071 15 7.5H14C14 8.32843 13.3284 9 12.5 9V10ZM5.5 0C4.11929 0 3 1.11929 3 2.5H4C4 1.67157 4.67157 1 5.5 1V0ZM8.53883 14.6598C9.45039 14.1129 9.78718 12.9563 9.31176 12.0055L8.41734 12.4527C8.65906 12.9362 8.48782 13.5242 8.02433 13.8023L8.53883 14.6598ZM12.5 1C12.0279 0.370486 11.2869 0 10.5 0V1C10.9721 1 11.4167 1.22229 11.7 1.6L12.5 1ZM5.77577 14.0075C6.3678 14.9379 7.59324 15.2271 8.53883 14.6598L8.02433 13.8023C7.54354 14.0908 6.92046 13.9437 6.61944 13.4707L5.77577 14.0075Z" fill={defaultColour}/>
          </svg>
        );
      }
    } break;

    case "heart": {
      if (hovered || activated) {
        renderables = (
          <svg width="800px" height="800px" className="bf-post-interactables" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
           <g transform="translate(0 -1028.4)">
            <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#e74c3c"/>
           </g>
          </svg>
        );
      } else {
        renderables = (
          <svg width="800px" className="bf-post-interactables" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.88 4.78a3.489 3.489 0 0 0-.37-.9 3.24 3.24 0 0 0-.6-.79 3.78 3.78 0 0 0-1.21-.81 3.74 3.74 0 0 0-2.84 0 4 4 0 0 0-1.16.75l-.05.06-.65.65-.65-.65-.05-.06a4 4 0 0 0-1.16-.75 3.74 3.74 0 0 0-2.84 0 3.78 3.78 0 0 0-1.21.81 3.55 3.55 0 0 0-.97 1.69 3.75 3.75 0 0 0-.12 1c0 .317.04.633.12.94a4 4 0 0 0 .36.89 3.8 3.8 0 0 0 .61.79L8 14.31l5.91-5.91c.237-.233.44-.5.6-.79A3.578 3.578 0 0 0 15 5.78a3.747 3.747 0 0 0-.12-1zm-1 1.63a2.69 2.69 0 0 1-.69 1.21l-5.21 5.2-5.21-5.2a2.9 2.9 0 0 1-.44-.57 3 3 0 0 1-.27-.65 3.25 3.25 0 0 1-.08-.69A3.36 3.36 0 0 1 2.06 5a2.8 2.8 0 0 1 .27-.65c.12-.21.268-.4.44-.57a2.91 2.91 0 0 1 .89-.6 2.8 2.8 0 0 1 2.08 0c.33.137.628.338.88.59l1.36 1.37 1.36-1.37a2.72 2.72 0 0 1 .88-.59 2.8 2.8 0 0 1 2.08 0c.331.143.633.347.89.6.174.165.32.357.43.57a2.69 2.69 0 0 1 .35 1.34 2.6 2.6 0 0 1-.06.72h-.03z" fill={defaultColour}/>
          </svg>
        );
      }
    } break;
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setActivated()}
    >
      {renderables}
    </button>
  );
};

const Comment = ({ username, content, likeCount, dislikeCount, userReaction, handleLikeDislike }) => {
  return (
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
        <div>{username}</div>
      </div>
      <p>{content}</p>
      <div className="bf-comment-interaction">
        <div>
          <PostInteractableButton type="thumbs-up" hoveredColour={"#6fd465"} activated={userReaction === 'liked'} setActivated={() => handleLikeDislike(true)} />
          <p>{likeCount}</p>
        </div>

        <div>
          <PostInteractableButton type="thumbs-down" hoveredColour={"#d47266"} activated={userReaction === 'disliked'} setActivated={() => handleLikeDislike(false)} />
          <p>{dislikeCount}</p>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments, handleLikeDislike, handleCommentSubmit }) => {
  return (
    <div className="bf-comment-section">
      <form onSubmit={handleCommentSubmit}>
        <textarea rows="4" name="bf-comment-content" placeholder="Add comment ..." required></textarea>
        <button className="bf-main-button-design">Submit</button>
      </form>
      <div className="bf-comment-header">
        <h3>Comments</h3>
        <div>{comments.length}</div>
      </div>
      <div className="bf-comments">
        {
          comments.map((comment, idx) => (
              <Comment
                key={comment.id}
                username={comment.username} 
                content={comment.content}
                likeCount={comment.likes}
                dislikeCount={comment.dislikes}
                userReaction={comment.user_reaction}
                handleLikeDislike={(like) => handleLikeDislike(like, comment.id, idx)}
              />
            )
          )
        } 
      </div>
    </div>
  );
};

const PostSection = ({ post, userHearted=false, handleHeart, heartCount }) => {
  return (
    <>
      <h1>{post.title}</h1>
      <div className="bf-post-details">
        <p>
          {
            utils.dateToString(post.created_at)
          }
        </p>
        <p>By {post.author}</p>
      </div>
      <p className="bf-post-expanded-content">
        {post.content}
      </p>
      
      <section className="bf-post-bottom">
        <div className="bf-post-bottom-entry">
          <PostInteractableButton type="heart" activated={userHearted} setActivated={handleHeart}/>
          <p>{heartCount}</p>
        </div>
      </section>
    </>
  );
};

const PostPage = () => {
  const { state } = useLocation();
  const auth = useAuth();
  const [comments, setComments] = useState([]);
  const [userHearted, setUserHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const post = state.post;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    api
      .postComment(auth.token, post.id, fd.get("bf-comment-content"))
      .then(result => {
        if (result.ok) {
          e.target.reset();
          setComments([result.commentDetail, ...comments])
        } else {
          console.error(result.message);
        }
      });
  };

  useEffect(() => {
    const fetchComments = async () => {
      const fetched = await api.getAllComments(auth.token, post.id);
      if (fetched.ok) {
        console.log(fetched.comments);
        setComments(fetched.comments);
      } else {
        console.error(fetched.message);
      }
    };

    const fetchUserHasHeartPost = async () => {
      const fetched = await api.getUserHasHeartPost(auth.token, post.id);
      if (fetched.ok) {
        console.log(fetched.message);
        setUserHearted(fetched.hearted);
        setHeartCount(fetched.heartCount);
      } else {
        console.error(fetched.message);
      }
    };

    fetchComments();
    fetchUserHasHeartPost();
  }, []);

  const handleLikeDislike = (like, comment_id, idx) => {
    api
      .toggleLikeDislike(auth.token, post.id, comment_id, like ? "like" : "dislike")
      .then(result => {
        if (result.ok) {
          setComments(prevArray => {
            const newArray = [...prevArray];
            const oldReaction = newArray[idx].user_reaction;
            newArray[idx].user_reaction = result.newValue;

            switch (oldReaction) {
              case "liked": {
                newArray[idx].likes -= 1;
              } break;

              case "disliked": {
                newArray[idx].dislikes -= 1;
              } break;
            }

            switch (newArray[idx].user_reaction) {
              case "liked": {
                newArray[idx].likes += 1;
              } break;

              case "disliked": {
                newArray[idx].dislikes += 1;
              } break;
            }

            return newArray;
          });
        } else {
          console.error(result.message);
        }
      });
  }; 

  const handleHeart = () => {
    api
      .toggleHeart(auth.token, post.id)
      .then(result => {
        if (result.ok) {
          setUserHearted(result.newValue === "heart");
          setHeartCount(stateHeartCount => {
            if (result.newValue === "heart") {
              return stateHeartCount + 1;
            } else {
              return stateHeartCount - 1;
            }
          });

        } else {
          console.error(result.message);
        }
      })
  };

  return (
    <div className="bf-post-expanded-root"> 
      <PostSection post={post} handleHeart={handleHeart} userHearted={userHearted} heartCount={heartCount} />
      <div className="bf-divider"></div>
      <CommentSection
        comments={comments}
        handleLikeDislike={handleLikeDislike}
        handleCommentSubmit={handleCommentSubmit}
      />
    </div>
  )
};

export default PostPage;

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired,
  userReaction: PropTypes.oneOf(["liked", "disliked", "none"]),
  handleLikeDislike: PropTypes.func.isRequired,
};

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  handleLikeDislike: PropTypes.func.isRequired,
  handleCommentSubmit: PropTypes.func.isRequired,
};
