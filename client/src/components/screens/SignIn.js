import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { UserContext } from "../../App";

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
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signInUser = () => {
    if (
      //eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("invalid email format");
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("Welcome back!");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signInUser();
  };

  return (
    <Container>
      <Card>
        <h1>Cookbooks</h1>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here.</Link>
        </p>
        <p>
          <Link to="/reset">Forgot password ?</Link>
        </p>
      </Card>
    </Container>
  );
};

export default SignIn;
