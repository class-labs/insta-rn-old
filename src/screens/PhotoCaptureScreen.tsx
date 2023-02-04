/* eslint-disable react/style-prop-object */
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { RefreshCcw as IconRefresh } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, XStack, YStack } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function PhotoCaptureScreen() {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState(CameraType.back);
  const [isReady, setReady] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              setType((type) =>
                type === CameraType.back ? CameraType.front : CameraType.back,
              );
            }}
          >
            <IconRefresh color="white" />
          </Pressable>
        );
      },
    });
  }, [navigation]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    return null;
  }
  if (!permission.granted) {
    return (
      <YStack flex={1} backgroundColor="white" p={20} space={12}>
        <Text>Camera permission needed.</Text>
        <Button onPress={() => requestPermission()}>Enable Camera</Button>
      </YStack>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <YStack
        flex={1}
        backgroundColor="white"
        space={12}
        paddingBottom={insets.bottom}
      >
        <Camera
          ref={cameraRef}
          type={type}
          style={{ width: '100%', aspectRatio: 1 }}
          onMountError={(error) => {
            const message: unknown = Object(error).message;
            Alert.alert(
              'Error',
              typeof message === 'string'
                ? message
                : 'Unable to initialize camera',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.replace('PostCreate', {}),
                },
              ],
            );
          }}
          onCameraReady={() => {
            setReady(true);
          }}
        />
        <XStack justifyContent="center">
          <Button
            disabled={!isReady}
            onPress={async () => {
              const result = await cameraRef.current?.takePictureAsync();
              if (result) {
                navigation.replace('PostCreate', { capturedPhoto: result });
              }
            }}
          >
            Take Photo
          </Button>
        </XStack>
        <XStack justifyContent="center">
          <Button
            onPress={() => {
              navigation.replace('PostCreate', { openPicker: true });
            }}
          >
            Choose from Photos
          </Button>
        </XStack>
      </YStack>
    </>
  );
}
