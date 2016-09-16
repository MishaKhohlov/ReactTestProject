import {connect} from 'react-redux';
import * as Action from '../../action/action';
import Footer from '../footer/footer.jsx';

const mapStateToProps = (state) => {
  return {
    active: state.visibilityFilter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickLink: (typeFilter) => {
      dispatch(Action.setVisibilityFilter(typeFilter))
    }
  }
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default FilterLink;
