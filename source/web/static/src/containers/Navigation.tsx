import * as React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Navigation extends React.Component<{}, {}> {
  public render() {
    return (
        <Navbar inverse collapseOnSelect={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to='/'>
                        <NavItem>
                            Carpe Noctem
                        </NavItem>
                    </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/'>
                        <NavItem>
                            Home
                        </NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <LinkContainer to='/simple_game'>
                        <NavItem>
                            Simple Game
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to='/moon_shooter'>
                        <NavItem>
                            Moon Shooter
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  };
};
export default connect()(Navigation);
