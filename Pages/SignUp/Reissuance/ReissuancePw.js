//비밀번호 찾기 화면
import axios from 'axios';
import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert,
    InteractionManager, findNodeHandle, AccessibilityInfo, Image } from 'react-native';
import { Text, TextInput, Button, DefaultTheme, TouchableRipple } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function ReissuancePw({ navigation }) {
    const [id, setId] = useState('');
    const [tempId, setTempId] = useState('');
    const [email, setEmail] = useState('');
    const [emailNum, setEmailNum] = useState('');
    const [cemailNum, setCEmailNum] = useState('');

    const [isShown, setIsShown] = useState(false);  //이메일 인증번호 확인 변수
    const [emailNumError, setEmailNumError] = useState(false);//이메일 인증번호

    const screanReaderFocus = useRef(null);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        })
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableRipple onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
                    <Image source={require('../../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
                </TouchableRipple>
            ),
            headerTitle: "비밀번호 찾기",
            headerStyle: {
                elevation: 10, // 안드로이드 그림자 효과
                shadowOpacity: 0.5, // iOS 그림자 효과
                shadowColor: 'black', // 그림자 색상 설정
                shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
                shadowRadius: 4, // 그림자 반경 설정
            },
        });
    }, [])

    const customTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#51868C',
        },
      };

    const handleFind = async () => {      // 서버에 아이디, 이매알을 전송하는 최종 함수
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
                    email: email
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
        <View style={{ flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView style={styles.box} keyboardShouldPersistTaps="handled">

            <TouchableOpacity  ref={screanReaderFocus}
                    accessibilityLabel="비밀번호 찾기">
                <Text importantForAccessibility='no-hide-descendants'
                style={styles.text}>비밀번호 찾기</Text>
            </TouchableOpacity>

            <TextInput
                accessibilityLabel="아이디"
                accessibilityHint="아이디는 영문 소문자 또는 숫자로 이루어진 6~14자를 입력하세요."
                style={{ marginBottom: 10, 
                backgroundColor: 'white' }}
                theme={customTheme}
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
            </View>
            <Button
                mode="outlined"
                contentStyle={{ height: 50, alignItems: 'center' }}
                labelStyle={{ fontSize: 15 }}
                theme={customTheme}
                onPress={handleFind}
            >확인</Button>
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
});