import React from 'react';
import {connect} from 'react-redux';

class UserList extends React.Component {
  render() {
    let data = this.props.postsBySubreddit.exampleServerData.items;
    let userList;

    if (data.length > 0) {
      userList = data.map((item, i) => {
        return (
          <li key={i}>
            <span>Name {item.name} {item.secondName}</span>
            <span> - Age {item.age}</span>
            <dvi>Text {item.text}</dvi>
          </li>
        )
      })
    } else {
      userList = <p>К сожалению список пользователь пуст</p>
    }

    return (
      <div>
        <h3>----------- User List ----------------</h3>
        <ul>
          {userList}
        </ul>
      </div>
    );
  }
}

UserList.propTypes = {
  postsBySubreddit: React.PropTypes.objectOf(React.PropTypes.shape({
    exampleServerData: React.PropTypes.objectOf(React.PropTypes.shape({
      item: React.PropTypes.array.isRequired
    }).isRequired)
  }).isRequired).isRequired
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