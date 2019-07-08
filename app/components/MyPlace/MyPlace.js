import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import IconI from 'react-native-vector-icons/dist/Ionicons';
import { Icon } from 'react-native-elements';
import { Card, CardItem, Text, Left, Body, Right } from 'native-base';
import call from 'react-native-phone-call';

import {
  getUserPlaces,
  deleteUserPlace,
  processPlaceStart,
  processPlaceEnd
} from '../../store/actions/place_actions';
import { autoSignIn } from '../../store/actions/user_actions';
import { setTokens, getTokens } from '../../utils/misc';

class MyPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlaces: []
    };
  }

  componentDidMount() {
    if (this.props.User.auth.uid) {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        // The screen is focused Call any action
        getTokens(value => {
          const dateNow = new Date();
          const expiration = dateNow.getTime();

          if (expiration > value[2][1]) {
            this.props.autoSignIn(value[1][1]).then(() => {
              setTokens(this.props.User.auth, () => {
                this.props.processPlaceStart();
                this.props
                  .getUserPlaces(
                    this.props.User.auth.uid,
                    this.props.User.auth.token
                  )
                  .then(() => {
                    this.props.processPlaceEnd();
                    // console.log("fetch user places");
                    //   console.log("userID1**"+this.props.User.auth.uid);
                    //  console.log("tokenID1**"+this.props.User.auth.token);
                  });
              });
            });
          } else {
            this.props.processPlaceStart();
            this.props.getUserPlaces(value[3][1], value[0][1]).then(() => {
              this.props.processPlaceEnd();
              //     console.log("fetch user places");
              // console.log("userID2"+value[3][1]);
              // console.log("tokenID2"+value[0][1]);
            });
          }
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Places.userPlaces) {
      this.setState({
        userPlaces: nextProps.Places.userPlaces
      });
    }
    // console.log("userPlaces***"+this.state.userPlaces);
  }

  // componentWillUnmount() {
  //   // Remove the event listener
  //   this.focusListener.remove();
  // }

  deletePlace = placeID => {
    // alert(placeID);
    getTokens(value => {
      const dateNow = new Date();
      const expiration = dateNow.getTime();
      if (expiration > value[2][1]) {
        this.props.autoSignIn(value[1][1]).then(() => {
          setTokens(this.props.User.auth, () => {
            this.props.deleteUserPlace(placeID, this.props.User.auth.token);
            this.props.processPlaceStart();
            this.props
              .getUserPlaces(
                this.props.User.auth.uid,
                this.props.User.auth.token
              )
              .then(() => {
                this.props.processPlaceEnd();
              });
          });
        });
      } else {
        this.props.deleteUserPlace(placeID, value[0][1]);
        this.props.processPlaceStart();
        this.props.getUserPlaces(value[3][1], value[0][1]).then(() => {
          this.props.processPlaceEnd();
        });
      }
    });
  };

  render() {
    if (!this.props.User.auth.uid) {
      return (
        <View style={styles.notAuth}>
          <IconI name="md-sad" size={80} color="#A9A9A9" />
          <Text style={{ fontSize: 14,color:'#9D9D9D' }} note>You Need To Be Registered/Logged</Text>
          <Button
            title="Login / Register"
            color="#783A87"
            onPress={() => this.props.navigation.navigate('NonAuth')}
          />
        </View>
      );
    }

    if (this.props.Places.processPlace) {
      return (
        <View style={styles.loadingAct}>
          <ActivityIndicator size="large" color="orange" />
          <Text style={styles.msgText}>Please wait...</Text>
        </View>
      );
    }

    if (this.props.Places.userPlaces == '') {
      return (
        <View style={styles.loadingAct}>
          <Text style={styles.msgText}>No Place Found</Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
        {this.state.userPlaces
          ? this.state.userPlaces.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DetailPlace', {
                    Place: item
                  })
                }
                key={i}
              >
                <View style={styles.cardContainer}>
                  <Card>
                    <CardItem>
                      <Left>                   
                        <Body>
                          <Text
                            style={{
                              textTransform: 'capitalize',
                              fontSize: 18
                            }}
                          >
                            {item.placeName}
                          </Text>
                          <Text
                            style={{
                              textTransform: 'capitalize',
                              fontSize: 14
                            }}
                            note
                          >
                            {'City: ' + item.city}
                          </Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text style={{ fontSize: 14 }} note>
                          {moment(item.date).format('MMM Do YY')}
                        </Text>
                      </Right>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        source={{
                          uri: `data:image/jpg;base64,${
                            item.pickedImage.base64
                          }`
                        }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                    </CardItem>
                    <CardItem>
                      <Left>
                      {item.contactUs ? (
                          <View style={{ flexDirection: 'row'}}>                            
                            <Icon
                              raised
                              name="phone"
                              type="font-awesome"
                              size={15}
                              color="#11984B"
                              onPress={() => {
                                const args = {
                                  number: item.contactUs || '999',
                                  prompt: false
                                };

                                call(args).catch(console.error);
                              }}
                            />
                          </View>
                        ) : null}
                        <Icon
                          raised
                          name="trash"
                          type="font-awesome"
                          size={15}
                          color="red"
                          onPress={() => {
                            this.deletePlace(item.id);
                          }}
                        />
                        <Icon
                          raised
                          name="sticky-note"
                          type="font-awesome"
                          size={15}
                          color="#b7bfcc"
                          onPress={() =>
                            this.props.navigation.navigate('DetailPlace', {
                              Place: item
                            })
                          }
                        />
                      </Left>
                      <Right>
                        {item.rating ? (
                          <View
                            style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                          >
                            <StarRating
                              disabled={false}
                              maxStars={5}
                              rating={item.avgRating}
                              starSize={20}
                              fullStarColor={'#F1C40F'}
                            />
                            {/* <Text>{'(' + item.avgRating + ')'}</Text> */}
                          </View>
                        ) : (
                          <View
                            style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                          >
                            <StarRating
                              disabled={false}
                              maxStars={5}
                              rating={0}
                              starSize={20}
                              fullStarColor={'#F1C40F'}
                            />
                            {/* <Text>{'(0)'}</Text> */}
                          </View>
                        )}
                      </Right>
                    </CardItem>
                  </Card>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
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
    {
      autoSignIn,
      getUserPlaces,
      deleteUserPlace,
      processPlaceStart,
      processPlaceEnd
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaceScreen);

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    shadowColor: '#dddddd',
    borderRadius: 2
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  titleCard: {
    fontFamily: 'Roboto-Bold',
    color: '#232323',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  bottomCard: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10,
    justifyContent: 'space-between'
  },
  bottomCardTeam: {
    fontFamily: 'Roboto-Bold',
    color: '#828282',
    fontSize: 12
  },
  bottomCardText: {
    fontFamily: 'Roboto-Light',
    color: '#828282',
    fontSize: 12
  },
  loadingAct: {
    flex: 1,
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%'
  },
  notAuth: {
    flex: 1,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%'
  },
  msgText: {
    color: '#808080',
    fontSize: 14
  }
});
