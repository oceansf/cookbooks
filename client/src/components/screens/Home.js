import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';
import { useQuery } from 'react-query';

import Nav from '../Nav';
import MobileNav from '../MobileNav';
import Post from '../Post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fetchPosts = async () => {
  const res = await fetch('/feed', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  return res.json();
};

const Home = () => {
  const size = useWindowSize();
  const { isLoading, error, data } = useQuery('posts', fetchPosts);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <React.Fragment>
      <Nav />
      <Container>
        {data.posts.map(post => {
          return (
            <Post
              key={post._id}
              title={post.title}
              author={post.postedBy.name}
              image={post.photo}
              body={post.body}
            />
          );
        })}
      </Container>
      {size.width <= 600 && <MobileNav />}
    </React.Fragment>
  );
};

export default Home;
