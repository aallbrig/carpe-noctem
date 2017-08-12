import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import Navigation from './Navigation';

export class App extends React.Component<{}, {}> {
  public render() {
    const { children } = this.props;
    return (
      <Grid>
        <Row>
          <Navigation />
          <div>
            { children }
          </div>
        </Row>
      </Grid>
    );
  };
};
export default connect()(App);
