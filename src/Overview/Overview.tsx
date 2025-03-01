import styled from "@emotion/styled";
import { SearchBar } from "../ui/SearchBar";
import { Suggestions } from "../Suggestions/Suggestions";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../ui/Loading";

const StyledContainer = styled.main`
  display: flex;
  width: 100%;
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
    padding: 4rem 8rem;
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

const getRecipes = async (key?: string) => {
  //move to config or env
  const url = key
    ? `https://recipes-backend-cl9w.onrender.com/recipes?search=${key}`
    : "https://recipes-backend-cl9w.onrender.com/recipes";
  const url_local = key
    ? `http://localhost:8080/recipes?search=${key}`
    : "http://localhost:8080/recipes";
  const res = await fetch(url);
  return res.json();
};

export const Overview = () => {
  const [search, setSearch] = useState("");

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(search),
  });

  const handleOnSearch = (event: any) => {
    event.preventDefault();
    refetch();
  };
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
      {isPending && <Loading />}
      {data && <Suggestions recipes={data} />}
      {error && <p>Something went wrong</p>}
    </StyledContainer>
  );
};
