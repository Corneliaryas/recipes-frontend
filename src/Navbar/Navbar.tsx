import styled from "@emotion/styled";
import { NavLink } from "react-router";

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

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  column-gap: 0.5rem;
`;
export const Navbar = () => {
  return (
    <Nav>
      <StyledNavLink to="/">Recipes</StyledNavLink>
      <StyledList>
        <li>
          <StyledNavLink to="/add-recipe">Add recipe</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/">Overview</StyledNavLink>
        </li>
      </StyledList>
    </Nav>
  );
};
