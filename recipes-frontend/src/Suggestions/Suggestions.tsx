import styled from "@emotion/styled";
import { Link } from "react-router";

const StyledContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  row-gap: 1rem;
  column-gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RecipeCard = styled(Link)`
  width: 100%;
  height: 176px;
  border-radius: 50px;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  padding: 1rem;
  box-sizing: border-box;
  color: black;
  font-size: 1rem;
  position: relative;

  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 50px;
    z-index: 1;
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
  }
`;

export const Suggestions = ({ recipes }: { recipes: any }) => {
  if (recipes && recipes.length > 0) {
    return (
      <StyledContainer>
        {recipes.map((recipe: any) => {
          return (
            <RecipeCard key={recipe._id} to={`recipes/${recipe._id}`}>
              {recipe.title}
            </RecipeCard>
          );
        })}
      </StyledContainer>
    );
  }
  return <StyledContainer>No recipes found</StyledContainer>;
};
