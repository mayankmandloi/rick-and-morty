import React from 'react';
import {Badge, Row, Col} from 'reactstrap'
import {SortById} from './sort-by-id'
import { PrevNext } from './prev-next';
export const Header = (props) => {
    const avaliableFilters =[];
    props.filters.flat().forEach((item)=> {
        for(let i in item) {
            item[i].forEach((filt) => {
                if(filt[1])
                {
                    avaliableFilters.push(filt[0]);
                }
            })
        }
    });
    console.log(avaliableFilters);
    const filterBagde = avaliableFilters.map(item => <Badge color="dark" className={'mr-2'}>{item}</Badge>)
    return (
        <header className={'jumbotron'}>
            <Row>
                <Col sm='4'>
                    <h3>Selected Filters</h3>
                    {filterBagde}
                </Col>
                <Col sm='4'><PrevNext
                                next={props.next} 
                                previous={props.previous}
                                update={props.update}
                            /></Col>
                <Col sm='4'><SortById sorter={props.sorter}></SortById></Col>
            </Row>
        </header>
    )
}