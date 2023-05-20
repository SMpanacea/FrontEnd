// // 비회원 mypage화면
// import React from 'react';
// import {StyleSheet, View, ScrollView, TouchableOpacity, Modal, Image, Animated} from 'react-native';
// import { Text, Button, Title, Surface } from 'react-native-paper';

// // navigation
// import 'react-native-gesture-handler';

// // 외부에서 불러온 것들
// import Icon from 'react-native-vector-icons/FontAwesome';
// import BookMarkModal from '../BookMark/BookMarkModal';

// // 약목록 보여주는 component
// import List from '../../Components/Lists';
// import MemberMyPage from './MemberMyPage';

// function NoMemberMyPage({navigation}) {
//     return (
//       <View style={styles.container}>
          
//           <View style={styles.warningbox}>
//             <Text style={styles.warningtext}>
//               로그인 후 사용 가능한 기능입니다.
//             </Text>
//           </View>
  
//           <View style={styles.loginbox}>
//             <View style={styles.loginsbox}>
//               <View style={styles.login}>
//                 <TouchableOpacity style={{borderBottomWidth:1,}}>
//                   <Text onPress={()=>{navigation.navigate("Login")}}>
//                     로그인 하러가기
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{flex:1,}}>
//                 <TouchableOpacity style={{borderBottomWidth:1,}}>
//                   <Text onPress={()=>{navigation.navigate("Join")}}>
//                     회원가입 하러가기
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
  
//             <View style={styles.easy}>
//               <View style={styles.easybox}>
//                 <Text >
//                     간편 회원가입 & 로그인
//                 </Text>
//               </View>
//               <Button
//                   mode="outlined"
//                   style={styles.down}
//                   contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
//                   labelStyle={{ fontSize: 16 }}
//                   // onPress={() => {navigation.navigate("Kakao")}}
//                   >카카오 로그인</Button>
//               <Button
//                   mode="outlined"
//                   contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
//                   labelStyle={{ fontSize: 16 }}
//                   // onPress={() => {navigation.navigate("Google")}}
//                   >구글 로그인</Button>
//             </View>
//           </View> 
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#eaeaea',
//   },
//   title: {
//     borderBottomWidth:1,
//     borderBottomColor: 'black',
//     marginBottom: '10%',
//   },
//   warningbox: {
//     flex:1,
//     flexDirection: 'row',
//     alignItems: "center",
//     borderWidth:1,

//     marginBottom: '5%',
//     height:150,
//     padding:20
//   },
//   warningtext:{
//     flex:1,
//   },
//   loginbox:{
//     flex: 2,
//     height:410,
//     borderWidth:1,
//     borderColor:"black",
//     padding:20
//     // justifyContent: 'center',
//   },
//   loginsbox:{
//     flex:1,
//     justifyContent: "center",
//   },
//   login:{
//     flex:1, 
//     marginBottom:10, 
//     justifyContent: 'center',
//   },
//   loginbutton:{
//     borderBottomWidth:1,
//     borderBottomColor:'red',
//     marginBottom:10,
//   },
//   down: {
//     marginBottom: 10
// },
//   easy:{
//     flex:2,
//   },
//   easybox:{
//     flex:1,
//     borderBottomWidth:1,
//     marginBottom:0,
//     justifyContent: "center",
//   },
// });

// export default NoMemberMyPage;

