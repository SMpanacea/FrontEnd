// 로그인 화면
import axios from 'axios';
import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//** TODO : 간편 로그인 시 해당 세션을 지워줘야 함. 카카오면 카카오, 구글이면 구글
export default function Signin({navigation}) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [mError, setMError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => { //로그인
        if (id === '' || pw === '') {
            setMError("아이디 혹은 비밀번호를 입력해 주세요");
            return;
        } else {
            setMError('')
            await onFinish(e);
        }
    }

    //액시오스 통신
    const onFinish = async (e) => {
        try {
            const res = await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/login', {
                uid: id,
                upw: pw
            }, {
                withCredentials: true
            });
            if (res.data === true) {
                const token = await api.login(id, pw); // 서버에 로그인 요청을 보내고 토큰을 받아옴
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('session', 'loggedIn');
                const session = await AsyncStorage.getItem('session');
                console.log("Token: ", token);
                console.log("Session: ", session);
                console.log("성공");
                setLoggedIn(true);
                navigation.navigate("Main")
            } else {
                console.log("실패");
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    console.log("로그인 상태 : ", loggedIn);

    if (loggedIn === false) {
        return (
            <SafeAreaView style={styles.box}>
                <Text style={styles.text}>로그인</Text>
                <Text>아이디</Text>
                <TextInput
                    style={styles.input}
                    maxLength={14}
                    onChangeText={setId}
                />
                <Text>비밀번호</Text>
                <TextInput
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
                        <Text>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 118, marginBottom: 15 }}>
                        <Text onPress={() => {navigation.navigate("Signup")}}>회원가입</Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="로그인"
                    onPress={() => { handleLogin() }}
                />
                <Text marginTop={50}>긴편 로그인</Text>
                <Button
                title='카카오 로그인'
                onPress={() => {navigation.navigate("KLogin")}}
                />
                <Button
                title='구글 로그인'
                onPress={() => {navigation.navigate("GLogin")}}
                />
            </SafeAreaView>
        );
    } else {
        <SafeAreaView style={styles.box}>
            <button
                title='로그아웃'
                onPress={handleLogout}
            />
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 61,
    },
    input: {
        // flex: 1,
        height: 40,
        borderWidth: 1,
        // marginBottom: 10
    },
    text: {
        fontSize: 28,
        marginTop: 0,
        marginBottom: 70,
        // marginLeft: 12
    },
    button: {
        // marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
        // marginBottom: 30
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
})