import styled from "styled-components";

interface WrapperProps {
  root: { x: number; y: number };
  size: { height: number; width: number };
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: white;

  grid-column: ${(props) => props.root.x} / span ${(props) => props.size.width};
  grid-row: ${(props) => props.root.y} / span ${(props) => props.size.height};

  overflow: hidden;

  padding: 1rem;

  user-select: none;
`;
