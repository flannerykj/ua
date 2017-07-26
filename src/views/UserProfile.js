import React, { Component } from 'react';
import {getUserProfile} from '../utils/api'

export default class UserProfile extends Component {
  constructor() {
    super()
    debugger;//no props defined
    this.state = {
      userprofile: null
    }
  }
  handleGetUserProfile(userid) {
    //return getUserProfile(userid)
    }
    componentWillMount() {
      debugger; //only username defined
    }
  render() {
    this.handleGetUserProfile()
    const user = JSON.parse(localStorage.getItem('user'));
    debugger;
    return (
      <h1> {this.props.username}{this.props.userid}</h1>
    )
  }
}
