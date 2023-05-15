// import React, { useState } from "react";
// import { WebView } from 'react-native-webview';
// import axios from 'axios';
// import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
 
// const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

// const KakaoLogin = ({ navigation }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//     function LogInProgress(data) {
//         console.log("data :: " + data);

//         const exp = "code=";
//         var condition = data.indexOf(exp);

//         if (condition != -1) {
//             var request_code = data.substring(condition + exp.length);
//             requestToken(request_code);
//         }
//     };

//     const requestToken = async (request_code) => {
//         var returnValue = "none";
//         var request_token_url = "https://kauth.kakao.com/oauth/token";
//         console.log("request_code :: " + request_code);

//         axios({
//             method: "post",
//             url: request_token_url,
//             params: {
//                 grant_type: 'authorization_code',
//                 client_id: 'ba9d0e2209d0fd7c736dca24abd5d4d3', //Rest API 키값
//                 redirect_uri: 'https://auth.expo.io/',
//                 code: request_code,
//             },
//         }).then(function (response) {
//           axios({
//             method:'get',
//             url:'https://kapi.kakao.com/v2/user/me',
//             headers:{
//                 Authorization: `Bearer ${response.data.access_token}`
//             }
//         }).then(function (response) {
//             console.log('response22 :: ' + JSON.stringify(response));
//         }).catch(function (error) {
//           console.log('error', error);
//         });
//         }).catch(function (error) {
//             console.log('error', error);
//         });

//     };

//     if (loggedIn) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>You are now logged in!</Text>
//         </View>
//       );
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//             <WebView
//                 originWhitelist={['*']}
//                 scalesPageToFit={false}
//                 style={{ marginTop: 30 }}
//                 source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=ba9d0e2209d0fd7c736dca24abd5d4d3&redirect_uri=https://auth.expo.io/' }}
//                 injectedJavaScript={runFirst}
//                 javaScriptEnabled={true}
//                 onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}
//             />
//         </View>
//     );
//     }
// };

// export default KakaoLogin;