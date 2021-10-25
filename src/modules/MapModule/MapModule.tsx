import debounce from "lodash.debounce";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";

import { data } from "@data";
import { useGameHooks, useTagHooks } from "@hooks";

import {
  MapContainer,
  MapTagContainer,
  MapViewerContainer,
  Wrapper,
} from "./Styles";

const MapModule = () => {
  const [root] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [size] = useState<{ height: number; width: number }>({
    height: 2,
    width: 2,
  });

  const [isBasicClick, setIsBasicClick] = useState<boolean>(true);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [mouseDownPosition, setMouseDownPosition] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({ x: undefined, y: undefined });

  const [mapData, setMapData] = useState<
    | {
        collectibles: {
          id: string;
          location: number[];
          requirements: string[];
        }[];
        dimensions: number[];
        url: string;
      }
    | undefined
  >(undefined);
  const [mapLocation, setMapLocation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startingMapLocation, setStartingMapLocation] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [viewerDimensions, setViewerDimensions] = useState<
    | {
        height: number;
        width: number;
      }
    | undefined
  >(undefined);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const { selectedGame, selectedMap } = useGameHooks();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const centerMap = (
    mapData: { dimensions: number[] },
    viewerDimensions: { height: number; width: number },
    zoomLevel: number
  ) => {
    setMapLocation(() => ({
      x: viewerDimensions.width / 2 - (mapData.dimensions[0] * zoomLevel) / 2,
      y: viewerDimensions.height / 2 - (mapData.dimensions[1] * zoomLevel) / 2,
    }));
  };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (mapContainerRef.current) {
        const mapContainerLocation = mapContainerRef.current.getBoundingClientRect();
        if (isBasicClick) {
          console.log(
            (e.clientX - mapContainerLocation.x) / zoomLevel,
            (e.clientY - mapContainerLocation.y) / zoomLevel
          );
        }
      }
    },
    [isBasicClick, mapContainerRef.current, zoomLevel]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsBasicClick(() => true);
      setIsMouseDown(() => true);
      setMouseDownPosition(() => ({ x: e.clientX, y: e.clientY }));
      setStartingMapLocation(() => mapLocation);
    },
    [mapLocation]
  );

  const handleMouseLeave = () => {
    setIsMouseDown(() => false);
    setMouseDownPosition(() => ({ x: undefined, y: undefined }));
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        setIsBasicClick(() => false);
        if (
          mapData?.dimensions[0]! * zoomLevel > viewerDimensions?.width! &&
          mapData?.dimensions[1]! * zoomLevel > viewerDimensions?.height!
        ) {
          return setMapLocation(() => ({
            x: Math.min(
              Math.max(
                startingMapLocation.x + e.clientX - mouseDownPosition.x!,
                viewerDimensions?.width! - mapData?.dimensions[0]! * zoomLevel
              ),
              0
            ),
            y: Math.min(
              Math.max(
                startingMapLocation.y + e.clientY - mouseDownPosition.y!,
                viewerDimensions?.height! - mapData?.dimensions[1]! * zoomLevel
              ),
              0
            ),
          }));
        }

        if (
          mapData?.dimensions[0]! * zoomLevel < viewerDimensions?.width! &&
          mapData?.dimensions[1]! * zoomLevel < viewerDimensions?.height!
        ) {
          return setMapLocation(() => ({
            x:
              viewerDimensions?.width! / 2 -
              (mapData?.dimensions[0]! * zoomLevel) / 2,
            y:
              viewerDimensions?.height! / 2 -
              (mapData?.dimensions[1]! * zoomLevel) / 2,
          }));
        }

        if (mapData?.dimensions[1]! * zoomLevel < viewerDimensions?.height!) {
          return setMapLocation(() => ({
            x: Math.min(
              Math.max(
                startingMapLocation.x + e.clientX - mouseDownPosition.x!,
                viewerDimensions?.width! - mapData?.dimensions[0]! * zoomLevel
              ),
              0
            ),
            y:
              viewerDimensions?.height! / 2 -
              (mapData?.dimensions[1]! * zoomLevel) / 2,
          }));
        }

        if (mapData?.dimensions[0]! * zoomLevel < viewerDimensions?.width!) {
          return setMapLocation(() => ({
            x:
              viewerDimensions?.width! / 2 -
              (mapData?.dimensions[0]! * zoomLevel) / 2,
            y: Math.min(
              Math.max(
                startingMapLocation.y + e.clientY - mouseDownPosition.y!,
                viewerDimensions?.height! - mapData?.dimensions[1]! * zoomLevel
              ),
              0
            ),
          }));
        }
      }
    },
    [isMouseDown, mapData, viewerDimensions]
  );

  const handleMouseUp = () => {
    setIsMouseDown(() => false);
  };

  const handleWheelScroll = useCallback(
    (e: WheelEvent) => {
      let newZoomLevel: number;
      let zoomIn: boolean = false;
      let change: boolean = false;

      setZoomLevel((zoomLevel) => {
        if (e.deltaY > 0) {
          if (zoomLevel <= 0.75) {
            newZoomLevel = zoomLevel;
          } else {
            change = true;
            newZoomLevel = zoomLevel - 0.25;
          }
        } else {
          zoomIn = true;
          if (zoomLevel >= 5) {
            newZoomLevel = zoomLevel;
          } else {
            change = true;
            newZoomLevel = zoomLevel + 0.25;
          }
        }

        return newZoomLevel;
      });

      const effectiveMapHeight = mapData?.dimensions[1]! * newZoomLevel!;
      const effectiveMapWidth = mapData?.dimensions[0]! * newZoomLevel!;

      if (
        effectiveMapHeight < viewerDimensions?.height! &&
        effectiveMapWidth < viewerDimensions?.width!
      ) {
        return setMapLocation(() => ({
          x: viewerDimensions?.width! / 2 - effectiveMapWidth / 2,
          y: viewerDimensions?.height! / 2 - effectiveMapHeight / 2,
        }));
      }

      if (
        effectiveMapWidth < viewerDimensions?.width! &&
        effectiveMapHeight > viewerDimensions?.height!
      ) {
        return setMapLocation(() => ({
          x: viewerDimensions?.width! / 2 - effectiveMapWidth / 2,
          y: (viewerDimensions?.height! - effectiveMapHeight) / 2,
        }));
      }

      if (
        effectiveMapHeight < viewerDimensions?.height! &&
        effectiveMapWidth > viewerDimensions?.width!
      ) {
        return setMapLocation(() => ({
          x: (viewerDimensions?.width! - effectiveMapWidth) / 2,
          y: viewerDimensions?.height! / 2 - effectiveMapHeight / 2,
        }));
      }

      if (
        effectiveMapHeight > viewerDimensions?.height! &&
        effectiveMapWidth > viewerDimensions?.width!
      ) {
        return setMapLocation((mapLocation) => {
          if (change) {
            return {
              x: zoomIn
                ? mapLocation.x - (mapData?.dimensions[0]! * 0.25) / 2
                : Math.min(
                    Math.max(
                      mapLocation.x + (mapData?.dimensions[0]! * 0.25) / 2,
                      viewerDimensions?.width! - effectiveMapWidth
                    ),
                    0
                  ),
              y: zoomIn
                ? mapLocation.y - (mapData?.dimensions[1]! * 0.25) / 2
                : Math.min(
                    Math.max(
                      mapLocation.y + (mapData?.dimensions[1]! * 0.25) / 2,
                      viewerDimensions?.height! - effectiveMapHeight
                    ),
                    0
                  ),
            };
          } else {
            return mapLocation;
          }
        });
      }
    },
    [mapData, viewerDimensions]
  );

  useEffect(() => {
    setMapData(() =>
      data.games
        .find((game) => game.id === selectedGame)
        ?.data.maps.find((map) => map.id === selectedMap)
    );
  }, [selectedGame, selectedMap]);

  useEffect(() => {
    if (viewerRef.current) {
      const targetDimensions = viewerRef.current.getBoundingClientRect();
      setViewerDimensions(() => ({
        height: targetDimensions.height,
        width: targetDimensions.width,
      }));
    }
  }, [viewerRef.current]);

  useEffect(() => {
    if (mapData && viewerDimensions) {
      centerMap(mapData, viewerDimensions, zoomLevel);
    }
  }, [mapData, viewerDimensions]);

  return (
    <Wrapper root={root} size={size}>
      {selectedGame && selectedMap ? (
        <MapViewerContainer.Wrapper
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={debounce(handleWheelScroll, 0.25)}
          ref={viewerRef}
        >
          {mapData && viewerDimensions ? (
            <MapContainer.Wrapper
              isMouseDown={isMouseDown}
              mapData={{
                dimensions: {
                  height: mapData.dimensions[1] * zoomLevel,
                  width: mapData.dimensions[0] * zoomLevel,
                },
                location: mapLocation,
                url: mapData.url,
              }}
              onClick={handleClick}
              ref={mapContainerRef}
            >
              {mapData.collectibles.map((collectible) => (
                <MapTag
                  key={collectible.id}
                  tag={collectible}
                  zoomLevel={zoomLevel}
                />
              ))}
            </MapContainer.Wrapper>
          ) : (
            "Loading..."
          )}
        </MapViewerContainer.Wrapper>
      ) : (
        "Loading..."
      )}
    </Wrapper>
  );
};

export default MapModule;

interface MapTagProps {
  tag: { id: string; location: number[] };
  zoomLevel: number;
}

const MapTag = ({ tag, zoomLevel }: MapTagProps) => {
  const { setSelectedTag } = useTagHooks();

  return (
    <MapTagContainer.Wrapper
      onClick={() => setSelectedTag(tag.id)}
      tag={tag}
      zoomLevel={zoomLevel}
    />
  );
};
