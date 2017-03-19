import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { RouterContext, routerShape } from 'react-router';
import { Location } from 'history';
import { Grid, Row, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IRootReducerState } from '../reducers';
import { incrementCounter } from '../actions/SimpleGame';

interface AppProps {
  location: Location;
}
class App extends React.Component<AppProps, any> {
  render() {
    const { children, location: { pathname } } = this.props;
    return (
      <Grid>
        <Row>
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
                <LinkContainer to='/game'>
                  <NavItem>
                    Play Game
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            { children }
          </div>
          <div>
            Breadcrumbs: { pathname }
          </div>
        </Row>
      </Grid>
    );
  };
};
export default connect()(App);