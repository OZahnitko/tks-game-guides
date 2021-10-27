import localForage from "localforage";

type Ability = string;

type Collectible = string;

type Game = string;

type Map = string;

interface UserData {
  collectibles: Collectible[];
  selectedGame: Game;
  selectedMap: Map;
  abilities: Ability[];
}

// User Data

export const getUserData = async (): Promise<UserData | null> => {
  return (await localForage.getItem("userData")) as UserData;
};

export const setUserData = async (userData: UserData) => {
  return await localForage.setItem("userData", userData);
};

// Selected Game

export const setSelectedGame = async (gameId: Game) => {
  const userData = (await getUserData()) as UserData;

  return await setUserData({ ...userData, selectedGame: gameId });
};

// Selected Map

export const setSelectedMap = async (mapId: Map) => {
  const userData = (await getUserData()) as UserData;

  return await setUserData({ ...userData, selectedMap: mapId });
};

// Collectibles

export const addCollectible = async (collectibleId: Collectible) => {
  const userData = (await getUserData()) as UserData;

  if (userData.collectibles) {
    if (userData.collectibles.includes(collectibleId))
      return await setUserData({
        ...userData,
        collectibles: [...userData.collectibles],
      });
    return await setUserData({
      ...userData,
      collectibles: [...userData.collectibles, collectibleId],
    });
  } else {
    return await setUserData({ ...userData, collectibles: [collectibleId] });
  }
};

export const removeCollectible = async (collectibleId: Collectible) => {
  const userData = (await getUserData()) as UserData;

  return await setUserData({
    ...userData,
    collectibles: userData.collectibles.filter(
      (collectible) => collectible !== collectibleId
    ),
  });
};

// Abilities

export const addAbility = async (abilityId: Ability) => {
  const userData = (await getUserData()) as UserData;

  return await setUserData({
    ...userData,
    abilities: [...userData.abilities, abilityId],
  });
};

export const removeAbility = async (abilityId: Ability) => {
  const userData = (await getUserData()) as UserData;

  return await setUserData({
    ...userData,
    abilities: userData.abilities.filter((ability) => ability !== abilityId),
  });
};
