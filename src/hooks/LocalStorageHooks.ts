import {
  collectibles as lsCollectibles,
  games as lsGames,
  maps as lsMaps,
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
  setSelectedGame as lsSetSelectedGame,
  setSelectedMap as lsSetSelectedMap,
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
        await setCollectiblesData(lsCollectibles);
        dispatch(setCollectibles(lsCollectibles));
      } else {
        dispatch(setCollectibles(lsCollectibles));
      }

      if (!gameData) {
        await setGamesData(lsGames);
        dispatch(setGames(lsGames));
      } else {
        dispatch(setGames(gameData));
      }

      if (!mapsData) {
        await setMapsData(lsMaps);
        dispatch(setMaps(lsMaps));
      } else {
        dispatch(setMaps(mapsData));
      }

      if (!userData?.selectedGame) {
        dispatch(setSelectedGame(lsGames[0].id));
        await lsSetSelectedGame(lsGames[0].id);
      } else {
        dispatch(setSelectedGame(userData.selectedGame));
        await lsSetSelectedGame(userData.selectedGame);
      }

      if (!userData?.selectedMap) {
        dispatch(setSelectedMap(lsMaps[0].id));
        await lsSetSelectedMap(lsMaps[0].id);
      } else {
        dispatch(setSelectedMap(userData.selectedMap));
        await lsSetSelectedMap(userData.selectedMap);
      }

      if (userData?.collectibles) {
        setUserCollectibles(userData.collectibles);
      }
    },
  };
};
