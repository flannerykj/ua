import axios from 'axios';
import { isLoggedIn, getIdToken, getUserId} from './AuthService';

export {getPerformances, getArtists, getArtist, postPerformance, getUserProfile};

const BASE_URL = 'http://localhost:8000';
const USER_ID = getUserId()
const ID_TOKEN = getIdToken()

function getPerformances() {
  const url = `${BASE_URL}/performances/`;
  return axios.get(url).then(response => response.data);
}

function getArtists() {
  const url = `${BASE_URL}/artists/`;
  return axios.get(url).then(response => response.data);
}

function getArtist(id) {
  const url = `${BASE_URL}/artists/${id}/`;
  return axios.get(url).then(response => response.data);
}

function postPerformance(artist_id, comments) {
  const url = `${BASE_URL}/performances/`;
  fetch(url, {
    headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({artist: parseInt(artist_id), comments: comments, user: parseInt(USER_ID)})
  }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);

    }).catch(function(ex) {
    console.log("parsing failed", ex);
    });
}

function getUserProfile(userid) {
  const url = `${BASE_URL}/userprofiles/`+userid;
  console.log(url)
  fetch(url, {
    headers: {
    'Accept': 'application/json, text/plain, */*',
    },
  }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);
    }).catch(function(ex) {
    console.log("parsing failed", ex);
    });
}
