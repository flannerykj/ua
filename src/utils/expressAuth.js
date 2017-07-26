export function authenticate(username, password) {
  var headers = new Headers();
headers.append("Authorization", "Basic flannj:cheesecake");
  return fetch("http://localhost:8000/api-token-auth/", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: "username=flannerykj&password=cheesecake"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      return data;
    }).catch(function(ex) {
      console.log("parsing failed", ex);
    });
}


export function getToken() {
  return localStorage.getItem('token');
}
