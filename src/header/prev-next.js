import React from 'react';
import { withRouter} from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const prevNext = (props) => {
    const next = async () => {
        await props.history.push(props.next.slice(props.next.indexOf('?')))
        props.update();
    }
    const prev = async () => {
        await props.history.push(props.previous.slice(props.next.indexOf('?')))
        props.update();
    }
    return (
        <Pagination className={'justify-content-center'}>
            <PaginationItem disabled={!props.previous}>
                <PaginationLink onClick={prev}>
                    Prev
                </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={!props.next}>
                <PaginationLink onClick={next}>
                    Next
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    )
}

export const PrevNext = withRouter(prevNext);