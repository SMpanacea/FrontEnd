// // // 구글 간편 로그인 화면
// import { useEffect, useState } from "react";
// import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, AppState } from 'react-native';
// import { Text, TextInput, Button, Surface } from 'react-native-paper';
// // import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// export default function Google() {
//     const signOut = async () => {
//         try {
//             await GoogleSignin.signOut();
//             this.setState({ user: null }); // Remember to remove the user from your app's state as well
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <GoogleSigninButton
//             style={{ height: 60 }}
//             size={GoogleSigninButton.Size.Wide}
//             color={GoogleSigninButton.Color.Dark}
//             // onPress={this._signIn}
//             // disabled={this.state.isSigninInProgress}
//         />
//     )
// }