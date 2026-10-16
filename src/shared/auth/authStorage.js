const TOKEN_KEY = "mrhomez_admin_token";
const ADMIN_KEY = "mrhomez_admin_user";


export const saveAdminAuth = (
  token,
  admin
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify(admin)
  );
};


export const getAdminToken = () => {
  return localStorage.getItem(
    TOKEN_KEY
  );
};


export const getAdminUser = () => {
  const admin =
    localStorage.getItem(
      ADMIN_KEY
    );

  if (!admin) {
    return null;
  }

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
};


export const clearAdminAuth = () => {
  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    ADMIN_KEY
  );
};