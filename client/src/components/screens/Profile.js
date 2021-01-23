import React from 'react';
import styled from 'styled-components';
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

const Gallery = styled.div`
  display: flex;
`;

const GalleryColumn = styled.div`
  flex: 1;
`;

const Picture = styled.img`
  vertical-align: middle;
  max-width: 30%;
  height: auto;
  padding: 4px;
`;

const Profile = () => {
  return (
    <React.Fragment>
      <Nav />
      <ProfileWrapper>
        <ProfileHeader>
          <ProfilePicture
            src="https://images.unsplash.com/photo-1578173257188-2c095b0aef8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="profile-pic"
          />
          <ProfileInfo>
            <h2 style={{ fontSize: '35px', fontWeight: '100' }}>ocean_fuaga</h2>
            <ProfileStats>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>10</span> posts
                </h3>
              </div>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>10</span> followers
                </h3>
              </div>
              <div style={{ marginRight: '1rem' }}>
                <h3 style={{ fontWeight: '400' }}>
                  <span style={{ fontWeight: '600' }}>10</span> following
                </h3>
              </div>
            </ProfileStats>
          </ProfileInfo>
        </ProfileHeader>
        <Gallery>
          <GalleryColumn>
            <Picture
              src="https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1582234363542-ee64d0ccb0d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1582234363542-ee64d0ccb0d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
            <Picture
              src="https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="food"
            />
          </GalleryColumn>
        </Gallery>
      </ProfileWrapper>
    </React.Fragment>
  );
};

export default Profile;
