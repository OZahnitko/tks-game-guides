import debounce from "lodash.debounce";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { v4 as uuid4 } from "uuid";

import { useAppHooks, useMapHooks, useTagHooks } from "@hooks";

import {
  MapContainer,
  MapTagContainer,
  MapViewerContainer,
  Wrapper,
} from "./Styles";
import { Coordinates, MapItemProps, MapTagProps } from "./types";

const Map = () => {
  const [isBasicClick, setIsBasicClick] = useState<boolean>(true);
  const [isLocalEditMode, setIsLocalEditMode] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isRestartingAnimation, setIsRestartingAnimation] = useState<boolean>(
    false
  );
  const [mapLocation, setMapLocation] = useState<Coordinates>([0, 0]);
  const [mapStartingLocation, setMapStartingLocation] = useState<Coordinates>([
    undefined,
    undefined,
  ]);
  const [mapTags, setMapTags] = useState<MapItemProps[]>([]);
  const [mouseDownPosition, setMouseDownPosition] = useState<Coordinates>([
    undefined,
    undefined,
  ]);
  const [viewerDimensions, setViewerDimensions] = useState<Coordinates>([
    undefined,
    undefined,
  ]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const { setIsEditMode } = useAppHooks();
  const { maps, selectedMap, setSelectedMap } = useMapHooks();
  const { selectedTagType } = useTagHooks();

  const mapContainerWrapperRef = useRef<HTMLDivElement>(null);
  const mapViewerContainerWrapper = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (isBasicClick && isLocalEditMode) {
      const mapPosition = mapContainerWrapperRef.current?.getBoundingClientRect();

      const xPercentage = ((e.clientX - 10 - mapPosition?.left!) / 1677) * 100;

      const yPercentage = ((e.clientY - 10 - mapPosition?.top!) / 696) * 100;

      setMapTags((mapTags) => [
        ...mapTags,
        {
          coordinates: [
            Math.round((xPercentage + Number.EPSILON) * 100) / 100 / zoomLevel,
            Math.round((yPercentage + Number.EPSILON) * 100) / 100 / zoomLevel,
          ],
          id: uuid4(),
          type: selectedTagType || "rocket",
        },
      ]);
    }
  };

  const handleKeyboardInput = (e: globalThis.KeyboardEvent) => {
    if (e.key === "e") {
      setIsLocalEditMode((isLocalEditMode) => {
        if (isLocalEditMode) setIsRestartingAnimation(() => true);

        return !isLocalEditMode;
      });
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsBasicClick(() => true);
    setIsMouseDown(() => true);
    setMouseDownPosition(() => [e.clientX, e.clientY]);
    setMapStartingLocation(() => [mapLocation[0], mapLocation[1]]);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(() => false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        setIsBasicClick(() => false);

        if (selectedMap?.dimensions[1]! * zoomLevel < viewerDimensions[0]!) {
          setMapLocation(() => [
            Math.min(
              Math.max(
                mapStartingLocation[0]! + e.clientX - mouseDownPosition[0]!,
                viewerDimensions[1]! - selectedMap?.dimensions[0]! * zoomLevel
              ),
              0
            ),
            0,
          ]);
          return;
        } else {
          setMapLocation(() => [
            Math.min(
              Math.max(
                mapStartingLocation[0]! + e.clientX - mouseDownPosition[0]!,
                viewerDimensions[1]! - selectedMap?.dimensions[0]! * zoomLevel
              ),
              0
            ),
            Math.min(
              Math.max(
                mapStartingLocation[1]! + e.clientY - mouseDownPosition[1]!,
                viewerDimensions[0]! - selectedMap?.dimensions[1]! * zoomLevel
              ),
              0
            ),
          ]);
        }
      }
    },
    [isMouseDown, viewerDimensions, zoomLevel]
  );

  const handleMouseUp = () => {
    setIsMouseDown(() => false);
  };

  const handleWheelScroll = (e: WheelEvent) =>
    setZoomLevel((zoomLevel) =>
      e.deltaY > 0
        ? zoomLevel <= 0.75
          ? zoomLevel
          : zoomLevel - 0.25
        : zoomLevel >= 5
        ? zoomLevel
        : zoomLevel + 0.25
    );

  const removeTag = (tag: MapItemProps) => {
    setMapTags((mapTags) => mapTags.filter((t) => t.id !== tag.id));
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyboardInput);
    return () => {
      window.removeEventListener("keypress", handleKeyboardInput);
    };
  }, []);

  useEffect(() => {
    setIsEditMode(isLocalEditMode);
  }, [isLocalEditMode]);

  useEffect(() => {
    setSelectedMap(maps[0]);
  }, [maps]);

  useEffect(() => {
    if (selectedMap) {
      if (mapViewerContainerWrapper.current) {
        const dimensions = mapViewerContainerWrapper.current.getBoundingClientRect();
        setViewerDimensions(() => [dimensions.height, dimensions.width]);
      }
    }
  }, [selectedMap]);

  return (
    <Wrapper>
      {selectedMap && (
        <MapViewerContainer.Wrapper
          isEditMode={isLocalEditMode}
          isMouseDown={isMouseDown}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={debounce(handleWheelScroll, 25)}
          ref={mapViewerContainerWrapper}
        >
          <MapContainer.Wrapper
            backgroundProps={{
              dimensions: [
                selectedMap.dimensions[0],
                selectedMap.dimensions[1],
              ],
              url: selectedMap.url,
            }}
            mapLocation={mapLocation}
            ref={mapContainerWrapperRef}
            zoomLevel={zoomLevel}
          >
            {isRestartingAnimation ? (
              <TagUpdater setIsRestartingAnimation={setIsRestartingAnimation} />
            ) : (
              mapTags.map((tag) => (
                <MapTag
                  isEditMode={isLocalEditMode}
                  item={tag}
                  key={tag.id}
                  callback={removeTag}
                  zoomLevel={zoomLevel}
                />
              ))
            )}
          </MapContainer.Wrapper>
        </MapViewerContainer.Wrapper>
      )}
    </Wrapper>
  );
};

export default Map;

const MapTag = ({ callback, isEditMode, item, zoomLevel }: MapTagProps) => {
  return (
    <MapTagContainer.Wrapper
      isEditMode={isEditMode}
      left={item.coordinates[0]}
      onClick={() => callback(item)}
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
