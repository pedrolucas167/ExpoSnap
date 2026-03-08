import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import {
  LoginScreen,
  HomeScreen,
  CameraScreen,
  PreviewScreen,
  FinishScreen,
} from '../views/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
        />
        <Stack.Screen
          name="Finish"
          component={FinishScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
