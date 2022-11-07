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
  }

  type List {
    _id: ID
    listDate: String
    listUser: String
    listName: String
    items: [Item]
  }

  type Item {
    _id: ID
    itemDate: String
    itemUser: String
    itemName: String
    itemLink: String
    itemDetails: String
    itemPrice: Float
    purchased: Boolean
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    list(_id: ID): List
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
    addList(listDate: String, listUser: String, listName: String): List
    addItem(listId: String!, itemDate: String, itemUser: String, itemName: String, itemLink: String, itemDetails: String, itemPrice: Float, purchased: Boolean): Item
    removeList(_id: ID!): User
    removeItem(_id: ID!, listId: String): List

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
