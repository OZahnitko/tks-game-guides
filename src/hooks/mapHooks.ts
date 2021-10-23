import { MapData } from "@contracts";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setMaps, setSelectedMap } from "@store";

export const useMapHooks = () => {
  const dispatch = useAppDispatch();

  return {
    maps: useAppSelector(({ map: { maps } }) => maps),
    selectedMap: useAppSelector(({ map: { selectedMap } }) => selectedMap),
    setMaps: (maps: MapData[]) => dispatch(setMaps(maps)),
    setSelectedMap: (selectedMap: MapData) =>
      dispatch(setSelectedMap(selectedMap)),
  };
};
