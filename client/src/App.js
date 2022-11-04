import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Lists from "./pages/Lists";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";
import SingleList from "./pages/SingleList";
import SingleItem from "./pages/SingleItem";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Header/>
      <div className="App">
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route  path='/lists' element={<Lists/>} />
          <Route  path='/lists/:id' element={<SingleList/>} />
          <Route  path='/profile' element={<Profile/>} />
          <Route  path='/friends' element={<Friends/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route  path='/lists/:id/:id' element={<SingleItem/>} />
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </div>
      {/* <Footer /> */}
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
