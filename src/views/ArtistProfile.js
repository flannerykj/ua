import React, { Component } from 'react';
import {reverseSlugify} from '../utils'
import {getArtist} from '../utils/api'
import Performance from '../components/Performance'

export default class ArtistProfile extends Component {
  constructor() {
    super()
    this.state = { artist: {} };
  }

  getData() {
    const slug = this.props.match.params.artist;
    const id = reverseSlugify(slug).id
    getArtist(id).then((artist) => {
      this.setState({ artist });
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const artist = this.state.artist
    var performances = <span>"No Performances"</span>;
    if (artist.performances) {
      performances = <div> Performances
        {artist.performances.map((performance, index) => (
          <Performance performance={performance} index={index}/>
        ))}
        </div>
    }
    return (
      <div>
        <h1>{artist.name}</h1>
        {artist.instrument}
        {performances}
      </div>
    )
  }
}
