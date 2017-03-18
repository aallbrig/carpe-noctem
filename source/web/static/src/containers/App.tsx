import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { RouterContext } from 'react-router';
import { Grid, Row, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IRootReducerState } from '../reducers';
import { incrementCounter } from '../actions/SimpleGame';

class App extends React.Component<RouterContext.RouterContextProps, any> {
  render() {
    const { children, location: { pathname } } = this.props;
    return (
      <Grid>
        <Row>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to='/'>
                  <span>Carpe Noctem</span>
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
            Breadcrumbs: { pathname }
          </div>
          <div>
            { children }
          </div>
        </Row>
      </Grid>
    );
  };
};
const mapStateToProps:MapStateToProps<{}, {}> = (store: IRootReducerState) => ({});
export default connect(mapStateToProps)(App);