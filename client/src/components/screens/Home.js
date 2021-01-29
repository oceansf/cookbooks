import React, { useEffect, useState } from 'react';
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

// const fetchPosts = async () => {
//   const res = await fetch('/feed', {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//     },
//   });
//   console.log(res);
//   return res.json();
// };

const Home = () => {
  const size = useWindowSize();
  const [data, setData] = useState([]);
  // const { isLoading, error, data } = useQuery('posts', fetchPosts);

  // if (isLoading) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;

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
      <Container>
        {data.map(post => {
          return (
            <Post
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
