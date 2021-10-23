import { useAppDispatch, useAppSelector } from "@hooks";
import { IsEditMode } from "@contracts";
import { setIsEditMode } from "@store";

export const useAppHooks = () => {
  const dispatch = useAppDispatch();

  return {
    isEditMode: useAppSelector(({ app: { isEditMode } }) => isEditMode),
    setIsEditMode: (isEditMode: IsEditMode) =>
      dispatch(setIsEditMode(isEditMode)),
  };
};
