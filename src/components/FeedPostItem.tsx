import { Avatar, Image, Text, XStack, YStack } from 'tamagui';
import { GetPosts_posts as Post } from '../types/__generated__/GetPosts';

type Props = {
  post: Post;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  const { author } = post;
  return (
    <YStack space={12}>
      <XStack alignItems="center" space={8}>
        <Avatar circular size="$4">
          <Avatar.Image src={author.profilePhoto} />
          <Avatar.Fallback backgroundColor="red">
            <Text>
              {author.name
                .split(/\s+/)
                .map((s) => s.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </Avatar.Fallback>
        </Avatar>
        <Text>{author.name}</Text>
      </XStack>
      <Image
        src={post.photo}
        width="100%"
        height="auto"
        aspectRatio={1}
        resizeMode="cover"
      />
    </YStack>
  );
}
