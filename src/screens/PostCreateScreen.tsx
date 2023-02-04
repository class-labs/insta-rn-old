import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, Text, YStack } from 'tamagui';
import { RootStackParamList } from '../types/Navigation';

type ResolvedRouteProp = RouteProp<RootStackParamList, 'PostCreate'>;

const API_BASE = process.env.GRAPHQL_API;

type UploadResponse = {
  url: string;
};

async function uploadImage(
  imageUri: string,
  mimeType = 'image/jpeg',
): Promise<UploadResponse> {
  const response = await fetch(API_BASE + '/images', {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'content-disposition': mimeType,
    },
    body: imageUri,
  });
  return await response.json();
}

export function PostCreateScreen() {
  const route = useRoute<ResolvedRouteProp>();
  const [imageUri, setImageUri] = useState<string | null>(() => {
    return route.params.capturedPhoto?.uri ?? null;
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  useEffect(() => {
    if (route.params.openPicker) {
      // TODO: Open the photo picker
    }
  }, [route]);

  return (
    <YStack flex={1} backgroundColor="white" space={12}>
      <Pressable
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
        onPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          console.log(result);
          setUploadedImage(null);
          if (!result.canceled) {
            const asset = result.assets[0];
            if (asset) {
              setImageUri(asset.uri);
              const { url } = await uploadImage(asset.uri);
              setUploadedImage(url);
            }
          }
        }}
      >
        <YStack
          width="100%"
          aspectRatio={1}
          backgroundColor="#dcdcdc"
          justifyContent="center"
          alignItems="center"
        >
          {imageUri ? (
            <Image src={imageUri} width="100%" height="auto" aspectRatio={1} />
          ) : (
            <Text>Press to choose an image</Text>
          )}
        </YStack>
      </Pressable>
      <Text>Chosen image: {String(imageUri)}</Text>
      <Text>Uploaded image: {String(uploadedImage)}</Text>
    </YStack>
  );
}
