import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import { CharacterListWrpper } from './charater-list/character-list-wrapper'
import './App.css';
import { Filter } from './filters/filter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      filters: {
        gender: [
          ['male', false],
          ['female', false]
        ],
        species: [
          ['Human', false],
          ['Alien', false],
          ['Humanoid', false],
          ['Cronenberg', false]
        ]
      },
      onPageFilter: {
        origin: []
      },
      nextPageUrl: '',
      previousPageUrl: '',
      totalPage: 0
    };
  }

  fetchAndUpdate = async () => {
    const searchParams = new URLSearchParams(this.props.location.search);
    for (let qu of searchParams.entries()) {
      console.log(qu);
    }
    let response = await fetch(`https://rickandmortyapi.com/api/character${this.props.location.search}`);
    response = await response.json();
    const { results, info: { next, previous, count } } = response;
    if (results) {
      this.setState({
        charList: results,
        nextPageUrl: next,
        previousPageUrl: previous,
        totalPage: count
      });
    }
    console.log(results, next, previous, count);
  }

  componentDidMount() {
    this.fetchAndUpdate();
  }

  render() {
    const searchWithNewFilter = async () => {
      const queryParams = [];
      for (let i in this.state.filters) {
        this.state.filters[i].forEach(filterList => {
          if (filterList[1]) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(filterList[0])}`);
          }
        })
      }
      await this.props.history.push(`?${queryParams.join('&')}`);
      this.fetchAndUpdate();

    }

    const setFilter = (filterList, updatedFilter, type) => {
      const newValue = !updatedFilter[1];
      filterList[type].forEach(item => item[1] = false);
      updatedFilter[1] = newValue;
      filterList[type] = [...filterList[type]];
      if (updatedFilter)
        this.setState({
          filter: filterList
        }, searchWithNewFilter);


    }
    const filterWrapper = () => {
      const apiFilterList = []
      for(let item in this.state.filters)
      {
        apiFilterList.push(<Filter key={item} filter={this.state.filters} filterType={item} onClick={setFilter}/>)
      }
      console.log(apiFilterList);
      return apiFilterList;
  }

    return (
      <>
        {filterWrapper()}
        <CharacterListWrpper charList={this.state.charList} />
      </>
    );
  }
}

export default withRouter(App);
