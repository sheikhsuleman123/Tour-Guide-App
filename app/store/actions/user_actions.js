import { SIGN_UP, SIGN_IN, AUTO_SIGN_IN, Logout,USER_INFO } from '../types';

import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { SIGNUP, SIGNIN, REFRESH,USERINFO } from '../../utils/misc';

export function signUp(data) {
  // console.log("***** data" + data);
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    header: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      //console.log("***** response" + response);
      showMessage({
        message: "Success",
        description: "You Are Register Successfully",
        type: 'success',
        icon: "success",    
      });
      return response.data;
    })
    .catch(e => {
      // console.log("***** error" + e);
      console.log('Auth Faild Try Again');
      showMessage({
        message: "Error",
        description: "Auth Faild Try Again",
        type: 'danger',
        icon: "danger",   
      });
      // alert('Auth Faild Try Again');
      return false;
    });

  return {
    type: SIGN_UP,
    payload: request
  };
}

export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    header: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
       //console.log('login*****' + JSON.stringify(response.data));
       showMessage({
        message: "Success",
        description: "You Are Login Successfully",
        type: 'success',
        icon: "success",    
      });
      return response.data;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      showMessage({
        message: "Error",
        description: "Auth Faild Try Again",
        type: 'danger',
        icon: "danger",   
      });
      // alert('Auth Faild Try Again');
      return false;
    });

  return {
    type: SIGN_IN,
    payload: request
  };
}

export const autoSignIn = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: 'grant_type=refresh_token&refresh_token=' + refToken,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      // alert("auto*****" + response);
      return response.data;
    })
    .catch(e => {
      console.log('Auth Faild Try Again');
      return false;
    });

  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
};

// export const userInfo = (idToken) => {
//   alert(idToken);
//   const request = axios({
//     method: 'POST',
//     url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyDSpb4uP7Jb16uECOwNu1gMHI2VCKy8ZU0`,
//     data:{
//       idToken:idToken
//     },
//     header: {
//       'Content-Type':'application/json'
//     }
//   })
//     .then(response => {
//       console.log('info*****' + JSON.stringify(response.data));
//       return response.data;
//     })
//     .catch(e => {
//       console.log('error user info');
//       return false;
//     });
//     console.log('request*****' + JSON.stringify(request));
//   // return {
//   //   type: AUTO_SIGN_IN,
//   //   payload: request
//   // };
// };

export const authLogout = () => {
  return {
    type: Logout
  };
};
