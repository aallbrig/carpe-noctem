import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { Game, IGameConfig } from 'phaser';
import { default as SimpleGameStore } from '../store/store';
import { ISimpleGameState } from '../reducers/SimpleGame';
import { IReduxResponsiveState, IRootReducerState } from '../reducers'

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

class SimpleGame {
  game: Game;
  constructor(gameConfig:IGameConfig) {
    this.game = new Game(gameConfig);
  }
}

class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  canvasId:string = 'simpleGameCanvas';
  // simpleGame:SimpleGame;
  game: Game;
  componentDidMount() {
    const canvas = findDOMNode(this.refs[this.canvasId]);
    // this.simpleGame = new SimpleGame({
    //   height: this.props.responsive.height,
    //   width: getResponsiveWidth(this.props.responsive),
    //   renderer: Phaser.AUTO,
    //   parent: canvas,
    //   forceSetTimeOut: false,
    //   state: {
    //     preload: this.preload,
    //     create: this.create,
    //     update: this.update
    //   }
    // } as IGameConfig)
    this.game = new Game(
      this.props.responsive.height,
      getResponsiveWidth(this.props.responsive),
      Phaser.AUTO,
      canvas,
      {
        preload: this.preload,
        create: this.create,
        update: this.update
      }

    )
  }
  preload() {
    console.log('on preload');
  }
  create() {
    console.log('on create');
    const text = 'Carpe Noctem Game';
    const style = {
      font: "65px Arial", fill: "#ff0000", align: "center"
    }
    // this.simpleGame.game.add.text(0, 0, text, style);
    this.game.add.text(0, 0, text, style);
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