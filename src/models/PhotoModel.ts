export interface Photo {
  uri: string;
  width: number;
  height: number;
  timestamp: number;
}

export interface PhotoState {
  currentPhoto: Photo | null;
  isCapturing: boolean;
  countdown: number | null;
  isProcessing: boolean;
  framedPhotoUri: string | null;
  qrCodeUrl: string | null;
}

export const initialPhotoState: PhotoState = {
  currentPhoto: null,
  isCapturing: false,
  countdown: null,
  isProcessing: false,
  framedPhotoUri: null,
  qrCodeUrl: null,
};
