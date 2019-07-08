import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
  StyleSheet,
  Button
} from 'react-native';

import splashBg from '../../images/bg_purple.jpg';

var { height, width } = Dimensions.get('window');

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    logoOpacity: new Animated.Value(0),
    titleMarginTop: new Animated.Value(height / 2)
  };

  async componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.logoOpacity, {
        toValue: 1,
        duration: 2000
      }),
      Animated.timing(this.state.titleMarginTop, {
        toValue: 10,
        duration: 1000
      })
    ]).start(() => {
      this.props.navigation.navigate('NonAuth');
    });
  }

  render() {
    return (
      <ImageBackground
        source={splashBg}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <Animated.Image
            style={{ ...styles.logo, opacity: this.state.logoOpacity }}
            source={require('../../images/logo.jpg')}
          />
          <Animated.Text
            style={{ ...styles.title, marginTop: this.state.titleMarginTop }}
          >
            Tour Guide Application
          </Animated.Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2
  },
  title: {
    color: 'orange',
    marginTop: 10,
    textAlign: 'center',
    width: 400,
    fontSize: 21
  }
});
