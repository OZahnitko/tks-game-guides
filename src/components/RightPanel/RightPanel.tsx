import { useEffect } from "react";

import { useAppHooks, useTagHooks } from "@hooks";

import { Wrapper } from "./Styles";

const MAP_TAGS: string[] = [
  "bomb",
  "energy tank",
  "energy tank part",
  "rocket",
  "upgrade",
];

const RightPanel = () => {
  const { isEditMode } = useAppHooks();

  return <Wrapper>{isEditMode ? <TagEditor /> : ""}</Wrapper>;
};

export default RightPanel;

export const TagEditor = () => {
  const { selectedTagType, setSelectedTagType } = useTagHooks();

  useEffect(() => {
    setSelectedTagType(MAP_TAGS[3]);
  }, []);

  return (
    <div>
      {MAP_TAGS.map((tag, index) => (
        <button key={index} onClick={() => setSelectedTagType(tag)}>
          {tag}
        </button>
      ))}
      {selectedTagType}
    </div>
  );
};
