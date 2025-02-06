import styled from "@emotion/styled";
import { Button } from "../ui/Button";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;
const Input = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid black;
  color: var(--main-text-color);
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid black;
  color: var(--main-text-color);
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const FieldsetField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledAddButton = styled(Button)`
  background-color: var(--tertiary-color);
`;
const StyledRemoveButton = styled(Button)`
  background-color: var(--secondary-color);
  color: white;
`;

const StyledSubmitButton = styled(Button)`
  width: 100%;
  margin: 1rem 0;
`;

export const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredientsFields, setIngredientsFields] = useState([
    { value: "" },
    { value: "" },
  ]);
  const [instructionsFields, setInstructionsFields] = useState([
    { value: "" },
    { value: "" },
  ]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log({ name, ingredientsFields, instructionsFields });
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
  const addIngredientField = (e: any) => {
    e.preventDefault();
    setIngredientsFields([...ingredientsFields, { value: "" }]);
  };
  const addInstructionField = (e: any) => {
    e.preventDefault();
    setInstructionsFields([...instructionsFields, { value: "" }]);
  };

  const removeIngredientField = (e: any, index: number) => {
    e.preventDefault();
    const updatedFields = [...ingredientsFields];
    updatedFields.splice(index, 1);
    setIngredientsFields(updatedFields);
  };
  const removeInstructionsField = (e: any, index: number) => {
    e.preventDefault();
    const updatedFields = [...instructionsFields];
    updatedFields.splice(index, 1);
    setInstructionsFields(updatedFields);
  };

  return (
    <main>
      <h2>Add recipe</h2>
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
                  onClick={(e) => {
                    removeIngredientField(e, index);
                  }}
                >
                  Remove
                </StyledRemoveButton>
              </FieldsetField>
            );
          })}
          <StyledAddButton type="button" onClick={(e) => addIngredientField(e)}>
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
                  onClick={(e) => {
                    removeInstructionsField(e, index);
                  }}
                >
                  Remove
                </StyledRemoveButton>
              </FieldsetField>
            );
          })}
          <StyledAddButton
            type="button"
            onClick={(e) => addInstructionField(e)}
          >
            Add more steps
          </StyledAddButton>
        </Fieldset>

        <StyledSubmitButton type="submit">Send recipe</StyledSubmitButton>
      </Form>
    </main>
  );
};
