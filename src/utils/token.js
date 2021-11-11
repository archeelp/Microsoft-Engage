const getDecodedToken = () => {
  const data = localStorage.token?.split(".")[1];
  if (!data) return {};
  return JSON.parse(atob(data));
};

export const getRole = () => {
  return getDecodedToken()?.role;
};

export const isLoggedIn = () => {
  if (getDecodedToken()?.exp < Date.now()) {
    return true;
  } else {
    return false;
  }
};
