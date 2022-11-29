import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser( $username: String, $firstName: String, $lastName: String, $email: String, $password: String) {
    updateUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

export const ADD_LIST = gql`
  mutation addList($listDate: String, $listUser: ID, $listName: String) {
    addList(listDate: $listDate, listUser: $listUser, listName: $listName) {
      _id
      listDate
      listUser {
        _id
      }
      listName
    }
  }

`;

export const ADD_ITEM = gql`
  mutation addItem($listId: String!, $itemDate: String, $itemUser: ID, $itemName: String, $itemLink: String, $itemDetails: String, $itemPrice: Float) {
    addItem(listId: $listId, itemDate: $itemDate, itemUser: $itemUser, itemName: $itemName, itemLink: $itemLink, itemDetails: $itemDetails, itemPrice: $itemPrice) {
      _id
      itemDate
      itemUser {
        _id
        firstName
        lastName
      }
      itemName
      itemDetails
      itemPrice
    }
  }

`;


export const ADD_USER_TO_LIST = gql`
  mutation addUserToList($_id: ID!, $userId: ID!) {
    addUserToList(_id: $_id, userId: $userId) {
      _id
      listUsersCount
      listUsers {
        username
      }
    }
  }
`;

export const REMOVE_LIST = gql`
  mutation removeList($_id: ID!) {
    removeList(_id: $_id) {
      _id
      }
    }
  
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($_id: ID!, $listId: String) {
    removeItem(_id: $_id, listId: $listId) {
      _id
      }
    }
  
`;

export const UPDATE_ITEM = gql`
    mutation updateItem($_id: ID, $itemName: String, $itemLink: String, $itemDetails: String, $priority: Float, $itemPrice: Float, $purchased: Boolean) {
      updateItem(_id: $_id, itemName: $itemName, itemLink: $itemLink, itemDetails: $itemDetails, priority: $priority, itemPrice: $itemPrice, purchased: $purchased) {
      _id
      priority
      purchased
    }
  }
`;


export const ADD_FRIEND = gql`
  mutation addFriend($username: String!) {
    addFriend(username: $username) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;