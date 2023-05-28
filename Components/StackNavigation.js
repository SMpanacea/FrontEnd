import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 화면이동 navigator
// npm install @react-navigation/stack --save해줬음
import { createStackNavigator } from '@react-navigation/stack';

// 즐겨찾기 관련 import
import BookMarkScreen from '../Pages/BookMark/BookMarkMain';
import MedicineDetailScreen from '../Pages/Medicine/MedicineDetail';
import Lists from '../Components/Lists';

// 약 관련 import
import MedicineMain from '../Pages/Medicine/MedicineMain';
import MedicineDetail from '../Pages/Medicine/MedicineDetail';
import MedicineCamera from '../Pages/Medicine/MedicineCamera';

// bottomTab
// import BottomTabNavigationApp from './BottomTabNavigationApp';
import BottomTab from './BottomTab';

// 앱실행 시 처음 보이는 로딩창
import SplashScreen from '../Pages/SplashScreen/SplashScreen';
import * as Notifications from "expo-notifications";
const bookMar = 'BookMar';
const medicineDetail = 'MedicineDetail';

// navigation
const Stack = createStackNavigator();

// // 즐겨찾기 navigation
// const StarStack = createStackNavigator();

// header
// import CustomHeader from './CustomHeader';

import Join from '../Pages/SignUp/Join';
import Login from '../Pages/SignUp/Login'
import ReissuanceId from '../Pages/SignUp/Reissuance/ReissuanceId';
import ReissuancePw from '../Pages/SignUp/Reissuance/ReissuancePw';
import ResetPw from '../Pages/SignUp/Reissuance/ResetPw';
import MemberInfo from '../Pages/MyPage/MemberInfo';
import MemberMyPage from '../Pages/MyPage/MemberMyPage';
import MyBoardsList from '../Pages/MyPage/MyBoardsList';
import MemberInfoEdit from '../Pages/MyPage/MenberInfoEdit';
import MyLikesList from '../Pages/MyPage/MyLikesList';
import MyCommentsList from '../Pages/MyPage/MyCommentsList';
import PillDetectionMain from '../Pages/PillDetection/PillDetectionMain';
import galarySearch from '../Pages/PillDetection/galarySearch';
import BarcodeCamera from '../Pages/Search/BarcodeCamera';
import CameraSearchMain from '../Pages/Search/CameraSearchMain';
import TextSearch from '../Pages/Search/TextSearch';
import Kakao from '../Pages/SignUp/Easy/Kakao';
import SetNickName from '../Pages/SignUp/Easy/SetNickname';
import BarcodeMain from '../Pages/Search/BarcodeMain';
// import Barcode from '../Pages/Search/BarcodeCamera';
// import GallerySearch from '../Pages/Search/GallerySearch';

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='bottom' component={BottomTab} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
      {/* <Stack.Screen name="CameraList" component={MedicineCamera} options={ {headerShown:false,tabBarStyle: {display: 'none'}}}/> */}
      <Stack.Screen name="CameraList" options={{ headerShown: false }}>
        {(props) => <MedicineCamera {...props} navigation={props.navigation} />}
      </Stack.Screen>
      <Stack.Screen name="Main" component={MedicineMain} options={{ headerShown: true, tabBarStyle: { display: 'none' } }} />
      {/* <Stack.Screen name="Detail" component={MedicineDetail} options={{
          // headerShown:false,
          tabBarStyle: {display: 'none'},
          // header: ({ navigation, route }) => (
          //   <CustomHeader title="Details" navigation={navigation} />
          // ),
          }}/> */}
      <Stack.Screen
        name="Detail"
        component={MedicineDetail}
      />
      <Stack.Screen name="Join" component={Join} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ReissuanceId" component={ReissuanceId} />
      <Stack.Screen name="ReissuancePw" component={ReissuancePw} />
      <Stack.Screen name="ResetPw" component={ResetPw} />
      <Stack.Screen name="MemberInfo" component={MemberInfo} />
      <Stack.Screen name="MemberMyPage" component={MemberMyPage} />
      <Stack.Screen name="MyBoardsList" component={MyBoardsList} />
      <Stack.Screen name="MemberInfoEdit" component={MemberInfoEdit} />
      <Stack.Screen name="MyLikesList" component={MyLikesList} />
      <Stack.Screen name="MyCommentsList" component={MyCommentsList} />
      <Stack.Screen name="PillDetectionMain" component={PillDetectionMain} />
      <Stack.Screen name="galarySearch" component={galarySearch} />
      <Stack.Screen name="BarcodeCamera" component={BarcodeCamera} />
      <Stack.Screen name="CameraSearchMain" component={CameraSearchMain} />
      <Stack.Screen name="TextSearch" component={TextSearch} />
      <Stack.Screen name="Kakao" component={Kakao} />
      <Stack.Screen name="SetNickName" component={SetNickName} />
      <Stack.Screen name="BarcodeMain" component={BarcodeMain} />
      <Stack.Screen name="Barcode" component={Barcode} />
      <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />
      {/* <Stack.Screen name="GallerySearch" component={GallerySearch} /> */}
    </Stack.Navigator>
  );
};

const MedicinStack = createStackNavigator();

export default function Navigation() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
  );
}