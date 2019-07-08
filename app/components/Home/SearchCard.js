import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// import UserAvatar from 'react-native-user-avatar';

import moment from 'moment';
import call from 'react-native-phone-call';
import { Icon } from 'react-native-elements';

import { Image } from 'react-native';
import { Card, CardItem, Text, Left, Body, Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  searchPlaceByNameAndCity,
  searchPlaceByCity,
  processPlaceStart,
  processPlaceEnd
} from '../../store/actions/place_actions';

class SearchCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPlaces: []
    };
  }
  //   componentWillReceiveProps(){
  //     if(this.props.Places.searchPlaces){
  //         this.setState({
  //           searchPlaces: this.props.Places.searchPlaces
  //         })
  //     }
  //    // console.log("userPlaces***"+this.state.userPlaces);
  // }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


  componentDidMount() {
    const { screenName } = this.props.navigation.state.params;
    if (screenName == 'Home') {
      const { cityName } = this.props.navigation.state.params;
      this.props.processPlaceStart();
      this.props.searchPlaceByCity(cityName).then(() => {
        this.setState({
          searchPlaces: this.props.Places.searchPlaces
        });
        this.props.processPlaceEnd();
      });
    }

    if (screenName == 'FindPlace') {
      const { placeName, city } = this.props.navigation.state.params;
      this.props.processPlaceStart();
      this.props.searchPlaceByNameAndCity(placeName, city).then(() => {
        this.setState({
          searchPlaces: this.props.Places.searchPlaces
        });
        this.props.processPlaceEnd();
      });
    }
  }

  render() {
    const { screenName } = this.props.navigation.state.params;
    if (this.props.Places.processPlace) {
      return (
        <View style={styles.loadingAct}>
          <ActivityIndicator size="large" color="orange" />
          <Text style={styles.msgText}>Please wait...</Text>
        </View>
      );
    }

    if (this.state.searchPlaces == '') {
      return (
        <View style={styles.loadingAct}>
          <Text style={styles.msgText}>No Place Found</Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
        {console.log('search place' + this.props.searchPlaces)}
        {this.state.searchPlaces
          ? this.state.searchPlaces.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DetailPlace', {
                    Place: item,
                    screenName: screenName
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
                          <View style={{ flexDirection: 'row' }}>                            
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
                          name="sticky-note"
                          type="font-awesome"
                          size={15}
                          color="#b7bfcc"
                          onPress={() =>
                            this.props.navigation.navigate('DetailPlace', {
                              Place: item,
                              screenName: screenName
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
      searchPlaceByNameAndCity,
      searchPlaceByCity,
      processPlaceStart,
      processPlaceEnd
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCardScreen);

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
  },
  roundedProfileImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50
  }
});
