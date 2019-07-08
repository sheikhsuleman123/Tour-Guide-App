import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import { TextField } from 'react-native-material-textfield';
import Geocoder from 'react-native-geocoder';
import { withNavigation } from "react-navigation";
import { showMessage } from 'react-native-flash-message';

class PickLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      },
      locationChosen: false,
      placeNameSearch: ''
    };
  }

  componentWillMount() {
    this.reset();
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
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      },
      locationChosen: false,
      placeNameSearch: ''
    });
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  placeNameSearchHandler = placeNameSearch => {
 
    try {
      Geocoder.geocodeAddress(placeNameSearch)
        .then(response => {
          //console.log('lat', response[0].position.lat);
          //console.log('lng', response[0].position.lng);        

          this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: response[0].position.lat,
            longitude: response[0].position.lng
          });

          this.setState(prevState => {
            return {
              focusedLocation: {
                ...prevState.focusedLocation,
                latitude: response[0].position.lat,
                longitude: response[0].position.lng
              },
              locationChosen: true,
              placeNameSearch: placeNameSearch
            };
          });
          this.props.onLocationPick({
            latitude: response[0].position.lat,
            longitude: response[0].position.lng
          });
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        // alert('Fetching the Position failed, please pick one manually!');
        showMessage({
          message: "Info",
          description: "Fetching The Position Failed, Please Pick One Manually!",
          type: 'info',
          icon: "info",   
        });
      }
    );
  };

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            width: '90%',
            marginLeft: 22,
            marginBottom: 22,
            marginRight: 22
          }}
        >
          <TextField
            style={styles.loginField}
            label="Search Place"
            fontSize={20}
            tintColor="purple"
            textColor="black"
            baseColor="gray"
            lineWidth={1}
            labelPadding={1}
            value={this.state.placeNameSearch}
            onChangeText={placeNameSearch =>
              this.placeNameSearchHandler(placeNameSearch)
            }
          />
        </View>

        <MapView
          initialRegion={this.state.focusedLocation}
          region={
            !this.state.locationChosen ? this.state.focusedLocation : null
          }
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button
            title="Locate Me"
            onPress={this.getLocationHandler}
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    marginTop: '5%',
    backgroundColor: 'purple'
  }
});

export default withNavigation(PickLocation);
