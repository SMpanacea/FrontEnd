import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Alert, Button } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import KakaoButton from '../../../assets/kakao_login_large_narrow.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function App({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [gender, setGender] = useState('');

    const getProfile = async () => {
        try {
            const result = await KakaoLogin.getProfile();
            console.log("GetProfile Success", JSON.stringify(result));
            console.log("email : ", result.email);
            setEmail(result.email);          
            setProfile(result.profileImageUrl);          
            setGender(result.gender === "female" ? "여성" : "남성");
            await handleSubmit();
        } catch (error) {
            console.log(`GetProfile Fail(code:${error.code})`, error.message);
        }
    };

    const login = async () => {
        try {
            const result = await KakaoLogin.login();
            console.log("Login Success : ", JSON.stringify(result));
            await getProfile();
        } catch (error) {
            if (error.code === 'E_CANCELLED_OPERATION') {
                console.log("Login Cancel : ", error.message);
            } else {
                console.log(`Login Fail(code:${error.code}) : `, error.message);
            }
        }
    };

    const handleSubmit = async () => {
        console.log("handleSubmit email : ", email);
        console.log("handleSubmit gender : ", gender);
        console.log("handleSubmit profile : ", profile);
        try {
            const res = await axios.post(`${IP}/user/easylogin`, {
                uid: email,
                upw: null,
                email: email,
                nickname: null,
                birth: null,
                gender: gender,
                profile: profile
            });
            console.log("res.data : ", res.data);
            if (res.data === false) {
                // 회원가입 실패 시 실행할 코드
            } else {
                // 회원가입 성공 시 실행할 코드
                const token = res.data;
                console.log("token : ", token);
                await AsyncStorage.setItem('token', token);
                const getToken =  await AsyncStorage.getItem('token');
                console.log("횐갑 getToken : ", getToken);
                await AsyncStorage.setItem('loginType', "Ka");
                route.params.setLoggedIn(true);
                navigation.navigate("bottom");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity onPress={login}>
            <Image source={KakaoButton} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 230,
        height: 50,
        borderRadius: 15,
    },
});