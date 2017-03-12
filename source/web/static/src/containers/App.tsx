import * as React from 'react';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { IInjectedProps } from 'react-router';
import { Grid, Row, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { incrementCounter } from '../actions/SimpleGame';

class App extends React.Component<IInjectedProps, void> {
  render() {
    const { children } = this.props;
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
            { children }
          </div>
        </Row>
      </Grid>
    );
  };
};
const mapStateToProps:IMapStateToProps = (store) => ({});
const mapDispatchToProps:IMapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);