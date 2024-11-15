import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api.js";

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
      {posts.map((post) => {
        return (
          <div className="bf-post-card" key={post.id}>
            <h3 className="bf-post-title">{post.title}</h3>
            <p className="bf-post-contents">
              {post.content.substring(0, Math.min(100, post.content.length))}...
            </p>
            <p className="bf-post-date">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
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
      })}


    </div>
  );
};

export default DisplayPostsPage;
