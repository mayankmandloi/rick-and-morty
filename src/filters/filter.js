import React from 'react'
export const Filter = (props) => {
    const filter = (searchParam) => {

        const clickHandler = () => {
            props.onClick(props.filter, searchParam, props.filterType)
        };

        return (
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
        )
    }
    const filterList = props.filter[props.filterType].map(item => filter(item))
    return filterList;
}