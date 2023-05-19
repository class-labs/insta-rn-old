type CameraCapturedPhoto = {
  width: number;
  height: number;
  uri: string;
};

export type RootStackParamList = {
  Home: undefined;
  PhotoCapture: undefined;
  PostCreate: {
    openPicker?: boolean;
    capturedPhoto?: CameraCapturedPhoto;
  };
  Login: { next: "Home" | "PhotoCapture" };
};
