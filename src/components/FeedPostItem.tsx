import { useMutation } from '@apollo/client';
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
} from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';
import { Avatar, Image, Text, XStack, YStack } from 'tamagui';
import { GET_POSTS, LIKE_POST } from '../graphql/queries';

import { GetPosts_posts as Post } from '../types/__generated__/GetPosts';
import { LikePost, LikePostVariables } from '../types/__generated__/LikePost';

type Props = {
  post: Post;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  const { author } = post;
  const [likePost] = useMutation<LikePost, LikePostVariables>(LIKE_POST, {
    variables: { postId: post.id },
    refetchQueries: [GET_POSTS],
  });
  return (
    <YStack space={12}>
      <XStack px={16} alignItems="center" space={8}>
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
      <XStack px={16} space={12}>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => likePost()}
        >
          <IconHeart color={post.isLikedByViewer ? '#f7444e' : 'black'} />
        </Pressable>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => {
            // TODO
          }}
        >
          <IconMessageSquare />
        </Pressable>
      </XStack>
      <YStack px={16} space={12}>
        <Text fontWeight="600">
          {post.likeCount.toLocaleString()}{' '}
          {post.likeCount === 1 ? 'like' : 'likes'}
        </Text>
        <Text>{post.caption}</Text>
        <Text fontWeight="600">
          View {post.commentCount.toLocaleString()}{' '}
          {post.commentCount === 1 ? 'comment' : 'comments'}
        </Text>
      </YStack>
    </YStack>
  );
}
