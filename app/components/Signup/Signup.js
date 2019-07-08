import React, { Component } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button
} from 'react-native';

import { connect } from 'react-redux';
import { signUp } from '../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

import { TextField } from 'react-native-material-textfield';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import signupBg from '../../images/bg_purple.jpg';
import { setTokens } from '../../utils/misc.js';
import { showMessage } from 'react-native-flash-message';

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      //  firstName: '',
      //  lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showEye: false,
      showPass: true,
      showAlert: false
    };
    this.onSubmit = this.onSubmit.bind(this);
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
    const { email, password, confirmPassword, showAlert } = this.state;

    if (email == '' || password == '' || confirmPassword == '') {    
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
        if (password.length < 8) {
          showMessage({
            message: "Info",
            description: "Password Must Be 8 Digit",
            type: 'info',
            icon: "info",   
          });
          // Alert.alert('Password Must Be 8 Digit');
          return false;
        } else {
          if (password != confirmPassword) {
            showMessage({
              message: "Info",
              description: "Invalid Password",
              type: 'info',
              icon: "info",   
            });
            // Alert.alert('Invalid Password');
          } else {
            let formToSubmit = {
              email: this.state.email,
              password: this.state.password
            };

            this.props.signUp(formToSubmit).then(() => {
              this.manageAccess();
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={signupBg} style={styles.imageContainer}>
            <View style={styles.childContainer}>
              <Text style={styles.heading}> Sign Up </Text>
              <View style={{ width: '90%' }}>
                {/* <TextField
                    style={styles.loginField}
                    label="First Name"
                    fontSize={20}
                    tintColor='orange'
                    textColor = "#fff"
                    baseColor="#fff"    
                    lineWidth={1}
                    labelPadding={1} 
                    value={this.state.firstName}
                    onChangeText={(fname) => this.setState({ firstName: fname }) }       
                  /> 
                  <TextField
                    style={styles.loginField}
                    label="Last Name"
                    fontSize={20}
                    tintColor='orange'
                    textColor = "#fff"
                    baseColor="#fff"    
                    lineWidth={1}
                    labelPadding={1} 
                    value={this.state.lastName}
                    onChangeText={(lname) => this.setState({ lastName: lname }) }       
                  /> */}
                <TextField
                  style={styles.loginField}
                  label="Email"
                  fontSize={20}
                  textColor="#fff"
                  baseColor="#fff"
                  tintColor="orange"
                  keyboardType="email-address"
                  lineWidth={1}
                  labelPadding={1}
                  value={this.state.email}
                  // onBlur={(email)=> this.validate(email)}
                  onChangeText={email => this.setState({ email: email })}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottom: 2,
                    borderBottomColor: 'red'
                  }}
                >
                  <View style={{ width: '100%' }}>
                    <TextField
                      style={styles.loginField}
                      label="Enter Password"
                      fontSize={20}
                      tintColor="orange"
                      textColor="#fff"
                      baseColor="#fff"
                      lineWidth={1}
                      labelPadding={1}
                      secureTextEntry={this.state.showPass}
                      value={this.state.password}
                      onChangeText={password =>
                        this.setState({ password: password })
                      }
                    />
                  </View>
                  <View>
                    {this.state.password !== '' ? (
                      this.state.showEye ? (
                        <TouchableWithoutFeedback onPress={this.showPassword}>
                          <Icon
                            name="eye"
                            size={25}
                            style={{
                              alignSelf: 'flex-end',
                              color: '#fff',
                              marginTop: 34,
                              marginLeft: -30,
                              width: 30
                            }}
                          />
                        </TouchableWithoutFeedback>
                      ) : (
                        <TouchableWithoutFeedback onPress={this.showPassword}>
                          <Icon
                            name="eye-slash"
                            size={25}
                            style={{
                              alignSelf: 'flex-end',
                              color: '#fff',
                              marginTop: 34,
                              marginLeft: -30,
                              width: 30
                            }}
                          />
                        </TouchableWithoutFeedback>
                      )
                    ) : (
                      <Text> </Text>
                    )}
                  </View>
                </View>

                <TextField
                  style={styles.loginField}
                  label="Confirm Password"
                  maxLength={8}
                  fontSize={20}
                  tintColor="orange"
                  textColor="#fff"
                  baseColor="#fff"
                  lineWidth={1}
                  labelPadding={1}
                  secureTextEntry={true}
                  value={this.state.confirmPassword}
                  // onBlur={()=> this.confirmPassword()}
                  onChangeText={confirmPassword =>
                    this.setState({ confirmPassword: confirmPassword })
                  }
                />
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={this.onSubmit}
                >
                  <Text style={styles.signUpTitle}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.loginTitle}>Go To Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
