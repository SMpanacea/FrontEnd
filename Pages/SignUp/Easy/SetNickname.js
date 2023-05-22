import axios from 'axios';
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function SetNickName({ navigation, route }) {
    const email = route.params;

    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');

    const [nickError, setNickError] = useState(false);      //닉네임
    const [birthError, setBirthError] = useState(false);    //생일

    const [regNickName, setRegNickName] = useState(false);  //닉네임 유효성
    const [regBirth, setRegBirth] = useState(false);        //생년월일 유효성

    const [mNickError, setMNickError] = useState("");       //닉네임 오류 메세지
    const [mBirthError, setMBirthError] = useState("");     //생년월일 오류 메세지

    const fetchUserData = async () => {
        const getToken = await AsyncStorage.getItem('token');
        console.log("getToken : ", getToken)
        const res = await axios.post(`${IP}/user/info`, {
          token: getToken
        });
        const flag = res.data;
        console.log("flag : ", flag)
        if (res.data === false) {
          console.log("왜안됨")
        } else {
            if(flag.nickname !== null) {
                setNickname(flag.nickname);
                setBirth(flag.birth);
            }
        }
        console.log("됨")
      };

    useEffect(() => {
        fetchUserData();
        if(nickname !== null) {
            route.params.setLoggedIn(true);
            navigation.navigate("bottom");
        }
    }, []);

    const handleInputNickName = () => {
        const regExp4 = /^[a-zA-Z0-9가-힣]{2,12}$/
        if (nickname === "") {
            setNickError(false);
            setMNickError('닉네임을 입력해 주세요');
            return;
        }
        if (regExp4.test(nickname)) {
            setRegNickName(true);
            setNickError(true);
            setMNickError('');
            nickDupCheck(nickname);
        } else {
            setRegNickName(false)
            setNickError(false);
            setMNickError('닉네임 형식에 맞춰 입력해 주세요');
            return;
        }
    }
    const nickDupCheck = async () => { // 닉네임 중복 검사
        await axios.post(`${IP}/user/nicknamecheck`, {
            nickname: nickname
        })
            .then(res => {
                if (res.data === false) {
                    setNickError(false);
                    setMNickError('이미 존재하는 닉네임 입니다');
                } else {
                    setNickError(true);
                    setMNickError('');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    const handleInputBirth = () => {    //생년월일 유효성 검사
        const regExp5 = /^(19\d{2}|200[0-9])-(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-9]|3[0-1])$/;
        if (birth === "") {
            setBirthError(false);
            setMBirthError('생년월일을 입력해 주세요');
            return;
        }
        if (regExp5.test(birth)) {
            setRegBirth(true);
            setBirthError(true);
            setMBirthError('');
            return;
        } else {
            setRegBirth(false);
            setBirthError(false);
            setMBirthError('생년월일 형식에 맞춰 입력해 주세요');
            return;
        }
    }

    //모든 폼이 정상 입력됐는 지 확인
    const onFinish = async () => {
        if (nickError == false || regNickName == false) {
            Alert.alert(
                '',
                '닉네임을 확인해 주세요',
                [
                    {
                        text: '확인',
                    },
                ],
                { cancelable: false }
            );
            return;
        } else if (birthError == false) {
            Alert.alert(
                '',
                '생년월일을 확인해 주세요',
                [
                    {
                        text: '확인',
                    },
                ],
                { cancelable: false }
            );
            return;
        } else {
            await handleSubmit();
            navigation.navigate("bottom", {setLoggedIn: true});
        }
    }
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${IP}/user/update`, {
                uid: email,
                nickname: nickname,
                birth: birth,
            })
            if (res.data == false) {
                Alert.alert(
                    '등록에 실패하였습니다',
                    '다시 시도해 주세요',
                    [
                        {
                            text: '확인',
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    '',
                    '등록되었습니다',
                    [
                        {
                            text: '확인'
                        }
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.text}>추가 정보 등록</Text>
            <TextInput
                label={"닉네임"}
                style={styles.input}
                placeholder="영문 소문자/한글/숫자, 2~12자"
                onChangeText={setNickname}
                onEndEditing={handleInputNickName}
                maxLength={12}
            />
            <Text style={[styles.error]}>{mNickError}</Text>
            <TextInput
                label={"생년월일"}
                style={styles.input}
                placeholder="예시) 1990-01-01"
                onChangeText={setBirth}
                onEndEditing={handleInputBirth}
                keyboardType='numeric'
                maxLength={10}
            />
            <Text style={[styles.error]}>{mBirthError}</Text>
            <Button
                mode="outlined"
                contentStyle={{ height: 50, alignItems: 'center' }}
                labelStyle={{ fontSize: 15 }}
                onPress={onFinish}
            >완료</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row2: {
        marginBottom: 20
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
        color: 'black',
        backgroundColor: '#f5f5f5',
    },
    error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 5,
    },
});