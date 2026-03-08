import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  useWindowDimensions,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES, BRANDING } from '../../utils/theme';
import { PrimaryButton, BrandHeader, Logo } from '../components';
import { usePhotoController } from '../../controllers';

const MAX_CONTENT_WIDTH = 400;

type Props = NativeStackScreenProps<RootStackParamList, 'Finish'>;

export default function FinishScreen({ navigation, route }: Props) {
  const { photoUri } = route.params;
  const [showThankYou, setShowThankYou] = useState(false);
  const { generateDownloadUrl } = usePhotoController();
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 48, MAX_CONTENT_WIDTH);

  const downloadUrl = useMemo(() => generateDownloadUrl(photoUri), [photoUri]);

  const handleFinish = () => {
    setShowThankYou(true);
  };

  const handleClose = () => {
    setShowThankYou(false);
    navigation.popToTop();
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <BrandHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.photoPreview}>
          <Image
            source={{ uri: photoUri }}
            style={styles.photoImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.qrSection}>
          <Text style={styles.qrLabel}>Fazer download</Text>
          <View style={styles.qrContainer}>
            <QRCode value={downloadUrl} size={140} backgroundColor={COLORS.white} />
          </View>
        </View>

        <Text style={styles.footerTagline}>{BRANDING.tagline}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Finalizar" onPress={handleFinish} />
      </View>

      <Modal
        visible={showThankYou}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalLogoContainer}>
              <Logo size="small" />
            </View>

            <Text style={styles.thankYouTitle}>Obrigado!</Text>
            <Text style={styles.thankYouText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>

            <View style={styles.modalQrContainer}>
              <QRCode value={downloadUrl} size={160} backgroundColor={COLORS.white} />
            </View>

            <PrimaryButton
              title="Finalizar"
              onPress={handleClose}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  photoPreview: {
    width: '60%',
    maxWidth: MAX_CONTENT_WIDTH * 0.7,
    aspectRatio: 3 / 4,
    alignSelf: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  qrSection: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    marginHorizontal: SIZES.padding * 2,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrLabel: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginBottom: 12,
    fontWeight: '500',
  },
  qrContainer: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },
  footerTagline: {
    fontSize: SIZES.sm,
    color: COLORS.mediumGray,
    fontWeight: '300',
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 28,
    width: '85%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignItems: 'center',
  },
  modalLogoContainer: {
    marginBottom: 16,
  },
  thankYouTitle: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  thankYouText: {
    fontSize: SIZES.md,
    color: COLORS.mediumGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalQrContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
  },
});
