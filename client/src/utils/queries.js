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
        listUser {
          _id
          firstName
          lastName
        }
        listName
      }
      friends {
        _id
        firstName
        lastName
        email
      }
      friendRequests {
        _id
      }
    }
  }
`;
export const QUERY_MY_FRIENDS = gql`
  {
    myFriends {
      _id
      friends {
        _id
        firstName
        lastName
        email
        lists {
          _id
          listName
          listDate
        }
      }
      friendRequests {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      username
      firstName
      lastName
      friends {
        username
      }
      lists {
        _id
        listName
        listUser {
          _id
          firstName
          lastName
        }
        listDate
        listUsers {
          _id
        }
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
      listUser {
        _id
        firstName
        lastName
      }
      listName
      listUsers {
        _id
        email
        firstName
        lastName
      }
      items {
        _id
        itemDate
        itemUser {
          _id
          firstName
          lastName
        }
        itemName
        itemLink
        itemDetails
        itemPrice
        priority
        purchased
      }
    }
  }
`;

export const QUERY_ITEM = gql`
  query item($_id: ID!) {
    item(_id: $_id) {
        _id
        itemDate
        itemUser {
          _id
          firstName
          lastName
        }
        itemLink
        itemName
        itemDetails
        itemPrice
        priority
        purchased
    }
  }
`;

export const QUERY_ALL_LISTS = gql`
  {
    allLists {
      _id
      listDate
      listUser {
        _id
        firstName
        lastName
      }
      listName
      listUsers {
        _id
        username
        firstName
        lastName
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

export const QUERY_ALL_STORES = gql`
  {
    allStores {
      _id
      storeName
      storeURL
      storeLogo
      storeDescription
      dateAdded
      tags
    }
  }
`;
