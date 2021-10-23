import { useState } from "react";

import { Wrapper } from "./Styles";

const MapModule = () => {
  const [horizontalSize, setHorizontalSize] = useState<number>(2);
  const [verticalSize, setVerticalSize] = useState<number>(2);

  return (
    <Wrapper horizontalSize={horizontalSize} verticalSize={verticalSize}>
      Map Module
    </Wrapper>
  );
};

export default MapModule;
