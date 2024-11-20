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
  const result = { ok: true, message: "Success", accessToken: null };
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

const toggleHeart = async (token, post_id) => {
  const result = {
    ok: true,
    message: "",
    newValue: "",
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/heart`, {
      method: "POST",
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
      result.newValue = "none";
    } else {
      const data = await response.json();
      result.message = data.message;
      result.newValue = data.newValue;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
    result.newValue = "none";
  }

  return result;
};

// OH LOOK! We got alot of similar API's that sets/gets __SOMETHING__
// about the post! For instance, toggleHearts/toggleLikeDislike, or
// getHeartCount/likeDislikeCount!
// for now, we let the repetition unfold to see later how we condense this!
// Find Patterns!
const getUserHasHeartPost = async (token, post_id) => {
  const result = {
    ok: true,
    message: "",
    hearted: false,
    heartCount: 0,
  };

  try {
    const response = await fetch(`http://localhost:3000/posts/${post_id}/heart`, {
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
      console.log(data.result);
      result.hearted = data.result.hearted;
      result.heartCount = data.result.heartCount;
    }
  } catch (err) {
    result.ok = false;
    result.message = err;
  }

  return result;
}

export default {
  signin,
  signup,
  getAccessToken,
  signout,
  acquireEntirePosts,
  createPost,
  postComment,
  getAllComments,
  toggleLikeDislike,
  toggleHeart,
  getUserHasHeartPost,
};
