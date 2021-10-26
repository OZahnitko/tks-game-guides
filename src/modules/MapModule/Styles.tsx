import styled, { css, keyframes } from "styled-components";
import { sharedTheme } from "tks-component-library";

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

// Map Viewer Container
export const MapViewerContainer = {
  Wrapper: styled.div`
    height: 100%;

    overflow: hidden;

    position: relative;

    width: 100%;
  `,
};

// Map Container

interface MapContainerWrapperProps {
  isMouseDown: boolean;
  mapData: {
    dimensions: { height: number; width: number };
    location: { x: number; y: number };
    url: string;
  };
}

export const MapContainer = {
  Wrapper: styled.div.attrs<MapContainerWrapperProps>(
    ({
      mapData: {
        location: { x, y },
      },
    }) => ({ style: { left: x, top: y } })
  )<MapContainerWrapperProps>`
    background: url(${(props) => props.mapData.url});
    background-size: 100% 100%;

    cursor: ${(props) => (props.isMouseDown ? "grabbing" : "grab")};

    height: ${(props) => props.mapData.dimensions.height}px;

    position: absolute;

    width: ${(props) => props.mapData.dimensions.width}px;
  `,
};

// Map Tag
interface MapTagContainerWrapperProps {
  active: boolean;
  tag: { id: string; location: number[] };
  zoomLevel: number;
}

const pulse = (color: string) => keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${sharedTheme.utilities.color.hexToRgba(color, 0.7)};
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px ${sharedTheme.utilities.color.hexToRgba(color, 0)};
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${sharedTheme.utilities.color.hexToRgba(color, 0)};
  }
`;

const anim = (color: string, isEditMode: boolean) =>
  css`
    animation: ${pulse(color.slice(1))} ${isEditMode ? 0 : 1.5}s infinite;
  `;

export const MapTagContainer = {
  Wrapper: styled.div<MapTagContainerWrapperProps>`
    background-color: ${(props) =>
      props.active
        ? "#D9042B"
        : `${sharedTheme.utilities.color.hexToRgba("D9042B", 0.5)}`};

    border-radius: 50%;

    cursor: pointer;

    height: 20px;

    left: ${(props) => props.tag.location[0] * props.zoomLevel - 10}px;

    position: absolute;

    top: ${(props) => props.tag.location[1] * props.zoomLevel - 10}px;

    width: 20px;

    ${(props) => props.active && anim("#D9042B", false)}
  `,
};
