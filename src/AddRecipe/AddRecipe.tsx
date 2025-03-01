import { useMemo, useState } from "react";
import {
  StyledContainer,
  Label,
  Input,
  Form,
  Fieldset,
  FieldsetField,
  StyledRemoveButton,
  StyledAddButton,
  Textarea,
  StyledSubmitButton,
} from "./styles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
}
const postRecipe = async (recipe: Recipe) => {
  const url = `https://recipes-backend-cl9w.onrender.com/recipes`;
  const res = await axios({
    method: "post",
    url: url,
    headers: { "Content-Type": "application/json" },
    data: recipe,
  });
  return res;
};

export const AddRecipe = () => {
  const mutation = useMutation({
    mutationFn: (recipe: Recipe) => {
      return postRecipe(recipe);
    },
    onSuccess(data) {
      setName("");
      setIngredientsFields([{ value: "" }, { value: "" }]);
      setInstructionsFields([{ value: "" }, { value: "" }]);
      setNewRecipeId(data.data._id);
      console.log(data.data);
    },
  });
  const errorMessage = useMemo(
    () =>
      mutation.error && axios.isAxiosError(mutation.error)
        ? mutation.error.response?.data?.message
        : "Something went wrong",
    [mutation.error]
  );
  const [newRecipeId, setNewRecipeId] = useState("");
  const [name, setName] = useState("");
  const [ingredientsFields, setIngredientsFields] = useState([
    { value: "" },
    { value: "" },
  ]);
  const [instructionsFields, setInstructionsFields] = useState([
    { value: "" },
    { value: "" },
  ]);

  const ingredients = ingredientsFields.map((field) => field.value);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log({ name, ingredientsFields, instructionsFields });
    mutation.mutate({
      title: name,
      ingredients: ingredients,
      instructions: "testing stuff",
    });
  };

  const onChangeIngredientHandler = (index: number, e: any) => {
    const values = [...ingredientsFields];
    values[index].value = e?.target.value;
    setIngredientsFields(values);
  };
  const onChangeInstructiontHandler = (index: number, e: any) => {
    const values = [...instructionsFields];
    values[index].value = e?.target.value;
    setInstructionsFields(values);
  };
  const addIngredientField = () => {
    setIngredientsFields([...ingredientsFields, { value: "" }]);
  };
  const addInstructionField = () => {
    setInstructionsFields([...instructionsFields, { value: "" }]);
  };

  const removeIngredientField = (index: number) => {
    const updatedFields = [...ingredientsFields];
    updatedFields.splice(index, 1);
    setIngredientsFields(updatedFields);
  };
  const removeInstructionsField = (index: number) => {
    const updatedFields = [...instructionsFields];
    updatedFields.splice(index, 1);
    setInstructionsFields(updatedFields);
  };
  return (
    <StyledContainer>
      <h2>Add recipe</h2>
      {mutation.isSuccess && (
        <>
          <p>Recipe sent!</p>
          <Link to={{ pathname: `../recipes/${newRecipeId}` }}>
            Go to recipe
          </Link>
        </>
      )}

      {mutation.isError && errorMessage}
      {mutation.isPending && <p>Sending recipe</p>}
      {!mutation.isSuccess && (
        <Form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Label>
            Recipe name
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              minLength={2}
              required
            />
          </Label>
          <Fieldset name="Ingredients">
            <legend>
              <h3>Ingredients</h3>
            </legend>
            {ingredientsFields.map((field, index) => {
              return (
                <FieldsetField key={`ingredient-${index}`}>
                  <Label>
                    Ingredient {index + 1}
                    <Input
                      value={field.value}
                      onChange={(e) => onChangeIngredientHandler(index, e)}
                      minLength={2}
                      required={index === 0}
                    />
                  </Label>
                  <StyledRemoveButton
                    type="button"
                    onClick={() => {
                      removeIngredientField(index);
                    }}
                  >
                    Remove
                  </StyledRemoveButton>
                </FieldsetField>
              );
            })}
            <StyledAddButton type="button" onClick={addIngredientField}>
              Add more ingredients
            </StyledAddButton>
          </Fieldset>
          <Fieldset name="Instructions">
            <legend>
              <h3>Instructions</h3>
            </legend>
            {instructionsFields.map((field, index) => {
              return (
                <FieldsetField key={`instruction-${index}`}>
                  <Label>
                    Step {index + 1}
                    <Textarea
                      value={field.value}
                      onChange={(e) => onChangeInstructiontHandler(index, e)}
                      minLength={2}
                      required={index === 0}
                    />
                  </Label>
                  <StyledRemoveButton
                    type="button"
                    onClick={() => {
                      removeInstructionsField(index);
                    }}
                  >
                    Remove
                  </StyledRemoveButton>
                </FieldsetField>
              );
            })}
            <StyledAddButton type="button" onClick={addInstructionField}>
              Add more steps
            </StyledAddButton>
          </Fieldset>

          <StyledSubmitButton type="submit" variant="primary">
            Send recipe
          </StyledSubmitButton>
        </Form>
      )}
    </StyledContainer>
  );
};
