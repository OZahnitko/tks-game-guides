import { FC } from "react";

import { Wrapper } from "./Styles";

interface BaseModuleProps {
  root?: { x: number; y: number };
  size?: { height: number; width: number };
}

const BaseModule: FC<BaseModuleProps> = ({
  children,
  root = { x: 1, y: 1 },
  size = { height: 1, width: 1 },
}) => {
  return (
    <Wrapper root={root} size={size}>
      {children}
    </Wrapper>
  );
};

export default BaseModule;
