import React, { Component } from 'react';
import {authenticate, setIdToken} from '../utils/AuthService'
import {withRouter} from 'react-router-dom'

class _Login extends Component {
  constructor() {
    super()
    this.state = {
      username: 'flannj',
      password: 'cheesecake'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  _handleLogin() {
    this.props.onLogin(this.state.username, this.state.password);
    this.props.history.push('/')
  }
  handleInputChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    var obj = this.state;
    obj[field] = value;
    this.setState(obj)
  }
  render() {
    const {username, password} = this.state
    return (
      <div>
      <h1> Login </h1>
      <form id='login-form'>
        <label htmlFor='username'>Username: </label><input type='text' onChange={this.handleInputChange} name='username' value={username}/>
        <label htmlFor='password'>Password: </label><input type='password' name="password" value={password} onChange={this.handleInputChange}/>
      </form>
      <button onClick={() => this._handleLogin()}>Login</button>
      </div>
    )
  }
}

export default withRouter(_Login);
