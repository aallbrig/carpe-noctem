import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { IReduxResponsiveState, IRootReducerState } from '../reducers';
import { MoonShooter } from '../classes';

type GetResponsiveWidth = (a:IReduxResponsiveState) => number;
const getResponsiveWidth:GetResponsiveWidth = (responsive) => {
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
};

interface IMoonShooterContainerProps extends React.Props<{}> {
  responsive: IReduxResponsiveState;
};

class MoonShooterContainer extends React.Component<IMoonShooterContainerProps, void> {
  private CANVAS_ID: string = 'gameCanvas';
  private phaserGame: MoonShooter;
  private computeWidth(r:IReduxResponsiveState):number {
    return getResponsiveWidth(r);
  }
  private computeHeight(r:IReduxResponsiveState):number {
      return r.height - 100;
  }
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
  public componentWillReceiveProps(nextProps: IMoonShooterContainerProps) {
    console.log('receiving new props!');
    if (this.phaserGame.game.height !== nextProps.responsive.height) {
      console.log(' height is not the same!');
    } else if (this.phaserGame.game.width !== nextProps.responsive.width) {
      console.log(' width is not the same!');
    }
  }
  public render() {
    return (
      <div id={this.CANVAS_ID} ref={this.CANVAS_ID} />
    );
  };
};

const mapStateToProps: MapStateToProps<{}, {}> = (state: IRootReducerState) => ({
  responsive: state.responsive
});
const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoonShooterContainer);
