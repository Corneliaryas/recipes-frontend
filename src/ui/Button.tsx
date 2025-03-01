import styled from "@emotion/styled";
import React from "react";

const StyledButton = styled.button<{
  variant?: "primary" | "secondary" | "delete";
}>`
  background-color: ${(props) =>
    props.variant === "primary" ? "black" : "transparent"};
  color: ${(props) =>
    props.variant === "primary" ? "white" : "var(--main-text-color)"};
  border: ${(props) =>
    props.variant === "primary"
      ? "1px solid transparent;"
      : "1px solid black;"};
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: 900;
  font-size: 1rem;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
`;

export const Button = ({
  children,
  variant,
  className,
  type,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "delete";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      className={className}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
};
