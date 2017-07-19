import React from 'react';
import ReactDOM from 'react-dom';
import CelebrityJokes from './components/CelebrityJokes';
import FoodJokes from './components/FoodJokes';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { isLoggedIn } from './utils/AuthService';
import Callback from './components/Callback';



const Root = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={FoodJokes}/>
             <Route path="/special" render={() => (
                isLoggedIn() ? (
                  <CelebrityJokes/>
                ) : (
                  <Redirect to="/"/>
                ))}/>
             <Route path="/callback" component={Callback} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
