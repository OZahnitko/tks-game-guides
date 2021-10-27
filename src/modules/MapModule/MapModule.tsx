import { BaseModule } from "@components";
import { useUserHooks } from "@hooks";

import { MapViewerContainer, Wrapper } from "./Styles";

const MapModule = () => {
  const { selectedGame, selectedMap } = useUserHooks();

  return (
    <BaseModule size={{ height: 2, width: 2 }}>
      {selectedGame && selectedMap && (
        <Wrapper>
          <MapViewerContainer.Wrapper>Map Viewer</MapViewerContainer.Wrapper>
        </Wrapper>
      )}
    </BaseModule>
  );
};

export default MapModule;
