import { Text, YStack } from 'tamagui';
import { useQuery } from '@apollo/client';
import { GetPosts } from '../types/__generated__/GetPosts';
import { GET_POSTS } from '../graphql/queries';

export function HomeScreen() {
  const { data, loading, error } = useQuery<GetPosts>(GET_POSTS);

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  return (
    <YStack flex={1} justifyContent="flex-start" alignItems="stretch">
      {data.posts.map((post) => (
        <Text>{post.id}</Text>
      ))}
    </YStack>
  );
}
