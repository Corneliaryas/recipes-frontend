import styled from "@emotion/styled";
import { Button } from "../ui/Button";

export const StyledContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
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
    justify-content: center;
    align-items: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 40rem;
  }
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid black;
  color: var(--main-text-color);
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid black;
  color: var(--main-text-color);
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const FieldsetField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;

export const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledAddButton = styled(Button)`
  background-color: var(--tertiary-color);
  border-color: transparent;
`;
export const StyledRemoveButton = styled(Button)`
  background-color: var(--secondary-color);
  color: white;
  border-color: transparent;
`;

export const StyledSubmitButton = styled(Button)`
  width: 100%;
  margin: 1rem 0;
`;
