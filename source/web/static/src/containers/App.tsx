import * as React from 'react';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { IInjectedProps, Link} from 'react-router';
import { Grid, Row, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { incrementCounter } from '../actions/SimpleGame';

class App extends React.Component<IInjectedProps, void> {
  render() {
    const { children } = this.props;
    return (
      <Grid>
        <Row>
          <h4 className='text-center'>TODO: Banner Image Promoting Video Game</h4>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                Carpe Noctem
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
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