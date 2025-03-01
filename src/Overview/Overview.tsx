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
`;

const SearchContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 50rem;
  }
`;
const SearchHero = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  box-sizing: border-box;
  background: linear-gradient(#b8de90, #ffd455);
  padding: 4rem 2rem;

  @media (min-width: 576px) {
    padding: 8rem 4rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    padding: 10rem 8rem;
    margin: 0 auto;
  }
`;
const SearchResult = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 0.5rem;
  box-sizing: border-box;
  padding: 2rem;

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

const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 1rem;
  text-align: left;
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const StyledLabel = styled.label`
  text-align: left;
  margin: 0.25rem 1rem;
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
      <SearchHero>
        <StyledTitle>What to eat?</StyledTitle>

        <SearchContainer onSubmit={handleOnSearch}>
          <StyledLabel htmlFor="Search">Search for recipes</StyledLabel>
          <StyledWrapper>
            <SearchBar
              name="Search"
              placeholder="Eg. Enchiladas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </StyledWrapper>
        </SearchContainer>
      </SearchHero>
      <SearchResult>
        {isPending && <Loading />}
        {data && <Suggestions recipes={data} />}
        {error && <p>Something went wrong</p>}
      </SearchResult>
    </StyledContainer>
  );
};
