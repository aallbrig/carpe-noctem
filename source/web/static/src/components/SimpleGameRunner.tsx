import * as React from 'react';

interface TodoTextInputProps {
  onSave: Function;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
}

class SimpleGameRunner extends React.Component<TodoTextInputProps, void> {
  render() {
    return (
      <div>
        Would Char be that foolish?
      </div>
    );
  }
}

export default SimpleGameRunner;
