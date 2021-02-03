import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Card = styled.div`
  width: 614px;
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

const MenuIconButton = styled.div`
  cursor: pointer;
  color: ${props => (props.showMenu ? 'grey' : 'darkgrey')};
  padding: 0 1rem;

  transition: all 0.3s ease;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  width: 150px;
  background: white;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  right: 0;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #d32f2f;
  border-radius: 10px;
  :hover {
    background: #f5f5f5;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 614px;
  height: 614px;
  object-fit: cover;
  object-position: 50% 50%;
  
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

const Post = ({
  post,
  postId,
  title,
  authorId,
  author,
  image,
  body,
  likes,
  comments,
}) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    setNumberOfLikes(likes.length);
    checkIfLiked();
  }, [likes, commentCount]);

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

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        // const newData = data.map(item => {
        //   if (item._id == result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setData(newData);
        setCommentCount(comments.length);
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

  const handleSubmit = e => {
    e.preventDefault();
    makeComment(commentText, postId);
    setCommentText('');
  };

  const PopoutMenu = () => {
    return (
      <Menu onMouseLeave={() => setShowMenu(!setShowMenu)}>
        <MenuList>
          <React.Fragment>
            <MenuItem onClick={() => deletePost(postId)}>Delete recipe</MenuItem>
          </React.Fragment>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Card>
      <CardHeader>
        <HeaderInfo>
          <ProfileIcon className="fas fa-user-circle fa-2x"></ProfileIcon>
          <div>
            <h3 style={{ fontWeight: '500' }}>{title}</h3>
            <h4><StyledLink to={authorId !== state._id ? `/profile/${authorId}` : '/profile'}>{author}</StyledLink></h4>
          </div>
        </HeaderInfo>
        {state._id === authorId ? (
          <MenuWrapper>
            <MenuIconButton
              showMenu={showMenu}
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fas fa-ellipsis-v"></i>
            </MenuIconButton>
            {showMenu && <PopoutMenu />}
          </MenuWrapper>
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
          {/* <p>
            <span style={{ fontWeight: '600' }}>ocean_fuaga</span> Looks good!
          </p>
          <p>
            <span style={{ fontWeight: '600' }}>gordanramsay</span> I disagree.
          </p> */}
          {comments.map(comment => {
            return (
              <p key={comment._id}>
                <span style={{ fontWeight: '600' }}>
                  {comment.postedBy.name}{' '}
                </span>
                {comment.text}
              </p>
            );
          })}
          <CommentForm onSubmit={e => handleSubmit(e)}>
            <CommentInput
              type="text"
              placeholder="Add comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <PostCommentButton type="submit">POST</PostCommentButton>
          </CommentForm>
        </CardBody>
      </CardContent>
    </Card>
  );
};

export default Post;
