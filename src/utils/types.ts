export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Camera: undefined;
  Preview: { photoUri: string };
  Finish: { photoUri: string; framedUri?: string };
};
