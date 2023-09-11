const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    firstName: String
    lastName: String
    email: String!
    dateJoined: String
    lists: [List]
    friends: [User]
    friendRequests: [User]
  }

  type Folder {
    _id: ID
    folderDate: String
    folderName: String
    folderItems: [Item]
  }

  type List {
    _id: ID
    listDate: String
    listUser: User
    listName: String
    listUsersCount: Int
    listFolders: [Folder]
    items: [Item]
    listUsers: [User]
  }

  type Item {
    _id: ID
    itemDate: String
    itemUser: User
    itemName: String
    itemLink: String
    itemDetails: String
    itemPrice: Float
    priority: Float
    purchased: Boolean
    linkedItems: [Item]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    myFriends: User
    users: [User]
    user(email: String!): User
    listFolders(_id: ID): List
    list(_id: ID): List
    folder(_id: ID): Folder
    item(_id: ID): Item
    allLists: [List]
    allItems: [Item]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addList(listDate: String, listUser: ID, listName: String): List
    createFolder(folderDate: String, folderName: String, listId: ID!): Folder
    removeFolder(_id: ID!, listId: ID!): List
    addItem(
      listId: String!
      itemDate: String
      itemUser: ID
      itemName: String
      itemLink: String
      itemDetails: String
      itemPrice: Float
      priority: Float
      purchased: Boolean
    ): Item
    removeList(_id: ID!): User
    removeItem(_id: ID!, listId: String, folderId: ID): List
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addFriendRequest(userId: ID!, friendId: ID!): User
    removeFriendRequest(friendId: ID!): User
    addItemToFolder(itemId: ID!, folderId: ID!): Folder
    removeItemFromFolder(_id: ID!, itemId: ID!): Folder
    addUserToList(_id: ID!, userId: ID!): List
    removeUserToList(_id: ID!, userId: ID!): List
    updateItem(
      _id: ID
      itemName: String
      itemLink: String
      itemDetails: String
      itemPrice: Float
      folder: ID
      priority: Float
      purchased: Boolean
    ): Item
    updateList(_id: ID!, listName: String!): List
    updateUser(
      username: String
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
`;

module.exports = typeDefs;
