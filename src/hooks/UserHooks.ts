import { useCallback } from "react";

import { CollectibleId, SelectedGameId, SelectedMapId } from "@contracts";
import { useAppDispatch, useAppSelector } from "@hooks";
import {
  addCollectible,
  setSelectedGame,
  setSelectedMap,
  setUserCollectibles,
} from "@store";
import { addCollectible as addCollectibleLS } from "@utilities";

export const useUserHooks = () => {
  const collectibles = useAppSelector(
    ({ user: { collectibles } }) => collectibles
  );

  const dispatch = useAppDispatch();

  return {
    addCollectible: useCallback(
      async (collectibleId: string) => {
        if (!collectibles.includes(collectibleId)) {
          dispatch(addCollectible(collectibleId));
          addCollectibleLS(collectibleId);
        }
      },
      [collectibles]
    ),
    collectibles,
    selectedGame: useAppSelector(({ user: { selectedGame } }) => selectedGame),
    selectedMap: useAppSelector(({ user: { selectedMap } }) => selectedMap),
    setSelectedGame: (game: SelectedGameId) => dispatch(setSelectedGame(game)),
    setSelectedMap: (map: SelectedMapId) => dispatch(setSelectedMap(map)),
    setUserCollectibles: (collectibles: CollectibleId[]) =>
      dispatch(setUserCollectibles(collectibles)),
  };
};
