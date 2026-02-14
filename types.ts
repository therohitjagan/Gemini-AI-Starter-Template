
export enum GenerationType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultUrl: string | null;
  status: string;
}

export interface VideoOperationResponse {
  uri: string;
}
