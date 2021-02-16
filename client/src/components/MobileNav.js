import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = styled.nav`
  width: 100%;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  position: fixed;
  bottom: 0;
  background: white;
  border-top: 1px solid lightgrey;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

const NavButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.color};
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const MobileNav = () => {
  return (
    <Navbar>
      <Wrapper>
        <NavButton color="gold">
          <i className="fas fa-star fa-2x"></i>
        </NavButton>
        <NavButton>
          <Link to="/createpost" style={{ color: "#24fe41" }}>
            <i className="fas fa-plus-circle fa-4x"></i>
          </Link>
        </NavButton>
        <NavButton color="grey">
          <Link to="/profile" style={{ color: "black" }}>
            <i className="far fa-user-circle fa-2x"></i>
          </Link>
        </NavButton>
      </Wrapper>
    </Navbar>
  );
};

export default MobileNav;
