import React, { Component } from 'react';

export class SortById extends Component {
    state = {
        sort: 'asc'
    }

    render() {
        const changeSort = () => {
            if(this.state.sort === 'asc')
            {
                this.setState({
                    sort: 'dsc'
                })
            }
            else {
                this.setState({
                    sort:'asc'
                })
            }
            this.props.sorter(this.state.sort);
        }
        const sort = () => {
            const order = this.state.sort === 'asc' ? '(dsc)' : '(asc)';
            return (<span onClick={changeSort} className={'float-right btn btn-secondary'}>Sort By Id{order}</span>)
        }
        return  sort() ;
    }
}