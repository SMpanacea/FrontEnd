import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
// 화면이동 navigator
// npm install @react-navigation/stack --save해줬음
import { createStackNavigator } from '@react-navigation/stack';

// 즐겨찾기 관련 import
import BookMarkScreen from '../Pages/BookMark/BookMarkMain';
import MedicineDetailScreen from '../Pages/Medicine/MedicineDetail';

// bottomTab
import BottomTab from './BottomTab';

const bookMar = 'BookMar';
const medicineDetail = 'MedicineDetail';

// 즐겨찾기 navigation
const StarStack = createStackNavigator();

export default function Navigation (){
  return (
    <StarStack.Navigator initialRouteName='bottom'>
        <StarStack.Screen name='bottom' component={BottomTab} options={ {headerShown:false}}/>
        <StarStack.Screen name={medicineDetail} component={BookMarkScreen} options={{}} />
        <StarStack.Screen  name={bookMar} component={MedicineDetailScreen} options={{}} />
    </StarStack.Navigator>
  );
}





// <NavigationContainer>
//       <StarStack.Navigator initialRouteName="star">
//         <StarStack.Screen name="star" component={Star} />
//         <StarStack.Screen name="stardetail" component={StarDetail} />
//       </StarStack.Navigator>
//     </NavigationContainer>
