import { useState } from "react";

import { Wrapper } from "./Styles";

const MapControlsModule = () => {
  const [root, setRoot] = useState<{ x: number; y: number }>({ x: 1, y: 3 });
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 1,
    width: 1,
  });

  return (
    <Wrapper root={root} size={size}>
      <h1>Map Controls</h1>
    </Wrapper>
  );
};

export default MapControlsModule;