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
    if(results)
    {
      this.setState({
        charList: results,
        nextPageUrl: next,
        previousPageUrl: previous,
        totalPage: count
      });
    }
    console.log(results, next, previous, count);
  }

  render () {
    const listOfname = this.state.charList.map(char => <li>{char.name}</li>);
    return (<ul>{listOfname}</ul>);
  }
}

export default App;
