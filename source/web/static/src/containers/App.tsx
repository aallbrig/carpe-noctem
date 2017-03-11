import * as React from 'react';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { IInjectedProps, Link} from 'react-router';
import { incrementCounter } from '../actions/SimpleGame';

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
const mapStateToProps:IMapStateToProps = (store) => ({});
const mapDispatchToProps:IMapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);