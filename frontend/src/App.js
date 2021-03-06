import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './views/login';
import Admin from './views/admin';
import './App.less'
function App (){
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Redirect to="/admin"></Redirect>
      </Switch>
    </React.Fragment>
  )
}

export default App;
