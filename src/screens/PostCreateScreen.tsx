import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Image, Spinner, Text, YStack } from 'tamagui';
import { RootStackParamList } from '../types/Navigation';

type ResolvedRouteProp = RouteProp<RootStackParamList, 'PostCreate'>;

const API_BASE = process.env.GRAPHQL_API;

type ImageUpload =
  | {
      state: 'uploading';
    }
  | {
      state: 'complete';
      uri: string;
    };

type UploadResponse = {
  url: string;
};

async function uriToBlob(imageUri: string) {
  const response = await fetch(imageUri);
  return await response.blob();
}

async function uploadImage(
  imageUri: string,
  mimeType = 'image/jpeg',
): Promise<UploadResponse> {
  const blob = await uriToBlob(imageUri);
  const response = await fetch(API_BASE + '/images', {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'content-disposition': mimeType,
    },
    body: blob,
  });
  return await response.json();
}

export function PostCreateScreen() {
  const route = useRoute<ResolvedRouteProp>();
  const [selectedImage, setSelectedImage] = useState<string | null>(() => {
    return route.params.capturedPhoto?.uri ?? null;
  });
  const [uploadedImage, setUploadedImage] = useState<ImageUpload | null>(null);

  const startUpload = async (uri: string) => {
    setUploadedImage({ state: 'uploading' });
    const result = await uploadImage(uri);
    setUploadedImage({
      state: 'complete',
      uri: result.url,
    });
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setUploadedImage(null);
    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset) {
        setSelectedImage(asset.uri);
        startUpload(asset.uri);
      }
    }
  };

  useEffect(() => {
    const { openPicker, capturedPhoto } = route.params;
    if (capturedPhoto) {
      startUpload(capturedPhoto.uri);
    }
    if (openPicker) {
      openImagePicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <YStack flex={1} backgroundColor="white" space={12}>
      <Pressable
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
        onPress={() => openImagePicker()}
      >
        <YStack
          width="100%"
          aspectRatio={1}
          backgroundColor="#dcdcdc"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              width="100%"
              height="auto"
              aspectRatio={1}
            />
          ) : (
            <Text>Press to choose an image</Text>
          )}
          {uploadedImage?.state === 'uploading' ? (
            <YStack
              position="absolute"
              right={10}
              bottom={10}
              zIndex={2}
              backgroundColor="rgba(0, 0, 0, .7)"
              padding={12}
              borderRadius={5}
            >
              <Spinner size="large" color="white" />
            </YStack>
          ) : null}
        </YStack>
      </Pressable>
      <YStack px={16} space={12}>
        <Text>Chosen image: {String(selectedImage)}</Text>
        <Text>Uploaded image: {JSON.stringify(uploadedImage)}</Text>
        <Button
          disabled={uploadedImage?.state !== 'complete'}
          onPress={() => {
            // TODO: GraphQL Mutation
          }}
        >
          Submit
        </Button>
      </YStack>
    </YStack>
  );
}
