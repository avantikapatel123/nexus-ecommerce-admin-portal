// Check admin login
export const isAdminLoggedIn = () => {
  const admin = localStorage.getItem("isAdmin");

  return admin === "true";
};

// Login
export const loginAsAdmin = () => {
  localStorage.setItem("isAdmin", "true");
};

// Logout
export const logoutAdmin = () => {
  localStorage.removeItem("isAdmin");
};