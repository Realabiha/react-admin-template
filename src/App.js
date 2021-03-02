import React from 'react';
import {Route, Switch, Link, NavLink, Redirect} from 'react-router-dom';
import Login from './views/login';
import Admin from './views/admin';
import Test from './views/test';
import './App.less'
class App extends React.Component{
  render(){
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/test" component={Test}></Route>
          {/* <Redirect from="/" to="/test"></Redirect> */}
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
