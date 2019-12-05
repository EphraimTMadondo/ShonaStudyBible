import {connect} from 'react-redux';

import Reader from '../components/Reader';

const mapStateToProps = state => ({
  fontSize: state.bible.fontSize,
  fontPadding: state.bible.fontPadding,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);
