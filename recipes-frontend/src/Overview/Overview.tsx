import styled from "@emotion/styled";
import { SearchBar } from "../ui/SearchBar";
import { Suggestions } from "../Suggestions/Suggestions";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const StyledContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;

  @media (min-width: 576px) {
    padding: 4rem;
    max-width: 80rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    padding: 8rem;
    max-width: 80rem;
    margin: 0 auto;
  }
`;

const SearchContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 734px;
  }
`;

const getRecipes = async () => {
  const url = "https://recipes-backend-cl9w.onrender.com/recipes";
  const res = await fetch(url);
  return res.json();
};

export const Overview = () => {
  const query = useQuery({ queryKey: ["recipes"], queryFn: getRecipes });
  console.log(query);

  const [search, setSearch] = useState("");
  const handleOnSearch = (event: any) => {
    event.preventDefault();
  };

  const recipes = query.data;
  return (
    <StyledContainer>
      <label htmlFor="Search">
        <h2>Search for recipes</h2>
      </label>
      <SearchContainer onSubmit={handleOnSearch}>
        <SearchBar
          name="Search"
          placeholder="Search for recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </SearchContainer>

      <Suggestions recipes={recipes} />
    </StyledContainer>
  );
};
