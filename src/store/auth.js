// store/auth.js
import axios from 'axios';
import router from '../router'; // Import your router instance

const state = {
  authToken: null
};

const mutations = {
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
  }
};

const actions = {
  setAuthToken({ commit }, token) {
    commit('SET_AUTH_TOKEN', token);
    console.log(token);
  },
  async checkAuthStatus() {
    try {
      // Example: Assume you have a server-side endpoint to check the authentication status
      const response = await axios.post('http://127.0.0.1:8000/api/checkToken');

      if (response.data.status) {
        return Promise.resolve(); // Authentication successful
      } else {
        // Check for "Unauthenticated" message
        if (response.data.message === 'Unauthenticated.') {
          // Redirect to login
          router.push('/login');
        }
        return Promise.reject(); // Authentication failed for reasons other than "Unauthenticated" message
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      return Promise.reject(error); // Handle the error and reject the promise
    }
  }
};

const getters = {
  authToken: state => state.authToken
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
