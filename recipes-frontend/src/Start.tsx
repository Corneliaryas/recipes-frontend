import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Start = () => {
  return (
    <StyledContainer>
      <h1>Welcome</h1>
    </StyledContainer>
  );
};
