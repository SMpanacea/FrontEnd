import React from 'react';
// npm install @react-navigation/native -- save
// npm install @react-navigation/bottom-tabs --save
import {NavigationContainer} from '@react-navigation/native';
//npm install @react-navigation/bottom-tabs --save해줬음
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


// BookMark components import
import BookMarkScreen from '../Pages/BookMark/BookMarkMain';
import MedicineDetailScreen from '../Pages/Medicine/MedicineDetail';

const Tab = createBottomTabNavigator(); //createBottomTabNavigator을 Tab에 저장해줌

//<Tab.Navigator initialRouteName="BookMarkMain"> -> 바텀탭에 제이 처음에 뜨는 곳 지정해줌 BookMarkMain이 제일 먼저 나옴

function BottomTab() {
  return (
      <Tab.Navigator initialRouteName="BookMarkMain" > 
        <Tab.Screen
          name="BookMark" //이름지정
          component={BookMarkScreen}//여기 누르면 BookMarkMain으로 화면 이동
          options={{
            title: '알림',
            tabBarIcon: ({color, size}) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MedicineDetail" //이름 지정
          component={MedicineDetailScreen} //여기 누르면 MedicineDetail로 화면 이동
          options={{
            title: '약 디테일',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    
  );
}

export default BottomTab;