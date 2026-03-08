import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES } from '../../utils/theme';
import { Logo, PrimaryButton } from '../components';
import { useAuthController } from '../../controllers';

const MAX_CONTENT_WIDTH = 400;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowDimensions();

  const { authState, login } = useAuthController();

  const handleLogin = async () => {
    const success = await login(email, password, rememberMe);
    if (success) {
      navigation.replace('Home');
    } else if (authState.error) {
      Alert.alert('Erro', authState.error);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar senha', 'Funcionalidade em desenvolvimento.');
  };

  const contentWidth = Math.min(width - 48, MAX_CONTENT_WIDTH);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.innerContent, { width: contentWidth }]}>
          <View style={styles.logoContainer}>
            <Logo size="large" />
          </View>

          <Text style={styles.title}>Login</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Ionicons name="mail" size={20} color={COLORS.placeholder} style={styles.inputIcon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'lock-open' : 'lock-closed'}
                  size={20}
                  color={COLORS.placeholder}
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                </View>
                <Text style={styles.rememberText}>Lembrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Entrar"
              onPress={handleLogin}
              loading={authState.isLoading}
              disabled={!email || !password}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingVertical: 40,
  },
  innerContent: {
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 48,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
    height: 50,
  },
  input: {
    flex: 1,
    color: COLORS.inputText,
    fontSize: SIZES.md,
  },
  inputIcon: {
    marginLeft: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: COLORS.darkGray,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxActive: {
    backgroundColor: COLORS.darkGray,
    borderColor: COLORS.darkGray,
  },
  rememberText: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  forgotText: {
    fontSize: SIZES.sm,
    color: COLORS.mediumGray,
  },
  buttonContainer: {
    paddingHorizontal: 0,
  },
});
