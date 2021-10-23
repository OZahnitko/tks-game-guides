import { useState } from "react";

import { Wrapper } from "./Styles";

const MapModule = () => {
  const [root, setRoot] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 2,
    width: 2,
  });

  return (
    <Wrapper root={root} size={size}>
      <h1>Map</h1>
    </Wrapper>
  );
};

export default MapModule;

// const handleMouseClick = useCallback(() => {
//   const wholeNumber = Math.floor(activeSegment?.segment! / 4);
//   const remainder = activeSegment?.segment! % 4;

//   const maxHeight = !remainder ? 4 - wholeNumber : 4 - (wholeNumber + 1);
//   const maxWidth = !remainder ? 1 : 4 - remainder + 1;

//   if (size.width <= maxWidth && size.height <= maxHeight) {
//     setRoot(() => ({
//       x: !remainder ? 4 : remainder,
//       y: !remainder ? wholeNumber : wholeNumber + 1,
//     }));
//   } else {
//     console.log("not ok");
//   }
// }, [activeSegment]);
