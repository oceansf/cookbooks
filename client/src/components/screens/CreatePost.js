import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import toast from 'react-hot-toast';
import Nav from '../Nav';
import MobileNav from '../MobileNav';

const Card = styled.div`
  width: 544px;
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const Input = styled.input`
  width: 200px;
  background-color: #fafafa;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin: 0.25rem 0;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const ListInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ListInput = styled.input`
  width: 100%;
  background-color: #fafafa;
  border-radius: 99px;
  border: 1px solid lightgrey;
`;

const ListItem = styled.li`
  margin: 1rem 0;
`;

const AddButton = styled.button`
  border-radius: 99px;
  color: #24fe41;
  font-weight: bold;
  background: white;
  margin-left: 0.5rem;
`;

const PostRecipeButton = styled.button`
  width: 70%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 17px;
  background: #24fe41;
  padding: 1rem 1rem;
  margin-top: 2rem;
  :active {
    background: #01e41f;
  }
`;

const CreatePost = () => {
  const history = useHistory();
  const size = useWindowSize();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [ingredientText, setIngredientText] = useState('');
  const [instructionText, setInstructionText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // Executes only when the postDetails function is ran because that is where the url state is updated.
  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          body,
          image: url,
          ingredients,
          instructions,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success('Post created!');
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //eslint-disable-next-line
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'cookbooks');
    data.append('cloud_name', 'oceansf');
    fetch('https://api.cloudinary.com/v1_1/oceansf/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (image && title && body && ingredients && instructions) {
      postDetails();
    } else {
      toast.error('Please enter all the fields');
    }
  };

  const addIngredient = e => {
    e.preventDefault();
    setIngredients([...ingredients, ingredientText]);
    setIngredientText('');
  };

  const deleteIngredient = index => {
    if (index > -1) {
      ingredients.splice(index, 1);
    }
    setIngredients([...ingredients]);
  };

  const addInstruction = e => {
    e.preventDefault();
    setInstructions([...instructions, instructionText]);
    setInstructionText('');
  };

  const deleteInstruction = index => {
    if (index > -1) {
      instructions.splice(index, 1);
    }
    setInstructions([...instructions]);
  };

  return (
    <React.Fragment>
      <Nav />
      <Card>
        <Form onSubmit={e => onSubmit(e)}>
          <h1>Post a Recipe</h1>
          <div style={{ margin: '2rem 0', textAlign: 'center' }}>
            <label htmlFor="upload" style={{ textAlign: 'center' }}>
              <Header>Upload an Image</Header>
            </label>
            <input
              type="file"
              id="upload"
              name="upload"
              onChange={e => setImage(e.target.files[0])}
            />
            <Input
              type="text"
              placeholder="Recipe Title"
              id="title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Write a caption..."
              name="caption"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          <ListWrapper>
            <Header style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              Ingredients
            </Header>
            {ingredients.length > 0 && (
              <ul>
                {ingredients.map((ingredient, index) => {
                  return (
                    <ListItem key={index}>
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => deleteIngredient(index)}
                      >
                        X
                      </button>
                    </ListItem>
                  );
                })}
              </ul>
            )}
            <ListInputWrapper>
              <ListInput
                type="text"
                placeholder="e.g. 1 tbsp of salt"
                name="ingredient"
                value={ingredientText}
                onChange={e => setIngredientText(e.target.value)}
              />
              <AddButton onClick={e => addIngredient(e)}>
                <i className="fas fa-plus-circle fa-3x"></i>
              </AddButton>
            </ListInputWrapper>
          </ListWrapper>

          <ListWrapper>
            <Header>Instructions</Header>
            {instructions.length > 0 && (
              <ol>
                {instructions.map((instruction, index) => {
                  return (
                    <ListItem key={index}>
                      {instruction}
                      <button
                        type="button"
                        onClick={() => deleteInstruction(index)}
                      >
                        X
                      </button>
                    </ListItem>
                  );
                })}
              </ol>
            )}
            <ListInputWrapper>
              <ListInput
                type="text"
                placeholder="e.g. Pour salt into bowl"
                name="ingredient"
                value={instructionText}
                onChange={e => setInstructionText(e.target.value)}
              />
              <AddButton onClick={e => addInstruction(e)}>
                <i className="fas fa-plus-circle fa-3x"></i>
              </AddButton>
            </ListInputWrapper>
          </ListWrapper>

          <PostRecipeButton type="submit">Post Recipe</PostRecipeButton>
        </Form>
        {size.width <= 600 && <MobileNav />}
      </Card>
    </React.Fragment>
  );
};

export default CreatePost;
