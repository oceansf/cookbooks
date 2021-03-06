import React, { useEffect, createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { Toaster } from "react-hot-toast";

import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Reset from "./components/screens/Reset";
import NewPassword from "./components/screens/NewPassword";
import Profile from "./components/screens/Profile";
import UserProfile from "./components/screens/UserProfile";
import CreatePost from "./components/screens/CreatePost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserContext = createContext();

const Routes = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      // This makes it so that users cannot view the home page unless they log in or make an account.
      if (!history.location.pathname.startsWith("/reset")) {
        history.push("/signin");
      }
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/reset" component={Reset} />
      <Route exact path="/reset/:token" component={NewPassword} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userId" component={UserProfile} />
      <Route exact path="/createPost" component={CreatePost} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <GlobalStyle />
      <Container>
        <Router>
          <Routes />
        </Router>
      </Container>
      <Toaster position="bottom-center" />
    </UserContext.Provider>
  );
}

export default App;
