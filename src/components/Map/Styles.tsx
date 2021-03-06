import styled, { css, keyframes } from "styled-components";
import { sharedTheme } from "tks-component-library";

import {
  MapContainerWrapperProps,
  MapTagContainerWrapperProps,
  MapViewerContainerWrapperProps,
} from "./types";

export const Wrapper = styled.div`
  color: white;

  height: 100%;
`;

// Map Viewer Container

export const MapViewerContainer = {
  Wrapper: styled.div<MapViewerContainerWrapperProps>`
    cursor: ${(props) =>
      props.isMouseDown ? "grabbing" : props.isEditMode ? "pointer" : "grab"};

    height: 100%;

    overflow: hidden;

    position: relative;

    user-select: none;

    width: 100%;
  `,
};

// Map Container

export const MapContainer = {
  Wrapper: styled.div.attrs<MapContainerWrapperProps>(({ mapLocation }) => ({
    style: { left: mapLocation[0], top: mapLocation[1] },
  }))<MapContainerWrapperProps>`
    background: url(${(props) => props.backgroundProps.url});
    background-color: lightGray;
    background-position: center center;
    border-radius: inherit;
    background-size: 100% 100%;

    height: ${(props) =>
      props.backgroundProps.dimensions[1] * props.zoomLevel}px;

    overflow: hidden;

    position: absolute;

    width: ${(props) =>
      props.backgroundProps.dimensions[0] * props.zoomLevel}px;
  `,
};

// Map Tag

const pulse = (color: string) => keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${sharedTheme.utilities.color.hexToRgba(color, 0.7)};
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px ${sharedTheme.utilities.color.hexToRgba(color, 0)};
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${sharedTheme.utilities.color.hexToRgba(color, 0)};
  }
`;

const anim = (color: string, isEditMode: boolean) =>
  css`
    animation: ${pulse(color.slice(1))} ${isEditMode ? 0 : 2}s infinite;
  `;

const TAG_COLORS = { rocket: "#FFA500", upgrade: "#FFC0CB" };

export const MapTagContainer = {
  Wrapper: styled.div<MapTagContainerWrapperProps>`
    background-color: ${(props) =>
      props.type === "rocket"
        ? "#FFA500"
        : props.type === "upgrade"
        ? "#FFC0CB"
        : "#1E90FF"};
    border-radius: 50%;

    cursor: pointer;

    height: ${(props) => (props.zoomLevel >= 2 ? "20" : "20")}px;

    left: ${(props) => props.left}%;

    position: absolute;

    top: ${(props) => props.top}%;
    transform: scale(1);

    width: ${(props) => (props.zoomLevel >= 2 ? "20" : "20")}px;

    ${(props) =>
      anim(
        props.type === "rocket"
          ? "#FFA500"
          : props.type === "upgrade"
          ? "#FFC0CB"
          : "#1E90FF",
        props.isEditMode
      )}
  `,
};
