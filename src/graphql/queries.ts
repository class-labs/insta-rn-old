import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      photo
      caption
      author {
        id
        name
        username
        profilePhoto
      }
      likeCount
      isLikedByViewer
      commentCount
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId)
  }
`;
