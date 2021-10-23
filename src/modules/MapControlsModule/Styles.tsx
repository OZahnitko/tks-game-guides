import styled from "styled-components";

interface WrapperProps {
  autoPosition: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  border: 10px solid blue;

  grid-column: span 1;
  grid-row: span 1;

  user-select: none;
`;
