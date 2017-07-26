import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Performances from './views/Performances';
import Artists from './views/Artists'
import UserProfile from './views/UserProfile';
import Home from './views/Home';
import Nav from './components/Nav';
import Login from './views/Login';
import PerformanceForm from './views/PerformanceForm';
import ArtistProfile from './views/ArtistProfile';
import Footer from './components/Footer';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { isLoggedIn, logout, authenticate, requestUserId, getIdToken} from './utils/AuthService';

class Root extends Component {
  constructor() {
    super();
    var username = localStorage.getItem('username');
    var id_token = getIdToken()
    this.state = {
      isLoggedIn: isLoggedIn(),
      id_token: id_token,
      username: username
    }
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin(username, password) {
    authenticate(username, password).then((result) => this.setState({
      isLoggedIn: result,
      username: username
    }))
    .then(() => localStorage.setItem('username', username))
    .then(() => localStorage.getItem('id_token'))
    .then( function(id_token) {
      this.setState({
        id_token: id_token
      })
      return requestUserId(id_token)
    })
    .then((userid) => this.setState({'userid': userid}))
  }

  onLogout() {
    logout();
    this.setState({
      isLoggedIn: false,
      username: null
    })
  }
  componentWillMount() {
    requestUserId(this.state.id_token)
    .then((userid) =>
      this.setState({
        userid: userid
      }))
  }
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const profilePath = '/profile/'+this.state.username+'/';
    return (
      <div className="container">
        <BrowserRouter>
          <main>
            <div className="content">
              <div className="content-inside">
                <Nav isLoggedIn={this.state.isLoggedIn} username={this.state.username} onLogout={this.onLogout}/>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/artists" component={Artists}/>
                  <Route  path="/artists/:artist" component={ArtistProfile}/>
                  <Route exact path="/performances" component={Performances}/>
                  <Route exact path="/performances/new" component={PerformanceForm}/>
                  <Route exact path="/login" render={props => <Login onLogin={this.onLogin} />} />
                   <Route exact path={profilePath} render={() => (
                      isLoggedIn() ? (
                        <UserProfile userid={this.state.userid} username={this.state.username} />
                      ) : (
                        <Redirect to="/"/>
                      ))}/>
                </Switch>
              <div className="push"></div>
            </div>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
