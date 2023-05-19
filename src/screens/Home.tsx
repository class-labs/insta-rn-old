import { useEffect } from 'react';
import { FlatList, Pressable } from 'react-native';
import { Paragraph, YStack } from 'tamagui';
import { Plus as IconPlus } from '@tamagui/lucide-icons';
import { useQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedPostItem } from '../components/FeedPostItem';
import { GET_POSTS } from '../graphql/queries';
import { useAuth } from '../support/Auth';

import { RootStackParamList } from '../types/Navigation';
import { GetPosts } from '../__generated__/GetPosts';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const { getAuthToken } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const { data, loading, error } = useQuery<GetPosts>(GET_POSTS, {
    onError: (error) => {
      console.log('Error fetching data');
      console.error(error);
    },
  });
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              const isLoggedIn = getAuthToken() !== null;
              if (isLoggedIn) {
                navigation.navigate('PhotoCapture');
              } else {
                navigation.navigate('Login', { next: 'PhotoCapture' });
              }
            }}
          >
            <IconPlus />
          </Pressable>
        );
      },
    });
  }, [navigation, getAuthToken]);

  if (error) {
    return <Paragraph>{String(error)}</Paragraph>;
  }

  if (loading || !data) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return (
    <FlatList
      data={data.posts}
      style={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        paddingTop: 12,
        paddingBottom: insets.bottom,
      }}
      ItemSeparatorComponent={() => <YStack height={12} />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <FeedPostItem
            post={item}
            onLoginRequired={() => {
              navigation.navigate('Login', { next: 'Home' });
            }}
          />
        );
      }}
    />
  );
}
