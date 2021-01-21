import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 80%;
  background-color: #fafafa;
  border: none;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  padding: 1rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background: #24fe41;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const CardText = styled.p`
  text-align: center;
  font-weight: 500;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
  color: #757575;
`;

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const uploadFields = () => {
    // Check for valid email format in input field
    if (
      //eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error('Invalid email format');
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          history.push('/signin');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    uploadFields();
  };

  return (
    <Container>
      <Card>
        <h1>Cookbooks</h1>
        <CardText>
          Create an account to view and share recipes with your friends!
        </CardText>
        <Form onSubmit={e => handleSubmit(e)}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {/* <Input type="text" placeholder="Username" /> */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </Form>
        <p>
          Already have an account? <Link to="/signin">Sign in here.</Link>
        </p>
      </Card>
    </Container>
  );
};

export default SignUp;
