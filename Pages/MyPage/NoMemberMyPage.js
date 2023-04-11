// 비회원 mypage화면
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from '../BookMark/BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';


function NoMemberMyPage({navigation}) {
  return (

    <View style={styles.container}>
        <Text style={styles.title}>my page</Text>
        
        <View style={styles.warningbox}>
          <Text style={styles.warningtext}>
            로그인 후 사용 가능한 기능입니다.
          </Text>
        </View>

        <View style={styles.loginbox}>

          <View style={styles.loginsbox}>
            <View style={styles.login}>
              <TouchableOpacity style={{borderBottomWidth:1,}}>
                <Text>
                  로그인 하러가기
                </Text>

              </TouchableOpacity>
            </View>

            <View style={{flex:1,}}>
              <TouchableOpacity style={{borderBottomWidth:1,}}>
                <Text>
                  회원가입 하러가기
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.easy}>
            <View style={styles.easybox}>
              <Text >
                  가편 회원가입 & 로그인
              </Text>
            </View>
            <TouchableOpacity style={styles.kakaobutton}>
                <Text>
                    kakao
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googlebutton}>
                <Text>
                    google
                </Text>
            </TouchableOpacity>
          </View>
           
        </View> 
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    borderBottomWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
  warningbox: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth:1,

    marginBottom: '5%',
    height:150,
    padding:20
  },
  warningtext:{
    flex:1,
  },
  loginbox:{
    flex: 2,
    height:410,
    borderWidth:1,
    borderColor:"black",
    padding:20
    // justifyContent: 'center',
  },
  loginsbox:{
    flex:1,
    justifyContent: "center",
  },
  login:{
    flex:1, 
    marginBottom:10, 
    justifyContent: 'center',
  },
  loginbutton:{
    borderBottomWidth:1,
    borderBottomColor:'red',
    marginBottom:10,
  },

  easy:{
    flex:2,
  },
  easybox:{
    flex:1,
    borderBottomWidth:1,
    marginBottom:20,
    justifyContent: "center",
  },
  kakaobutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'yellow',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20,
  },
  googlebutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'blue',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20
  }
  
  
});

export default NoMemberMyPage;

