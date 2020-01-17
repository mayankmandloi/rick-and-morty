import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  state = {
    charList: [],
    filters: [],
    nextPageUrl: '',
    previousPageUrl: '',
    totalPage: 0
  };

  async componentDidMount () {
    let response = await fetch ('https://rickandmortyapi.com/api/character');
    response = await response.json();
    const {results, info:{next, previous, count}} = response;
    this.setState({
      charList: results,
      nextPageUrl: next,
      previousPageUrl: previous,
      totalPage: count
    })
    console.log(results, next, previous, count);
  }

  render () {
    return ('test');
  }
}

export default App;
