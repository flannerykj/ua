import axios from 'axios';
import { getAccessToken, getIdToken, isLoggedIn } from './AuthService';

const BASE_URL = 'http://localhost:3333';
const ACCESS_TOKEN = getAccessToken();

export {getFoodData, getCelebrityData};

function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function getCelebrityData() {
  if (isLoggedIn()) {
    const url = `${BASE_URL}/api/jokes/celebrity`;
    //debugger; //OK
    return axios.get(url, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
          }).then(response => response.data);
    } else {
      console.log('not logged in')
    }

  }
