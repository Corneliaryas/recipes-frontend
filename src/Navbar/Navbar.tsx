import styled from "@emotion/styled";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const Nav = styled.nav`
  height: fit-content;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--primary-color);
`;

const StyledNavLink = styled(NavLink)`
  color: var(--main-text-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-weight: 700;

  :hover,
  :focus,
  &.active {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
  }
`;
const StyledLink = styled(Link)`
  color: var(--main-text-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-weight: 900;

  :hover,
  :focus {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: none;
  margin: 0;
  column-gap: 0.5rem;
  @media (min-width: 576px) {
    display: flex;
  }
`;
const StyledMobileList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  row-gap: 1rem;
  @media (min-width: 576px) {
  }
`;

const Hamburger = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  color: var(--main-text-color);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  @media (min-width: 576px) {
    display: none;
  }
`;

const MobileMenu = styled.nav<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  right: 0;
  width: 75%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--primary-color);
  min-height: 100vh;
  z-index: 1;
  border-start-start-radius: 1rem;
  transform: translateX(${(props) => (props.isMenuOpen ? "0px" : "500px")});
  transition: transform 0.5s ease-in-out;
  @media (min-width: 576px) {
    display: none;
  }
`;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log(isMenuOpen);
  return (
    <>
      <MobileMenu isMenuOpen={isMenuOpen}>
        <StyledMobileList>
          <li>
            <StyledNavLink to="/">Overview</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/add-recipe">Add recipe</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/about">About</StyledNavLink>
          </li>
        </StyledMobileList>
      </MobileMenu>

      <Nav>
        <StyledLink to="/">Happy Recipes</StyledLink>
        <Hamburger onClick={handleMenuClick}>Menu</Hamburger>
        <StyledList>
          <li>
            <StyledNavLink to="/">Overview</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/add-recipe">Add recipe</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/about">About</StyledNavLink>
          </li>
        </StyledList>
      </Nav>
    </>
  );
};
