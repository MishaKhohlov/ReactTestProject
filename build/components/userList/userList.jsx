import React from 'react';
import {connect} from 'react-redux';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      load: 'load-data',
      receive: 'receive-start',
      receiveStop: 'receive-stop',
      invalid: 'invalid-request'
    }
  }

  componentWillReceiveProps(props) {

  }

  render() {
    let data = this.props.postsBySubreddit.items;

    let invalid = this.props.postsBySubreddit.didInvalidate;
    let receive = this.props.postsBySubreddit.isFetching;

    let userList;

    if (data.length > 0) {
      userList = data.map((item, i) => {
        return (
          <li key={i}>
            <span>Name {item.name} {item.secondName}</span>
            <span> - Age {item.age}</span>
            <div>Text {item.text}</div>
          </li>
        )
      })
    } else {
      userList = <p>К сожалению список пользователь пуст</p>
    }

    return (
      <div>
        <h3>----------- User List ----------------</h3>
        <div className={invalid ? this.state.invalid : ''}>- {invalid ? 'Invalid': 'don\'t Invalid'}</div>
        <div className={receive ? this.state.receive : this.state.receiveStop}>- {receive ? 'Start receive': 'Stop receive'}</div>
        <div className={receive ? this.state.receiveStop : this.state.load}>- {receive ? '=(': 'Success!'}</div>
        <ul>
          {userList}
        </ul>
      </div>
    );
  }
}

UserList.propTypes = {
  postsBySubreddit: React.PropTypes.shape({
    items: React.PropTypes.array.isRequired
  }).isRequired
};

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const UserListConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default UserListConnect;