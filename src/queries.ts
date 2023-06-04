import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
  query GetAllItems($searchValue: String!) {
    items(where: { title: { _ilike: $searchValue } }) {
      id
      title
      price
      imageUrl: image_url
    }
  }
`;
