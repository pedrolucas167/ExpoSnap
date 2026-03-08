import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SIZES } from '../../utils/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = true,
}: PrimaryButtonProps) {
  const buttonStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.text,
    variant === 'outline' && styles.outlineText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={labelStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: COLORS.buttonPrimary,
  },
  secondary: {
    backgroundColor: COLORS.buttonSecondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.darkGray,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: '600',
  },
  outlineText: {
    color: COLORS.darkGray,
  },
});
