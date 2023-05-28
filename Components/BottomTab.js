import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';

// BookMark components import
import MemberMyPage from '../Pages/MyPage/MemberMyPage';
import GPT from '../Pages/GPT/Gpt';
import Main from '../Pages/Main/Main';
import Login from '../Pages/SignUp/Login';

// 서버 포트
import ServerPort from '../Components/ServerPort';
const IP = ServerPort();

const Tab = createMaterialBottomTabNavigator(); //createBottomTabNavigator을 Tab에 저장해줌

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
      if (res.data === true) {            //1. 로그인 되어 있는 경우
        setLoggedIn(true);
      } else if (res.data === false) {   //2. 로그인 되어 있지 않은 경우
        setLoggedIn(false);
      } else {                             //3. 토큰 유효기간이 만료된 경우
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
        backgroundColor: '#51868C',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0, // 안전 영역 고려          
        // height:50
      }}
      activeColor="#ffffff"//선택된 탭의 아이콘 색상
      inactiveColor="#95a5a6"//선택되지 않은 탭의 아이콘 색상
    >
      <Tab.Screen
        name="GPT"
        component={GPT}
        options={{
          tabBarLabel: 'ChatGPT',
          tabBarIcon: ({ color }) => (
            <Icon2 name="chat" color={'#ffffff'} size={26} />
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
            <Icon name="home" color={'#ffffff'} size={26} />
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
            <Icon3 name="people-outline" color={'#ffffff'} size={26} />
          ),
          tabBarAccessibilityLabel: 'MyPage', // accessibilty label for this tab
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;