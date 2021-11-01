import {
  collectibles as LSCollectibles,
  games as LSGames,
  maps as LSMaps,
} from "@data";
import { useAppDispatch, useAppSelector, useUserHooks } from "@hooks";
import { setCollectibles, setGames, setMaps } from "@store";
import {
  getCollectiblesData,
  getGamesData,
  getMapsData,
  getUserData,
  setCollectiblesData,
  setGamesData,
  setMapsData,
  setSelectedGame as LSSetSelectedGame,
  setSelectedMap as LSSetSelectedMap,
} from "@utilities";

export const useLocalStorageHooks = () => {
  const dispatch = useAppDispatch();

  const {
    setSelectedGame,
    setSelectedMap,
    setUserCollectibles,
  } = useUserHooks();

  return {
    collectibles: useAppSelector(({ data: { collectibles } }) => collectibles),
    setLocalStorageGameData: async () => {
      const [
        collectiblesData,
        gameData,
        mapsData,
        userData,
      ] = await Promise.all([
        getCollectiblesData(),
        getGamesData(),
        getMapsData(),
        getUserData(),
      ]);

      if (!collectiblesData) {
        await setCollectiblesData(LSCollectibles);
        dispatch(setCollectibles(LSCollectibles));
      } else {
        dispatch(setCollectibles(LSCollectibles));
      }

      if (!gameData) {
        await setGamesData(LSGames);
        dispatch(setGames(LSGames));
      } else {
        dispatch(setGames(gameData));
      }

      if (!mapsData) {
        await setMapsData(LSMaps);
        dispatch(setMaps(LSMaps));
      } else {
        dispatch(setMaps(mapsData));
      }

      if (!userData?.selectedGame) {
        dispatch(setSelectedGame(LSGames[0].id));
        await LSSetSelectedGame(LSGames[0].id);
      } else {
        dispatch(setSelectedGame(userData.selectedGame));
        await LSSetSelectedGame(userData.selectedGame);
      }

      if (!userData?.selectedMap) {
        dispatch(setSelectedMap(LSMaps[0].id));
        await LSSetSelectedMap(LSMaps[0].id);
      } else {
        dispatch(setSelectedMap(userData.selectedMap));
        await LSSetSelectedMap(userData.selectedMap);
      }

      if (userData?.collectibles) {
        setUserCollectibles(userData.collectibles);
      }
    },
  };
};
