import { useEffect } from "react";

import { useGameHooks, useTagHooks } from "@hooks";
import { MapModule, MapControlsModule, WalkthroughModule } from "@modules";
import { getUserData, setUserData } from "@utilities";

import { RootWrapper } from "./Styles";

const MODULES = [MapModule, MapControlsModule, WalkthroughModule];

const App = () => {
  const { setSelectedGame, setSelectedMap } = useGameHooks();
  const { setCollectedTags } = useTagHooks();

  const readLocalStorage = async () => {
    const userData = await getUserData();

    if (!userData) {
      await setUserData({
        game: {
          collected: [],
          selectedGame: "b1248c18-224c-4f46-b66b-4882eb995a6a",
          selectedMap: "b7cd5f87-c5a7-4cb1-8ae7-8568e8083f06",
        },
      });
      setSelectedGame("b1248c18-224c-4f46-b66b-4882eb995a6a");
      setSelectedMap("b7cd5f87-c5a7-4cb1-8ae7-8568e8083f06");
    } else {
      setCollectedTags(userData.game.collected);
      setSelectedGame(userData.game.selectedGame);
      setSelectedMap(userData.game.selectedMap);
    }
  };

  useEffect(() => {
    readLocalStorage();
  }, []);

  return (
    <RootWrapper>
      {MODULES.map(({ config, Module }) => (
        <Module key={config.name} />
      ))}
    </RootWrapper>
  );
};

export default App;
