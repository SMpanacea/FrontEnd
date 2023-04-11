// 회원가입 한 후 보이는 mypage화면
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Man from '../../assets/man.jpg'

import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from '../BookMark/BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';


function MemberMyPage({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>my page</Text>
  
      <View style={styles.mypagecontainer}>
        <View style={styles.memberbox}>
          <View style ={{flex:1,borderWidth:1}}>
            <Image source={Man} style={{height:'100%', width:'100%'}}/>
          </View>
          <View style={{flex:1,  justifyContent:'center', padding:10}}>
            <Text style={{marginBottom:10}}>
              @@@씨
            </Text>
            <Text style={{marginBottom:10}}>
              반가워요! ㅎㅇㅎ
            </Text>
            <TouchableOpacity>
              <Text style={{marginBottom:10}}>
                회원정보 수정하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bookmarkbox}>
          <View style={styles.bookmarktitle}>
            <Text style={styles.bookmarktitletext}>
              즐겨찾기 한 약
            </Text>
          </View>

          <View style={styles.bookmarkimgcontainer}>


          </View>
        </View>
        
        {/* <View style={styles.binbox}>

        </View> */}

        <View style={styles.myinfocontainer}>
          <View style={styles.infobutton}>
            <TouchableOpacity style={styles.infotoch}>
              <Text>
                내가 쓴 게시글 목록
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.infobutton}>
            <TouchableOpacity style={styles.infotoch}>
              <Text>
                내가 좋아요 노른 글 목록
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.infobutton}>
            <TouchableOpacity style={styles.infotoch}>
              <Text>
                내가 댓글 단 글 목록
              </Text>
            </TouchableOpacity>

          </View>

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
    marginBottom: '5%',
  },
  mypagecontainer:{
    flex:1, 
    borderWidth:1,

  },
  memberbox:{
    flex:0.3,
    borderWidth:1,
    flexDirection: 'row',
    marginBottom:10
  },
  bookmarkbox:{
    flex:0.4,
    borderWidth:1,
    marginBottom:10
  },
  bookmarktitle:{
    flex:0.5,
    padding:10
  },
  bookmarktitletext:{
    flex:1,
    borderBottomWidth:1, 
    width:110
  },
  bookmarkimgcontainer:{
    flex:3,
    padding:10,
    borderWidth:1,
    borderColor:'gray'
  },

  // binbox:{
  //   flex:0.05,
  // },

  myinfocontainer:{
    flex:0.3,
    padding:10,
    borderWidth:1,

  },
  infobutton:{
    flex:1,
    // borderWidth:1,
    // borderColor:'blue',
    padding:10,
    justifyContent:'center',
  },
  infotoch:{
    borderBottomWidth:1,
  },
  
});

export default MemberMyPage;

