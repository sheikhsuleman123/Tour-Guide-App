import {
  ADD_PLACE,
  GET_USER_PLACES,
  DELETE_USER_PLACE,
  SEARCH_PLACE,
  RATE_PLACE,
  PROCESS_PLACE_START,
  PROCESS_PLACE_END
} from '../types';

import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { FIREBASEURL } from '../../utils/misc';

export function addPlace(data, token) {
  const request = axios({
    method: 'POST',
    url: `${FIREBASEURL}/places.json?auth=${token}`,
    data
  })
    .then(res => {
      showMessage({
        message: "Success",
        description: "Your Place Add Successfully",
        type: 'success',
        icon: "success",   
      });
      // Alert.alert('Add Item');
      return response.data;
    })
    .catch(e => {
      //  Alert.alert("Try Again");
      console.log('Auth Faild Try Again');
      return false;
    });

  return {
    type: ADD_PLACE,
    payload: request
  };
}

export function getUserPlaces(userID, token) {
  const request = axios({
    method: 'GET',
    url: `${FIREBASEURL}/places.json?orderBy=\"userUid\"&equalTo=\"${userID}\"&auth=${token}`
  })
    .then(res => {
      // console.log(res.data);
      // console.log("userID"+userID);
      let places = [];

      for (let key in res.data) {
        places.push({
          ...res.data[key],
          id: key
        });
      }
      //console.log(places);
      return places;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      return false;
    });

  return {
    type: GET_USER_PLACES,
    payload: request
  };
}

export function deleteUserPlace(placeID, token) {
  const request = axios({
    method: 'DELETE',
    url: `${FIREBASEURL}/places/${placeID}.json?auth=${token}`
  })
    .then(res => {
      showMessage({
        message: "Success",
        description: "Delete Place Successfully",
        type: 'success',
        icon: "success",   
      });
      return res.data;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      return false;
    });
  return {
    type: DELETE_USER_PLACE,
    payload: true
  };
}

export function searchPlaceByCity(cityName) {
  const request = axios({
    method: 'GET',
    url: `${FIREBASEURL}/places.json?orderBy=\"city\"&equalTo=\"${cityName}\"`
  })
    .then(res => {
      let searchPlaces = [];

      for (let key in res.data) {
        searchPlaces.push({
          ...res.data[key],
          id: key
        });
      }
      //console.log("searchPlaces"+ searchPlaces);
      return searchPlaces;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      return false;
    });
  //console.log("request"+ request);

  return {
    type: SEARCH_PLACE,
    payload: request
  };
}

export function searchPlaceByNameAndCity(placeName, cityName) {
  const request = axios({
    method: 'GET',
    url: `${FIREBASEURL}/places.json?orderBy=\"city\"&equalTo=\"${cityName}\"`
  })
    .then(res => {
      let searchPlaces = [];
      const responseData = [];
      for (let key in res.data) {
        responseData.push({
          ...res.data[key],
          id: key
        });
      }

      for (let key in responseData) {
        if (placeName === responseData[key].placeName) {
          searchPlaces.push({
            ...responseData[key]
          });
        }
      }

      //console.log("Name And City" + searchPlaces);
      return searchPlaces;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      return false;
    });
  console.log('request' + request);

  return {
    type: SEARCH_PLACE,
    payload: request
  };
}

export function updateByRating(data, id, token) {
  //  console.log("data**"+ data);
  //  console.log("id" +id);
  const request = axios({
    method: 'PATCH',
    url: `${FIREBASEURL}/places/${id}.json?auth=${token}`,
    data
  })
    .then(res => {
      showMessage({
        message: "Success",
        description: "Thanks For Your Feedback",
        type: 'success',
        icon: "success",   
      });
      return response.data;
    })
    .catch(e => {
      //  Alert.alert("Try Again");
      console.log('Auth Faild Try Again');
      return false;
    });

  // console.log("req" + request);
  // alert("req" + request);
  return {
    type: RATE_PLACE,
    payload: true
  };
}

export function processPlaceStart() {
  return {
    type: PROCESS_PLACE_START,
    payload: true
  };
}

export function processPlaceEnd() {
  return {
    type: PROCESS_PLACE_END,
    payload: false
  };
}
