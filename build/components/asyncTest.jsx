import React, {Component, PropTypes} from 'react';

class asyncChildComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        My test async component
      </div>
    );
  }
}

module.exports = asyncChildComponent;
