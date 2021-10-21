import { LeftPanel, RightPanel } from "@components";

import { AppContainer } from "./Styles";

const App = () => {
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
