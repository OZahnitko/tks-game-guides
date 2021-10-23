import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
  border-radius: 25px 0 0 25px;

  display: flex;

  flex-direction: column;

  height: 100%;

  padding-bottom: 1.25rem;

  width: 100%;
`;

export const TopSection = {
  Heading: styled.h1`
    color: #cfcfcf;

    text-align: center;
  `,
  MapContainer: styled.div`
    flex: 1;
  `,
  Wrapper: styled.div`
    display: flex;

    flex-direction: column;

    height: calc(100% / 3 * 3);
  `,
};

// Bottom Section

export const BottomSection = {
  Wrapper: styled.div`
    flex: 1;
  `,
};
