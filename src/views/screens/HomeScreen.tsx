import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES } from '../../utils/theme';
import { Logo, PrimaryButton } from '../components';

const MAX_CONTENT_WIDTH = 400;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 48, MAX_CONTENT_WIDTH);

  const handleStart = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.innerContent, { width: contentWidth }]}>
        <View style={styles.logoContainer}>
          <Logo size="medium" />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Photo</Text>
          <Text style={styles.title}>Opp</Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Iniciar" onPress={handleStart} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  innerContent: {
    flex: 1,
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: '900',
    fontStyle: 'italic',
    color: COLORS.black,
    lineHeight: 80,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
});
