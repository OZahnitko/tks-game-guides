import { MouseEvent, useRef, useState } from "react";

import {
  CursorLocationOverlayContainer,
  MapContainer,
  MapTagContainer,
  MapViewerContainer,
  Wrapper,
} from "./Styles";

export type Coordinate = number | undefined;

const Map = () => {
  const [data, setData] = useState([
    { id: 1, type: "energy", coordinates: [19.5, 24] },
    { id: 2, type: "rocket", coordinates: [33.1, 30] },
    { id: 3, type: "rocket", coordinates: [26.75, 43.5] },
    { id: 4, type: "upgrade", coordinates: [28.6, 21.5] },
  ]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [mapStartingLocation, setMapStartingLocation] = useState<
    [Coordinate, Coordinate]
  >([0, 0]);
  const [mapLocation, setMapLocation] = useState<[Coordinate, Coordinate]>([
    0,
    0,
  ]);
  const [mouseDownPosition, setMouseDownPosition] = useState<
    [Coordinate, Coordinate]
  >([undefined, undefined]);
  const [mousePosition, setMousePosition] = useState<[Coordinate, Coordinate]>([
    undefined,
    undefined,
  ]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [basicClick, setBasicClick] = useState<boolean>(true);

  const viewerContainer = useRef<HTMLDivElement | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (isEditMode && basicClick) {
      const xPercentage =
        ((e.clientX -
          10 -
          mapContainer.current?.getBoundingClientRect().left!) /
          1677) *
        100;
      const yPercentage =
        ((e.clientY - 10 - mapContainer.current?.getBoundingClientRect().top!) /
          696) *
        100;

      setData((data) => [
        ...data,
        {
          id: data.length + 1,
          type: "rocket",
          coordinates: [
            Math.round((xPercentage + Number.EPSILON) * 100) / 100 / zoomLevel,
            Math.round((yPercentage + Number.EPSILON) * 100) / 100 / zoomLevel,
          ],
        },
      ]);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsMouseDown(() => true);
    setBasicClick(() => true);
    setMouseDownPosition(() => [e.clientX, e.clientY]);
    setMapStartingLocation(() => [mapLocation[0], mapLocation[1]]);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(() => false);
    setMouseDownPosition(() => [undefined, undefined]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setBasicClick(() => false);
    setMousePosition(() => [e.clientX, e.clientY]);
    if (mouseDownPosition[0]) {
      setMapLocation(() => [
        mapStartingLocation[0]! + e.clientX - mouseDownPosition[0]!,
        mapStartingLocation[1]! + e.clientY - mouseDownPosition[1]!,
      ]);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(() => false);
    setMouseDownPosition(() => [undefined, undefined]);
  };

  return (
    <Wrapper>
      <MapViewerContainer.Wrapper
        isEditMode={isEditMode}
        isMouseDown={isMouseDown}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={viewerContainer}
      >
        <MapContainer.Wrapper
          mapLocation={mapLocation}
          ref={mapContainer}
          zoomLevel={zoomLevel}
        >
          {isEditMode && (
            <CursorLocationOverlay
              height={
                mousePosition[1]! -
                  mapContainer.current?.getBoundingClientRect().top! || 0
              }
              width={
                mousePosition[0]! -
                  mapContainer.current?.getBoundingClientRect().left! || 0
              }
            />
          )}
          {data.map((item) => (
            <MapTag
              isEditMode={isEditMode}
              item={item}
              key={item.id}
              zoomLevel={zoomLevel}
            />
          ))}
        </MapContainer.Wrapper>
      </MapViewerContainer.Wrapper>

      <button onClick={() => setZoomLevel((zoomLevel) => zoomLevel - 0.25)}>
        -
      </button>
      <button onClick={() => setZoomLevel((zoomLevel) => zoomLevel + 0.25)}>
        +
      </button>
      <button
        onClick={() => {
          setMapLocation(() => [0, 0]);
          setZoomLevel(() => 1);
          setIsEditMode(() => false);
        }}
      >
        reset
      </button>
      <button
        onClick={() => setIsEditMode((isEditMode) => !isEditMode)}
        style={{ color: isEditMode ? "red" : "blue" }}
      >
        Toggle Edit Mode
      </button>
    </Wrapper>
  );
};

export default Map;

interface MapItemProps {
  id: number;
  type: string;
  coordinates: number[];
}

interface MapTagProps {
  isEditMode: boolean;
  item: MapItemProps;
  zoomLevel: number;
}

export const MapTag = ({ isEditMode, item, zoomLevel }: MapTagProps) => {
  return (
    <MapTagContainer.Wrapper
      isEditMode={isEditMode}
      left={item.coordinates[0]}
      top={item.coordinates[1]}
      type={item.type}
      zoomLevel={zoomLevel}
    />
  );
};

interface CursorLocationOverlayProps {
  height: number;
  width: number;
}

const CursorLocationOverlay = ({
  height,
  width,
}: CursorLocationOverlayProps) => (
  <CursorLocationOverlayContainer.Wrapper height={height} width={width} />
);
