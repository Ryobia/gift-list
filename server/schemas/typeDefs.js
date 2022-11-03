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
    itemName: String!
    itemDetails: String
    itemPrice: Float
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
    allLists: [List]

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
    addItem(itemDate: String, itemUser: String, itemName: String, itemDetails: String, itemPrice: Float): Item
    removeList(_id: ID!): User

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
