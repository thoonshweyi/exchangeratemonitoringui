import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ user,token, children }) => {
  return <AuthContext.Provider value={{user,token}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
