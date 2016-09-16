import React from 'react';
import Link from '../link/link.jsx';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer>
        <ul>
          <p>Отфильтровать</p>
          <Link filter="SHOW_ALL"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            All
          </Link>
          <Link filter="SHOW_ACTIVE"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            Active
          </Link>
          <Link filter="SHOW_COMPLETED"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            Completed
          </Link>
        </ul>
      </footer>
    );
  }
}

export default Footer;