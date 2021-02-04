import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';
import { UserContext } from '../../App';

import Nav from '../Nav';
import MobileNav from '../MobileNav';
import Post from '../Post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const size = useWindowSize();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/feed', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setData(result.posts);
      });
  }, []);

  return (
    <React.Fragment>
      <Nav />
      {!state && <h4 style={{marginTop: '4rem'}}>Sign in or create an account to view recipes!</h4>}
      <Container>
        {data.map(post => {
          return (
            <Post
              post={post}
              key={post._id}
              postId={post._id}
              title={post.title}
              authorId={post.postedBy._id}
              author={post.postedBy.name}
              image={post.photo}
              body={post.body}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
      </Container>
      {size.width <= 600 && <MobileNav />}
    </React.Fragment>
  );
};

export default Home;
