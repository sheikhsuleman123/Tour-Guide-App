import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'firebase';

export const FIREBASEURL = `https://optimum-place.firebaseio.com`;
export const APIKEY = `AIzaSyDSpb4uP7Jb16uECOwNu1gMHI2VCKy8ZU0`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const USERINFO = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${APIKEY}`;

// const firebaseConfig = {
//   apiKey: "AIzaSyDSpb4uP7Jb16uECOwNu1gMHI2VCKy8ZU0",
//   authDomain: "optimum-place.firebaseapp.com",
//   databaseURL: "https://optimum-place.firebaseio.com",
//   projectId: "optimum-place",
//   storageBucket: "optimum-place.appspot.com",
//   messagingSenderId: "548679074047",
//   appId: "1:548679074047:web:e7cc6ac7e5d27208"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.database().ref('users').set({name:'hamza',name2:'zain'});

export const getTokens = cb => {
  //AsyncStorage.clear();
  AsyncStorage.multiGet([
    '@optimum_place_app@token',
    '@optimum_place_app@refreshToken',
    '@optimum_place_app@expireToken',
    '@optimum_place_app@uid'
  ]).then(value => {
    cb(value);
  });
};

export const removeTokens = cb => {
  //AsyncStorage.clear();
  AsyncStorage.multiRemove([
    '@optimum_place_app@token',
    '@optimum_place_app@refreshToken',
    '@optimum_place_app@expireToken',
    '@optimum_place_app@uid'
  ]).then(value => {
    cb(value);
  });
};

export const setTokens = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ['@optimum_place_app@token', values.token],
    ['@optimum_place_app@refreshToken', values.refToken],
    ['@optimum_place_app@expireToken', expiration.toString()],
    ['@optimum_place_app@uid', values.uid]
  ]).then(response => {
    cb();
  });
};

export const convertFirebase = data => {
  const newData = [];

  for (let key in data) {
    newData.push({
      ...data[key],
      id: key
    });
  }
  return newData;
};

export const findTeamData = (itemId, teams) => {
  const value = teams.find(team => {
    return team.id === itemId;
  });
  return value;
};
