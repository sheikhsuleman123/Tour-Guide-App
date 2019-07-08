import React, { Component } from 'react';

import {
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import { AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoSignIn } from '../../store/actions/user_actions';
import { setTokens, getTokens } from '../../utils/misc';
import { updateByRating } from '../../store/actions/place_actions';
import Modal from 'react-native-modal';

class DetailPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placerating: 0,
      modalVisible: false
    };
  }

  ratingCompleted(rating) {
    this.setState({
      placerating: rating
    });
  }

  ratingActionCall(token) {
    const { Place, screenName } = this.props.navigation.state.params;
    const { placerating } = this.state;
    if (Place.rating) {
      const updatePlace = {
        placeName: Place.placeName,
        city: Place.city,
        location: Place.location,
        pickedImage: Place.pickedImage,
        description: Place.description,
        userUid: Place.userUid,
        date: Place.date,
        sumRating: Place.sumRating + placerating,
        avgRating:
          (Place.sumRating + placerating) /
          (Place.rating.ratingArray.length + 1),
        rating: {
          ratingArray: [
            {
              rateUid: this.props.User.auth.uid,
              rateValue: placerating
            },
            ...Place.rating.ratingArray
          ]
        }
      };
      this.props.updateByRating(updatePlace, Place.id, token);
      this.props.navigation.navigate(screenName);
    } else {
      const updatePlace = {
        placeName: Place.placeName,
        city: Place.city,
        location: Place.location,
        pickedImage: Place.pickedImage,
        description: Place.description,
        userUid: Place.userUid,
        date: Place.date,
        sumRating: placerating,
        avgRating: placerating,
        rating: {
          ratingArray: [
            {
              rateUid: this.props.User.auth.uid,
              rateValue: placerating
            }
          ]
        }
      };
      this.props.updateByRating(updatePlace, Place.id, token);
      this.props.navigation.navigate(screenName);
    }
  }

  pressOK() {
    getTokens(value => {
      const dateNow = new Date();
      const expiration = dateNow.getTime();

      if (expiration > value[2][1]) {
        this.props.autoSignIn(value[1][1]).then(() => {
          setTokens(this.props.User.auth, () => {
            this.ratingActionCall(this.props.User.auth.token);
          });
        });
      } else {
        this.ratingActionCall(value[0][1]);
      }
    });

    this.setState({
      modalVisible: false
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { Place } = this.props.navigation.state.params;
    const { User } = this.props;

    return (
      <ScrollView>
        <View style={[styles.container]}>
          <Image
            style={{
              marginTop: 5,
              height: 200,
              justifyContent: 'space-around'
            }}
            source={{
              uri: `data:image/jpg;base64,${Place.pickedImage.base64}`
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop:10
            }}
          >
            <Text style={styles.placeText}> {Place.placeName} </Text>
            <Text style={styles.placeText}> {Place.city} </Text>
          </View>

          <View style={styles.lineStyle} />

          {!User.auth.uid ? (
            <TouchableHighlight
              style={styles.FeedbackNotAuthView}
              onPress={() => this.props.navigation.navigate('NonAuth')}
            >
              <Text style={styles.FeedbackNotAuthText}>
                Registered/Logged For Feedback
              </Text>
            </TouchableHighlight>
          ) : User.auth.uid == Place.userUid ? (
            <View />
          ) : Place.rating ? (
            Place.rating.ratingArray.find(item => {
              return item.rateUid == User.auth.uid;
            }) ? (
              <View>
                <Text style={styles.FeedbackThankText}>
                  {' '}
                  Thanks For Feedback
                </Text>
              </View>
            ) : (
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}
                style={styles.FeedbackView}
              >
                <Text style={styles.FeedbackText}>Feedback</Text>
              </TouchableHighlight>
            )
          ) : (
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={styles.FeedbackView}
            >
              <Text style={styles.FeedbackText}>Feedback</Text>
            </TouchableHighlight>
          )}

          <Modal
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: false })}
          >
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                height: 300
              }}
            >
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 22,
                    alignSelf: 'center',
                    color: '#783A87',
                    fontWeight: 'bold'
                  }}
                >
                  Rate This Place
                </Text>
                <AirbnbRating
                  defaultRating={0}
                  imageSize={20}
                  onFinishRating={this.ratingCompleted.bind(this)}
                />
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <View
                  style={[{ width: '22%' }]}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Button
                    title="Cancel"
                    color="red"
                    style={{ margin: 10 }}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  />
                </View>
                <View
                  style={[{ width: '22%' }]}
                  onPress={() => {
                    this.pressOK();
                  }}
                >
                  <Button
                    title="OK"
                    color="blue"
                    style={{ margin: 10 }}
                    onPress={() => {
                      this.pressOK();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {Place.location ? (
            <View style={styles.subContainer}>
              <MapView
                initialRegion={{
                  ...Place.location,
                  latitudeDelta: 0.0122,
                  longitudeDelta:
                    (Dimensions.get('window').width /
                      Dimensions.get('window').height) *
                    0.0122
                }}
                style={styles.map}
              >
                <MapView.Marker coordinate={Place.location} />
              </MapView>
            </View>
          ) : (
            <View />
          )}

          <Text style={styles.Description}>{Place.description}</Text>
        </View>
      </ScrollView>
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
  return bindActionCreators({ autoSignIn, updateByRating }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPlaceScreen);

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1
  },
  avatar: {
    width: '80%',
    backgroundColor: '#dcdcdc',
    marginVertical: 20,
    alignSelf: 'center',
    height: 200,
    borderWidth: 2,
    borderColor: 'gray'
  },
  TextInputStyleClass: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 20,
    borderWidth: 1,
    height: 100
  },
  Description: {
    marginTop: 20,
    fontSize: 18
  },
  subContainer: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  placeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10
  },
  FeedbackNotAuthView: {
    width: 300,
    alignSelf: 'center',
    marginTop: 5
  },
  FeedbackNotAuthText: {
    height: 40,
    padding: 5,
    fontSize: 14,
    color: 'white',
    backgroundColor: 'purple',
    textAlign: 'center',
    padding: 7
  },
  FeedbackView: {
    width: 300,
    alignSelf: 'center',
    marginTop: 5
  },
  FeedbackText: {
    height: 40,
    padding: 5,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'purple',
    textAlign: 'center',
    padding: 7
  },
  FeedbackThankText: {
    height: 40,
    padding: 5,
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    padding: 7,
    marginTop: 5
  }
});
