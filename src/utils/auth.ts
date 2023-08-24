const TOKEN_KEY = "token";

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };

// import Cookies from 'js-cookie';

// const TOKEN_KEY = 'page-gateway-sid-cn-dev';

// const isLogin = () => {
//   return !!Cookies.get(TOKEN_KEY);
// };

// const getToken = () => {
//   return Cookies.get(TOKEN_KEY);
// };

// const setToken = (token: string) => {
//   Cookies.set(TOKEN_KEY, token);
// };

// const clearToken = () => {
//   Cookies.remove(TOKEN_KEY);
// };

// export { isLogin, getToken, setToken, clearToken };
