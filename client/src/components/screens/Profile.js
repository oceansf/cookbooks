import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../App';
import Nav from '../Nav';

const ProfileWrapper = styled.div`
  width: 975px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProfilePicture = styled.img`
  height: 140px;
  width: 140px;
  border-radius: 99px;

  @media only screen and (max-width: 600px) {
    width: 77px;
    height: 77px;
  }
`;

const ProfileInfo = styled.section`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    align-items: center;
  }
`;

const ProfileStats = styled.section`
  display: flex;
  margin: 1rem 0;
`;

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.25rem;
  justify-items: center;
  padding-top: 0.5rem;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    width: 123px;
    height: 123px;
  }
`;

const Profile = () => {
  const [mypics, setMyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setMyPics(result.myposts);
      });
  }, []);

  return (
    <React.Fragment>
      <Nav />
      {state ? 
      <ProfileWrapper>
        <ProfileHeader>
          <ProfilePicture
            src="https://images.unsplash.com/photo-1578173257188-2c095b0aef8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="profile-pic"
          />
          <ProfileInfo>
            <h2 style={{ fontSize: '35px', fontWeight: '500' }}>
              {state ? state.name : 'loading'}
            </h2>
            <ProfileStats>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>{mypics.length}</span>{' '}
                  posts
                </h3>
              </div>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>{state.followers > 0 ? state.followers : '0'}</span> followers
                </h3>
              </div>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>{state.followers > 0 ? state.followers : '0'}</span> following
                </h3>
              </div>
            </ProfileStats>
          </ProfileInfo>
        </ProfileHeader>
        <Gallery>
          {mypics.map(post => (
            <Image image={post.photo} key={post.title}></Image>
          ))}
        </Gallery>
      </ProfileWrapper>
      :
      <h4>Loading...</h4>
      }
    </React.Fragment>
  );
};

export default Profile;
