import React from 'react';

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
        inputValue: ev.target.value,
        disabled: this.defaulValue === ev.target.value
      })
    }
  }

  saveNewValue() {

  }

  render() {
    return (
      <li>
        <span onClick={this.props.onClickProps}
              className={this.props.completed ? 'line-through' : ''}>{this.state.inputValue}</span>
        <button className="editBtn"
                onClick={this.showEditInput}>
          {this.state.inputView ? 'Show' : 'Hide'}
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

export default Todo;