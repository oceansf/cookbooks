import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import Nav from '../Nav';

const Card = styled.div`
  width: 544px;
  margin-top: 2rem;
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
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 200px;
  background-color: #fafafa;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 50%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background: #24fe41;
  padding: 1rem 1rem;
  margin-top: 0.5rem;
  :active {
    background: #01e41f;
  }
`;

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

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
    if (image && title && body) {
      postDetails();
    } else {
      toast.error('Please enter all the fields');
    }
  };

  return (
    <React.Fragment>
      <Nav />
      <Card>
        <Form onSubmit={e => onSubmit(e)}>
          <h1>Post a Recipe</h1>
          <div style={{ margin: '1rem 0', textAlign: 'center' }}>
            <label htmlFor="upload" style={{ textAlign: 'center' }}>
              Upload Image
            </label>
            <input
              type="file"
              id="upload"
              name="upload"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
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
          <Button type="submit">Post Recipe</Button>
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default CreatePost;
