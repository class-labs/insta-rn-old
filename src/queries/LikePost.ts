import { gql } from '@apollo/client';

export const LIKE_POST = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      id
      likeCount
      isLikedByViewer
    }
  }
`;
