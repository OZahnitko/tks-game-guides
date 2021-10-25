import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedGame, setSelectedMap } from "@store";

export const useGameHooks = () => {
  const dispatch = useAppDispatch();

  return {
    selectedGame: useAppSelector(({ game: { selectedGame } }) => selectedGame),
    selectedMap: useAppSelector(({ game: { selectedMap } }) => selectedMap),
    setSelectedGame: (gameId: string) => dispatch(setSelectedGame(gameId)),
    setSelectedMap: (mapId: string) => dispatch(setSelectedMap(mapId)),
  };
};
