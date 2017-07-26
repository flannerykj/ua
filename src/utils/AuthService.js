import decode from 'jwt-decode';
import auth0 from 'auth0-js';


const ID_TOKEN_KEY = 'id_token';
const BASE_URL = 'http://localhost:8000';

export function authenticate(username, password) {
  var headers = new Headers();
  headers.append("Authorization", "Basic "+username+":"+password);
  return fetch("http://localhost:8000/api-token-auth/", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: "username="+username+"&password="+password
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      var token = data.token;
      if (token==undefined) {
        return false;
      } else {
        setIdToken(token)
        return true;
      }
    }).catch(function(ex) {
      console.log("parsing failed", ex);
    });

}

export function requestUserId(token) {
  if (isLoggedIn()) {
    const url = `${BASE_URL}/userprofiles/`;
    var headers = new Headers();
    headers.append("Authorization", `Token ${token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      headers: headers,
      method: "GET"
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
          localStorage.setItem('userid', data[0].user);
          return data[0].user
      }).catch(function(ex) {
        console.log("parsing failed", ex);
      });
    } else {
      console.log('not logged in')
    }
  }


export function logout() {
  clearIdToken();
}

export function setIdToken(token) {
  localStorage.setItem(ID_TOKEN_KEY, token);
}

export function getUserId() {
  return localStorage.getItem('userid');
}


export function setUserId(token) {
  localStorage.setItem('user_id', token);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

//2 called from FoodJokes.js, Nav.js
export function isLoggedIn() {
  const idToken = getIdToken();
  if (idToken) {return true} else {return false}

}
