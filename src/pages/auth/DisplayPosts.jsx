import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../../components/AuthProvider.jsx";
import api from "../../api/api.js";
import utils from "../../utils/utils.js";

const PostDisplayCard = ({ post, auth, deletePost }) => { 
  const handleIncrementViewCount = () => {
    api
      .setPostStatistics(auth.token, post.id, { view: true })
      .then(result => {
        console.log(result);
      });
  };
 
  return (
    <div className="bf-post-card">
      <h3 className="bf-post-title">{post.title}</h3>
      <p className="bf-post-contents">
        {post.content.substring(0, Math.min(140, post.content.length))}
        {
          (post.content.length > 140) ? "..." : ""
        }
      </p>
      <p className="bf-post-date">
        {utils.dateToString(post.created_at)}
      </p>
      <div className="bf-divider"></div>
      <div className="bf-post-card-interactables">
        <div className="bf-post-card-author">
          <p>By {post.author}</p>
        </div>
        <div>
          {
            deletePost ? (
              <button
                className="bf-delete-btn bf-main-button-design"
                onClick={deletePost}
              >
                Delete
              </button>
            ) : (
              null
            )
          }
          <Link 
            className="bf-read-more-btn bf-main-button-design"
            to={`/home/post/${post.id}`}
            state={{post}}
            onClick={handleIncrementViewCount}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

// filterBy:
//  - all-posts
//  - hearts
const DisplayPostsPage = ({ userId=null, filterBy="all-posts", allowDelete=false }) => {
  const auth = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const acquirePosts = async () => {
      let acquiredPosts;
      if (userId) {
        acquiredPosts = await api.acquirePostFromUserId(auth.user.id, filterBy);
      } else {
        acquiredPosts = await api.acquireEntirePosts();
      }
      if (acquiredPosts.ok) {
        setPosts(acquiredPosts.posts);
      } else {
        console.error(acquiredPosts.message);
      }
    };

    acquirePosts();
  }, [filterBy, auth.user.name]);

  const getThisPostOuttaHereBruh = (post_id) => {
    api
      .deletePost(auth.token, post_id)
      .then(result => {
        if (result.ok) {
          setPosts(state => state.filter(post => post_id !== post.id));
        } else {
          console.error(result.message);
        }
      });
  };

  return (
    <div className="bf-posts-grid-display">
      {
        posts.map((post) => (
          <PostDisplayCard
            key={post.id}
            post={post}
            auth={auth}
            deletePost={allowDelete ? () => getThisPostOuttaHereBruh(post.id) : null}
           />
        ))
      }
    </div>
  );
};

export default DisplayPostsPage;
