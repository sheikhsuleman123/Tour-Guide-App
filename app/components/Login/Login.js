import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { signIn, autoSignIn } from '../../store/actions/user_actions';
import { bindActionCreators } from 'redux';


import loginBg from '../../images/bg_purple.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setTokens, getTokens } from '../../utils/misc';
import { showMessage } from 'react-native-flash-message';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getTokens(value => {
      console.log('value****' + value);
      if (value[0][1] === null) {
        console.log('Not Register');
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            // alert("Token" + this.props.User.auth.token);
            console.log('Something Wrong');
          } else {
            setTokens(this.props.User.auth, () => {
              //  alert("Token" + this.props.User.auth.token);
              this.props.navigation.navigate('Tab');
            });
          }
        });
      }
    });
  }

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      console.log('Please Try Again');
    } else {
      setTokens(this.props.User.auth, () => {
        this.props.navigation.navigate('Tab');
      });
    }
  };

  onSubmit() {
    const { email, password } = this.state;
    if (email == '' || password == '') {
      showMessage({
        message: "Info",
        description: "Fill The All Field",
        type: 'info',
        icon: "info",   
      });
      // Alert.alert('Fill the All Field');
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        showMessage({
          message: "Info",
          description: "Invalid Email",
          type: 'info',
          icon: "info",   
        });
        // Alert.alert('Invalid Email');
        return false;
      } else {
        let formToSubmit = {
          email: this.state.email,
          password: this.state.password
        };
        this.props.signIn(formToSubmit).then(() => {          
          this.manageAccess();
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={loginBg} style={styles.imageContainer}>
            <View style={styles.up}>
              <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.down}>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  style={{ marginTop: 22, marginRight: 10 }}
                  name="user"
                  size={22}
                  color={'#fff'}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your Email"
                  placeholderTextColor="#fff"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email: email })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  style={{ marginTop: 22, marginRight: 10 }}
                  name="lock"
                  size={22}
                  color="#fff"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your Password"
                  placeholderTextColor="#fff"
                  textContentType="password"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password =>
                    this.setState({ password: password })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.onSubmit}
              >
                <Text style={styles.loginTitle}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.singUpbtn}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}
              >
                <Text style={styles.signUpTitle}>Sign Up</Text>
              </TouchableOpacity>
              <Text
                style={styles.goSignup}
                onPress={() => {
                  this.props.navigation.navigate('Tab');
                }}
              >
                I will do it later.
              </Text>
            </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    flex:1,
    resizeMode: 'cover',
  },
  up: {
    marginTop: '20%',
    alignItems: 'center'
  },
  down: {
    marginTop: '20%',
    alignItems: 'center'
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30
  },
  textInput: {
    width: '82%',
    color: '#fff',
    // height: 42,
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    marginTop: '3%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 35,
    backgroundColor: null
  },
  loginButton: {
    width: '70%',
    height: '16%',
    borderRadius: 25,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
    backgroundColor: 'purple'
  },
  loginTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  singUpbtn: {
    width: '70%',
    height: '16%',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  signUpTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  },
  goSignup: {
    color: '#fff',
    fontSize: 17,
    marginTop: '2%',
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn, autoSignIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
