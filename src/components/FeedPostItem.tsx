import { Text } from 'tamagui';
import { GetPosts_posts as Post } from '../types/__generated__/GetPosts';

type Props = {
  post: Post;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  return <Text>{post.id}</Text>;
}
