import * as React from 'react';
import { connect } from 'react-redux';

interface ISimpleGameContainerProps extends React.Props<any> {};

class SimpleGameContainer extends React.Component<ISimpleGameContainerProps, void> {
  render() {
    return (
      <h4 className='text-center'> TODO: Place Hero Promotional Image Here For Game </h4>
    );
  };
};

export default connect(
  (store) => ({}),
  (dispatch) => ({})
)(SimpleGameContainer);