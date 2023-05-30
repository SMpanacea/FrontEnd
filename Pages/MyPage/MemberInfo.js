// 회원정보 확인 화면
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Alert, InteractionManager,
  findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button, DefaultTheme,TouchableRipple } from 'react-native-paper';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

// 아이콘
import LottieView from 'lottie-react-native';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');

export default function MemberInfo({ navigation, route }) {
  const { userData } = route.params;
  const {setWidthdraw} = route.params;
  const [widthdraw, setWidthdraw2] = useState(route.params.widthdraw);

  React.useLayoutEffect(() => {
    AccessibilityInfo.announceForAccessibility();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableRipple onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
          <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
        </TouchableRipple>
      ),
      headerTitle: "프로필",
      headerStyle: {
        elevation: 10, // 안드로이드 그림자 효과
        shadowOpacity: 0.5, // iOS 그림자 효과
        shadowColor: 'black', // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
        shadowRadius: 4, // 그림자 반경 설정
      },
    });
  }, [])

  const screanReaderFocus = useRef(null);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const reactTag = findNodeHandle(screanReaderFocus.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    })
  }, []);

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#51868C',
    },
  };

  const chkDel = () => {
    Alert.alert(
      '회원탈퇴',
      '정말 탈퇴하시겠습니까?',
      [
        {
          text: '확인',
          onPress: delData
        },
        {
          text: '취소',
        },
      ],
      { cancelable: false }
    );
  }

  const delData = async () => {
    try {
      const loginType = await AsyncStorage.getItem('loginType');
      const getToken = await AsyncStorage.getItem('token');

      const res = await axios.post(`${IP}/user/withdrawal`, {
        token: getToken
      })
      if (res.data === true) {
        await AsyncStorage.removeItem('token'); // 로컬 스토리지에서 토큰을 삭제
        setWidthdraw(true);
        console.log("탈퇴 불린값", widthdraw);
        setWidthdraw2(true);
        if (loginType === "Ka") { //카카오 세션 삭제
          KakaoLogin.unlink().then((result) => {
            console.log('Withdrawal Success', JSON.stringify(result));
          }).catch((error) => {
            console.log(`Withdrawal Failed (code: ${error.code})`, error.message);
          });
        }
        await AsyncStorage.removeItem('loginType');
        navigation.navigate('bottom', { myVariable:true }); // 변수를 전달하여 화면 이동
      } else {
        Alert.alert(
          '탈퇴에 실패하였습니다',
          '다시 시도해 주세요',
          [
            {
              text: '확인',
            }
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  const formatEmailForAccessibility = (text) => {
    // 이메일을 알파벳으로 읽어주기 위해 띄어쓰기와 문자 변환 추가
    const spacedEmail = text.replace(/(.{1})/g, '$1 ');

    // @를 at로, .를 dot으로 변환
    const transformedEmail = spacedEmail
      .replace(/@/g, '골뱅이')
      .replace(/\./g, '쩜');

    return transformedEmail;
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer} ref={screanReaderFocus} accessibilityLabel="프로필 사진" >
        <Image source={{ uri: userData.img }} style={styles.profileImage} />
    
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>아이디</Text>
          <Text style={styles.content}>{userData.id}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.content} accessibilityLabel={formatEmailForAccessibility(userData.email)}>{userData.email}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.content}>{userData.nickname}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>생년월일</Text>
          <Text style={styles.content}>{userData.birth}</Text>
        </View>

        <View style={styles.userInfoItem2}>
          <Text style={styles.label}>성별</Text>
          <Text style={styles.content}>{userData.gender}</Text>
        </View>
      </View>

      <TouchableOpacity style={{ alignItems: "flex-end",  flex:1, marginTop:220}} onPress={chkDel}>
        <Text style={{ marginRight: 20, borderBottomWidth: 0.5, fontSize: 15, marginTop:50 }}>회원탈퇴</Text>
      </TouchableOpacity>

      <View style={styles.profileInfo}>
        <Button
          accessibilityLabel='프로필 수정하기'
          mode="outlined"
          style={styles.button}
          contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
          labelStyle={{ fontSize: 19, color: '#51868C' }}
          theme={customTheme}
          onPress={() => {
            navigation.navigate("MemberInfoEdit", { userData });
          }}>수정</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width:width,
    height:height,

  },
  profileContainer: {
    flex:2,
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomColor: '#ECECEC',
  },
  profileImage: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
  },  
  profileInfo: {
    flex:1,
    alignItems: 'center',
  },
  button:{
    marginBottom:50,
  },
  id: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  userInfoContainer: {
    flex:1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10
  },
  userInfoItem: {
    flexDirection: 'row',
    marginBottom: 45,
  },
  userInfoItem2: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: 5
  },
  content: {
    flex: 3,
    fontSize: 18,
    color: '#4A4A4A',
    marginLeft: 5
  },
});