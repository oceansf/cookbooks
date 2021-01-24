import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav';

const Card = styled.div`
  width: 544px;
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
`;

const CreatePost = () => {
  return (
    <React.Fragment>
      <Nav />
      <Card>
        <Form>
          <h1>Post a Recipe</h1>

          <Button type="submit">Post Recipe</Button>
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default CreatePost;
