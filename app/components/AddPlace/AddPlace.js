import React, { Component } from 'react';
import {
  Alert,
  Picker,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showMessage } from 'react-native-flash-message';

import PickLocation from './PickLocation.js';
import {
  addPlace,
  processPlaceStart,
  processPlaceEnd
} from '../../store/actions/place_actions';

import { autoSignIn } from '../../store/actions/user_actions';
import { setTokens, getTokens } from '../../utils/misc';

class AddPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      city: 'Faisalabad',
      pickedImage: null,
      location: {},
      description: '',
      sumRating: 0,
      avgRating: 0,
      contactUs: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.reset();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  reset = () => {
    this.setState({
      placeName: '',
      city: 'Faisalabad',
      pickedImage: null,
      location: {},
      description: '',
      contactUs: '',
      sumRating: 0,
      avgRating: 0
    });
  };

  imagePickedHandler = () => {
    ImagePicker.showImagePicker(
      { title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      res => {
        console.log('res' + res.origURL);
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          this.setState({
            pickedImage: { uri: res.uri, base64: res.data }
          });
        }
      }
    );
  };

  locationPickedHandler = location => {
    // console.log("location@latitude"+ location.latitude);
    // console.log("location@longitude"+ location.longitude);
    this.setState(prevState => {
      return {
        ...prevState.state,
        location: location
      };
    });
  };

  onSubmit() {
    const {
      placeName,
      city,
      location,
      pickedImage,
      description,
      contactUs,
      sumRating,
      avgRating
    } = this.state;

    if (
      placeName == '' ||
      city == '' ||
      pickedImage == '' ||
      description == ''
    ) {
      showMessage({
        message: "Info",
        description: "Fill The All Field",
        type: 'info',
        icon: "info",   
      });
    //  Alert.alert('Fill the All Field');
    } else {
      if (contactUs && contactUs.length <= 10) {
        showMessage({
          message: "Info",
          description: "Enter Correct Phone No",
          type: 'info',
          icon: "info",   
        });
        // Alert.alert('Enter Correct Phone No');
        return false;
      } else {
      }
      getTokens(value => {
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const newPlace = {
          placeName: placeName.toLowerCase(),
          city: city,
          location: location,
          pickedImage: pickedImage,
          description: description,
          contactUs: contactUs,
          userUid: value[3][1],
          date: new Date(),
          sumRating: sumRating,
          avgRating: avgRating
        };

        if (expiration > value[2][1]) {
          this.props.autoSignIn(value[1][1]).then(() => {
            setTokens(this.props.User.auth, () => {
              this.props.processPlaceStart();
              this.props
                .addPlace(newPlace, this.props.User.auth.token)
                .then(() => {
                  this.props.processPlaceEnd();
                  // Alert.alert("Add Item");
                  this.reset();
                  this.props.navigation.navigate('MyPlace');
                });
            });
          });
        } else {
          this.props.processPlaceStart();
          this.props.addPlace(newPlace, value[0][1]).then(() => {
            this.props.processPlaceEnd();
            // Alert.alert("Add Item");
            this.reset();
            this.props.navigation.navigate('MyPlace');
          });
        }
      });

      // alert(placeName + city + location.value.latitude + location.value.longitude);
      //alert(pickedImage.uri);
      //console.log("image uri"+ pickedImage.uri);
      //console.log(pickedImage.base64);
    }
  }

  render() {
    return (
      <View style={styles.main}>
        {!this.props.User.auth.uid ? (
          <View style={styles.notAuth}>
            <Icon name="md-sad" size={80} color="#A9A9A9" />
            <Text style={{ fontSize: 14,color:'#9D9D9D' }}>You Need To Be Registered/Logged</Text>
            <Button
              title="Login / Register"
              color="#783A87"
              onPress={() => this.props.navigation.navigate('NonAuth')}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.heading}> Share a Place with us! </Text>
            </View>
            <View style={{ width: '90%', marginLeft: 22 }}>
              <TextField
                style={styles.loginField}
                label="Place Name *"
                fontSize={20}
                tintColor="purple"
                textColor="black"
                baseColor="gray"
                lineWidth={1}
                labelPadding={1}
                value={this.state.placeName}
                onChangeText={name => this.setState({ placeName: name })}
              />
            </View>
            <View style={styles.container}>
              <View
                style={{
                  height: 50,
                  width: '90%',
                  borderWidth: 1,
                  marginTop: 15,
                  borderColor: 'gray'
                }}
              >
                <TouchableOpacity>
                  <Picker
                    placeholder="Select the City *"
                    selectedValue={this.state.city}
                    onValueChange={itemValue =>
                      this.setState({ city: itemValue })
                    }
                    style="color:red"
                    itemStyle={{
                      backgroundColor: 'yellow',
                      color: 'red'
                    }}
                    itemTextStyle={{
                      fontSize: 18,
                      color: 'green'
                    }}
                    textStyle={{
                      color: 'blue'
                    }}
                  >
                    <Picker.Item label="Faisalabad" value="Faisalabad" />
                    <Picker.Item label="Lahore" value="Lahore" />
                    <Picker.Item label="Islamabad" value="Islamabad" />
                    <Picker.Item label="Rawalpindi" value="Rawalpindi" />
                    <Picker.Item label="Multan" value="Multan" />
                    <Picker.Item label="Muree" value="Muree" />
                    <Picker.Item label="Naran" value="Naran" />
                    <Picker.Item label="Kaghan" value="Kaghan" />
                  </Picker>
                </TouchableOpacity>
              </View>
                <View style={{ width: '90%' }}>
                  <TextField
                    style={styles.loginField}
                    label="Contact Us"
                    fontSize={20}
                    tintColor="purple"
                    textColor="black"
                    baseColor="gray"
                    lineWidth={1}
                    labelPadding={1}
                    keyboardType={'numeric'}
                    value={this.state.contactUs}
                    onChangeText={contactUs =>
                      this.setState({ contactUs: contactUs })
                    }
                  />
                </View>
              <Image source={this.state.pickedImage} style={styles.avatar} />
              <Button
                title="Place Image *"
                color="#841584"
                onPress={() => this.imagePickedHandler()}
              />

              <PickLocation
                onLocationPick={this.locationPickedHandler}
                ref={ref => (this.locationPicker = ref)}
              />

              {/* <View
            style={styles.avatar}
          >
          </View>
          <Button 
            title="Place Location"
            color="#841584"
            onPress={() => this.addMap()}
          /> */}

              <TextInput
                style={styles.TextInputStyleClass}
                underlineColorAndroid="transparent"
                placeholder="Description *"
                placeholderTextColor="gray"
                numberOfLines={5}
                multiline={true}
                value={this.state.description}
                onChangeText={description =>
                  this.setState({ description: description })
                }
              />
              {this.props.Places.processPlace ? (
                <ActivityIndicator size="small" color="orange" />
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.onSubmit}
                >
                  <Text style={styles.submitTitle}> SHARE THE PLACE! </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User,
    Places: state.Places
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { autoSignIn, addPlace, processPlaceStart, processPlaceEnd },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlaceScreen);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  input: {
    width: '90%',
    fontSize: 20,
    padding: 10
  },
  TextInputStyleClass: {
    width: '90%',
    fontSize: 18,
    marginVertical: 20,
    borderWidth: 1,
    height: 100
  },
  heading: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  avatar: {
    width: '90%',
    backgroundColor: '#dcdcdc',
    marginVertical: 20,
    height: 200,
    borderWidth: 2,
    borderColor: 'gray'
  },
  submitButton: {
    width: '60%',
    alignSelf: 'center',
    borderWidth: 1,
    marginLeft: 20,
    backgroundColor: 'purple',
    borderColor: 'purple',
    marginVertical: 20,
    color: '#fff',
    padding: 10
  },
  submitTitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  notAuth: {
    flex: 1,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%'
  }
});
