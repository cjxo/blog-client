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
      method: "POST",
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

export default {
  signin,
  signup,
  getAccessToken,
  signout,
};
