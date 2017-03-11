import * as React from 'react';
import { connect } from 'react-redux';
import { IInjectedProps, Link} from 'react-router';

class App extends React.Component<IInjectedProps, void> {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h4>Basic Containing App.tsx File</h4>
        <div>
          { children }
        </div>
      </div>
    );
  };
};
export default connect(
  () => ({}),
  () => ({})
)(App);