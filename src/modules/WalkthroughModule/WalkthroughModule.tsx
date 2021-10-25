import { useState } from "react";

import { data } from "@data";
import { useGameHooks, useTagHooks } from "@hooks";
import { addCollectedItem } from "@utilities";

import { Wrapper } from "./Styles";

const WalkthroughModule = () => {
  const [root] = useState<{ x: number; y: number }>({ x: 3, y: 1 });
  const [size] = useState<{ height: number; width: number }>({
    height: 2,
    width: 2,
  });

  const { selectedGame, selectedMap } = useGameHooks();
  const { addCollectedTag, collectedTags, selectedTag } = useTagHooks();

  return (
    <Wrapper root={root} size={size}>
      <h1>Walkthrough</h1>
      <h2>{data.games.find((game) => game.id === selectedGame)?.name}</h2>
      <h3>
        {
          data.games
            .find((game) => game.id === selectedGame)
            ?.data.maps.find((map) => map.id === selectedMap)?.name
        }
      </h3>
      {selectedTag && (
        <>
          {data.games
            .find((game) => game.id === selectedGame)
            ?.data.maps.find((map) => map.id === selectedMap)
            ?.collectibles.find((collectible) => collectible.id === selectedTag)
            ?.guide?.map((step, index) => (
              <div key={index}>
                <img alt="item" src={step.imageUrl} height={200} />
                <p>{step.text}</p>
              </div>
            ))}
          <button
            onClick={() => {
              addCollectedTag(selectedTag);
              addCollectedItem(selectedTag);
            }}
          >
            Collect
          </button>
          <pre>{JSON.stringify({ collectedTags }, null, 2)}</pre>
        </>
      )}
    </Wrapper>
  );
};

export default WalkthroughModule;
