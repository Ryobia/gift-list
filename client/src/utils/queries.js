import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      dateJoined
      lists {
        _id
        listDate
        listUser
        listName
      }
    }
  }
`;


export const QUERY_ALL_USERS = gql`
  {
    users {
      _id
      firstName
      lastName
      email
      dateJoined
    }
  }
`;

export const QUERY_LIST = gql`

  query list($_id: ID!) {
    list(_id: $_id) {
      listDate
      listUser
      listName
      items {
        itemDate
        itemUser
        itemName
        itemDetails
        itemPrice
      }
    }
  }

`;

export const QUERY_ALL_LISTS = gql`
  {
    allLists {
      _id
      listDate
      listUser
      listName
    }
  }
`;
