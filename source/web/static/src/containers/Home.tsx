import * as React from 'react';
import { connect, IMapStateToProps, IMapDispatchToProps } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

interface ISimpleGameContainerProps extends React.Props<any> {};
class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h4 className='text-center'> TODO: Place Hero Promotional Image Here For Game </h4>
        </Col>
      </Row>
    );
  };
};

const mapStateToProps:IMapStateToProps = (store) => ({});
const mapDispatchToProps:IMapDispatchToProps = (dispatch) => ({});
export default connect(
  (store) => ({}),
  (dispatch) => ({})
)(SimpleGameContainer);