import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// npm install @react-navigation/native -- save
// npm install @react-navigation/bottom-tabs --save
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import MemberMyPage from '../Pages/MyPage/MemberMyPage';
import TextSearch from '../Pages/Search/TextSearch';
import CameraSearch from '../Pages/Search/CameraSearch';
import GPT from '../Pages/GPT/Gpt';
import MedicineCamera from '../Pages/Medicine/MedicineCamera';
import BarcodeCamera from '../Pages/Search/BarcodeCamera';

import Main from '../Pages/Main/Main';
import Login from '../Pages/SignUp/Login';

// 서버 포트
import ServerPort from '../Components/ServerPort';
const IP = ServerPort();

// import { Easing } from 'react-native-reanimated';

const Tab = createMaterialBottomTabNavigator(); //createBottomTabNavigator을 Tab에 저장해줌

//<Tab.Navigator initialRouteName="BookMarkMain"> -> 바텀탭에 제이 처음에 뜨는 곳 지정해줌 BookMarkMain이 제일 먼저 나옴

function BottomTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const getToken = await AsyncStorage.getItem('token');
      setToken(getToken)
      console.log("token : ", getToken);
      const res = await axios.post(`${IP}/user/tokenlogin`, {
        token: getToken
      });
      console.log("bottomTab res data : ", res.data);
      console.log("bottomTab res data type : ", typeof (res.data));
      if (res.data === true) {            //1. 로그인 되어 있는 경우 - 아이디 반환
        setLoggedIn(true);
      } else if (res.data === false) {   //2. 로그인 되어 있지 않은 경우 - false 반환
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
      // tabBarActiveColor="#FFFF00" // 아이콘이 활성화되었을 때 주변 배경색을 노란색으로 설정
      activeColor="#6200EE" //선택된 탭의 아이콘 색상
      inactiveColor="#95A5A6" //선택되지 않은 탭의 아이콘 색상
      shifting={true}
    >
      {/* <Tab.Screen
        name="BookMarkScreen"
        component={BookMarkScreen}
        options={{
          tabBarLabel: '즐겨찾기',
          tabBarIcon: ({ color }) => (
            <Icon2 name="bell" color={color} size={26} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="CameraSearch"
        component={BarcodeCamera}
        options={{
          tabBarLabel: '카메라 사진찍어!!',
          tabBarIcon: ({ color }) => (
            <Icon2 name="camera" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="GPT"
        component={GPT}
        options={{
          tabBarLabel: 'GPT',
          tabBarIcon: ({ color }) => (
            <Icon2 name="chat" color={color} size={26} />
          ),
          tabBarAccessibilityLabel: 'GPT', // accessibilty label for this tab
          tabBarColor: 'red',
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
          tabBarAccessibilityLabel: 'Main', // accessibilty label for this tab
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={loggedIn ? MemberMyPage : Login}
        initialParams={{
          token: token,
          setLoggedIn: setLoggedIn
        }}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color }) => (
            <Icon3 name="people-outline" color={color} size={26} />
          ),
          tabBarAccessibilityLabel: 'MyPage', // accessibilty label for this tab
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;