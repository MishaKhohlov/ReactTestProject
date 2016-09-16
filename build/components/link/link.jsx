import React from 'react';

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const filter = this.props.filter;
    let active = filter === this.props.active;

    if (active) {
      return ( <li><span>{this.props.children}</span></li> );
    }

    return (
      <li
        onClick={e => {
          e.preventDefault();
          this.props.clickLink(filter)
        }}>
        <a href="#">{this.props.children}</a>
      </li>
    );
  }
}

Link.propTypes = {
  active: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired,
  children: React.PropTypes.string.isRequired,
  clickLink: React.PropTypes.func.isRequired
};

export default Link;