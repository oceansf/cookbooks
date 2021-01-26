import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import { Squash as Hamburger } from 'hamburger-react';
import toast from 'react-hot-toast';

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
  background: -webkit-linear-gradient(#fdfc47, #24fe41);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Pacifico', cursive;
  margin: 0;
`;

const LinkList = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: ${props => (props.secondary ? '0' : '1rem')};
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

const MenuWrapper = styled.div`
  width: 150px;
  background: white;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: absolute;
  right: 1rem;
  top: 5rem;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: black;

  :hover {
    background: #f5f5f5;
  }
`;

const Nav = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const size = useWindowSize();
  //TODO: show auth links only when user isn't logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkLogIn();
  }, [isLoggedIn]);

  const checkLogIn = () => {
    if (localStorage.getItem('jwt')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const LogOut = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    history.push('/signin');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    toast('See you soon!', {
      icon: '👋',
    });
  };

  const PopoutMenu = () => {
    return (
      <MenuWrapper
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuList>
          {isLoggedIn ? (
            <React.Fragment>
              <StyledLink to="/createpost" secondary="true">
                <MenuItem>Post a recipe</MenuItem>
              </StyledLink>
              <StyledLink to="/profile" secondary="true">
                <MenuItem>View profile</MenuItem>
              </StyledLink>
              <MenuItem onClick={() => LogOut()}>Log out</MenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <StyledLink to="/signin" secondary="true">
                <MenuItem>Sign In</MenuItem>
              </StyledLink>
              <StyledLink to="/signup" secondary="true">
                <MenuItem>Create an account</MenuItem>
              </StyledLink>
            </React.Fragment>
          )}
        </MenuList>
      </MenuWrapper>
    );
  };

  return (
    <Navbar>
      <Wrapper>
        <LogoLink to="/">
          <Logo>Cookbooks</Logo>
        </LogoLink>
        {size.width <= 600 ? (
          <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
            {isMenuOpen && <PopoutMenu />}
          </div>
        ) : (
          <React.Fragment>
            <LinkList>
              {!isLoggedIn && (
                <React.Fragment>
                  <StyledLink to="/signin">
                    <h4>Sign In</h4>
                  </StyledLink>
                  <StyledLink to="/signup">
                    <h4>Create an account</h4>
                  </StyledLink>
                </React.Fragment>
              )}

              {isLoggedIn && (
                <StyledLink
                  to="/profile"
                  onMouseOver={() => setIsMenuOpen(true)}
                >
                  <h4>Profile</h4>
                </StyledLink>
              )}
            </LinkList>
            {isMenuOpen && <PopoutMenu />}
          </React.Fragment>
        )}
      </Wrapper>
    </Navbar>
  );
};

export default Nav;
