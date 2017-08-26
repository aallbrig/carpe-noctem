import * as React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

export default () => (
    <Jumbotron>
        <h3>(Game Title) Video Game Released! (...not)</h3>
        <p>
            (Copy describing video game)
        </p>
        <p><Button bsStyle='primary'>Purchase Today!</Button></p>
    </Jumbotron>
);
