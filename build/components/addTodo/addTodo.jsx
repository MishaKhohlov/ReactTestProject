import React from 'react';
import * as Action from '../../action/action';
import {connect} from 'react-redux';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.addNewItem = this.addNewItem.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  addNewItem() {
    let val = this.state.value;
    if (val.trim().length > 0) {
      this.props.dispatch(Action.addTodo(val));
      this.setState({
        value: ''
      })
    }
  }

  validInput(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text"
               placeholder="add new item"
               value={this.state.value}
               onChange={this.validInput}/>
        <button onClick={this.addNewItem}>Add item</button>
      </div>
    );
  }
}

const AddTodo = connect()(Add);

export default AddTodo