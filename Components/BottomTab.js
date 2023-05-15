// import React from 'react';
// // npm install @react-navigation/native -- save
// // npm install @react-navigation/bottom-tabs --save
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Text} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon3 from 'react-native-vector-icons/Ionicons';
// import Icon4 from 'react-native-vector-icons/FontAwesome';

// // BookMark components import
// import BookMarkScreen from '../Pages/BookMark/BookMarkMain';
// import MedicineDetailScreen from '../Pages/Medicine/MedicineDetail';
// import MedicineMain from '../Pages/Medicine/MedicineMain';
// import NoMemberMyPage from '../Pages/MyPage/NoMemberMyPage';
// import MemberMyPage from '../Pages/MyPage/MemberMyPage';
// import TextSearch from '../Pages/Search/TextSearch';
// import CameraSearch from '../Pages/Search/CameraSearch';
// import GPT from '../Pages/GPT/Gpt';
// import MedicineCamera from '../Pages/Medicine/MedicineCamera';


// const Tab = createBottomTabNavigator(); //createBottomTabNavigator을 Tab에 저장해줌

// //<Tab.Navigator initialRouteName="BookMarkMain"> -> 바텀탭에 제이 처음에 뜨는 곳 지정해줌 BookMarkMain이 제일 먼저 나옴

// function BottomTab() {
//   return (
//       <Tab.Navigator initialRouteName="BookMarkMain" > 
//         <Tab.Screen
//           name="BookMark" //이름지정
//           component={BookMarkScreen}//여기 누르면 BookMarkMain으로 화면 이동
//           options={{
//             headerShown: false,
//             title: '알림',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="notifications" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="MedicineMain" //이름지정
//           component={MedicineMain}//여기 누르면 BookMarkMain으로 화면 이동
//           options={{
//             headerShown: false,
//             title: '모든 약 확인',
//             tabBarIcon: ({color, size}) => (
//               <Icon2 name="pill" color={color} size={size} />
//             ),
//           }}
//         />
//         {/* <Tab.Screen
//           name="MedicineDetail" //이름 지정
//           component={MedicineDetailScreen} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: '약 디테일',
//             tabBarIcon: ({color, size}) => (
//               <Icon name="home" color={color} size={size} />
//             ),
//           }}
//         /> */}
//         <Tab.Screen
//           name="NoMyPage" //이름 지정
//           component={NoMemberMyPage} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: 'NoMyPage',
//             tabBarIcon: ({color, size}) => (
//               <Icon3 name="people-outline" color={color} size={size} />
//             ),
//           }}
//         />
//         {/* <Tab.Screen
//           name="MyPage" //이름 지정
//           component={MemberMyPage} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: 'MyPage',
//             tabBarIcon: ({color, size}) => (
//               <Icon3 name="people" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Search" //이름 지정
//           component={TextSearch} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: 'Search',
//             tabBarIcon: ({color, size}) => (
//               <Icon4 name="search" color={color} size={size} />
//             ),
//           }}
//         /> */}
//         {/* <Tab.Screen
//           name="CameraSearch" //이름 지정
//           component={CameraSearch} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: 'Search',
//             tabBarIcon: ({color, size}) => (
//               <Icon4 name="search" color={color} size={size} />
//             ),
//           }}
//         /> */}
//         <Tab.Screen
//           name="MedicineCamera" //이름 지정
//           component={MedicineCamera} //여기 누르면 MedicineDetail로 화면 이동
//           options={{
//             headerShown: false,
//             title: '카메라결과목록',
//             tabBarIcon: ({color, size}) => (
//               <Icon2 name="pill" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
    
//   );
// }

// export default BottomTab;

import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// npm install @react-navigation/native -- save
// npm install @react-navigation/bottom-tabs --save
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome';

// BookMark components import
import BookMarkScreen from '../Pages/BookMark/BookMarkMain';
import MedicineDetailScreen from '../Pages/Medicine/MedicineDetail';
import MedicineMain from '../Pages/Medicine/MedicineMain';
import NoMemberMyPage from '../Pages/MyPage/NoMemberMyPage';
import MemberMyPage from '../Pages/MyPage/MemberMyPage';
import TextSearch from '../Pages/Search/TextSearch';
import CameraSearch from '../Pages/Search/CameraSearch';
import GPT from '../Pages/GPT/Gpt';
import MedicineCamera from '../Pages/Medicine/MedicineCamera';

import Main from '../Pages/Main/Main';  
import Login from '../Pages/SignUp/Login';

// import { Easing } from 'react-native-reanimated';


const Tab = createMaterialBottomTabNavigator(); //createBottomTabNavigator을 Tab에 저장해줌

//<Tab.Navigator initialRouteName="BookMarkMain"> -> 바텀탭에 제이 처음에 뜨는 곳 지정해줌 BookMarkMain이 제일 먼저 나옴

function BottomTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token,setToken] =useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const getToken = await AsyncStorage.getItem('token');
      setToken(getToken)
      console.log("token : ", getToken);
      const res = await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/tokenlogin', {
        token: getToken
      });
      console.log("bottomTab res data : ", res.data);
      console.log("bottomTab res data type : ", typeof(res.data));
      if (res.data === true) {            //1. 로그인 되어 있는 경우 - 아이디 반환
        setLoggedIn(true);
      } else if ( res.data === "false") {   //2. 로그인 되어 있지 않은 경우 - false 반환
        setLoggedIn(false);
       } else {                             //3. 토큰 유효기간이 만료된 경우 - 아이디, 토큰 반환
        setLoggedIn(false);
       }
      console.log("bottomTab loggedIn : ", loggedIn);
    };
    checkLoginStatus();
  }, [loggedIn]);

  return (  
      <Tab.Navigator
        initialRouteName="Main"
        // animationEasing={Easing.linear}
        barStyle={{
          backgroundColor: '#FFFFFF',
          paddingBottom: Platform.OS === 'ios' ? 20 : 0, // 안전 영역 고려          
          // height:50
        }}
        activeColor="#6200EE"
        inactiveColor="#95A5A6"
      >
      <Tab.Screen
        name="MedicineMain"
        component={MedicineMain}
        options={{
          tabBarLabel: '모든 약 확인',
          tabBarIcon: ({ color }) => (
            <Icon2 name="pill" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CameraSearch"
        component={CameraSearch}
        options={{
          tabBarLabel: '카메라 사진찍어!!',
          tabBarIcon: ({ color }) => (
            <Icon2 name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="NoMyPage"
        component={loggedIn ? MemberMyPage : Login}
        initialParams={{
          token:token,
          setLoggedIn:setLoggedIn
        }}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color }) => (
            <Icon3 name="people-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MedicineCamera"
        component={MedicineCamera}
        options={{
          tabBarLabel: '카메라결과목록',
          tabBarIcon: ({ color }) => (
            <Icon2 name="pill" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="GPT"
        component={GPT}
        options={{
          tabBarLabel: 'GPT',
          tabBarIcon: ({ color }) => (
            <Icon2 name="chat" color={color} size={26} />
          ),
        }}
      />
      </Tab.Navigator>
  );
}

export default BottomTab;