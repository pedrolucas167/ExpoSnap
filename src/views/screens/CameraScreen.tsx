import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES } from '../../utils/theme';
import { usePhotoController } from '../../controllers';

const MAX_CAMERA_WIDTH = 400;

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);
  const [displayCountdown, setDisplayCountdown] = useState<number | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const { photoState, startCountdown, cancelCountdown } = usePhotoController();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleCapture = async () => {
    if (photoState.isCapturing) return;

    const photo = await startCountdown(cameraRef, (count) => {
      setDisplayCountdown(count === 0 ? null : count);
    });

    if (photo) {
      navigation.navigate('Preview', { photoUri: photo.uri });
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.darkGray} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.permissionText}>
          Precisamos de acesso à câmera para continuar.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Permitir acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
        onCameraReady={() => setIsReady(true)}
      >
        {displayCountdown !== null && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{displayCountdown}</Text>
          </View>
        )}

        {isReady && !displayCountdown && !photoState.isCapturing && (
          <View style={styles.cameraLabel}>
            <Text style={styles.cameraLabelText}>[câmera aberta]</Text>
          </View>
        )}
      </CameraView>

      <View style={styles.captureContainer}>
        <TouchableOpacity
          style={[
            styles.captureButton,
            photoState.isCapturing && styles.captureButtonDisabled,
          ]}
          onPress={handleCapture}
          disabled={!isReady || photoState.isCapturing}
          activeOpacity={0.7}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  camera: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_CAMERA_WIDTH,
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  countdownText: {
    fontSize: 120,
    fontWeight: '900',
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  cameraLabel: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
  },
  cameraLabelText: {
    fontSize: SIZES.lg,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '300',
  },
  captureContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  captureButtonDisabled: {
    opacity: 0.4,
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  permissionText: {
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  permissionButton: {
    backgroundColor: COLORS.buttonPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.borderRadius,
  },
  permissionButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
});
