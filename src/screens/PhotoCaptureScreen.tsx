/* eslint-disable react/style-prop-object */
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { RefreshCcw as IconRefresh } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, XStack, YStack } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/Navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function PhotoCaptureScreen() {
  const [type, setType] = useState(CameraType.back);
  const navigation = useNavigation<NavigationProp>();
  navigation.setOptions({
    headerRight: () => {
      return (
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back,
            );
          }}
        >
          <IconRefresh color="white" />
        </Pressable>
      );
    },
  });
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
      <YStack flex={1} backgroundColor="white">
        <Camera type={type} style={{ width: '100%', aspectRatio: 1 }} />
        <XStack>{/* TODO: Add camera buttons */}</XStack>
        <XStack>
          <Button
            onPress={() => {
              navigation.navigate('PostCreate', { openPicker: true });
            }}
          >
            Choose Photo
          </Button>
        </XStack>
      </YStack>
    </>
  );
}
