import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from '../utils/AuthService';
import '../App.css';
import {withRouter} from 'react-router';
import {getToken} from '../utils/expressAuth'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username
    }
  }
  _handleLogout() {
    this.props.onLogout();
  }

  conditionalNav(){
    const username = this.state.username
    const profilePath = '/profile/'+username+'/';

    if(this.props.isLoggedIn == true) {
      return (
        <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to={profilePath}>
            <button className="btn btn-info log"> Hi, {this.props.username} </button>
          </Link>
        </li>
         <li>
            <a>
              <button className="btn btn-danger log" onClick={() => this._handleLogout()}>Log out </button>
            </a>
          </li>
        </ul>
      )
     } else {

       return (
         <ul className="nav navbar-nav navbar-right">

          <li>
            <button className="btn btn-info log" onClick={() => this.props.history.push('/register')}>Register</button>
          </li>
          <li>
            <button className="btn btn-info log" onClick={() => this.props.history.push('/login')}>Log In</button>
          </li>
        </ul>
      )
    }
  }

  render() {
    var conditionalNav = this.conditionalNav();

    return (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
        <li>
          <Link className="navbar-brand" to="/">Urban Applause</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/performances">Performances</Link>
        </li>
          <li>
            <Link to="/artists">Artists</Link>
          </li>
        </ul>{this.state.loggedIn}
          {conditionalNav}
      </nav>
    );
  }
}

export default withRouter(Nav)
