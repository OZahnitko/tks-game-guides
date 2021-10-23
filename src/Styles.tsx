import styled from "styled-components";

export const RootWrapper = styled.div`
  background-color: #e9e9e9;

  display: grid;

  gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);

  height: 100%;

  overflow: hidden;

  padding: 0.5rem;
`;

export const Underlay = {
  Child: styled.div`
    border: 1px solid black;

    height: 100%;

    width: 100%;
  `,
  Wrapper: styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);

    height: 100%;

    position: absolute;

    width: 100%;

    z-index: -1;
  `,
};
