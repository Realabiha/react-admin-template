import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './views/login';
import Admin from './views/admin';
import Test from './views/test';
import './App.less'
function App (){
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

export default App;
