// // 구글 간편 로그인 화면
// import { useEffect, useState } from "react";
// import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, AppState } from 'react-native';
// import { Text, TextInput, Button, Surface } from 'react-native-paper';
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import * as GoogleAuth from 'expo-google-app-auth';

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
    //   const [token, setToken] = useState("");
    //   const [userInfo, setUserInfo] = useState(null);

    //   const [request, response, promptAsync] = Google.useAuthRequest({
    //     clientId: "1014823998630-kpqi17fsteurd194ff9ndjc0rtg8carh.apps.googleusercontent.com",
    //     androidClientId: "1014823998630-3th949s5dnfgmkmhfn8gef6r9ikkri0k.apps.googleusercontent.com",
    //     iosClientId: "1014823998630-nbqvmikikei4h1nvt8d7oa5qk2d82gme.apps.googleusercontent.com",
    //   });

    //   useEffect(() => {
    //     if (response?.type === "success") {
    //       console.log("안녕 : ",response);
    //       setToken(response.authentication.accessToken);
    //       getUserInfo();
    //     }
    //   }, [response, token]);

    //   const getUserInfo = async () => {
    //     try {
    //       const response = await fetch(
    //         "https://www.googleapis.com/userinfo/v2/me",
    //         {
    //           headers: { Authorization: `Bearer ${token}` },
    //         }
    //       );
    //       const user = await response.json();
    //       setUserInfo(user);
    //     } catch (error) {
    //       console.log("에러 : ", error);
    //     }
    //   };

    //   async function logoutAsync() {
    //     try {
    //       await GoogleAuth.logOutAsync({ accessToken: token, ...request });
    //       setToken(null);
    //       setUserInfo(null);
    //     } catch (e) {
    //       console.error('Failed to revoke token', e);
    //     }
    //   }


//     return (
//             <Button
//                 mode="outlined"
//                 contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
//                 // disabled={!request}
//                 labelStyle={{ fontSize: 19 }}
//                 // onPress={promptAsync}
//                 >구글 로그인</Button>
//     );
// }

// const styles = StyleSheet.create({
//     text: {
//         fontSize: 20,
//         fontWeight: "bold",
//     },
// });