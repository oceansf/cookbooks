import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
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
  object-fit: cover;

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

const FollowButton = styled.button`
  background: ${props => (props.following ? 'white' : '#1cbf32')};
  color: ${props => (props.following ? '#1cbf32' : 'white')};
  border: 2px solid #1cbf32;
  width: 65%;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease;
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

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);

  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        //console.log(result)

        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));

        setProfile(prevState => {
          const newFollower = prevState.user.followers.filter(
            item => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <React.Fragment>
      <Nav />
      {userProfile ? (
        <ProfileWrapper>
          <ProfileHeader>
            <ProfilePicture
              src={userProfile.user.pic}
              alt={userProfile.user.name}
            />
            <ProfileInfo>
              <h2 style={{ fontSize: '35px', fontWeight: '500' }}>
                {userProfile ? userProfile.user.name : 'loading'}
              </h2>
              <ProfileStats>
                <div style={{ marginRight: '1rem' }}>
                  <h3 style={{ fontWeight: '400' }}>
                    <span style={{ fontWeight: '600' }}>
                      {userProfile.posts.length}
                    </span>{' '}
                    posts
                  </h3>
                </div>
                <div style={{ marginRight: '1rem' }}>
                  <h3 style={{ fontWeight: '400' }}>
                    <span style={{ fontWeight: '600' }}>
                      {userProfile.user.followers.length}
                    </span>{' '}
                    followers
                  </h3>
                </div>
                <div style={{ marginRight: '1rem' }}>
                  <h3 style={{ fontWeight: '400' }}>
                    <span style={{ fontWeight: '600' }}>
                      {userProfile.user.following.length}
                    </span>{' '}
                    following
                  </h3>
                </div>
              </ProfileStats>
              {!showfollow ? (
                <FollowButton following onClick={() => unfollowUser()}>
                  Unfollow
                </FollowButton>
              ) : (
                <FollowButton onClick={() => followUser()}>Follow</FollowButton>
              )}
            </ProfileInfo>
          </ProfileHeader>
          <Gallery>
            {userProfile.posts.map(post => (
              <Image image={post.photo} key={post.title}></Image>
            ))}
          </Gallery>
        </ProfileWrapper>
      ) : (
        <h4>Loading...</h4>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
