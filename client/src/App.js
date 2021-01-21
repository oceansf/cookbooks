import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;
