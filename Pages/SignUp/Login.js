// 로그인 화면
import axios from 'axios';
import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
    //** 간편 로그인 시 해당 세션을 지워줘야 함. 카카오면 카카오, 구글이면 구글
    AsyncStorage.removeItem('session');

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    //액시오스 통신
    const handleLogin = async (e) => {
        try {
            const res = await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/login', {
                uid: id,
                upw: pw
            }, {
                withCredentials: true
            });
            if (res.data === true) {
                await AsyncStorage.setItem('session', 'loggedIn');
                console.log("성공");
            } else {
                console.log("실패");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.text}>로그인</Text>
            <Text>아이디</Text>
            <TextInput
                style={styles.input}
                maxLength={14}
                onChangeText={setId}
                onEndEditing={console.log("되나여 : ", id)}
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
            <View style={styles.row}>
            <TouchableOpacity>
                <Text style={{ marginRight: 'auto' }}>아이디/비밀번호 찾기</Text>
            </TouchableOpacity>
            {
            //**todo : 간격 벌리기
            }
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Text>회원가입</Text>
            </TouchableOpacity>
            </View>
            <Button
                title="로그인"
            onPress={()=> {handleLogin()}}
            />
            <Text marginTop={50}>긴편 로그인</Text>
            <Button title="카카오 로그인"/>
            <Button title="구글 로그인" />
        </SafeAreaView>
    );
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
        marginBottom: 10
    },
    text: {
        fontSize: 28,
        marginTop: 0,
        marginBottom: 70,
        // marginLeft: 12
    },
    button: {
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5, 
        marginBottom: 30
    }
})