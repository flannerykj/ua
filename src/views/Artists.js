import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../utils/api';
import {makeUrl} from '../utils'
import Performance from '../components/Performance'

class Artists extends Component {

  constructor() {
    super()
    this.state = { artists: [] };
  }

  getData() {
    getArtists().then((artists) => {
      this.setState({ artists });
    });
  }

  componentDidMount() {
    this.getData();
  }
  getPerformances(artist) {
    var num = artist.performances.length;
    if (num>0) {
      var seeMore = '';
      if (num>1) {
        seeMore = <Link to={makeUrl('/artists/', artist.name, artist.id)}> See {num} performances from {artist.name}</Link>
      }
      return (
        <div>
          <h4>Most Recent Performance</h4>
          <Performance performance={artist.performances[0]} index={0}/>
          {seeMore}
        </div>
      )
    }
    return "No Performances";
  }

  render() {

    const { artists } = this.state;

    return (
      <div>
        <h1>Artists</h1>
        <hr/>

        { artists.map((artist, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-danger">
                  <div className="panel-heading">
                    <h3 className="panel-title"><span className="btn">#{ artist.id }</span></h3>
                  </div>
                  <div className="panel-body">
                  <ul>
                    <Link to={makeUrl('/artists/', artist.name, artist.id)}>
                      <li> { artist.name } </li>
                    </Link>
                    <li> { artist.instrument } </li>
                    </ul>
                    {this.getPerformances(artist)}
                  </div>
                </div>
              </div>
          ))}
      </div>
    );
  }
}

export default Artists;
