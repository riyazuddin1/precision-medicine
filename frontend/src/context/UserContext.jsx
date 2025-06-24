import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch and set user profile using token
  const fetchAndSetUserProfile = async (jwtToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const fullProfile = await res.json();
      setUser(fullProfile);
      localStorage.setItem("user", JSON.stringify(fullProfile));
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  // 🔐 On mount, restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchAndSetUserProfile(storedToken).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Used after login
  const loginUser = async (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);

    await fetchAndSetUserProfile(jwtToken); // fetch full user

    // fallback if fetch fails
    if (!userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("pendingUser");
    localStorage.removeItem("pendingEmail");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, token, loginUser, logoutUser, setUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
