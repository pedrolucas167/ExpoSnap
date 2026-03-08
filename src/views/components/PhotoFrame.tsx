import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Logo from './Logo';
import { COLORS, BRANDING, SIZES } from '../../utils/theme';

const MAX_FRAME_WIDTH = 360;

interface PhotoFrameProps {
  photoUri: string;
}

export default function PhotoFrame({ photoUri }: PhotoFrameProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" color={COLORS.white} />
        <Text style={styles.tagline}>{BRANDING.tagline}</Text>
      </View>

      <View style={styles.photoContainer}>
        <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
      </View>

      <View style={styles.footer}>
        <Text style={styles.tagline}>{BRANDING.tagline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderRadius: 4,
    overflow: 'hidden',
    width: '85%',
    maxWidth: MAX_FRAME_WIDTH,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  tagline: {
    color: COLORS.white,
    fontSize: SIZES.xs,
    fontWeight: '300',
  },
});
