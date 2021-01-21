import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav';
import Post from '../Post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  return (
    <Container>
      <Nav />
      <Post />
      <Post />
    </Container>
  );
};

export default Home;
