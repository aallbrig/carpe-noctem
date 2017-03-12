import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Game, IGameConfig } from 'phaser';

interface ISimpleGameContainerProps extends React.Props<any> {
  game: Object
};

class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  game:Game;
  canvasId:string = 'simpleGameCanvas';
  componentDidMount() {
    const canvas = this.refs[this.canvasId];
    this.game = new Game(
      800,
      600,
      Phaser.AUTO,
      findDOMNode(canvas),
      {
        create: this.create
      }
    );

  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUpdate(nextProps:ISimpleGameContainerProps) {
    console.log('receiving new props!');
  }
  create() {
    console.log('on create');
    const text = 'Carpe Noctem Game';
    const style = {
      font: "65px Arial", fill: "#ff0000", align: "center"
    }
    this.game.add.text(0, 0, text, style);
  }
  render() {
    return (
      <div id={this.canvasId} ref={this.canvasId} />
    );
  };
};

export default connect(
  ({game}) => ({
    game
  }),
  () => ({})
)(SimpleGameContainer);