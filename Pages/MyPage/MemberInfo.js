// 회원정보 확인 화면
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Image, Animated, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function MemberInfo({ navigation, route }) {
  const { userData } = route.params;

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
      const getToken = await AsyncStorage.getItem('token');
      console.log("getToken : ", getToken);
      const res = await axios.post('http://172.16.36.15:5000/user/withdrawal', {
        token: getToken
      })
      console.log("res : ", res.data);
      console.log("res type : ", typeof (res.data));
      if (res.data === true) {
        await AsyncStorage.removeItem('token'); // 로컬 스토리지에서 토큰을 삭제
        Alert.alert(
          '탈퇴 처리 되었습니다',
          '이용해 주셔서 감사합니다',
          [
            {
              text: '확인',
              onPress: () => { navigation.navigate("Login"); route.params.setLoggedIn(false); }
            }
          ],
          { cancelable: false }
        );
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
      <View style={styles.profileContainer}>
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
        <Text variant="titleMedium">회원탈퇴</Text>
      </TouchableOpacity>
      <View style={styles.profileInfo}>
        <Button
          mode="contained"
          contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
          labelStyle={{ fontSize: 19 }}
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
    // backgroundColor: '#F7F7F7',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    marginBottom: 40
  },
  userInfoItem: {
    flexDirection: 'row',
    marginBottom: 35,
  },
  userInfoItem2: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: 5
  },
  content: {
    flex: 3,
    fontSize: 18,
    color: '#4A4A4A',
    marginLeft: 20
  },
});