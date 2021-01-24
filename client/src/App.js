import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import { Toaster } from 'react-hot-toast';
import CreatePost from './components/screens/CreatePost';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/createPost" component={CreatePost} />
          </Switch>
        </Router>
      </Container>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;
