import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($photo: String!, $caption: String!) {
    createPost(input: { photo: $photo, caption: $caption }) {
      id
    }
  }
`;
