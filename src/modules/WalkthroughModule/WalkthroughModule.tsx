import { useState } from "react";

import { data } from "@data";
import { useGameHooks, useTagHooks } from "@hooks";
import {
  addCollectible,
  addCollectedItem,
  removeCollectedItem,
} from "@utilities";

import { Wrapper } from "./Styles";

const WalkthroughModule = () => {
  const [root] = useState<{ x: number; y: number }>({ x: 4, y: 1 });
  const [size] = useState<{ height: number; width: number }>({
    height: 2,
    width: 1,
  });

  const { selectedGame, selectedMap } = useGameHooks();
  const {
    addCollectedTag,
    collectedTags,
    removeCollectedTag,
    selectedTag,
  } = useTagHooks();

  return (
    <Wrapper root={root} size={size}>
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
          {collectedTags.includes(selectedTag) ? (
            <button
              onClick={() => {
                removeCollectedTag(selectedTag);
                removeCollectedItem(selectedTag);
              }}
            >
              un-collect
            </button>
          ) : (
            <button
              onClick={() => {
                addCollectedTag(selectedTag);
                addCollectedItem(selectedTag);
              }}
            >
              Collect
            </button>
          )}
          <button
            onClick={() =>
              addCollectible(
                {
                  id: "111",
                  location: [1, 1],
                  requirements: ["storm rocket"],
                  type: "rocket",
                },
                selectedGame!,
                selectedMap!
              )
            }
          >
            Add Test Collect
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default WalkthroughModule;
