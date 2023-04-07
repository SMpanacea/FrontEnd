// 비밀번호 찾기 화면
// (아이디, 이메일 입력 후 하나라도 잘못쓰면 오류 메세지) -> (맞으면 인증번호 보냄, 틀리면 메세지) -> (맞으면 비밀번호 재설정, 틀리면 메세지)
import axios from 'axios';
import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default function ReissuanceId() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState(''); // 이메일 인증번호

    //유효성
    const [regId, setRegId] = useState(false);
    const [regEmail, setRegEmail] = useState(false);

    //오류 확인
    const [idError, setIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //오류 메세지
    const [mIdError, setMIdError] = useState("");
    const [mEmailError, setMEmailError] = useState("");

    const [emailNumError, setEmailNumError] = useState(false);//이메일 인증 번호 확인
    const [checkEmailNum, setCheckEmailNum] = useState(false); //이메일 인증번호 검사
    const [emailNum, setEmailNum] = useState("");   //이맬검사 인증번호
    const [mEmailNumError, setMEmailNumError] = useState(false);//이메일 인증 번호 오류 메세지//오류 메세지

    //유효성 검사
    const handleInputId = (e) => {
        const regExp1 = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,16}$/;
        if (regExp1.test(e)) {
            setRegId(true);
            // idDupCheck(e);
            setIdError(false);
            setMIdError('');
        } else {
            console.log(regExp1.test(e));
            setRegId(false);
            setIdError(true);
            setMIdError('아이디 형식에 맞춰 입력해 주세요');
        }
    }
    const handleInputEmail = (e) => {
        const regExp3 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        if (regExp3.test(e)) {
            setRegEmail(false);
            setEmailError(true);
            setMEmailError('');
        } else {
            setRegEmail(true);
            setEmailError(false);
            setMEmailError('이메일 형식에 맞춰 입력해 주세요');
        }
    }

    //**todo : 이메일 인증번호 전송 메서드 + 유효성 검사 후 전송되면 인증번호 입력하는 view단 출력
    //**todo : 인증번호 검증 후 아이디 알려주는 메세지 출력하는 메서드

    return(
        <SafeAreaView style={styles.box}>
            <Text> Panacea</Text>
            <Text style={styles.text}>비밀번호 찾기</Text>

            <Text>아이디</Text>
            <TextInput
                style={styles.input}
                onChange={setId}
                maxLength={14}
            />
            <Text style={styles.error}>{mIdError}</Text>
            <Text>이메일 주소</Text>
            <TextInput
                style={[styles.input]}
                onChange={setEmail}
                onEndEditing={handleInputEmail}
                maxLength={12}
            />
            <Text style={styles.error}>{mEmailError}</Text>
            {
            //**todo : 삼항 연산자로 <View>단 보여줄지 말지 처리.
            }
            <View style={styles.row}>
                <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder={"인증번호"}
                keyboardType="numeric"
                maxLength={6}
                />
                <Button 
                title="인증"
                //onPress ={()=>{ // **맞다/아니다 메세지 표시. 맞을 경우 비밀번호 재설정 페이지 이동}
                />
            </View>
            {
                //**todo : 삼항 연산자로 <Text>단 보여줄지 말지 처리. 엑시오스로 들어오는 ID값 표시 예정
            }
            <Button title="전송" onPress={()=> {handleInputEmail()}}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 61,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        // flex: 1,
        height: 40,
        borderWidth: 1,
    },
    text: {
        fontSize: 28,
        marginTop: 0,
        marginBottom: 70,
        // marginLeft: 12
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
        color: 'black'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    error: {
        color: 'red',
    }
});