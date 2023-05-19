import { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, Spinner, Paragraph, TextArea, YStack } from 'tamagui';
import { useMutation } from '@apollo/client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { CREATE_POST, GET_POSTS } from '../graphql/queries';
import { useKeyboardVisibility } from '../support/useKeyboardVisibility';

type ResolvedRouteProp = RouteProp<RootStackParamList, 'PostCreate'>;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PostCreate'
>;

const SERVER_BASE_URL = process.env.GRAPHQL_API;

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
  const response = await fetch(SERVER_BASE_URL + '/images', {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'content-disposition': mimeType,
    },
    body: blob,
  });
  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.toLowerCase().split(';')[0] !== 'application/json') {
    throw new Error(`Unexpected response type: ${contentType}`);
  }
  return await response.json();
}

export function PostCreate() {
  const route = useRoute<ResolvedRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      navigation.replace('Home');
    },
    refetchQueries: [GET_POSTS],
  });
  const isKeyboardShown = useKeyboardVisibility();
  const [selectedImage, setSelectedImage] = useState<string | null>(() => {
    return route.params.capturedPhoto?.uri ?? null;
  });
  const [uploadedImage, setUploadedImage] = useState<ImageUpload | null>(null);
  const [caption, setCaption] = useState('');

  const startUpload = async (uri: string) => {
    setUploadedImage({ state: 'uploading' });
    uploadImage(uri)
      .then((result) => {
        setUploadedImage({
          state: 'complete',
          uri: result.url,
        });
      })
      .catch((error) => {
        Alert.alert(String(error));
        setUploadedImage(null);
      });
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
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
    <YStack flex={1}>
      <KeyboardAvoidingView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
        behavior="position"
      >
        <YStack flex={1} backgroundColor="white" space={12}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              if (isKeyboardShown) {
                Keyboard.dismiss();
              } else {
                openImagePicker();
              }
            }}
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
                <Paragraph>Press to choose an image</Paragraph>
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
            <TextArea
              value={caption}
              onChangeText={(value) => setCaption(value)}
            />
            <Button
              disabled={uploadedImage?.state !== 'complete'}
              onPress={() => {
                if (uploadedImage?.state === 'complete') {
                  createPost({
                    variables: {
                      photo: uploadedImage.uri,
                      caption,
                    },
                  });
                }
              }}
            >
              Submit
            </Button>
          </YStack>
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}
