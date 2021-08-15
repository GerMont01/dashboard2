import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Computer from './components/Computer';
import Login from './components/login';
import Invalid from './components/Invalid'
import Provider from './context';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/invalid' component={Invalid}/>
        <Route path='/computer' component={Computer}/>
      </Switch>
    </Provider>
  );
}

export default App;