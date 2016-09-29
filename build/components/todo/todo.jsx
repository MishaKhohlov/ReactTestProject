import React from 'react';
import * as Action from '../../action/action';
import {connect} from 'react-redux';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.defaulValue = props.text;
    this.state = {
      inputView: false,
      inputValue: props.text,
      disabled: false
    };

    this.showEditInput = this.showEditInput.bind(this);
    this.validInput = this.validInput.bind(this);
    this.saveNewValue = this.saveNewValue.bind(this);
  }

  showEditInput() {
    this.setState({
      inputView: !this.state.inputView
    })
  }

  validInput(ev) {
    if(ev.target.value.length > 1) {

      this.setState({
        inputValue: ev.target.value.trim(),
        disabled: this.defaulValue !== ev.target.value.trim()
      })
    }
  }

  saveNewValue() {
    this.props.changeItem(this.state.inputValue, this.props.id);
  }

  render() {
    return (
      <li>
        <span onClick={this.props.onClickProps}
              className={this.props.completed ? 'line-through' : ''}>{this.props.id+1} - {this.state.inputValue}</span>
        <button className="editBtn"
                onClick={this.showEditInput}>
          {this.state.inputView ? 'Hide' : 'Show'}
        </button>
        <input type="text"
               className={this.state.inputView ? '' : 'none'}
               defaultValue={this.props.text}
               onChange={this.validInput}/>
        <button className="editBtn"
                onClick={this.saveNewValue}
                disabled={!this.state.disabled}>Save</button>
      </li>
    );
  }
}

Todo.propTypes = {
  completed: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (newVal, key) => {
      dispatch(Action.setNewValueItem(key, newVal))
    }
  }
};

const TodoConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

export default TodoConnect;