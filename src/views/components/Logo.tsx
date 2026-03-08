import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, BRANDING, SIZES } from '../../utils/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function Logo({ size = 'medium', color = COLORS.black }: LogoProps) {
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 20 : 28;

  return (
    <View style={styles.container}>
      <View style={[styles.logoBox, { borderColor: color }]}>
        <Text style={[styles.logoTextBold, { fontSize: fontSize * 0.7, color }]}>NEX</Text>
      </View>
      <Text style={[styles.logoTextLight, { fontSize, color }]}>.lab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  logoTextBold: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  logoTextLight: {
    fontWeight: '300',
  },
});
