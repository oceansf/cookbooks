import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Card = styled.div`
  width: 600px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const CardHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.i`
  margin-right: 1rem;
  border: 3px solid #24fe41;
  border-radius: 100px;
  padding: 2px;
  color: darkgrey;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  color: grey;
  padding: 0 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const CardBody = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
`;

const CardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StarButton = styled.button`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.i`
  color: ${props => (props.liked ? 'gold' : 'darkgrey')};
  transition: all 0.3s ease;
  :hover {
    color: gold;
  }
  margin-right: 0.2rem;
`;

const ViewRecipeButton = styled.button`
  background: #24fe41;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const CommentInput = styled.input`
  width: 80%;
  border-radius: 100px;
  background-color: #fafafa;
  margin-right: 0.5rem;
`;

const PostCommentButton = styled.button`
  color: #24fe41;
  font-weight: bold;
`;

const Post = ({ postId, title, authorId, author, image, body, likes }) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    setNumberOfLikes(likes.length);
    checkIfLiked();
  }, [likes]);

  const checkIfLiked = () => {
    if (likes.includes(state._id)) {
      setLiked(true);
    }
  };

  const likePost = id => {
    setLiked(true);
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setNumberOfLikes(result.likes.length);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const unlikePost = id => {
    setLiked(false);
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setNumberOfLikes(result.likes.length);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePost = postId => {
    fetch(`/deletepost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        history.go(0);
        toast('Recipe successfully deleted', {
          icon: '🔪',
        });
      });
  };

  return (
    <Card>
      <CardHeader>
        <HeaderInfo>
          <ProfileIcon className="fas fa-user-circle fa-2x"></ProfileIcon>
          <div>
            <h3 style={{ fontWeight: '500' }}>{title}</h3>
            <h4>{author}</h4>
          </div>
        </HeaderInfo>
        {state._id === authorId ? (
          <DeleteButton onClick={() => deletePost(postId)}>
            <i className="fas fa-ellipsis-v"></i>
          </DeleteButton>
        ) : null}
      </CardHeader>
      <CardContent>
        <CardImage src={`${image}`} alt="steak" />
        <CardBody>
          <CardButtons>
            <div style={{ margin: '0.5rem 0' }}>
              <StarButton
                onClick={() => {
                  liked ? unlikePost(postId) : likePost(postId);
                }}
              >
                {liked ? (
                  <StarIcon className="fas fa-star fa-2x" liked={liked} />
                ) : (
                  <StarIcon className="far fa-star fa-2x" />
                )}
                <span style={{ fontSize: '1rem' }}>
                  {' '}
                  {numberOfLikes} {numberOfLikes === 1 ? 'Star' : 'Stars'}
                </span>
              </StarButton>
            </div>
            <ViewRecipeButton>View Recipe</ViewRecipeButton>
          </CardButtons>
          <p>
            <span style={{ fontWeight: '600' }}>{author}</span> {body}
          </p>
          <h4 style={{ color: 'grey' }}>Comments</h4>
          <p>
            <span style={{ fontWeight: '600' }}>ocean_fuaga</span> Looks good!
          </p>
          <p>
            <span style={{ fontWeight: '600' }}>gordanramsay</span> I disagree.
          </p>
          <CommentForm>
            <CommentInput type="text" placeholder="Add comment..." />
            <PostCommentButton type="submit">POST</PostCommentButton>
          </CommentForm>
        </CardBody>
      </CardContent>
    </Card>
  );
};

export default Post;
