import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

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
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 80%;
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
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
`;

const SignIn = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const PostData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(`${data.error}`);
        } else {
          toast.error(`${data.message}`);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Card>
        <h1>Cookbooks</h1>
        <Form>
          <Input
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => PostData()}>Update Password</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
