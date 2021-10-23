import localForage from "localforage";
import debounce from "lodash.debounce";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";

import {
  MapContainer,
  MapTagContainer,
  MapViewerContainer,
  Wrapper,
} from "./Styles";

export type Coordinate = number | undefined;

const Map = () => {
  const [data, setData] = useState<
    { id: number; type: string; coordinates: [number, number] }[]
  >([]);
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

  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [basicClick, setBasicClick] = useState<boolean>(true);

  const viewerContainer = useRef<HTMLDivElement | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [isRestartAnimation, setIsRestartAnimation] = useState<boolean>(false);

  const getMapData = async () => {
    const mapData = (await localForage.getItem("mapData")) as {
      id: number;
      type: string;
      coordinates: [number, number];
    }[];

    setData(() => mapData || []);
  };

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

      setIsRestartAnimation(() => true);
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

  const handleWheelScroll = (e: WheelEvent) => {
    setZoomLevel((zoomLevel) =>
      e.deltaY > 0 ? zoomLevel - 0.25 : zoomLevel + 0.25
    );
  };

  const handleSaveToLocalStorage = () => {
    localForage.setItem("mapData", data);
  };

  const handleMapTagClickCallback = (item: MapItemProps) => {
    setData((data) => data.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    getMapData();
  }, []);

  return (
    <Wrapper>
      <pre>{JSON.stringify({ isRestartAnimation }, null, 2)}</pre>
      <MapViewerContainer.Wrapper
        isEditMode={isEditMode}
        isMouseDown={isMouseDown}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={debounce(handleWheelScroll, 25)}
        ref={viewerContainer}
      >
        <MapContainer.Wrapper
          mapLocation={mapLocation}
          ref={mapContainer}
          zoomLevel={zoomLevel}
        >
          {!isRestartAnimation ? (
            data.map((item) => (
              <MapTag
                isEditMode={isEditMode}
                item={item}
                key={item.id}
                onClick={handleMapTagClickCallback}
                zoomLevel={zoomLevel}
              />
            ))
          ) : (
            <TagUpdater setIsRestartingAnimation={setIsRestartAnimation} />
          )}
        </MapContainer.Wrapper>
      </MapViewerContainer.Wrapper>
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
      <button onClick={handleSaveToLocalStorage}>Save</button>
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
  onClick: (item: MapItemProps) => void;
  zoomLevel: number;
}

export const MapTag = ({
  isEditMode,
  item,
  onClick,
  zoomLevel,
}: MapTagProps) => {
  return (
    <MapTagContainer.Wrapper
      isEditMode={isEditMode}
      left={item.coordinates[0]}
      onClick={() => onClick(item)}
      top={item.coordinates[1]}
      type={item.type}
      zoomLevel={zoomLevel}
    />
  );
};

interface TagUpdaterProps {
  setIsRestartingAnimation: Dispatch<SetStateAction<boolean>>;
}

const TagUpdater = ({ setIsRestartingAnimation }: TagUpdaterProps) => {
  useEffect(() => {
    setIsRestartingAnimation(() => false);
  }, []);
  return <></>;
};
