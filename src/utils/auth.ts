import Cookies from 'js-cookie';

const TOKEN_KEY = 'page-gateway-sid-cn-dev';

const isLogin = () => !!Cookies.get(TOKEN_KEY);

const getToken = () => Cookies.get(TOKEN_KEY);

const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export {
  isLogin, getToken, setToken, clearToken,
};
