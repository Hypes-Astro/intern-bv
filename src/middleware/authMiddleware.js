export const login = async (dispatch, credentials) => {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { username: credentials.username, token: data.token },
      });
    } else {
      alert("Login gagal: Username atau password salah.");
    }
  } catch (error) {
    console.error("Error saat login:", error);
    alert("Terjadi kesalahan saat login.");
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};
