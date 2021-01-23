import React, {useState, useEffect} from 'react';
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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/feed', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setData(result.posts)
    });
  }, [])

  return (
    <React.Fragment>
      <Nav />
      <Container>
        {data.map(post => {
          return (
            <Post key={post._id} title={post.title} author={post.postedBy.name} body={post.body} />
          )
         })}
      </Container>
      {size.width <= 600 ? <MobileNav /> : null}
    </React.Fragment>
  );
};

export default Home;
