const geturl = () => {
  console.log(import.meta.env.MODE);
};

console.log(import.meta.env.MODE);

const signin = async (username, password) => {
  const result = { ok: true, message: "Successfully Signed In.", accessToken: null };
  try {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      result.ok = false;
      result.message = errorData.message || 'Something went wrong. Please try again.';
    } else {
      const data = await response.json();
      result.message = data.message;
      result.accessToken = data.accessToken;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const signup = async (firstName, lastName, username, email, password) => {
  const result = { ok: true, message: "Successfully Signed Up." };
  try {
    const response = await fetch("http://localhost:3000/auth/sign-up", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      result.ok = false;
      result.message = errorData.message || 'Something went wrong. Please try again.';
    } else {
      const data = await response.json();
      result.message = data.message;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const getAccessToken = async () => {
  const result = { ok: true, message: "Success", accessToken: null, userId: 0, username: "" };
  try {
    const response = await fetch ("http://localhost:3000/auth/token", {
      mode: "cors",
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.accessToken = data.accessToken;
      result.userId = data.userId;
      result.username = data.username;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const signout = async () => {
  const result = { ok: true, message: "Success" };
  try {
    const response = await fetch("http://localhost:3000/auth/sign-out", {
      mode: "cors",
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const acquireEntirePosts = async () => {
  const result = {
    ok: true,
    message: "",
    posts: [],
  };

  try {
    const response = await fetch("http://localhost:3000/posts", {
      mode: "cors",
      credentials: "include",
      method: "GET",
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.posts = data.posts;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const acquirePostFromUserId = async (id, filterBy) => {
  const result = {
    ok: true,
    message: "",
    posts: []
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${id}/posts?filterBy=${filterBy}`, {
      mode: "cors",
      method: "GET",
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.posts = data.posts;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }
  return result;
};

const createPost = async (title, content, published, token) => {
  const result = {
    ok: true,
    message: "",
  };

  try {
    const response = await fetch("http://localhost:3000/posts", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, published })
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const postComment = async (token, post_id, commentContent) => {
  const result = {
    ok: true,
    message: "",
    commentDetail: null, // I desire this to have Username, Commnet Content, Likes/Dislikes Count
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/comment`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: commentContent }),
    });

    if (!response.ok) {
      const errData = await response.json();

      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.commentDetail = data.commentDetail;
    }

  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return(result);
};

const getAllComments = async (token, post_id) => {
  const result = {
    ok: true,
    message: "",
    comments: [],
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/comments`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();

      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.comments = data.comments;
    }

  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
}

const toggleLikeDislike = async (token, post_id, comment_id, type) => {
  const result = {
    ok: true,
    message: "",
    newValue: "",
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/comment/${comment_id}/like`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type })
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.newValue = data.newValue;
    }

  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

// statisticsToSet can take
// heart: true, false,
// comment_id: for comment
// like: "like"/"dislike" to toggle.
// view: true
const setPostStatistics = async (token, post_id, statisticsToSet) => {
  const result = {
    ok: true,
    message: "",
  };

  try {
    const response = await fetch (`http://localhost:3000/posts/${post_id}/statistics`, {
      mode: "cors",
      credentials: "include",
      method: "PUT",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statisticsToSet),
    });

    const data = await response.json();
    result.message = data.message;
    if (!response.ok) {
      result.ok = false;
    } else {
      result.setData = data.setData;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

// OH LOOK! We got alot of similar API's that sets/gets __SOMETHING__
// about the post! For instance, toggleHearts/toggleLikeDislike, or
// getHeartCount/likeDislikeCount!
// for now, we let the repetition unfold to see later how we condense this!
// Find Patterns!
const getPostStatistics = async (token, post_id) => {
  const result = {
    ok: true,
    message: "",
    heartedByUser: false,
    heartCount: 0,
    viewCount: 0,
    // commentCount: 0,
    // userCommentLikes: [],
    // userCommentDislikes: [],
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/statistics`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      result.ok = false;
      result.message = errData.message;
    } else {
      const data = await response.json();
      result.message = data.message;
      result.heartedByUser = data.heartedByUser;
      result.heartCount = data.heartCount;
      result.viewCount = data.viewCount;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const editUserDetail = async (token, newUname) => {
  const result = {
    ok: true,
    message: "",
  };

  try {
    const response = await fetch("http://localhost:3000/auth/edit", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newUsername: newUname,
      })
    });
    const data = await response.json();
    result.message = data.message;
    if (!response.ok) {
      result.ok = false;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

const deletePost = async (token, post_id) => {
  const result = {
    ok: true,
    message: "",
  };
  
  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    result.message = data.message;
    if (!response.ok) {
      result.ok = false;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
};

export default {
  signin,
  signup,
  getAccessToken,
  signout,
  acquireEntirePosts,
  acquirePostFromUserId,
  createPost,
  postComment,
  getAllComments,
  toggleLikeDislike,
  setPostStatistics,
  getPostStatistics,
  editUserDetail,
  deletePost,
};
