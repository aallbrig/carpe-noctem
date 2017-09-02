import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { IReduxResponsiveState, IRootReducerState } from '../reducers';
import { MoonShooter } from '../classes';

type GetResponsiveWidth = (a: IReduxResponsiveState) => number;
const getResponsiveWidth: GetResponsiveWidth = (responsive) => {
  if (responsive.is.extraSmall) {
    return responsive.width;
  } else if (responsive.is.small) {
    return responsive.width;
  } else if (responsive.is.medium) {
    return 750;
  } else if (responsive.is.large) {
    return 970;
  } else if (responsive.is.extraLarge) {
    return 1170;
  }
};

interface IMoonShooterContainerProps extends React.Props<{}> {
  responsive: IReduxResponsiveState;
};

class MoonShooterContainer extends React.Component<IMoonShooterContainerProps, void> {
  private CANVAS_ID: string = 'gameCanvas';
  private phaserGame: MoonShooter;
  public componentDidMount() {
    const { responsive } = this.props;
    const canvas = findDOMNode(this.refs[this.CANVAS_ID]);
    const width = this.computeWidth(responsive);
    const height = this.computeHeight(responsive);
    this.phaserGame = new MoonShooter(canvas, height, width);
  }
  public componentWillUnmount() {
    this.phaserGame.game.destroy();
  }
  public shouldComponentUpdate() { 
    return false;
  }
  public render() {
    return (
      <div id={this.CANVAS_ID} ref={this.CANVAS_ID} />
    );
  };
  private computeWidth(r: IReduxResponsiveState): number {
    return getResponsiveWidth(r);
  }
  private computeHeight(r: IReduxResponsiveState): number {
      return r.height - 52;
  }
};

const mapStateToProps: MapStateToProps<{}, {}> = (state: IRootReducerState) => ({
  responsive: state.responsive
});
const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoonShooterContainer);
