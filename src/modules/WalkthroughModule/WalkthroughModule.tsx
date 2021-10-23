import { useState } from "react";

import { Wrapper } from "./Styles";

const WalkthroughModule = () => {
  const [root, setRoot] = useState<{ x: number; y: number }>({ x: 3, y: 1 });
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 3,
    width: 2,
  });

  return (
    <Wrapper root={root} size={size}>
      <h1>Walkthrough</h1>
    </Wrapper>
  );
};

export default WalkthroughModule;
