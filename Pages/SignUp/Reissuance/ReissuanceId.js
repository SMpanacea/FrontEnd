// 아이디 찾기 화면
import axios from 'axios';
import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Alert, TouchableOpacity,
    InteractionManager, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, TextInput, Button, DefaultTheme } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function ReissuanceId() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [emailNum, setEmailNum] = useState('');
    const [cemailNum, setCEmailNum] = useState('');

    const [isShown, setIsShown] = useState(false);  //이메일 인증번호 확인 변수

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
    const handleCheckEmailNum = async () => {     // 이메일 인증번호 비교
        if (emailNum === cemailNum) {
            setIsShown(false);
            Alert.alert(
                '',
                '확인되었습니다',
                [
                    { text: '확인' }
                ]
            )
            try {
                    const res = await axios.post(`${IP}/user/findid`, {
                        email: email
                    });
                    console.log("res.data : ", res.data);
                    const uId = res.data;
                    setId(uId);
                    console.log(id);
            } catch (error) {
                console.log(error);
            }
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

    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView style={styles.box} keyboardShouldPersistTaps="handled">

            <TouchableOpacity ref={screanReaderFocus} accessibilityLabel="아이디 찾기">
                <Text importantForAccessibility='no-hide-descendants'
                    style={styles.text}>아이디 찾기</Text>
            </TouchableOpacity>

            <View style={[styles.row, styles.down]}>
                <TextInput
                    accessibilityLabel="이메일"
                    label={"이메일"}
                    style={[styles.dateInput]}
                    theme={customTheme}
                    onChangeText={setEmail}
                    maxLength={40}
                />

                <Button
                    accessibilityLabel="인증번호 받기"
                    mode="outlined"
                    contentStyle={{ height: 50, alignItems: 'center' }}
                    labelStyle={{ fontSize: 15, color: '#51868C' }}
                    theme={customTheme}
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
                            theme={customTheme}
                            onChangeText={setEmailNum}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        <Button
                            accessibilityLabel="인증번호 확인하기"
                            mode="outlined"
                            contentStyle={{ height: 50, alignItems: 'center' }}
                            labelStyle={{ fontSize: 15, color: '#51868C' }}
                            theme={customTheme}
                            onPress={handleInputEmailNum}
                        >확인</Button>
                    </View>
                </View>
            )}
            {id !== '' ?
                (<Text style={styles.text2}>당신의 아이디는 ' {id} ' 입니다</Text>) : null}
        </SafeAreaView>
        </View>
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
        backgroundColor: 'white',
    },
    error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 5,
    },
    text2: {
        fontSize: 20,
        marginTop: 30,
        marginBottom: 20,
    },
    down: {
        marginBottom: 20
    }
});