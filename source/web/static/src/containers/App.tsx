import * as React from 'react';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { IInjectedProps, Link} from 'react-router';
import { Grid, Row } from 'react-bootstrap';
import { incrementCounter } from '../actions/SimpleGame';

class App extends React.Component<IInjectedProps, void> {
  render() {
    const { children } = this.props;
    return (
      <Grid>
        <Row>
          <h4 className='text-center'>TODO: Banner Image Promoting Video Game</h4>
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