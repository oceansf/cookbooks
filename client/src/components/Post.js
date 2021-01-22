import React, {useState} from 'react';
import styled from 'styled-components';

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
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileIcon = styled.i`
  margin-right: 1rem;
  border: 3px solid #24fe41;
  border-radius: 100px;
  padding: 2px;
  color: darkgrey;
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

const StarIcon = styled.i`
  color: ${props => props.liked ? 'gold' : 'darkgrey'};
  transition: all 0.3s ease;
  :hover {
    color: gold;
  }
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

const Post = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Card>
      <CardHeader>
        <ProfileIcon className="fas fa-user-circle fa-2x"></ProfileIcon>
        <div>
          <h3>Post Title</h3>
          <h4>Post Author</h4>
        </div>
      </CardHeader>
      <CardContent>
        <CardImage src="https://i.redd.it/ouaadpt068p01.jpg" alt="steak" />
        <CardBody>
          <CardButtons>
            <div>
              <button onClick={() => setLiked(!liked)}>
                {liked ? <StarIcon className="fas fa-star fa-2x" liked={liked} /> : <StarIcon className="far fa-star fa-2x" />}
                <span style={{ fontSize: '1rem' }}> 10 Stars</span>
              </button>
            </div>
            <ViewRecipeButton>View Recipe</ViewRecipeButton>
          </CardButtons>
          <p>
            <span style={{ fontWeight: '600' }}>Post Author</span> Body Content
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
