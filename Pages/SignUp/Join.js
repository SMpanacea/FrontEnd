// 회원가입 화면
import axios from 'axios';
import React, { useRef, useState } from "react";
import Constants from 'expo-constants';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignUp() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('남성');
    const [checked, setChecked] = useState('');
    const pwRef = useRef(null);
    const cpwRef = useRef(null);

    //오류 확인
    const [idError, setIdError] = useState(false); //아이디 유효성
    const [idCError, setIdCError] = useState(false);//아이디 중복확인
    const [pwError, setPwError] = useState(false);  //비밀번호 유효성
    const [cpwError, setCpwError] = useState(false);//비밀번호 확인
    const [emailError, setEmailError] = useState(false);//이메일
    const [emailNumError, setEmailNumError] = useState(false);//이메일 인증 번호 확인
    const [nickError, setNickError] = useState(false);//닉네임 유효성
    const [nickCError, setNickCError] = useState(false);//닉네임 중복확인

    //유효성 검사
    const [regId, setRegId] = useState(false);      //아이디
    const [regPw, setRegPw] = useState(false);      //비밀번호
    const [regEmail, setRegEmail] = useState(false); //이메일
    const [regNickName, setRegNickName] = useState(false);  //닉네임

    //검사 확인 유/무
    const [checkId, setCheckId] = useState(false); //아이디 중복검사
    const [checkEmail, setCheckEmail] = useState(false); //이메일 검사
    const [checkEmailNum, setCheckEmailNum] = useState(false); //이메일 인증번호 검사
    const [checkNickName, setCheckNickName] = useState(false); //닉네임 검사

    //오류 메세지
    const [mIdError, setMIdError] = useState("");   //아이디 오류 메세지
    const [mPwError, setMPwError] = useState("");   //비번 오류 메세지
    const [mCpwError, setMCpwError] = useState(""); //비번확인 오류 메세지
    const [mEmailError, setMEmailError] = useState(""); //이메일 오류 메세지
    const [mEmailNumError, setMEmailNumError] = useState(false);//이메일 인증 번호 오류 메세지
    const [mNickError, setMNickError] = useState("");   //닉네임 오류 메세지

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
    const handleInputPw = (e) => {
        const regExp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*?.])[a-zA-Z\d!~!@#$%^&*?.]{8,16}$/
        if (regExp2.test(e)) {
            setRegPw(true);
            setPwError(false);
            setMPwError('');
        } else {
            setRegPw(false);
            setPwError(true);
            setMPwError('비밀번호 형식에 맞춰 입력해 주세요');
        }
    }
    const handleInputCpw = () => {
        if (pw == cpw) {
            setCpwError(true);
            setMCpwError('');
        } else {
            setCpwError(false);
            setMCpwError('비밀번호가 일치하지 않습니다');
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
    const handleInputNickName = (e) => {
        const regExp4 = /^[a-zA-Z0-9가-힣]{2,12}$/
        if (regExp4.test(e)) {
            setRegNickName(false);
            setNickError(true);
            setMEmailError('');
        } else {
            setRegNickName(true)
            setNickError(false);
            // nickDupCheck(e);
            setMEmailError('닉네임 형식에 맞춰 입력해 주세요');
        }
    }

    //모든 폼이 정상 입력됐는 지 확인
    const onFinish = (e) => {
        //아이디 유효성 검사
        if (regId === false) {
            setCheckId(false);
            Alert.alert(
                '경고',
                '아이디를 확인해 주세요',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        //비밀번호 유효성 검사
        if (regPw === false) {
            Alert.alert(
                '경고',
                '비밀번호를 확인해 주세요',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        //비밀번호 확인
        if (cpwError === true) {
            Alert.alert(
                '경고',
                '비밀번호가 일치하지 않습니다',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        //이메일 유효성 검사
        if(regEmail === false)
        {
            Alert.alert(
                '경고',
                '이메일을 확인해 주세요',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        //이메일 인증번호 검사
        if(checkEmailNum === false) {
            Alert.alert(
                '경고',
                '이메일 인증을 완료해 주세요',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        //닉네임 유효성 검사
        if (regNickName === false) {
            Alert.alert(
                '경고',
                '닉네임을 확인해 주세요',
                [
                  { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }
                ]
              );
              return;
        }
        // handleSubmit(e);
    }

    //엑시오스 통신
    const handleSubmit = async (e) => {
        try {
            await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/register', {
                    uid: id,
                    upw: pw,
                    email: email,
                    nickname: nickname,
                    birth: "",
                    gender: gender
            })
            console.log("res : ", res);
            if (res.data === true) {
                // 회원가입 성공 시 실행할 코드
                console.log("됨");
            } else {
                // 회원가입 실패 시 실행할 코드
                console.log("안됨");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.box}>
            <Text> Panacea</Text>
            <Text style={styles.text}>계정 만들기</Text>

            <Text>아이디</Text>
            <TextInput
                style={styles.input}
                placeholder="영문 소문자/숫자, 6~14자"
                onChangeText={setId}
                onEndEditing={handleInputId}
                maxLength={14}
            />
            <Text style={styles.error}>{mIdError}</Text>
            <Text>비밀번호</Text>
            <TextInput
                ref={pwRef}
                style={styles.input}
                placeholder="영문 대소문자/숫자/특수문자, 8자~16자"
                onChangeText={setPw}
                onEndEditing={handleInputPw}
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="password"
                maxLength={16}
            />
            <Text style={styles.error}>{mPwError}</Text>
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
            <Text style={styles.error}>{mCpwError}</Text>
            <Text>이메일 주소</Text>
            <View style={[styles.row]}>
                <TextInput
                    style={[styles.input, styles.dateInput]}
                    onChangeText={setEmail}
                    onEndEditing={handleInputEmail}
                    maxLength={40}
                />
                <Button title="인증" />
            </View>
            <Text style={styles.error}>{mEmailError}</Text>
            <Text>닉네임</Text>
            <TextInput
                style={styles.input}
                placeholder="영문 소문자/한글/숫자, 2~12자"
                onChangeText={setNickname}
                onEndEditing={handleInputNickName}
                maxLength={12}
            />
            <Text style={styles.error}>{mNickError}</Text>
            <Text>생년월일</Text>
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.dateInput]}
                    value={birth}
                    editable={false}
                />
                <Button style={styles.button} title="Click" onPress={showDatePicker} />
            </View>
            {/* <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}
            {
                // if
            }
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
            {
                // if(gender === '')
            }
            <Button
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
    error: {
        color: 'red',
    }
});