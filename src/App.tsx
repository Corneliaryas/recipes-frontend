import { Overview } from "./Overview/Overview";
import { Navbar } from "./Navbar/Navbar";
import { Route, Routes } from "react-router";
import { AddRecipe } from "./AddRecipe/AddRecipe";
import { Recipe } from "./Recipe/Recipe";
import { About } from "./About/About";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
