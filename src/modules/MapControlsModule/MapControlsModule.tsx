import { useState } from "react";

import { Wrapper } from "./Styles";

const MapControlsModule = () => {
  const [autoPosition, setAutoPosition] = useState<boolean>(true);

  return (
    <Wrapper autoPosition={autoPosition}>
      Map Controls Module
      <button onClick={() => setAutoPosition((autoPosition) => !autoPosition)}>
        auto pos {autoPosition ? "on" : "off"}
      </button>
    </Wrapper>
  );
};

export default MapControlsModule;
