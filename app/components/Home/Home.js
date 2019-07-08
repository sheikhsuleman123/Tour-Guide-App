import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

//import Images
import FSD from '../../images/fsd.jpg';
import LHR from '../../images/lahore.jpg';
import ISL from '../../images/islamabad.jpg';
import RAW from '../../images/rawalpindi.jpg';
import MUL from '../../images/multan.jpg';
import NAR from '../../images/Naran.jpg';
import KAG from '../../images/Kaghan.jpg';
import MUR from '../../images/muree.jpg';

class HomeScreen extends Component {
  constructor() {
    super();
    this.onClickHome = this.onClickHome.bind(this);
  }

  onClickHome = cityName => {
    //alert(cityName);
    const screenName = this.props.navigation.state.routeName;
    this.props.navigation.navigate('Search', {
      cityName: cityName,
      screenName: screenName
    });

    //  this.props.navigation.navigate("Search");
  };

  render() {
    return (
      <ScrollView style={{ width: '100%', alignContent: 'center' }}>
        <View style={styles.container}>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.onClickHome('Faisalabad')}>
                <Image style={styles.img} source={FSD} />
                <Text style={styles.imgText}> Faisalabad </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onClickHome('Lahore')}>
                <Image style={styles.img} source={LHR} />
                <Text style={styles.imgText}> Lahore </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => this.onClickHome('Islamabad')}>
                <Image style={styles.img} source={ISL} />
                <Text style={styles.imgText}> Islamabad </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onClickHome('Rawalpindi')}>
                <Image style={styles.img} source={RAW} />
                <Text style={styles.imgText}> Rawalpindi </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => this.onClickHome('Multan')}>
                <Image style={styles.img} source={MUL} />
                <Text style={styles.imgText}> Multan </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onClickHome('Muree')}>
                <Image style={styles.img} source={MUR} />
                <Text style={styles.imgText}> Muree </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => this.onClickHome('Naran')}>
                <Image style={styles.img} source={NAR} />
                <Text style={styles.imgText}> Naran </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onClickHome('Kaghan')}>
                <Image style={styles.img} source={KAG} />
                <Text style={styles.imgText}> Kaghan </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imgContainer: {
    flexDirection: 'row'
  },
  img: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#fff'
  },
  imgText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17
  }
});
