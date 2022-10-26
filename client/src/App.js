import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

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
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </div>
      {/* <Footer /> */}
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
