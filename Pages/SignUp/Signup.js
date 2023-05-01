// 회원가입 화면
import axios from 'axios';
import React, { useRef, useState, Component } from "react";
import Constants from 'expo-constants';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Keyboard } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Signup({ navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [checked, setChecked] = useState(false);
    const pwRef = useRef(null);
    const cpwRef = useRef(null);

    //오류 확인
    const [idError, setIdError] = useState(false);          //아이디
    const [pwError, setPwError] = useState(false);          //비밀번호
    const [cpwError, setCpwError] = useState(false);        //비밀번호 확인
    const [emailError, setEmailError] = useState(false);    //이메일
    const [nickError, setNickError] = useState(false);      //닉네임
    const [birthError, setBirthError] = useState(false);    //생일
    const [genderError, setGenderError] = useState(false);  //성별

    //유효성 검사
    const [regId, setRegId] = useState(false);             //아이디
    const [regPw, setRegPw] = useState(false);             //비밀번호
    const [regEmail, setRegEmail] = useState(false);        //이메일
    const [regNickName, setRegNickName] = useState(false);  //닉네임

    //검사 확인 유/무
    const [checkId, setCheckId] = useState(false);              //아이디 중복검사
    const [checkEmail, setCheckEmail] = useState(false);        //이메일 검사
    const [checkEmailNum, setCheckEmailNum] = useState(false);  //이메일 인증번호 검사
    const [checkNickName, setCheckNickName] = useState(false);  //닉네임 중복검사

    //오류 메세지
    const [mIdError, setMIdError] = useState("");           //아이디 오류 메세지
    const [mPwError, setMPwError] = useState("");           //비번 오류 메세지
    const [mCpwError, setMCpwError] = useState("");         //비번확인 오류 메세지
    const [mEmailError, setMEmailError] = useState("");     //이메일 오류 메세지
    const [mEmailNumError, setMEmailNumError] = useState(false); //이메일 인증 번호 오류 메세지
    const [mNickError, setMNickError] = useState("");       //닉네임 오류 메세지
    const [mBirthError, setMBirthError] = useState("");     //생년월일 오류 메세지

    //유효성 검사
    const handleInputId = () => {
        const regExp1 = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,16}$/;
        if (id === '') {
            setCheckId(false);
            setMIdError('아이디를 입력해 주세요');
            return;
        }
        if (regExp1.test(id)) {
            setRegId(true);
            idDupCheck(id);
        } else {
            setRegId(false);
            setIdError(true);
            setMIdError('아이디 형식에 맞춰 입력해 주세요');
        }
    }
    const handleInputPw = () => {
        const regExp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*?.])[a-zA-Z\d!~!@#$%^&*?.]{8,16}$/
        if (pw === "") {
            setRegPw(false);
            setPwError(true);
            setMPwError('비밀번호를 입력해 주세요');
        }
        if (regExp2.test(pw)) {
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
        if (cpw === "") {
            setCpwError(false);
            setMCpwError('확인 비밀번호를 입력해 주세요');
        }
        if (pw == cpw) {
            setCpwError(true);
            setMCpwError('');
        } else {
            setCpwError(false);
            setMCpwError('비밀번호가 일치하지 않습니다');
        }
    }
    const handleInputEmail = () => {
        const regExp3 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        if (regExp3.test(email)) {
            setRegEmail(false);
            setEmailError(true);
            setMEmailError('');
            emailCheck(email);
        } else {
            setRegEmail(true);
            setEmailError(false);
            setMEmailError('이메일 형식에 맞춰 입력해 주세요');
            return;
        }
    }
    const handleInputNickName = () => {
        const regExp4 = /^[a-zA-Z0-9가-힣]{2,12}$/
        if (regExp4.test(nickname)) {
            setRegNickName(false);
            setNickError(true);
            setMEmailError('');
            nickDupCheck(nickname);
        } else {
            setRegNickName(true)
            setNickError(false);
            nickDupCheck(nickname);
            setMEmailError('닉네임 형식에 맞춰 입력해 주세요');
        }
    }
    const handleInputBirth = () => {
        const regExp5 = /^\d{4}\.\d{2}\.\d{2}$/;
        if (regExp5.test(birth)) {
            setMBirthError('')
          } else {
            setMBirthError('생년월일 형식에 맞춰 입력해 주세요')
          }
    }

    // 엑시오스 통신
    const idDupCheck = async () => { // 아이디 중복 검사
        await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/idcheck', {
            uid: id
        })
            .then(res => {
                if (res.data === true) {
                    setCheckId(false);
                    setMIdError('이미 존재하는 아이디 입니다');
                } else {
                    setCheckId(true);
                    setIdError(true);
                    setMIdError('');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    const emailCheck = async () => { //이메일 중복
        await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/emailcheck', {
            email: email
        })
            .then(res => {
                if (res.data === true) {
                    setCheckEmail(false);
                    setMEmailError('이미 존재하는 이메일 입니다.');
                } else {
                    setRegEmail(false);
                    setEmailError(true);
                    setMEmailError('');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    const nickDupCheck = async (e) => { // 닉네임 중복 검사
        if (nickname === "") {
            setRegNickName(true)
            setNickError(false);
            setMEmailError('닉네임을 입력해 주세요');
            return;
        }
        await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/nicknamecheck', {
            nickname: nickname
        })
            .then(res => {
                if (res.data === true) {
                    setCheckNickName(false);
                    setMNickError('이미 존재하는 닉네임 입니다');
                } else {
                    setCheckNickName(true);
                    setNickError(true);
                    setMNickError('');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    //서버에 값 송신
    const handleSubmit = async () => {
        try {
            console.log("id : ", id);
            console.log("pw : ", pw);
            console.log("emial : ", email);
            console.log("nickname : ", nickname);
            console.log("birth : ", birth);
            console.log("gender : ", gender);
            await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/register', {
                uid: id,
                upw: pw,
                email: email,
                nickname: nickname,
                birth: birth,
                gender: gender
            })
            if (res.data === true) {
                // 회원가입 성공 시 실행할 코드
                console.log("됨");
                navigation.navigate("Signin")
            } else {
                // 회원가입 실패 시 실행할 코드
                Alert.alert(
                    '제목',
                    '메시지',
                    [
                      {
                        text: '확인',
                        onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                      }
                    ],
                    { cancelable: false }
                  );
            }
        } catch (error) {
            console.log(error);
        }
    }

    //모든 폼이 정상 입력됐는 지 확인
    const onFinish = () => {
        if(idError==false && regId==false && checkId===false){
            Alert.alert(
                '제목 아이디',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if(pwError==false && regPw==false){
            Alert.alert(
                '제목 비번',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if(cpwError==false){
            Alert.alert(
                '제목 비번확인',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if(emailError==false && regEmail==false && checkEmail==false){
            Alert.alert(
                '제목 email',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if(nickError==false && regNickName==false && checkNickName==false){
            Alert.alert(
                '제목 nickname',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if(birthError==false){
            Alert.alert(
                '제목 birth',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else if (gender === '') {
            Alert.alert(
                '제목 gender',
                '메시지',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('확인 버튼이 눌렸습니다.'),
                  },
                ],
                { cancelable: false }
              );
            return;
        } else {
            handleSubmit(e);
        }
    }

    return (
        <SafeAreaView style={styles.box} keyboardShouldPersistTaps="handled">
            <Text> Panacea</Text>
            <Text style={styles.text}>계정 만들기</Text>
            <Text>아이디</Text>
            <TextInput
                style={styles.input}
                placeholder=" 영문 소문자/숫자, 6~14자"
                onChangeText={setId}
                onEndEditing={handleInputId}
                maxLength={14}
            />
            <Text style={styles.error}>{mIdError}</Text>
            <Text>비밀번호</Text>
            <TextInput
                ref={pwRef}
                style={styles.input}
                placeholder=" 영문 대소문자/숫자/특수문자, 8자~16자"
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
                placeholder=" 비밀번호 확인"
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
                placeholder=" 영문 소문자/한글/숫자, 2~12자"
                onChangeText={setNickname}
                onEndEditing={handleInputNickName}
                maxLength={12}
            />
            <Text style={[styles.error]}>{mNickError}</Text>
            <Text>생년월일</Text>
            <TextInput 
                style={[styles.input]}
                placeholder=" YYYY-MM-DD 형식으로 작성해 주세요"
                onChangeText={setBirth}
                onEndEditing={handleInputBirth}
                maxLength={10}
            />
            <Text style={[styles.error]}>{mBirthError}</Text>
            <View style={[styles.row]}>
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
        marginBottom: 40,
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});