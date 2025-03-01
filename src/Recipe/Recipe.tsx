import styled from "@emotion/styled";
import { Key, useState } from "react";
import { Button } from "../ui/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { SvgBlob } from "../assets/SvgBlob";

const StyledContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 5rem;
`;

const Header = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  padding: 4rem 2rem;
  box-sizing: border-box;
  background: linear-gradient(#b8de90, #ffd455);

  @media (min-width: 576px) {
    padding: 8rem 4rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    padding: 10rem 8rem;
    margin: 0 auto;
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  padding: 4rem 2rem;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 576px) {
    column-gap: 4rem;
    padding: 4rem;
    max-width: 80rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    column-gap: 4rem;
    padding: 4rem 8rem;
    max-width: 80rem;
    margin: 0 auto;
  }
`;

const IngredientsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 0;
`;
const InstructionsContainer = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 0;
  margin-top: 0;
`;
const Ingredient = styled.li`
  display: flex;
  text-transform: capitalize;
  margin: 0.5rem 0;
  box-sizing: border-box;
  column-gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    margin: auto 0;
  }
`;

const Instruction = styled.li`
  display: flex;
  column-gap: 1rem;
`;
const BlobContainer = styled.div`
  position: relative;
  text-align: center;
  width: fit-content;
`;
const Number = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  font-weight: 700;
`;

const StyledSpan = styled.span`
  margin: 0 0.5rem;
  text-transform: capitalize;
`;

const getRecipe = async (id: string) => {
  const url = `https://recipes-backend-cl9w.onrender.com/recipes/${id}`;
  const res = await fetch(url);
  return res.json();
};

export const Recipe = () => {
  let recipeId = useParams().id;
  console.log("recipe id:", recipeId);
  if (!recipeId) return <p>Could not find recipe</p>;

  const { data, error, isPending } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipe(recipeId),
  });

  const recipe = data;
  console.log({ data, error, isPending });

  if (error) return <p>is error</p>;
  if (isPending) return <p>is pending</p>;

  return (
    <StyledContainer>
      <Header>
        <h1>{recipe.title}</h1>
        <p>
          <StyledSpan>{recipe.time} min </StyledSpan>
          <StyledSpan>{recipe.difficulty} </StyledSpan>
          {recipe.preferences.map((preference: string) => {
            return <StyledSpan>{preference} </StyledSpan>;
          })}
        </p>
      </Header>
      <Content>
        <IngredientsContainer>
          <h2>Ingredients</h2>

          {recipe.ingredients.map((ingredient: string, index: number) => {
            return (
              <Ingredient key={index}>
                <SvgBlob />
                {ingredient}
              </Ingredient>
            );
          })}
        </IngredientsContainer>

        <InstructionsContainer>
          <h2>Instructions</h2>
          {recipe.instructions.map((instruction: string, index: number) => {
            return (
              <Instruction>
                <BlobContainer>
                  <SvgBlob />
                  <Number>{index + 1}</Number>
                </BlobContainer>
                {instruction}
              </Instruction>
            );
          })}
        </InstructionsContainer>
      </Content>
    </StyledContainer>
  );
};
