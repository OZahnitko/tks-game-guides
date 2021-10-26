import { useAppDispatch, useAppSelector } from "@hooks";
import {
  addCollectedTag,
  removeCollectedTag,
  setCollectedTags,
  setSelectedTag,
} from "@store";

export const useTagHooks = () => {
  const dispatch = useAppDispatch();

  return {
    addCollectedTag: (collectedTag: string) =>
      dispatch(addCollectedTag(collectedTag)),
    collectedTags: useAppSelector(
      ({ tag: { collectedTags } }) => collectedTags
    ),
    removeCollectedTag: (collectedTag: string) =>
      dispatch(removeCollectedTag(collectedTag)),
    setCollectedTags: (collectedTags: string[]) =>
      dispatch(setCollectedTags(collectedTags)),
    selectedTag: useAppSelector(({ tag: { selectedTag } }) => selectedTag),
    setSelectedTag: (selectedTag: string) =>
      dispatch(setSelectedTag(selectedTag)),
  };
};
