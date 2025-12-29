import API from "./api"

export const registerUser = (data) => {
    return API.post("/auth/register",data);
}

export const loginUser = (data) => {
    return API.post("/auth/login",data);
}

// 🔐 Logout using Authorization header (Bearer token)
export const logoutUser = (token) => {
  return API.post(
    "/auth/logout",
    null, // no request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};