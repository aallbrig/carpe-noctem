import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';

interface IHomeContainerProps extends React.Props<any> {};
export class HomeContainer extends React.Component<IHomeContainerProps, void> {
  public render() {
    return (
      <Row>
        <Col xs={12}>
          <h4 className='text-center'> TODO: Place Hero Promotional Image Here For Game </h4>
        </Col>
        <Col xs={12}>
          <Panel header={'Panel Header'} footer={'Panel Footer'}>
            Maybe this panel can be used for something.
          </Panel>
        </Col>
      </Row>
    );
  };
};

const mapStateToProps: MapStateToProps<IHomeContainerProps, {}> = () => ({});
const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
