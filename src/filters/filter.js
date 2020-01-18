import React from 'react';
import { Form, FormGroup } from 'reactstrap';
export const Filter = (props) => {
    const filter = (searchParam) => {

        const clickHandler = () => {
            props.onClick(props.filter, searchParam, props.filterType)
        };

        return (
            <FormGroup>
                <label
                    key={searchParam[0]}
                >
                    <input
                        checked={searchParam[1]}
                        name={searchParam[0]}
                        type='checkbox'
                        onChange={clickHandler}
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