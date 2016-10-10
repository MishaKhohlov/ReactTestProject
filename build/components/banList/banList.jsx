import React from 'react';

// Start App
class BanList extends React.Component {
  render() {

    let template;
    if(this.props.params.data.trim().length > 3) {
      template = (
        <div>
          <h4>Dynamic Route</h4>
          <p>our data - {this.props.params.data}</p>
        </div>
      )
    } else {
      template = (
        <div>
          <h4>Dynamic Route</h4>
          <p>Data is not available</p>
        </div>
      )
    }

    return template;
  }
}

export default BanList;
