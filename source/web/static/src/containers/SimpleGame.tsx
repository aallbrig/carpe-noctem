import * as React from 'react';
import { connect } from 'react-redux';

interface ISimpleGameContainerProps extends React.Props<any> {};

class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  componentDidMount() {
    
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUpdate(nextProps:ISimpleGameContainerProps) {
    console.log('receiving new props!');
  }
  render() {
    return (
      <canvas id='simpleGameCanvas' />
    );
  };
};

export default connect(
  ({game}) => ({
    game
  }),
  () => ({})
)(SimpleGameContainer);