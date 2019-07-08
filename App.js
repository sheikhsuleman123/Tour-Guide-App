import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './app/store/reducers';

// SCREENS
import HomeScreen from './app/components/Home/Home.js';
import SearchCardScreen from './app/components/Home/SearchCard.js';
import FindPlaceScreen from './app/components/FindPlace/FindPlace.js';
import DetailPlaceScreen from './app/components/FindPlace/DetailPlace.js';
import AddPlaceScreen from './app/components/AddPlace/AddPlace.js';
import MyPlaceScreen from './app/components/MyPlace/MyPlace.js';
import SideBarScreen from './app/components/SideBar/SideBar.js';
import LoginScreen from './app/components/Login/Login.js';
import SignupScreen from './app/components/Signup/Signup.js';
import SplashScreen from './app/components/Splash/Splash.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Home',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        },
        headerLeft: (
          <Icon
            style={{ padding: 10, fontSize: 20, color: 'white' }}
            name="bars"
            onPress={() => navigation.toggleDrawer()}
          />
        )
      };
    }
  },
  Search: {
    screen: SearchCardScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Search',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        }
      };
    }
  },
  DetailPlace: {
    screen: DetailPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Detail Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        }
      };
    }
  }
});

const FindPlaceStack = createStackNavigator({
  FindPlace: {
    screen: FindPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Find Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        },
        headerLeft: (
          <Icon
            style={{ padding: 10, fontSize: 20, color: 'white' }}
            name="bars"
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  },
  Search: {
    screen: SearchCardScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Search',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        }
      };
    }
  },
  DetailPlace: {
    screen: DetailPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Detail Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        }
      };
    }
  }
});

const AddPlaceStack = createStackNavigator({
  AddPlace: {
    screen: AddPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Add Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        },
        headerLeft: (
          <Icon
            style={{ padding: 10, fontSize: 20, color: 'white' }}
            name="bars"
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});

const MyPlaceStack = createStackNavigator({
  MyPlace: {
    screen: MyPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'My Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        },
        headerLeft: (
          <Icon
            style={{ padding: 10, fontSize: 20, color: 'white' }}
            name="bars"
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  },
  DetailPlace: {
    screen: DetailPlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Detail Place',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#783A87'
        }
      };
    }
  }
});

const NonAuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: SignupScreen
  }
});

const MyBottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={20} />
        )
      }
    },
    FindPlace: {
      screen: FindPlaceStack,
      navigationOptions: {
        tabBarLabel: 'Find Place',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" color={tintColor} size={20} />
        )
      }
    },
    MyPlace: {
      screen: MyPlaceStack,
      navigationOptions: {
        tabBarLabel: 'My Place',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="align-right" color={tintColor} size={20} />
        )
      }
    },
    AddPlace: {
      screen: AddPlaceStack,
      navigationOptions: {
        tabBarLabel: 'Add Place',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="plus" color={tintColor} size={20} />
        )
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    },
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'white',
      shifting: true,
      style: {
        backgroundColor: '#783A87',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const RootNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    NonAuth: NonAuthStack,
    Tab: MyBottomNavigator
  },
  {
    initialRouteName: 'Splash'
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    App: RootNavigator,
    MyPlace: MyPlaceStack
  },
  {
    contentComponent: props => <SideBarScreen {...props} />
  }
);

const AppContainers = createAppContainer(MyDrawerNavigator);

const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <AppContainers />
    <FlashMessage position="top" floating={true} animated={true}/>
  </Provider>
);

export default appRedux;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
