// //로딩 스피너 component
// import * as React from 'react';
// import { ActivityIndicator, Colors } from 'react-native-paper';

// function Loading(){
//   return(
//     <ActivityIndicator animating={true} color='red' size='large'/>
//   )
// }


// export default Loading;
// 앱 처음 실행할 때 보일 로딩화면
// npm i react-native-splash-screen --save이거해줌
// Import React and Component

import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Text,Image} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';


//처음 앱 실행했을 때 움직이는 발바닥 밑에 install 다 해줘야 돼
//npm i --save lottie-react-native
//npm i --save lottie-ios@3.2.3
//npm install @react-native-async-storage/async-storage

import LottieView from 'lottie-react-native';

const Loading = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'StackNavigation'),
      );
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
       <LottieView 
          source={require('../assets/pill.json') /** 움직이는 LottieView */
          }
          autoPlay loop
        />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});