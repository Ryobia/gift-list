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
        items {
          itemName
        }
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      firstName
      lastName
      friends {
        username
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
      listUsers {
        _id
        username
      }
      items {
        _id
        itemDate
        itemUser
        itemName
        itemLink
        itemDetails
        itemPrice
      }
    }
  }
`;

export const QUERY_ITEM = gql`
  query item($_id: ID!) {
    item(_id: $_id) {
        _id
        itemDate
        itemUser
        itemLink
        itemName
        itemDetails
        itemPrice
        purchased
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
      listUsers {
        username
      }
    }
  }
`;

export const QUERY_ALL_ITEMS = gql`
  {
    allItems {
      _id
      itemName
      itemDetails
      itemLink
      itemPrice
      itemDate
      itemUser
    }
  }
`;
