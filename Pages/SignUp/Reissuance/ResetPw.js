//비밀번호 재설정
import axios from 'axios';
import React, { useState, useRef } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, InteractionManager, 
    findNodeHandle, AccessibilityInf  } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../../Components/ServerPort';
const IP = ServerPort();

export default function ResetPw({ navigation, route }) {
    const { id } = route.params;

    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const pwRef = useRef(null);
    const cpwRef = useRef(null);

    const [pwError, setPwError] = useState(false);          //비밀번호
    const [cpwError, setCpwError] = useState(false);        //비밀번호 확인

    const [isPasswordVisible, setPasswordVisibility] = useState(false); //비밀번호 확인 변수
    const [isPasswordVisible2, setPasswordVisibility2] = useState(false);

    const screanReaderFocus = useRef(null);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        })
    }, []);

    const chgPwd = async () => {
        if (cpw === "") {
            setCpwError(false);
            Alert.alert(
                '',
                '확인 비밀번호를 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
            return;
        } 
        if (cpwError === true) {
            try {
                const res = await axios.post(`${IP}/user/update`, {
                  uid: id,
                  upw: pw
                });
                console.log("resetPw res.data : ",res.data);
                const bool = res.data;
                if(bool) {
                    Alert.alert(
                        '',
                        '변경되었습니다',
                        [
                            {
                                text: '확인',
                                onPress: ()=>navigation.navigate("Login")
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        '',
                        '비밀번호를 확인해 주세요',
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
        } else {
            Alert.alert(
            '',
            '비밀번호가 일치하지 않습니다',
            [
                {
                    text: '확인',
                }
            ],
            { cancelable: false }
        );
        }
        
        if (pw == cpw) {
            setCpwError(true);
        } else {
            setCpwError(false);
            Alert.alert(
                '',
                '비밀번호가 일치하지 않습니다',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        }
    }

    const handleInputPw = () => {
        const regExp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*?.])[a-zA-Z\d!~!@#$%^&*?.]{8,16}$/
        if (pw === "") {
            setPwError(false);
            Alert.alert(
                '',
                '비밀번호를 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
            return;
        }
        if (regExp2.test(pw)) {
            setPwError(true);
        } else {
            setPwError(false);
            Alert.alert(
                '',
                '비밀번호 형식에 맞춰 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.text}>비밀번호 재설정</Text>
            <TextInput
                accessibilityLabel="비밀번호"
                accessibilityHint="비밀번호는 영문 대소문자와 숫자, 특수문자로 이루어진 8자에서 16자를 입력하세요."
                label={"비밀번호"}
                ref={pwRef}
                placeholder="영문 대소문자/숫자/특수문자, 8자~16자"
                onChangeText={setPw}
                style={styles.dateInput}
                onEndEditing={handleInputPw}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                textContentType="password"
                right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisibility(!isPasswordVisible)} />}
                maxLength={16}
            />

            <TextInput
                accessibilityLabel="비밀번호 확인"
                ref={cpwRef}
                placeholder="비밀번호 확인"
                onChangeText={setCpw}
                style={[styles.dateInput, styles.down]}
                secureTextEntry={!isPasswordVisible2}
                autoCapitalize="none"
                textContentType="password"
                right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisibility2(!isPasswordVisible2)} />}
                maxLength={16}
            />

            <Button
                mode="outlined"
                contentStyle={{ height: 50, alignItems: 'center' }}
                labelStyle={{ fontSize: 15 }}
                onPress={chgPwd}
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
        // flex: 1,
        marginBottom: 10,
        color: 'black',
        backgroundColor: '#f5f5f5',
    },
    error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 5,
    },
    down: {
        marginBottom: 40
    },
});