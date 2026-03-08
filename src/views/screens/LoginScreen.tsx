import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../utils/types';
import { COLORS, SIZES } from '../../utils/theme';
import { Logo, PrimaryButton, Toast } from '../components';
import type { ToastType } from '../components';
import { useAuthController } from '../../controllers';

const MAX_CONTENT_WIDTH = 400;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as ToastType });
  const { width } = useWindowDimensions();

  const { authState, login } = useAuthController();

  const emailInvalid = emailTouched && email.length > 0 && !EMAIL_REGEX.test(email);
  const passwordInvalid = passwordTouched && password.length > 0 && password.length < 4;

  const showToast = (message: string, type: ToastType = 'error') => {
    setToast({ visible: true, message, type });
  };

  const handleLogin = async () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !password) {
      showToast('Preencha todos os campos.');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      showToast('Formato de email invalido.');
      return;
    }
    if (password.length < 4) {
      showToast('Senha deve ter pelo menos 4 caracteres.');
      return;
    }

    const success = await login(email, password, rememberMe);
    if (success) {
      showToast('Login realizado com sucesso!', 'success');
      setTimeout(() => navigation.replace('Home'), 600);
    } else if (authState.error) {
      showToast(authState.error);
    }
  };

  const handleForgotPassword = () => {
    showToast('Funcionalidade em desenvolvimento.', 'info');
  };

  const contentWidth = Math.min(width - 48, MAX_CONTENT_WIDTH);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast(prev => ({ ...prev, visible: false }))}
      />

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
            <View style={[styles.inputContainer, emailInvalid && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.placeholder}
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEmailTouched(true)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Ionicons
                name="mail"
                size={20}
                color={emailInvalid ? COLORS.error : COLORS.placeholder}
                style={styles.inputIcon}
              />
            </View>
            {emailInvalid && (
              <Text style={styles.errorText}>Formato de email invalido</Text>
            )}

            <View style={[styles.inputContainer, passwordInvalid && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={setPassword}
                onBlur={() => setPasswordTouched(true)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'lock-open' : 'lock-closed'}
                  size={20}
                  color={passwordInvalid ? COLORS.error : COLORS.placeholder}
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordInvalid && (
              <Text style={styles.errorText}>Minimo de 4 caracteres</Text>
            )}

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
    marginBottom: 4,
    height: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: '#1a0000',
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.xs,
    marginBottom: 8,
    marginLeft: 4,
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
    marginTop: 10,
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
