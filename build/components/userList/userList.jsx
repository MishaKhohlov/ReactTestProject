import React from 'react';
import {connect} from 'react-redux';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      load: 'load-class',
      receive: 'receive-class',
      invalid: 'invalid-class'
    }
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  render() {
    console.log(this.props);
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
        <div>- {invalid ? 'Invalid': 'don\'t Invalid'}</div>
        <div>- {receive ? 'Start receive post': 'Stop receive'}</div>
        <ul>
          {userList}
        </ul>
      </div>
    );
  }
}

// UserList.propTypes = {
//     todos: React.PropTypes.arrayOf(React.PropTypes.shape({
//       text: React.PropTypes.string.isRequired,
//       completed: React.PropTypes.bool.isRequired
//     }).isRequired).isRequired,
//       onTodoClick: React.PropTypes.func.isRequired
//   postsBySubreddit: React.PropTypes.objectOf(React.PropTypes.shape({
//       items: React.PropTypes.array.isRequired
//   }).isRequired).isRequired
// };

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