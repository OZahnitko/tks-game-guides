import { MouseEvent, useState } from "react";
import styled from "styled-components";

const App = () => {
  return (
    <div>
      <Viewer />
    </div>
  );
};

export default App;

const ViewerWrapper = styled.div`
  border: 2px solid blue;

  height: 600px;

  overflow: hidden;

  position: relative;

  width: 600px;
`;

const Viewer = () => {
  const [startPosition, setStartPosition] = useState<number[]>([0, 0]);

  const [distance, setDistance] = useState<number[]>([0, 0]);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    console.log(e.clientX, e.clientY);
    setStartPosition(() => [e.clientX, e.clientY]);
  };

  return (
    <>
      <pre>{JSON.stringify({ startPosition, distance }, null, 2)}</pre>
      <ViewerWrapper
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          setDistance(() => [
            startPosition[0] - e.clientX,
            startPosition[1] - e.clientY,
          ]);
        }}
      >
        <Map />
      </ViewerWrapper>
    </>
  );
};

const Map = () => {
  const [position, setPosition] = useState<MapPosition>({
    left: 100,
    top: 100,
  });
  const [size, setSize] = useState<number>(200);

  return (
    <div>
      <button onClick={() => setSize((size) => (size > 200 ? size / 2 : size))}>
        -
      </button>
      <button onClick={() => setSize((size) => size * 2)}>+</button>
      <button onClick={() => setPosition(() => ({ left: 200, top: 200 }))}>
        Move
      </button>
      <MapWrapper
        position={{ left: position.left, top: position.top }}
        size={size}
      >
        <Tag top={5} left={20} />
        <Tag top={10} left={20} />
        <Tag top={50} left={76} />
      </MapWrapper>
    </div>
  );
};

interface MapWrapperProps {
  position: MapPosition;
  size: number;
}

interface MapPosition {
  left: number;
  top: number;
}

const MapWrapper = styled.div<MapWrapperProps>`
  background: lightgrey;
  border: 1px solid red;

  height: ${(props) => props.size}px;

  left: ${(props) => props.position.left}px;

  position: absolute;

  top: ${(props) => props.position.top}px;

  width: ${(props) => props.size}px;
`;

interface TagProps {
  top: number;
  left: number;
}

const Tag = styled.div<TagProps>`
  background-color: blue;

  cursor: pointer;

  height: 20px;

  position: absolute;

  left: ${(props) => props.left}%;

  top: ${(props) => props.top}%;

  width: 20px;
`;
