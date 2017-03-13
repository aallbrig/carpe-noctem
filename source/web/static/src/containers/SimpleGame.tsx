import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { default as SimpleGameStore } from '../store/store';
import { ISimpleGameState } from '../reducers/SimpleGame';
import { IReduxResponsiveState, IRootReducerState } from '../reducers';
import { SimpleGame } from '../classes';

const getResponsiveWidth = (responsive:IReduxResponsiveState):number => {
  if (responsive.is.extraSmall) {
    return responsive.breakpoints.extraSmall;
  } else if (responsive.is.small) {
    return responsive.breakpoints.small;
  } else if (responsive.is.medium) {
    return responsive.breakpoints.medium;
  } else if (responsive.is.large) {
    return responsive.breakpoints.large;
  } else if (responsive.is.extraLarge) {
    return responsive.breakpoints.extraLarge;
  }
}

interface ISimpleGameContainerProps extends React.Props<any> {
  game: ISimpleGameState,
  responsive: IReduxResponsiveState
};
class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  canvasId:string = 'simpleGameCanvas';
  simpleGame:SimpleGame;
  componentDidMount() {
    const canvas = findDOMNode(this.refs[this.canvasId]);
    const width = getResponsiveWidth(this.props.responsive);
    const height = this.props.responsive.height;
    this.simpleGame = new SimpleGame(canvas, height, width);
  }
  update() {
    console.log('on update');
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillReceiveProps(nextProps:ISimpleGameContainerProps) {
    console.log('receiving new props!');
    if (this.simpleGame.game.height !== nextProps.responsive.height) {
      console.log(' height is not the same!');
    } else if (this.simpleGame.game.width !== nextProps.responsive.width) {
      console.log(' width is not the same!');
    }
  }
  render() {
    return (
      <div id={this.canvasId} ref={this.canvasId} />
    );
  };
};

const mapStateToProps:IMapStateToProps = (state:IRootReducerState, componentProps:ISimpleGameContainerProps) => ({
  game: state.simpleGame,
  responsive: state.responsive,
  width: getResponsiveWidth(state.responsive)
});
const mapDispatchToProps:IMapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleGameContainer);