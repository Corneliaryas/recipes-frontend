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

  @media (min-width: 576px) {
    max-width: 80rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    padding: 4rem;
    max-width: 80rem;
    margin: 0 auto;
    align-items: center;
  }
`;

const Header = styled.section`
  margin: 0 -1.5rem;
  margin-top: -1rem;
  height: 20rem;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(#b8de90, #ffd455);
  box-sizing: border-box;
  padding: 1.5rem;
  border-radius: 1rem;

  @media (min-width: 576px) {
    padding: 1.5rem 5.5rem;
  }

  @media (min-width: 768px) {
    height: 20rem;
    width: 100%;
    padding: 4rem;
    max-width: 80rem;
    border-radius: 1rem;
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  padding: 4rem 0;
  box-sizing: border-box;

  @media (min-width: 576px) {
    column-gap: 4rem;
    padding: 4rem;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    column-gap: 4rem;
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
  column-gap: 0.5rem;
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
        <h2>{recipe.title}</h2>
      </Header>
      <Content>
        <IngredientsContainer>
          <h3>Ingredients</h3>

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
          <h3>Instructions</h3>
          <Instruction>
            <BlobContainer>
              <SvgBlob />
              <Number>1</Number>
            </BlobContainer>
            {recipe.instructions}
          </Instruction>
        </InstructionsContainer>
      </Content>
    </StyledContainer>
  );
};
