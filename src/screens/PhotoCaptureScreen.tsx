/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { Text, YStack } from 'tamagui';

export function PhotoCaptureScreen() {
  return (
    <>
      <StatusBar style="light" />
      <YStack flex={1} backgroundColor="black">
        <YStack backgroundColor="white" m={20}>
          <Text>Camera will go here</Text>
        </YStack>
      </YStack>
    </>
  );
}
