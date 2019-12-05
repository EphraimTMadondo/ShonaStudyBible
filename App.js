import React, {Component} from 'react';
import {BackHandler, AsyncStorage} from 'react-native';
import Loader from './src/components/Loader';
import {PersistGate} from 'redux-persist/integration/react';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Scene, Actions, Stack, Router, Drawer} from 'react-native-router-flux';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import bibleReducer from './src/reducers/bibleReducer';
import sceneReducer from './src/reducers/sceneReducer';

import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';

import LandingPage from './src/containers/LandingPage';
import BibleReaderPage from './src/containers/BibleReaderPage';
import Sidemenu from './src/components/Sidemenu';

const AppNavigator = Actions.create(
  <Scene key="root" hideNavBar>
    <Drawer
      open={false}
      type="overlay"
      key="drawer"
      contentComponent={Sidemenu}
      drawerWidth={300}>
      <Scene key="rootScene" hideNavBar>
        <Scene key="landing" component={LandingPage} />
        <Scene key="read" component={BibleReaderPage} />
      </Scene>
    </Drawer>
  </Scene>,
);

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('drawer'),
);
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const appReducer = combineReducers({
  bible: bibleReducer,
  nav: navReducer,
  sceneReducer,
});

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);
const ReduxNavigator = createReduxContainer(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});

const ReduxRouter = connect(mapStateToProps)(Router);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['sceneReducer', 'bibleReducer'],
  stateReconciler: autoMergeLevel2,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const logger = createLogger({
  predicate: (getState, action) =>
    !String(action.type).startsWith('navigation'),
});

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, middleware, logger),
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.persistor = persistStore(store);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={this.persistor}>
          <StyleProvider style={getTheme()}>
            <ReduxRouter navigator={ReduxNavigator} />
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
