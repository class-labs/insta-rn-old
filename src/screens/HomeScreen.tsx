import { Text, YStack } from 'tamagui';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      photo
      caption
      author {
        id
        name
        username
      }
    }
  }
`;

export function HomeScreen() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (error) {
    return <Text>{String(error)}</Text>;
  }

  if (loading) {
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
