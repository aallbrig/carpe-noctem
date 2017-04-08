import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';

interface ISimpleGameContainerProps extends React.Props<any> {};
class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
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

const mapStateToProps:MapStateToProps<ISimpleGameContainerProps, {}> = () => ({});
const mapDispatchToProps:MapDispatchToPropsFunction<{}, {}> = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleGameContainer);