import { useState } from "react";

import { Wrapper } from "./Styles";

const ProgressionModule = () => {
  const [root, setRoot] = useState<{ x: number; y: number }>({ x: 2, y: 3 });
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 1,
    width: 1,
  });

  return (
    <Wrapper root={root} size={size}>
      <h1>Progression</h1>
    </Wrapper>
  );
};

export default ProgressionModule;
