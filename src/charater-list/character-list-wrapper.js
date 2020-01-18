import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardImgOverlay,
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
            <Col xs='6' sm='3' key={char.id} className={'mb-4'} >
                <Card className={'bg-secondary'}>
                    <CardImg top width='100%' src={char.image} alt={char.name} />
                    <CardBody>
                        <CardImgOverlay>
                        <CardTitle className={'rm-card-title'}><h6>{char.name}</h6> <p>id: {char.id}</p> <p>created : {yearDiff}</p>
                        </CardTitle>
                        </CardImgOverlay>
                        <CardText>
                            <Table size="sm" hover className={'rm-stat-table'}>
                                <tbody>
                                <tr>
                                    <td>STATUS</td>
                                    <td className={'rm-stat-table-data'}>{char.status}</td>
                                </tr>
                                <tr>
                                    <td>SPECIES</td>
                                    <td className={'rm-stat-table-data'}>{char.species}</td>
                                </tr><tr>
                                    <td>GENDER</td>
                                    <td className={'rm-stat-table-data'}>{char.gender}</td>
                                </tr><tr>
                                    <td>ORIGIN</td>
                                    <td className={'rm-stat-table-data'}>{char.origin.name}</td>
                                </tr><tr>
                                    <td>LAST LOCATION</td>
                                    <td className={'rm-stat-table-data'}>{char.location.name}</td>
                                </tr>
                                </tbody>
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
