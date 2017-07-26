import React, { Component } from 'react';
import {getUserProfile} from '../utils/api'

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userprofile: null
    }
  }
  handleGetUserProfile(userid) {
    //return getUserProfile(userid)
    }
  render() {
    this.handleGetUserProfile()
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <h1> {this.props.username}</h1>
    )
  }
}
