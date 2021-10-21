import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
  border-radius: 25px 0 0 25px;

  display: flex;

  flex-direction: column;

  height: 100%;

  width: 100%;
`;

export const TopSection = {
  Heading: styled.h1`
    color: #cfcfcf;

    text-align: center;
  `,
  MapContainer: styled.div`
    padding: 0 2.5rem 2.5rem 2.5rem;

    flex: 1;
  `,
  Wrapper: styled.div`
    display: flex;

    flex-direction: column;

    height: 50%;
  `,
};
