import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext(null);

//Initalize state to hold authentication
export const useAuth = () => useContext(AuthContext);

//Create auth provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

//Define function to require non null authentication state and to redirect to login
export const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
        <Navigate
            to={{ pathname: "/login", state: { from: location } }}
            replace
        />
        );
    }

    return <Outlet />;
};