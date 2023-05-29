// 로그인 화면
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';
import {
    View, SafeAreaView, StyleSheet, TouchableOpacity, Alert,
    InteractionManager, findNodeHandle, AccessibilityInfo
} from 'react-native';
import { Text, TextInput, Button, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Kakao from './Easy/Kakao';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

export default function Login({ route, navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [mError, setMError] = useState("");

    const screanReaderFocus = useRef(null);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                console.log("findNodeHandle")
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
        console.log("ㅎㅇ1")
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={styles.box}>

                <TouchableOpacity ref={screanReaderFocus}>
                    <Text style={styles.text}>로그인</Text>
                </TouchableOpacity>

                <TextInput
                    importantForAccessibility="no-hide-descendants"
                    accessibilityLabel="아이디"
                    label={"아이디"}
                    style={[styles.input, styles.down]}
                    theme={customTheme}
                    maxLength={14}
                    onChangeText={setId}
                />

                <TextInput
                    importantForAccessibility="no-hide-descendants"
                    accessibilityLabel="비밀번호"
                    label={"비밀번호"}
                    style={styles.input}
                    theme={customTheme}
                    onChangeText={setPw}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    textContentType="password"
                    maxLength={16}
                />
                <Text style={styles.error}>{mError}</Text>

                <View style={styles.row}>
                    <TouchableOpacity accessibilityLabel='아이디 찾기'
                        onPress={() => navigation.navigate("ReissuanceId") }>
                        <Text variant="titleMedium" style={styles.input}>아이디</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("ReissuancePw") }>
                        <Text variant="titleMedium" style={styles.input}>/비밀번호 찾기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity accessibilityLabel='회원가입 하기'
                        style={{ flex: 1, alignItems: "flex-end", marginBottom: 30 }}
                        onPress={() => navigation.navigate("Join") }>
                        <Text variant="titleMedium">회원가입</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    accessibilityLabel='로그인 하기'
                    mode="outlined"
                    contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                    labelStyle={{ fontSize: 20, color: '#51868C' }}
                    theme={customTheme}
                    onPress={() => { handleLogin() }}>로그인</Button>

                <View importantForAccessibility="no-hide-descendants" style={styles.horizontalLine} />

                <Text variant="titleMedium" style={styles.down2} importantForAccessibility='no-hide-descendants'>간편 로그인</Text>

                <View style={styles.kakaoContainer} accessibilityLabel='카카오 로그인 하기'>
                    <Kakao importantForAccessibility="no-hide-descendants" navigation={navigation} route={route} />
                </View>

            </SafeAreaView>
        </View>
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
        backgroundColor: 'white',
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
    horizontalLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'gray', // 가로줄의 색상 설정
        marginVertical: 10, // 가로줄 위아래 여백 설정
        marginTop: 60
      },
})