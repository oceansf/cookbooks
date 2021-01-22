import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';
import Nav from '../Nav';
import MobileNav from '../MobileNav';
import Post from '../Post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const size = useWindowSize();

  return (
    <React.Fragment>
      <Nav />
      <Container>
        <Post />
        <Post />
      </Container>
      {size.width <= 600 ? <MobileNav /> : null}
    </React.Fragment>
  );
};

export default Home;
