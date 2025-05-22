import {jwtDecode} from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken();

export const getUserRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const { role } = jwtDecode(token); 
    return role;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
