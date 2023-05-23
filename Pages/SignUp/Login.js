// 로그인 화면
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Constants from 'expo-constants';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Kakao from './Easy/Kakao';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

export default function Login({ route, navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [mError, setMError] = useState("");

    const handleLogin = async () => { //로그인
        if (id === '' || pw === '') {
            setMError("아이디 혹은 비밀번호를 입력해 주세요");
            return;
        } else {
            setMError('')
            onFinish();
        }
    }

    //액시오스 통신
    const onFinish = async () => {
        try {
            const res = await axios.post(`${IP}/user/login`, {
                uid: id,
                upw: pw
            });
            console.log("res.data : ", res.data);
            console.log("res.data.typeof : ", typeof (res.data));
            if (res.data === false) {
                Alert.alert(
                    '로그인에 실패하였습니다',
                    '다시 시도해 주세요',
                    [
                        {
                            text: '확인',
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                const token = res.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('loginType', "Gen");
                route.params.setLoggedIn(true);
                navigation.navigate("bottom");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.text}>로그인</Text>
            <TextInput
                importantForAccessibility="no-hide-descendants"
                label={"아이디"}
                style={[styles.input, styles.down]}
                maxLength={14}
                onChangeText={setId}
            />
            <TextInput
                importantForAccessibility="no-hide-descendants"
                label={"비밀번호"}
                style={styles.input}
                onChangeText={setPw}
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="password"
                maxLength={16}
            />
            <Text style={styles.error}>{mError}</Text>
            <View style={styles.row}>
                <TouchableOpacity>
                    <Text variant="titleMedium" style={styles.input}
                        onPress={() => { navigation.navigate("ReissuanceId") }}>아이디</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text variant="titleMedium" style={styles.input}
                        onPress={() => { navigation.navigate("ReissuancePw") }}>/비밀번호 찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: "flex-end", marginBottom: 25 }}>
                    <Text variant="titleMedium" onPress={() => { navigation.navigate("Join") }}>회원가입</Text>
                </TouchableOpacity>
            </View>
            <Button
                mode="outlined"
                contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                labelStyle={{ fontSize: 19 }}
                onPress={() => { handleLogin() }}>로그인</Button>
            <Text variant="titleMedium" style={styles.down2}>간편 로그인</Text>
            <View style={styles.kakaoContainer}>
                <Kakao navigation={navigation} route={route} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 30,
    },
    input: {
        // flex: 1,
        height: 40,
        borderWidth: 1,
        // marginBottom: 10
    },
    text: {
        fontSize: 24,
        marginTop: 0,
        marginBottom: 35,
        // marginLeft: 12
    },
    input: {
        backgroundColor: '#f5f5f5',
    },
    down: {
        marginBottom: 10
    },
    down2: {
        marginBottom: 15,
        marginTop: 30,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
    },
    error: {
        color: 'red',
        fontSize: 15
    },
    kakaoContainer: {
      alignItems: 'center',
    },
})