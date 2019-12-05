import {connect} from 'react-redux';
import Landing from '../components/Landing';

const mapStateToProps = state => ({
  currentScene: state.sceneReducer.currentScene,
});

export default connect(mapStateToProps)(Landing);
