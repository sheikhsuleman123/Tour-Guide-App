import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  List,
  ListItem
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sideBarLogo from '../../images/logo.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

import { removeTokens } from '../../utils/misc';
import { authLogout } from '../../store/actions/user_actions';

const routes = ['Home', 'Favourite', 'AddPlace'];

class SideBarScreen extends React.Component {
  onLogout = () => {
    removeTokens(value => {
      this.props.authLogout();
      this.props.navigation.navigate('NonAuth');
    });
    // removeTokens();
    // this.props.authLogout();
    // this.props.navigation.navigate("NonAuth");
  };

  render() {
    return (
      <Container>
        <Header style={styles.drawerHeader}>
          <Body>
            <Image source={sideBarLogo} style={styles.drawerImage} />
          </Body>
        </Header>
        <Content>
          {/* <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />    */}

          <ListItem
            button
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Icon name="home" size={20} color="#783A87" />
            <Text style={{ color: '#783A87' }}> Home</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate('FindPlace')}
          >
            <Icon name="search" size={20} color="#783A87" />
            <Text style={{ color: '#783A87' }}> Find Place</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate('MyPlace')}
          >
            <Icon name="align-right" size={20} color="#783A87" />
            <Text style={{ color: '#783A87' }}> My Place</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate('AddPlace')}
          >
            <Icon name="plus" size={20} color="#783A87" />
            <Text style={{ color: '#783A87' }}> Add Place</Text>
          </ListItem>
          <ListItem button onPress={() => this.onLogout()}>
            <Icon name="sign-out" size={20} color="#783A87" />
            <Text style={{ color: '#783A87' }}> Sign Out</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  drawerHeader: {
    height: 110,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 100,
    width: 100,
    borderRadius: 75,
    marginLeft: '30%'
  }
});

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authLogout }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarScreen);
