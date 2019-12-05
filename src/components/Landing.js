import React, {PureComponent} from 'react';
import Loader from './Loader';
import {Actions} from 'react-native-router-flux';

export default class Landing extends PureComponent {
  componentDidMount() {
    try {
      const {currentScene} = this.props;
      switch (currentScene) {
        case 'landing':
          Actions.read();
          break;
        case 'country':
        case 'language':
        case 'notifications':
        case 'slides':
          Actions[currentScene]();
          break;
        default:
          Actions.read();
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <Loader />;
  }
}
