export type Coordinate = number;

export type ID = string;

export type SelectedTagType = string | null;

export type Type = string;

export interface Tag {
  coordinates: [Coordinate, Coordinate];
  id: ID;
  type: Type;
}

export interface TagSliceState {
  activeTags: Tag[];
  selectedTagType: SelectedTagType;
}
