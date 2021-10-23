import { useEffect } from "react";

import { LeftPanel, RightPanel } from "@components";
import { mapData } from "@data";
import { useMapHooks } from "@hooks";

import { AppContainer } from "./Styles";

const App = () => {
  const { setMaps } = useMapHooks();

  useEffect(() => {
    setMaps(mapData);
  }, []);

  return (
    <AppContainer.RootWrapper>
      <AppContainer.LeftPanelContainer>
        <LeftPanel />
      </AppContainer.LeftPanelContainer>
      <AppContainer.RightPanelContainer>
        <RightPanel />
      </AppContainer.RightPanelContainer>
    </AppContainer.RootWrapper>
  );
};

export default App;
