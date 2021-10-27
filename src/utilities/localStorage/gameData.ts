import localForage from "localforage";

import type { Collectible, Game, Map } from "@contracts";

// Games Data

export const getGamesData = async (): Promise<Game[] | null> => {
  return await localForage.getItem("games");
};

export const setGamesData = async (games: Game[]) => {
  return localForage.setItem("games", games);
};

// Maps Data
export const getMapsData = async (): Promise<Map[] | null> => {
  return localForage.getItem("maps");
};

export const setMapsData = async (maps: Map[]) => {
  return await localForage.setItem("maps", maps);
};

//  Collectibles Data

export const getCollectiblesData = async (): Promise<Collectible[] | null> => {
  return await localForage.getItem("collectibles");
};

export const setCollectiblesData = async (collectibles: Collectible[]) => {
  return await localForage.setItem("collectibles", collectibles);
};
