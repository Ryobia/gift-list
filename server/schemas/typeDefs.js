const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    firstName: String
    lastName: String
    email: String!
    dateJoined: String
    scores: [Score]
  }

  type Score {
    _id: ID
    game: String
    score: Float
    scoreType: String
    scoreDate: String
    scoreUser: String
    hint: Boolean
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    allScores: [Score]


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
    addScore(game: String, score: Float, scoreType: String, scoreUser: String, hint: Boolean): Score


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
