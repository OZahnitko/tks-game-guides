import { useEffect, useState } from "react";

import { data } from "@data";
import { useGameHooks } from "@hooks";
import { setSelectedMap as setSelectedMapLS } from "@utilities";

import { Wrapper } from "./Styles";

const MapControlsModule = () => {
  const [root] = useState<{ x: number; y: number }>({ x: 1, y: 3 });
  const [size] = useState<{ height: number; width: number }>({
    height: 1,
    width: 1,
  });

  const [availableMaps, setAvailableMaps] = useState<
    { id: string; name: string }[] | undefined
  >(undefined);

  const { selectedGame, selectedMap, setSelectedMap } = useGameHooks();

  useEffect(() => {
    if (selectedGame && selectedMap) {
      setAvailableMaps(() =>
        data.games
          .find((game) => game.id === selectedGame)
          ?.data.maps.map((map) => ({ id: map.id, name: map.name }))
      );
    }
  }, [selectedGame, selectedMap]);

  return (
    <Wrapper root={root} size={size}>
      <h1>Map Controls</h1>
      <h2>{data.games.find((game) => game.id === selectedGame)?.name}</h2>
      <h3>
        {
          data.games
            .find((game) => game.id === selectedGame)
            ?.data.maps.find((map) => map.id === selectedMap)?.name
        }
      </h3>
      {availableMaps?.map((map) => (
        <button
          key={map.id}
          onClick={() => {
            setSelectedMap(map.id);
            setSelectedMapLS(map.id);
          }}
        >
          {map.name}
        </button>
      ))}
    </Wrapper>
  );
};

export default MapControlsModule;
