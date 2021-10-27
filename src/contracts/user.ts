export type CollectibleId = string;

export type SelectedGameId = string | undefined;

export type SelectedMapId = string | undefined;

export interface UserSlice {
  collectibles: CollectibleId[];
  selectedGame: SelectedGameId;
  selectedMap: SelectedMapId;
}
