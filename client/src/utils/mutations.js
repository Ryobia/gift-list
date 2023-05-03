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
  mutation addItem($listId: String!, $itemDate: String, $itemUser: ID, $itemName: String, $itemLink: String, $itemDetails: String, $priority: Float, $itemPrice: Float) {
    addItem(listId: $listId, itemDate: $itemDate, itemUser: $itemUser, itemName: $itemName, itemLink: $itemLink, itemDetails: $itemDetails, priority: $priority, itemPrice: $itemPrice) {
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
      priority
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

export const REMOVE_USER_TO_LIST = gql`
  mutation removeUserToList($_id: ID!, $userId: ID!) {
    removeUserToList(_id: $_id, userId: $userId) {
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

export const UPDATE_LIST = gql`
    mutation updateList($_id: ID!, $listName: String!) {
      updateList(_id: $_id, listName: $listName) {
      _id
      listName
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation createFolder($folderDate: String, $folderName: ID) {
    createFolder(folderDate: $folderDate, folderName: $folderName) {
      _id
      folderDate
      folderName
      
    }
  }

`;

export const REMOVE_FOLDER = gql`
  mutation removeFolder($_id: ID!, $listId: String) {
    removeFolder(_id: $_id, listId: $listId) {
      _id
      }
    }
  
`;

export const ADD_ITEM_TO_FOLDER = gql`
  mutation addItemToFolder($_id: ID!, $itemId: ID!) {
    addItemToFolder(_id: $_id, itemId: $itemId) {
      _id
      folderItems {
        _id
        itemName
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_FOLDER = gql`
  mutation removeItemFromFolder($_id: ID!, $itemId: ID!) {
    removeItemFromFolder(_id: $_id, itemId: $itemId) {
      _id
      folderItems {
        _id
        itemName
      }
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
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      friends {
        _id
      }
    }
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      friends {
        _id
      }
    }
  }
`;
export const ADD_FRIEND_REQUEST = gql`
  mutation addFriendRequest($userId: ID!, $friendId: ID!) {
    addFriendRequest(userId: $userId, friendId: $friendId) {
      _id
      friendRequests {
        _id
      }
    }
  }
`;
export const REMOVE_FRIEND_REQUEST = gql`
  mutation removeFriendRequest($friendId: ID!) {
    removeFriendRequest(friendId: $friendId) {
      _id
      friendRequests {
        _id
      }
    }
  }
`;