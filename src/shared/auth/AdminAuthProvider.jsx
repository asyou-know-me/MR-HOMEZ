import {
  useState,
} from "react";

import AdminAuthContext
  from "./AdminAuthContext";

import {
  saveAdminAuth,
  getAdminToken,
  getAdminUser,
  clearAdminAuth,
} from "./authStorage";


function AdminAuthProvider({
  children,
}) {
  const [
    admin,
    setAdmin,
  ] = useState(
    getAdminUser()
  );


  const [
    token,
    setToken,
  ] = useState(
    getAdminToken()
  );


  const login = (
    newToken,
    adminData
  ) => {
    saveAdminAuth(
      newToken,
      adminData
    );

    setToken(
      newToken
    );

    setAdmin(
      adminData
    );
  };


  const logout = () => {
    clearAdminAuth();

    setToken(null);

    setAdmin(null);
  };


  const isAuthenticated =
    Boolean(token);


  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}


export default AdminAuthProvider;