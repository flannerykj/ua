import decode from 'jwt-decode';
import auth0 from 'auth0-js';


const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'jnt71C1ZVzsZqHOLyZTnnuYG0gj3LdBY';
const CLIENT_DOMAIN = 'flannj.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'read:alljokes';
const AUDIENCE = 'https://flannj.auth0.com/api/chucknorris';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

//1 called from Nav.js
export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

//1 called from Nav.js
export function logout() {
  clearIdToken();
  clearAccessToken();
}

//2 (helper)
export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

//2 (helper)
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

//2 (helper)
function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}
//2 (helper)
function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

//3 (helper) Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//1 called from Callback.js.  Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// 1. called from Callback.js.  Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}
//2 called from FoodJokes.js, Nav.js
export function isLoggedIn() {
  const idToken = getIdToken();
  //console.log(idToken);
  return !!idToken && !isTokenExpired(idToken);
}
//2 helper
function getTokenExpirationDate(encodedToken) {
  try {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  } catch(err) {console.log(err)}
}

//2 helper
function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
