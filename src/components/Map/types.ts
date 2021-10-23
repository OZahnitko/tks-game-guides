export type Coordinate = number | undefined;

export type Coordinates = [Coordinate, Coordinate];

type IsEditMote = boolean;

type ZoomLevel = number;

export interface MapItemProps {
  id: string;
  coordinates: [number, number];
  type: string | null;
}

export interface MapTagProps {
  isEditMode: IsEditMote;
  item: MapItemProps;
  callback: (item: MapItemProps) => void;
  zoomLevel: ZoomLevel;
}

// Styled

interface MapBackgroundProperties {
  dimensions: [number, number];
  url: string;
}

export interface MapContainerWrapperProps {
  backgroundProps: MapBackgroundProperties;
  mapLocation: [Coordinate, Coordinate];
  zoomLevel: ZoomLevel;
}

export interface MapViewerContainerWrapperProps {
  isEditMode: IsEditMote;
  isMouseDown: boolean;
}

export interface MapTagContainerWrapperProps
  extends Omit<MapTagProps, "callback" | "item"> {
  left: number;
  top: number;
  type: string | null;
}
