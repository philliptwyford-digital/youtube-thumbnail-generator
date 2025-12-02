export interface ThumbnailConcept {
  hook: string;
  visualScene: string;
  textOverlay: string;
  colorPalette: string;
  imagePrompt: string;
}

export interface GeneratedImage {
  conceptIndex: number;
  imageUrl: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING_CONCEPTS = 'GENERATING_CONCEPTS',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  ERROR = 'ERROR'
}