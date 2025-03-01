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

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Placeholder = styled.div`
  flex: 1;
  padding: 2rem 2rem;
  box-sizing: border-box;
  border-radius: 4rem;
  background-color: white;
  margin: 0.5rem;
`;

const StyledTitle = styled.h2`
  font-weight: 400;
`;

const RecipeCard = styled(Link)<{ bgColor?: string }>`
  width: 100%;
  border-radius: 50px;
  border: 1px solid transparent;
  background-color: ${(props) => props.bgColor};
  padding: 1rem;
  box-sizing: border-box;
  color: black;
  font-size: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;

  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 50px;
    position: absolute;
    top: -0.25rem;
    left: -0.25rem;
  }
`;

export const Suggestions = ({ recipes }: { recipes: any }) => {
  const colors = ["b8de90", "fc5c74", "ffd455"];
  if (recipes && recipes.length > 0) {
    return (
      <StyledContainer>
        {recipes.map((recipe: any) => {
          let bgColor = "#";
          bgColor += colors[Math.floor(Math.random() * colors.length)];
          return (
            <RecipeCard
              bgColor={bgColor}
              key={recipe._id}
              to={`recipes/${recipe._id}`}
            >
              <Placeholder />
              <StyledTitle> {recipe.title}</StyledTitle>
            </RecipeCard>
          );
        })}
      </StyledContainer>
    );
  }
  return <StyledContainer>No recipes found</StyledContainer>;
};
