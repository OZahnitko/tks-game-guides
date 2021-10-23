import { SelectedTagType, Tag } from "@contracts";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setActiveTags, setSelectedTagType } from "@store";

export const useTagHooks = () => {
  const dispatch = useAppDispatch();

  return {
    activeTags: useAppSelector(({ tag: { activeTags } }) => activeTags),
    selectedTagType: useAppSelector(
      ({ tag: { selectedTagType } }) => selectedTagType
    ),
    setActiveTags: (activeTags: Tag[]) => dispatch(setActiveTags(activeTags)),
    setSelectedTagType: (selectedTagType: SelectedTagType) =>
      dispatch(setSelectedTagType(selectedTagType)),
  };
};
