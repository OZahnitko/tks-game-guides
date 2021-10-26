import localForage from "localforage";

export const getUserData = async (): Promise<{
  game: { collected: string[]; selectedGame: string; selectedMap: string };
} | null> => {
  return await localForage.getItem("userData");
};

export const setUserData = async (userData: {
  game: { collected: string[]; selectedGame: string; selectedMap: string };
}): Promise<{
  game: { collected: string[]; selectedGame: string; selectedMap: string };
}> => {
  return await localForage.setItem("userData", userData);
};

export const addCollectedItem = async (itemId: string) => {
  const userData = await getUserData();
  if (userData?.game.collected.find((item) => item === itemId)) return;
  await setUserData({
    ...userData,
    game: {
      ...userData?.game!,
      collected: [...userData?.game.collected!, itemId],
    },
  });
};

export const removeCollectedItem = async (itemId: string) => {
  const userData = await getUserData();
  if (userData?.game.collected) {
    await setUserData({
      ...userData,
      game: {
        ...userData?.game!,
        collected: [
          ...userData?.game!.collected!.filter((item) => item !== itemId),
        ],
      },
    });
  }
};

export const setSelectedMap = async (mapId: string) => {
  const userData = await getUserData();
  setUserData({
    ...userData,
    game: { ...userData?.game!, selectedMap: mapId },
  });
};

// Game Data

interface Collectible {
  guide?: { imageUrl: string; text: string }[];
  id: string;
  location: number[];
  requirements: string[];
  type: string;
}

interface Map {
  collectibles: Collectible[];
  dimensions: number[];
  id: string;
  name: string;
  url: string;
}

interface GameData {
  maps: Map[];
}

interface Game {
  id: string;
  data: GameData;
  name: string;
}

export const getGameData = async (
  gameId: string
): Promise<Game | undefined> => {
  const gamesData = (await localForage.getItem("gameData")) as Game[];
  if (gamesData) return gamesData.find((game) => game.id === gameId);
};

export const saveGameData = async (game: Game) => {
  const gameData = (await localForage.getItem("gameData")) as Game[];

  if (gameData) {
    if (!gameData.find((g) => g.id === game.id)) {
      await localForage.setItem("gameData", [...gameData, game]);
    }
  } else {
    await localForage.setItem("gameData", [game]);
  }
};

export const addCollectible = async (
  collectible: Collectible,
  selectedGame: string,
  selectedMap: string
) => {
  const games = (await localForage.getItem("gameData")) as Game[];
  const targetGame = games.find((game) => game.id === selectedGame) as Game;
  const targetMap = targetGame.data.maps.find((map) => map.id === selectedMap);
  const newCollectibles = [...targetMap?.collectibles!, collectible];

  const newGames = [
    ...games.filter((game) => game.id !== selectedGame),
    {
      ...targetGame,
      data: {
        ...targetGame.data,
        maps: [
          ...targetGame.data.maps.filter((map) => map.id !== selectedMap),
          { ...targetMap, collectibles: newCollectibles },
        ],
      },
    },
  ];

  await localForage.setItem("gameData", newGames);
};
