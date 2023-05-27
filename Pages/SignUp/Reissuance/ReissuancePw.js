//비밀번호 찾기 화면
import axios from 'axios';
import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function ReissuancePw({ navigation }) {
    const [id, setId] = useState('');
    const [tempId, setTempId] = useState('');
    const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [emailNum, setEmailNum] = useState('');
    const [cemailNum, setCEmailNum] = useState('');

    const [isShown, setIsShown] = useState(false);  //이메일 인증번호 확인 변수

    const [emailNumError, setEmailNumError] = useState(false);//이메일 인증번호

    const handleFind = async () => {      // 서버에 아이디, tempEmail 전송하는 최종 함수
        if (id === '' || emailNumError == false) {
            Alert.alert(
                '',
                '아이디 작성 혹은 이메일 인증을 완료해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        } else {
            try {
                const res = await axios.post(`${IP}/user/findpw`, {
                    uid: tempId,
                    email: tempEmail
                });
                console.log("res.data : ", res.data);
                console.log("res.data type : ", typeof (res.data));
                const bool = res.data;
                if (bool) {
                    setTempId(id);
                    navigation.navigate("ResetPw", { id });
                } else {
                    Alert.alert(
                        '',
                        '아이디 혹은 이메일을 확인해 주세요',
                        [
                            {
                                text: '확인',
                            }
                        ],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleInputEmail = () => {
        const regExp3 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        if (email === "") {
            Alert.alert(
                '',
                '이메일을 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
            return;
        }
        if (regExp3.test(email)) {
            emailCheck();
        } else {
            Alert.alert(
                '',
                '이메일 형식에 맞춰 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        }
    }
    const handleInputEmailNum = () => { //이메일 인증번호
        if (emailNum === "") {
            Alert.alert(
                '',
                '인증번호를 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        } else {
            handleCheckEmailNum();
        }
    }
    const handleCheckEmailNum = () => {     // 이메일 인증번호 비교
        console.log("emailNum : ", emailNum);
        console.log("cemailNum : ", cemailNum);
        if (emailNum === cemailNum) {
            setIsShown(false);
            Alert.alert(
                '',
                '확인되었습니다',
                [
                    { text: '확인' }
                ]
            )
            setTempEmail(email);
            setEmailNumError(true);
        } else {
            setIsShown(true);
            Alert.alert(
                '',
                '인증번호가 일치하지 않습니다',
                [
                    { text: '확인' }
                ]
            )
        }
    }
    const emailCheck = async () => { // 이메일 중복
        await axios.post(`${IP}/user/emailcheck`, {
            email: email
        })
            .then(res => {
                if (res.data === false) {
                    emailNumCheck();
                } else {
                    Alert.alert(
                        '',
                        '존재하지 않는 이메일 입니다',
                        [
                            { text: '확인' }
                        ]
                    )
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    const emailNumCheck = async () => { // 이메일 인증
        setIsShown(true);
        await axios.post(`${IP}/user/sendemail`, {
            email: email
        })
            .then(res => {
                console.log("res.data : ", res.data);
                const parsedEmailNum = res.data; // 숫자를 문자열로 변환
                console.log("parsedEmailNum : ", parsedEmailNum);
                const toString = parsedEmailNum.toString();
                setCEmailNum(toString);
                console.log("인증번호 타입 : ", typeof (cemailNum));
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.text}>비밀번호 찾기</Text>

            <TextInput
                accessibilityLabel="아이디"
                accessibilityHint="아이디는 영문 소문자 또는 숫자로 이루어진 6~14자를 입력하세요."
                style={{ marginBottom: 10, 
                backgroundColor: '#f5f5f5' }}
                label={"아이디"}
                placeholder="영문 소문자/숫자, 6~14자"
                onChangeText={setId}
                maxLength={14}
            />

            <View
                style={{ marginBottom: 25 }}>
                <View style={[styles.row]}>
                    <TextInput
                        accessibilityLabel="이메일"
                        label={"이메일"}
                        style={[styles.dateInput]}
                        onChangeText={setEmail}
                        maxLength={40}
                    />
                    <Button
                        mode="outlined"
                        contentStyle={{ height: 50, alignItems: 'center' }}
                        labelStyle={{ fontSize: 15 }}
                        onPress={handleInputEmail}
                    >인증</Button>
                </View>

                {isShown && (
                    <View>
                        <View style={[styles.row]}>
                            <TextInput
                        accessibilityLabel="이메일 인증번호"
                                label={"이메일 인증번호"}
                                style={[styles.dateInput]}
                                onChangeText={setEmailNum}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                            <Button
                                mode="outlined"
                                contentStyle={{ height: 50, alignItems: 'center' }}
                                labelStyle={{ fontSize: 15 }}
                                onPress={handleInputEmailNum}
                            >확인</Button>
                        </View>
                    </View>
                )}
            </View>
            <Button
                mode="outlined"
                contentStyle={{ height: 50, alignItems: 'center' }}
                labelStyle={{ fontSize: 15 }}
                onPress={handleFind}
            >확인</Button>
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