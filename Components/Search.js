// 검색바 컴포넌트
// import { SearchBar } from 'react-native-elements';
// import {useState} from 'react';

// // 참고 사이트: https://reactnativeelements.com/docs/components/searchbar

// export default function Search (props) {
//   const [state,setState] = useState('');//useState를 사용해서 사용자가 검색한 값을 setState에 저장해서 state값을 바꿔준다.

//   // const search = state;

//   return (
//     <SearchBar
//       placeholder="약 검색해주세요..." //검색바에 뜨는 문구
//       onChangeText={setState} //텍스트 바뀌게 해주는 핸들러
//       value={state}           //value값;을 state에서 가져온다
//       style={{fontSize:13, marginBottom:10}}  //즐겨찾기 할 어쩌구 폰트사이즈 정해주기
//     />
//   );
// }

//gpt 채팅 화면

import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'

// 서버통신
import axios from 'axios';
import ServerPort from './ServerPort';
const IP = ServerPort();

// import MessageList from '../../Components/MessageList';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//색 모음
import { theme } from '../theme'
// import { Platform } from 'react-native';

export default function Search() {
  const [message, setMessage] = useState(''); // 사용자 메시지 입력

  return (
    <View style={styles.TextInputcontainer}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TextInput
            multiline
            placeholder='쓰고 싶은 말 써봐라!'
            style={styles.input}
            value={message} // 현재 message 값을 입력 값으로 설정
            onChangeText={text => setMessage(text)}
          />
        </View>
        {/* 일단 잠들어 있어라,,,, 돈 나간다!!!!!! */}
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessageToServer(message)}>
          {/* <TouchableOpacity style={styles.sendButton} > */}
          {/* <Icon name={message ? "send" : "microphone"} size={23} color={theme.colors.white} /> */}
          <Icon name={message ? "send" : "send"} size={23} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>

  )

}
const styles = StyleSheet.create({
  TextInputcontainer: {
    justifyContent: 'center',
    // backgroundColor: theme.colors.white
  },
  innerContainer: {
    // paddingHorizontal:10,
    // marginHorizontal:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical:10
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: theme.colors.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff'
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: 'center',
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'

  }
});