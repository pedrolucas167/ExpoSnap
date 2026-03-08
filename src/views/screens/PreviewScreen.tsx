import React from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES } from '../../utils/theme';
import { PrimaryButton, PhotoFrame } from '../components';

const MAX_CONTENT_WIDTH = 400;

type Props = NativeStackScreenProps<RootStackParamList, 'Preview'>;

export default function PreviewScreen({ navigation, route }: Props) {
  const { photoUri } = route.params;
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 48, MAX_CONTENT_WIDTH);

  const handleRetake = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('Finish', { photoUri, framedUri: photoUri });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PhotoFrame photoUri={photoUri} />
      </ScrollView>

      <View style={[styles.buttonRow, { width: contentWidth, alignSelf: 'center' }]}>
        <PrimaryButton
          title="Refazer"
          onPress={handleRetake}
          variant="outline"
          fullWidth={false}
          style={styles.button}
        />
        <PrimaryButton
          title="Continuar"
          onPress={handleContinue}
          variant="primary"
          fullWidth={false}
          style={styles.button}
        />
      </View>
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
    justifyContent: 'center',
    paddingVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: 30,
  },
  button: {
    flex: 1,
  },
});
