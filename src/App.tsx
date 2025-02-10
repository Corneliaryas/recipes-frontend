import { Overview } from "./Overview/Overview";
import { Navbar } from "./Navbar/Navbar";
import { Route, Routes } from "react-router";
import { AddRecipe } from "./AddRecipe/AddRecipe";
import { Recipe } from "./Recipe/Recipe";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </>
  );
};

export default App;
