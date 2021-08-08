import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Computer from './components/Computer';
import Login from './components/login';
import Profile from './components/Profile';
import Provider from './context';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/computer' component={Computer}/>
      </Switch>
    </Provider>
  );
}

export default App;