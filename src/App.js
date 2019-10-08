import React from 'react';

import { Route, Switch} from 'react-router-dom';
import RegisterUserComponent from './components/registerComponent';

import './App.css';
import LoginComponent from './components/loginComponent';
import DashBoardComponent from './components/profile/dashBoard';

const App = (props) => {
  return (
    <div className="App">
    
    <Switch>
      <Route path="/register">
      <RegisterUserComponent />
     
      </Route>

      <Route exact path="/login">
      <LoginComponent />
      </Route>

      <Route path="/profile" >
      <DashBoardComponent />
      </Route>

    </Switch>
     
    </div>
  );
}

export default App;
