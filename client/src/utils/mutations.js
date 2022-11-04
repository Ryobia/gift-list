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
  mutation addList($listDate: String, $listUser: String, $listName: String) {
    addList(listDate: $listDate, listUser: $listUser, listName: $listName) {
      _id
      listDate
      listUser
      listName
    }
  }

`;

export const ADD_ITEM = gql`
  mutation addItem($listId: String!, $itemDate: String, $itemUser: String, $itemName: String, $itemDetails: String, $itemPrice: Float) {
    addItem(listId: $listId, itemDate: $itemDate, itemUser: $itemUser, itemName: $itemName, itemDetails: $itemDetails, itemPrice: $itemPrice) {
      _id
      itemDate
      itemUser
      itemName
      itemDetails
      itemPrice
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
  mutation removeItem($_id: ID!) {
    removeItem(_id: $_id) {
      _id
      }
    }
  
`;