import { useState, useCallback, useRef } from 'react';
import { PhotoState, initialPhotoState, Photo } from '../models/PhotoModel';
import { CameraView } from 'expo-camera';

export function usePhotoController() {
  const [photoState, setPhotoState] = useState<PhotoState>(initialPhotoState);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback((
    cameraRef: React.RefObject<CameraView | null>,
    onCountdownTick?: (count: number) => void,
  ) => {
    return new Promise<Photo | null>((resolve) => {
      let count = 3;

      setPhotoState(prev => ({ ...prev, countdown: count, isCapturing: true }));
      onCountdownTick?.(count);

      countdownRef.current = setInterval(async () => {
        count -= 1;

        if (count > 0) {
          setPhotoState(prev => ({ ...prev, countdown: count }));
          onCountdownTick?.(count);
        } else {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }

          setPhotoState(prev => ({ ...prev, countdown: 0 }));
          onCountdownTick?.(0);

          try {
            if (cameraRef.current) {
              const result = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                skipProcessing: false,
              });

              if (result) {
                const photo: Photo = {
                  uri: result.uri,
                  width: result.width,
                  height: result.height,
                  timestamp: Date.now(),
                };

                setPhotoState(prev => ({
                  ...prev,
                  currentPhoto: photo,
                  isCapturing: false,
                  countdown: null,
                }));

                resolve(photo);
              } else {
                setPhotoState(prev => ({
                  ...prev,
                  isCapturing: false,
                  countdown: null,
                }));
                resolve(null);
              }
            } else {
              resolve(null);
            }
          } catch (error) {
            console.error('Erro ao capturar foto:', error);
            setPhotoState(prev => ({
              ...prev,
              isCapturing: false,
              countdown: null,
            }));
            resolve(null);
          }
        }
      }, 1000);
    });
  }, []);

  const cancelCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setPhotoState(prev => ({
      ...prev,
      countdown: null,
      isCapturing: false,
    }));
  }, []);

  const resetPhoto = useCallback(() => {
    setPhotoState(initialPhotoState);
  }, []);

  const setFramedPhoto = useCallback((uri: string) => {
    setPhotoState(prev => ({ ...prev, framedPhotoUri: uri }));
  }, []);

  const setQrCodeUrl = useCallback((url: string) => {
    setPhotoState(prev => ({ ...prev, qrCodeUrl: url }));
  }, []);

  const generateDownloadUrl = useCallback((photoUri: string): string => {
    return `https://expoSnap.nexlab.com/download/${Date.now()}`;
  }, []);

  const setProcessing = useCallback((isProcessing: boolean) => {
    setPhotoState(prev => ({ ...prev, isProcessing }));
  }, []);

  return {
    photoState,
    startCountdown,
    cancelCountdown,
    resetPhoto,
    setFramedPhoto,
    setQrCodeUrl,
    generateDownloadUrl,
    setProcessing,
  };
}
