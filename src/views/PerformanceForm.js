import React, { Component } from 'react';
import {getArtists, postPerformance} from '../utils/api'
import {instanceCopy} from '../utils'
import { withRouter } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

export default class PerformanceForm extends Component {
  constructor() {
    super()
    this.state = { artists: [] };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  getData() {
    getArtists().then((artists) => {
      this.setState({
        artists: artists,
        artist_id: 'select',
      comments: 'enter'});
    });
  }

  componentDidMount() {
    this.getData();
  }

  handleInputChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    var obj = this.state;
    if(field == 'artist') {
      value = JSON.parse(value);
    }
    obj[field] = value;
    this.setState(obj)
  }

  async handleSubmit() {
    await postPerformance(this.state.artist_id, this.state.comments)
    this.props.history.push('/performances')

  }
  render() {

    const artists = this.state.artists;
    return (
      <div>
        <h1> New Performance </h1>
        <form id='performance-form'>
          <label htmlFor='artist_id'>Artist:</label>
          <select name="artist_id" value={this.state.artist_id} onChange={this.handleInputChange} >
              <option>--Select Artist---</option>
            {artists.map((artist, i) => (
              <option key={i} value={artist.id}>{artist.name}</option>
            ))}
          </select>

          <label htmlFor='comments'> Comments:</label> <input type='text' value={this.state.comments} name='comments' onChange={this.handleInputChange}/>
          </form>
          <button onClick={() => this.handleSubmit()}>Add</button>

      </div>
    )
  }
}
