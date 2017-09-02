import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { ISimpleGameState } from '../reducers/SimpleGame';
import { IReduxResponsiveState, IRootReducerState } from '../reducers';
import { default as SimpleGameActions } from '../actions/SimpleGame';
import { SimpleGame } from '../classes';

type GetResponsiveWidth = (a: IReduxResponsiveState) => number;
const getResponsiveWidth: GetResponsiveWidth = (responsive) => {
  if (responsive.is.extraSmall) {
    return 320;
  } else if (responsive.is.small) {
    return 480;
  } else if (responsive.is.medium) {
    return 750;
  } else if (responsive.is.large) {
    return 970;
  } else if (responsive.is.extraLarge) {
    return 1170;
  }
};

interface ISimpleGameContainerProps extends React.Props<any> {
  game: ISimpleGameState;
  responsive: IReduxResponsiveState;
  incrementCounter: Function;
};
class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  private canvasId: string = 'simpleGameCanvas';
  private simpleGame: SimpleGame;
  public componentDidMount() {
    const { responsive } = this.props;
    const canvas = findDOMNode(this.refs[this.canvasId]);
    const width = getResponsiveWidth(this.props.responsive);
    const height = this.computeHeight(responsive);
    this.simpleGame = new SimpleGame(canvas, height, width);
  }
  public componentWillUnmount() {
    this.simpleGame.game.destroy();
  }
  public shouldComponentUpdate() {
    return false;
  }
  public componentWillReceiveProps(nextProps: ISimpleGameContainerProps) {
    console.log('receiving new props!');
    if (this.simpleGame.game.height !== nextProps.responsive.height) {
      console.log(' height is not the same!');
    } else if (this.simpleGame.game.width !== nextProps.responsive.width) {
      console.log(' width is not the same!');
    }
  }
  public render() {
    return (
      <div id={this.canvasId} ref={this.canvasId} />
    );
  };
  private computeHeight(r: IReduxResponsiveState): number {
    return r.height - 52;
  }
};

const mapStateToProps: MapStateToProps<{}, {}> = (state: IRootReducerState) => ({
  game: state.simpleGame,
  responsive: state.responsive,
  width: getResponsiveWidth(state.responsive)
});
const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = (dispatch) => ({
  incrementCounter: dispatch(SimpleGameActions.incrementCounter())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleGameContainer);
