import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPerformances } from '../utils/api';
import { isLoggedIn } from '../utils/AuthService';
import {makeUrl} from '../utils'
import Performance from '../components/Performance'

class Performances extends Component {

  constructor() {
    super()
    this.state = { performances: [] };
  }

  getData() {
    getPerformances().then((performances) => {
      this.setState({ performances });
    });
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    const { performances }  = this.state;
    return (
      <div>
        <h1>Performances</h1>
        <Link to='/performances/new'><button id='add-performance'>+ New Performance</button></Link>
        <hr/>

        { performances.map((performance, index) => (
              <Performance performance={performance} index={index}/>
          ))}
      </div>
    );
  }
}

export default Performances;
