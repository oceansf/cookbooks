import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import { Squash as Hamburger } from 'hamburger-react';

const Container = styled.div`
  width: 100%;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
`;

const Wrapper = styled.div`
  width: 85%;
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const LinkList = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: 1rem;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;

  &:focus,
  &:hover {
    color: #24fe41;
  }
  ,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Nav = () => {
  const size = useWindowSize();

  const [isOpen, setOpen] = useState(false);

  return (
    <Container>
      <Wrapper>
        <LogoLink to="/">
          <h2>Cookbooks</h2>
        </LogoLink>
        {size.width <= 600 ? (
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        ) : (
          <LinkList>
            <StyledLink to="/signin">
              <h4>Sign In</h4>
            </StyledLink>
            <StyledLink to="/signup">
              <h4>Sign Up</h4>
            </StyledLink>
            <StyledLink to="/profile">
              <h4>Profile</h4>
            </StyledLink>
          </LinkList>
        )}
      </Wrapper>
    </Container>
  );
};

export default Nav;
