import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const Loader = () => (
  <View style={styles.container}>
    <Image source={require('../assets/ellipsis.gif')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationStyle: {
    height: 200,
    width: 200,
  },
});

export default Loader;
