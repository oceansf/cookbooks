import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 50%;
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
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 90%;
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

const SignIn = () => {
  return (
    <Container>
      <Card>
        <h1>Cookbooks</h1>
        <Form>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Log In</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
