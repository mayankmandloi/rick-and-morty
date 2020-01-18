import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

import { CharacterListWrpper } from './charater-list/character-list-wrapper'
import './App.css';
import { Filter } from './filters/filter';
import { Header } from './header/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      originalCharList:[],
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

  updateOriginFilter = ()=> {
    let arr= [];
    this.state.charList.forEach((item) => {
      arr.push(item.origin.name)
    })
    arr = [...new Set(arr)];
    const origin = arr.map(item => [item, false]);
    this.setState({
      onPageFilter:{
        origin
      }
    })
  }

  fetchAndUpdate = async () => {
    let response = await fetch(`https://rickandmortyapi.com/api/character${this.props.location.search}`);
    response = await response.json();
    const { results, info: { next, prev, count } } = response;
    if (results) {
      this.setState({
        charList: results,
        originalCharList: results,
        nextPageUrl: next,
        previousPageUrl: prev,
        totalPage: count
      },this.updateOriginFilter);
    }
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

    const setLocalFilter = (filterList, updatedFilter, type) => {
      updatedFilter[1] = !updatedFilter[1];
      filterList[type] = [...filterList[type]];
      const selectedFilter = filterList[type].map(item => {
        if(item[1]) return item[0];});
      console.log(selectedFilter[0]);
      let charList = this.state.originalCharList.filter(item => {
        return selectedFilter.some(itemFilter => itemFilter === item.origin.name);
      });
      if(charList.length === 0 || selectedFilter.length === 0){
        charList = this.state.originalCharList;
      }
      if (updatedFilter)
        this.setState({
          charList,
          onPageFilter: filterList
        });
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
      return apiFilterList;
    }
    const sorter = (order) => {
      const sortedCharList = [...this.state.originalCharList].sort((a,b) => {
        if(order === 'asc')
        {
          return a.id-b.id;
        }
        else {
          return b.id-a.id;
        }
      });
      this.setState({
        charList: sortedCharList
      })
    }

    return (
      <div className={'container-fluid'}>
        <Header
          sorter={sorter}
          filters={[this.state.filters, this.state.onPageFilter]}
          update={this.fetchAndUpdate}
          next={this.state.nextPageUrl}
          previous={this.state.previousPageUrl}
        />
      <Row>
        <Col xs='12' sm='3'>
            <nav className={'sticky-top'}>
              {filterWrapper()}
              <Filter filter={this.state.onPageFilter} filterType={'origin'} onClick={setLocalFilter}/>
            </nav>
          </Col>
        <Col xs='12' sm='9'><CharacterListWrpper charList={this.state.charList} /></Col>
      </Row>
      </div>
    );
  }
}

export default withRouter(App);
