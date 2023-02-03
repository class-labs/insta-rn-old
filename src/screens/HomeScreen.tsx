import { FlatList } from 'react-native';
import { Text, YStack } from 'tamagui';
import { useQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GetPosts } from '../types/__generated__/GetPosts';
import { GET_POSTS } from '../graphql/queries';
import { FeedPostItem } from '../components/FeedPostItem';
import { RootStackParamList } from '../types/Navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data, loading, error } = useQuery<GetPosts>(GET_POSTS);
  const insets = useSafeAreaInsets();

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  if (loading || !data) {
    return <Text>Loading...</Text>;
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
              navigation.navigate('Login');
            }}
          />
        );
      }}
    />
  );
}
