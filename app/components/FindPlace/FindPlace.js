import React, { Component } from 'react';
import {
  Alert,
  Picker,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import { showMessage } from 'react-native-flash-message';

class FindPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      city: 'Faisalabad'
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
      city: 'Faisalabad'
    });
  };

  onSubmit() {
    const { placeName, city } = this.state;
    if (placeName == '' || city == '') {
      showMessage({
        message: 'Error',
        description: 'Fill the All Field',
        type: 'danger',
        icon: 'danger'
      });
      // Alert.alert('Fill the All Field');
    } else {
      const screenName = this.props.navigation.state.routeName;
      this.props.navigation.navigate('Search', {
        placeName: placeName.toLowerCase(),
        city: city,
        screenName: screenName
      });

      this.reset();
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <ScrollView>
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.heading}> Find The Place </Text>
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
              autoCapitalize="words"
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
                  placeholder="Select the City"
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
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.onSubmit}
            >
              <Text style={styles.submitTitle}>
                SEARCH PLACE <Icon name="search-plus" color="white" size={18} />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FindPlaceScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  heading: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold'
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
  }
});
