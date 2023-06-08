import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { UserChildrenType, UserContextType } from "../utils/config";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

export const userContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  authStatus: false,
  setAuthStatus: () => {
    false;
  },
});

export function UserContextProvider({ children }: UserChildrenType) {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    axios.get("/logout").then((res) => {
      if (res.status === 200) {
        setUser(null);
        setAuthStatus(false);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (!user) {
      axios
        .get("/auth")
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) =>
          console.error("Error fetching user profile: ", error)
        );
    }
  }, [authStatus]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        logout,
        authStatus,
        setAuthStatus,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
