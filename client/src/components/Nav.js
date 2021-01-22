import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import { Squash as Hamburger } from 'hamburger-react';

const Navbar = styled.nav`
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

const Logo = styled.h2`
    font-size: 2rem;
    background: -webkit-linear-gradient(#FDFC47, #24FE41);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Pacifico', cursive;
    margin: 0;
`;

const LinkList = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: 1rem;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;

  :focus,
  :hover {
    color: #24fe41;
  }
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
`;

const Nav = () => {
  const size = useWindowSize();

  const [isOpen, setOpen] = useState(false);

  return (
    <Navbar>
      <Wrapper>
        <LogoLink to="/">
          <Logo>Cookbooks</Logo>
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
    </Navbar>
  );
};

export default Nav;
