import React from 'react';
import { Form, FormGroup } from 'reactstrap';
export const Filter = (props) => {
    const filter = (searchParam) => {

        const clickHandler = () => {
            props.onClick(props.filter, searchParam, props.filterType)
        };

        return (
            <FormGroup key={searchParam[0]}>
                <label
                    key={searchParam[0]}
                    className={'rm-filter-label'}
                >
                    <input
                        checked={searchParam[1]}
                        name={searchParam[0]}
                        type='checkbox'
                        onChange={clickHandler}
                        className={'rm-filter-input'}
                    />
                    {searchParam[0]}
                </label>
            </FormGroup>
        )
    }
    const filterList = props.filter[props.filterType].map(item => filter(item))
    return (<Form>
        <h3>{props.filterType}</h3>
        {filterList}
    </Form>);
}