// 회원정보 확인 화면
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Alert, InteractionManager,
  findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button, DefaultTheme } from 'react-native-paper';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

export default function MemberInfo({ navigation, route }) {
  const { userData } = route.params;

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
      console.log("delData res.data : ", res.data);
      if (res.data === true) {
        await AsyncStorage.removeItem('token'); // 로컬 스토리지에서 토큰을 삭제
        if (loginType === "Ka") { //카카오 세션 삭제
          KakaoLogin.unlink().then((result) => {
            console.log('Withdrawal Success', JSON.stringify(result));
          }).catch((error) => {
            console.log(`Withdrawal Failed (code: ${error.code})`, error.message);
          });
        }
        await AsyncStorage.removeItem('loginType');
        // route.params.setLoggedIn(false);
        console.log("4");
        console.log("값이 뭐야?", loggedIn)
        navigation.navigate("bottom", {loggedIn:false});
        console.log("5");

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
          <Text style={styles.content}>{userData.email}</Text>
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

      <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 40 }} onPress={chkDel}>
        <Text style={{ marginRight: 10, borderBottomWidth: 0.5, fontSize: 15, marginTop: 10 }}>회원탈퇴</Text>
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
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomColor: '#ECECEC',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  id: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  userInfoContainer: {
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
    marginLeft: 25
  },
});