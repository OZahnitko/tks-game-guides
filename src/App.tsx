import {
  MapControlsModule,
  MapModule,
  ModulePositioningModule,
} from "@modules";

import { RootWrapper } from "./Styles";

const App = () => {
  return (
    <RootWrapper>
      <MapModule />
      <MapControlsModule />
      <ModulePositioningModule />
    </RootWrapper>
  );
};

export default App;
