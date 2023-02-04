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

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($photo: String!, $caption: String!) {
    createPost(input: { photo: $photo, caption: $caption }) {
      id
    }
  }
`;
