export interface Collectible {
  guide: { imageUrl: string; text: string }[];
  id: string;
  location: { x: number; y: number };
  mapId: string;
  requirements: string[];
  type: string;
}
