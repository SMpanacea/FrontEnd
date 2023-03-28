// 회원가입 화면
import axios from 'axios';
import React, { useRef, useState } from "react";
import Constants from 'expo-constants';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
//**todo : 달력 모듈 오류 해결
// import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SignUp() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    cosnt [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [checked, setChecked] = useState('남성');

    //캘린더 모듈
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => { setDatePickerVisibility(true); };
    const hideDatePicker = () => { setDatePickerVisibility(false); };
    const handleConfirm = (date) => {
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = `0${selectedDate.getMonth() + 1}`.slice(-2);
        const day = `0${selectedDate.getDate()}`.slice(-2);
        const dateString = `${year}.${month}.${day}`;
        setBirth(dateString);
        setDatePickerVisibility(false); // 캘린더 닫아줌
    }

    return (
        <SafeAreaView style={styles.box}>
            <Text> Panacea</Text>
            <Text style={styles.text}>계정 만들기</Text>

            <Text>아이디</Text>
            <TextInput
                style={styles.input}
                placeholder="영문 소문자/숫자, 6~14자"
                onChange={setId}
                onEndEditing={handleInputId}
                maxLength={14}
            />
            <Text>비밀번호</Text>
            <TextInput
                ref={pwRef}
                style={styles.input}
                placeholder="영문 대소문자/숫자/특수문자, 8자~16자"
                onChange={setPw}
                onEndEditing={handleInputPw}
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="password"
                maxLength={16}
            />
            <TextInput
                ref={cpwRef}
                style={styles.input}
                placeholder="비밀번호 확인"
                onChangeText={setCpw}
                onEndEditing={handleInputCpw}
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="password"
                maxLength={16}
            />
            <Text>이메일</Text>
            <View style={[styles.row]}>
            <TextInput
                style={[styles.input, styles.dateInput]}
                onChange={setNickname}
                onEndEditing={handleInputNickName}
                maxLength={12}
            />
            <Button title="인증" />
            </View>
            <Text>닉네임</Text>
            <TextInput
                style={styles.input}
                placeholder="영문 소문자/한글/숫자, 2~12자"
                onChange={setNickname}
                onEndEditing={handleInputNickName}
                maxLength={12}
            />
            <Text>생년월일</Text>
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.dateInput]}
                    value={birth}
                    editable={false}
                />
                <Button style={styles.button} title="Click" onPress={showDatePicker} />
            </View>
            {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}
            <View style={[styles.row, styles.button]}>
                <Text>성별</Text>
                <RadioButton
                    value="남성"
                    status={checked === '남성' ? 'checked' : 'unchecked'}
                    onPress={() => { { setChecked('남성'); setGender('남성'); } }}
                />
                <Text>남자</Text>
                <RadioButton
                    value="여성"
                    status={checked === '여성' ? 'checked' : 'unchecked'}
                    onPress={() => { { setChecked('여성'); setGender('여성'); } }}
                />
                <Text>여자</Text>
            </View>
            <Button
                // style={styles.button}
                title="회원가입"
                onPress={() => { onFinish() }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
        color: 'black'
    },
    button: {
        marginBottom: 30
    },
});