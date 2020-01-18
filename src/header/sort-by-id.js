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
        }
        return <span class="glyphicon glyphicon-arrow-up"></span>;
    }
}