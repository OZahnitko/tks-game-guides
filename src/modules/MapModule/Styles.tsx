import styled from "styled-components";

interface WrapperProps {
  horizontalSize: number;
  verticalSize: number;
}

export const Wrapper = styled.div<WrapperProps>`
  border: 10px solid red;

  grid-column: span ${(props) => props.horizontalSize.toString()};
  grid-row: span ${(props) => props.verticalSize.toString()};

  user-select: none;
`;
