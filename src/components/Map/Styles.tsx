import styled, { css, keyframes } from "styled-components";

import { Coordinate } from "./Map";

export const Wrapper = styled.div`
  align-items: center;

  display: flex;

  flex-direction: column;

  height: 100%;

  justify-content: center;
`;

interface MapViewerContainerProps {
  isEditMode: boolean;
  isMouseDown: boolean;
}

export const MapViewerContainer = {
  Wrapper: styled.div<MapViewerContainerProps>`
    border: 2px solid red;

    cursor: ${(props) =>
      props.isMouseDown ? "grabbing" : props.isEditMode ? "pointer" : "grab"};

    height: 50%;

    overflow: hidden;

    position: relative;

    width: 50%;
  `,
};

interface MapContainerProps {
  mapLocation: [Coordinate, Coordinate];
  zoomLevel: number;
}

export const MapContainer = {
  Wrapper: styled.div.attrs<MapContainerProps>(({ mapLocation }) => ({
    style: { left: mapLocation[0], top: mapLocation[1] },
  }))<MapContainerProps>`
    background: url(https://img.game8.co/3432046/adc6121ba3035d5c082fe80ab8da6c4e.png/original);
    background-color: lightGray;
    background-size: 100% 100%;

    height: ${(props) => 696 * props.zoomLevel}px;

    position: absolute;

    width: ${(props) => props.zoomLevel * 1677}px;
  `,
};

interface MapTagContainerProps {
  isEditMode: boolean;
  left: number;
  top: number;
  type: string;
  zoomLevel: number;
}

const pulse = (color: string) => keyframes`  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${color};
  }

  50% {
    transform: scale(1);
    box-shadow: 0 0 0 10px ${color};
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${color};
  }`;

const anim = (color: string, isEditMode: boolean) =>
  css`
    animation: ${pulse(color)} ${isEditMode ? 0 : 2}s infinite;
  `;

export const MapTagContainer = {
  Wrapper: styled.div<MapTagContainerProps>`
    ${(props) =>
      anim(
        (() =>
          props.type === "rocket"
            ? "orange"
            : props.type === "upgrade"
            ? "pink"
            : "dodgerBlue")(),
        props.isEditMode
      )}

    background-color: ${(props) =>
      props.type === "rocket"
        ? "orange"
        : props.type === "upgrade"
        ? "pink"
        : "dodgerBlue"};
    border-radius: 50%;

    cursor: pointer;

    height: ${(props) => (props.zoomLevel >= 2 ? "20" : "20")}px;

    left: ${(props) => props.left}%;

    position: absolute;

    top: ${(props) => props.top}%;

    width: ${(props) => (props.zoomLevel >= 2 ? "20" : "20")}px;
  `,
};

interface CursorLocationOverlayContainerProps {
  height: number;
  width: number;
}

export const CursorLocationOverlayContainer = {
  Wrapper: styled.div.attrs<CursorLocationOverlayContainerProps>(
    ({ height, width }) => ({
      style: {
        height: `${height}px`,
        maxHeight: "696px",
        maxWidth: "1677px",
        width: `${width}px`,
      },
    })
  )<CursorLocationOverlayContainerProps>`
    border: 0px solid;
    border-right: 2px dashed red;
    border-bottom: 2px dashed red;

    color: white;

    height: 100%;
  `,
};
