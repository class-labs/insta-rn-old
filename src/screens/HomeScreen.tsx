import { FlatList } from 'react-native';
import { Text } from 'tamagui';
import { useQuery } from '@apollo/client';
import { GetPosts } from '../types/__generated__/GetPosts';
import { GET_POSTS } from '../graphql/queries';
import { FeedPostItem } from '../components/FeedPostItem';

export function HomeScreen() {
  const { data, loading, error } = useQuery<GetPosts>(GET_POSTS);

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={data.posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <FeedPostItem post={item} />;
      }}
    />
  );
}
