import {gql} from "@apollo/client";



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


export const QUERY_USERS = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      dateJoined
      
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