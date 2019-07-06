export const loadAuthToken = () => localStorage.getItem('token');

export const saveAuthToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
