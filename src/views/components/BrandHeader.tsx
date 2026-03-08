import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo';
import { COLORS, BRANDING, SIZES } from '../../utils/theme';

interface BrandHeaderProps {
  showTagline?: boolean;
}

export default function BrandHeader({ showTagline = true }: BrandHeaderProps) {
  return (
    <View style={styles.container}>
      <Logo size="small" color={COLORS.black} />
      {showTagline && (
        <Text style={styles.tagline}>{BRANDING.tagline}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  tagline: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    fontWeight: '300',
  },
});
