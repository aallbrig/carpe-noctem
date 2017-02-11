import * as React from 'react';

interface TodoTextInputProps {
  onSave: Function;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
}

class TestTSX extends React.Component<TodoTextInputProps, void> {
  render() {
    return (<div> Hello! </div>);
  }
}

export default TestTSX;
