import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Row, Col, Table
} from 'reactstrap';

export const CharacterListWrpper = (props) => {
    const yearCalculator = (date) => {
        const yearDiff = new Date().getFullYear() - new Date(date).getFullYear();
        const yearString = yearDiff === 1 || yearDiff === 0 ? 'Year ago' : 'Years Ago';
        return `${yearDiff} ${yearString}`;
    }
    const character = (char) => {
        const yearDiff = yearCalculator(char.created)
        return (
            <Col xs='6' sm='3' key={char.id} className={'mb-4'}>
                <Card>
                    <CardImg top width='100%' src={char.image} alt={char.name} />
                    <CardBody>
                        <CardTitle><h3>{char.name}</h3> <span>id: {char.id}</span> <span>created : {yearDiff}</span></CardTitle>
                        <CardSubtitle>location: {char.origin.name} </CardSubtitle>
                        <CardText>
                            <Table className={'table-sm'}>
                                <tr>
                                    <td>STATUS</td>
                                    <td>{char.status}</td>
                                </tr>
                                <tr>
                                    <td>SPECIES</td>
                                    <td>{char.species}</td>
                                </tr><tr>
                                    <td>GENDER</td>
                                    <td>{char.gender}</td>
                                </tr><tr>
                                    <td>ORIGIN</td>
                                    <td>{char.origin.name}</td>
                                </tr><tr>
                                    <td>LAST LOCATION</td>
                                    <td>{char.location.name}</td>
                                </tr>
                            </Table>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    };
    const charList = props.charList.map(character);
    return (<Row className={'card-deck'}>{charList}</Row>);
}
