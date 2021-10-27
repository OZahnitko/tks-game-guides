import { useEffect } from "react";

import { useLocalStorageHooks } from "@hooks";
import { MapModule } from "@modules";

import { RootWrapper } from "./Styles";

const MODULES = [MapModule];

const App = () => {
  const { setLocalStorageGameData } = useLocalStorageHooks();

  const initialize = async () => {
    await setLocalStorageGameData();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <RootWrapper>
      {MODULES.map(({ config: { name }, Module }) => (
        <Module key={name} />
      ))}
    </RootWrapper>
  );
};

export default App;
