import React, { Component } from 'react';
import {makeUrl, timeSince} from '../utils'
import {Link} from 'react-router-dom'
export default class Performance extends Component {

  render() {
    const {performance, index} = this.props;
    var datetime = new Date(performance.date_time)
    return (
      <div className="col-sm-6" key={index}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"> <span className="btn">#{ performance.id }</span></h3>
          </div>
          <div className="panel-body">
            <ul>
              <Link to={makeUrl('/artists/', performance.artist_name, performance.artist)}><li> { performance.artist_name } </li></Link>
              <li> { timeSince(datetime) } </li>
              <li> Audience: { performance.user_name } </li>
              <li> Comments: { performance.comments } </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
