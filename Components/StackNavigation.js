import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
// 화면이동 navigator
// npm install @react-navigation/stack --save해줬음
import { createStackNavigator} from '@react-navigation/stack';

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


const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='bottom' component={BottomTab} options={ {headerShown:false,tabBarStyle: {display: 'none'}}} />
      {/* <Stack.Screen name="CameraList" component={MedicineCamera} options={ {headerShown:false,tabBarStyle: {display: 'none'}}}/> */}
      <Stack.Screen name="CameraList" options={{ headerShown: false }}>
        {(props) => <MedicineCamera {...props} navigation={props.navigation} />}
      </Stack.Screen>
        <Stack.Screen name="Main" component={MedicineMain} options={ {headerShown:false,tabBarStyle: {display: 'none'}}}/>
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
    </Stack.Navigator>
  );
};

const MedicinStack = createStackNavigator();

export default function Navigation (){
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
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
        {/* <Stack.Screen name='bottom' component={BottomTab} options={ {headerShown:false}} />
        <Stack.Screen name="Main" component={MedicineMain} options={ {headerShown:false}}/>
        <Stack.Screen name="Detail" component={MedicineDetail} options={{
          headerShown:false,
          header: ({ navigation, route }) => (
            <CustomHeader title="Details" navigation={navigation} />
          ),
          }}/> */}
          
        {/* <StarStack.Screen name={medicineDetail} component={BookMarkScreen} options={{}} />
        <StarStack.Screen  name={bookMar} component={MedicineDetailScreen} options={{}} /> */}
    </Stack.Navigator>
  );
}





// <NavigationContainer>
//       <StarStack.Navigator initialRouteName="star">
//         <StarStack.Screen name="star" component={Star} />
//         <StarStack.Screen name="stardetail" component={StarDetail} />
//       </StarStack.Navigator>
//     </NavigationContainer>
