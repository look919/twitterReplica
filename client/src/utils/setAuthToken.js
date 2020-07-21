import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authentication'] = token;
  } else {
    delete axios.defaults.headers.common['Authentication'];
  }
};

export default setAuthToken;
