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

export const setSelectedMap = async (mapId: string) => {
  const userData = await getUserData();
  setUserData({
    ...userData,
    game: { ...userData?.game!, selectedMap: mapId },
  });
};
