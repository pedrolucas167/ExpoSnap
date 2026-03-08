import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, BRANDING } from '../../utils/theme';

interface SplashProps {
  onFinish: () => void;
}

export default function AnimatedSplash({ onFinish }: SplashProps) {
  const boxScale = useRef(new Animated.Value(0)).current;
  const boxOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo box appears with bounce
      Animated.parallel([
        Animated.spring(boxScale, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(boxOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // ".lab" text fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(600),
      // Fade out everything
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <View style={styles.logoRow}>
        <Animated.View
          style={[
            styles.logoBox,
            {
              opacity: boxOpacity,
              transform: [{ scale: boxScale }],
            },
          ]}
        >
          <Text style={styles.logoTextBold}>NEX</Text>
        </Animated.View>
        <Animated.Text style={[styles.logoTextLight, { opacity: textOpacity }]}>
          .lab
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        {BRANDING.tagline}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBox: {
    borderWidth: 2.5,
    borderColor: COLORS.black,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  logoTextBold: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.black,
    letterSpacing: 2,
  },
  logoTextLight: {
    fontSize: 48,
    fontWeight: '300',
    color: COLORS.black,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '300',
    color: COLORS.mediumGray,
    letterSpacing: 1,
  },
});
