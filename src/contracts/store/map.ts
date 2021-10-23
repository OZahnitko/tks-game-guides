export interface MapSliceState {
  maps: MapData[];
  selectedMap: MapData | null;
}

export interface MapData {
  dimensions: number[];
  name: string;
  url: string;
}
