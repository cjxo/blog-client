import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import utils from "../../utils/utils.js";
import api from "../../api/api.js";

const PostDisplayCard = ({ post }) => {
  return (
    <div className="bf-post-card">
      <h3 className="bf-post-title">{post.title}</h3>
      <p className="bf-post-contents">
        {post.content.substring(0, Math.min(100, post.content.length))}...
      </p>
      <p className="bf-post-date">
        {utils.dateToString(post.created_at)}
      </p>
      <div className="bf-divider"></div>
      <div className="bf-post-card-interactables">
        <div className="bf-post-card-author">
          <p>By {post.author}</p>
        </div>
        <Link 
          className="bf-read-more-btn"
          to={`post/${post.id}`}
          state={post}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

const DisplayPostsPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const acquirePosts = async () => {
      const acquiredPosts = await api.acquireEntirePosts();
      if (acquiredPosts.ok) {
        setPosts(acquiredPosts.posts);
      } else {
        console.error(acquiredPosts.message);
      }
    };

    acquirePosts();
  }, []);

  return (
    <div className="bf-posts-grid-display">
      {
        posts.map((post) => (
          <PostDisplayCard key={post.id} post={post} />
        ))
      }
    </div>
  );
};

export default DisplayPostsPage;
