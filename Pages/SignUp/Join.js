// 회원가입 화면
import axios from 'axios';
import React, { useRef, useState, Component } from "react";
import { KeyboardAvoidingView, ScrollView, View, Text, SafeAreaView, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { RadioButton, TextInput, Button, DefaultTheme, TouchableRipple } from 'react-native-paper';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

export default function Join({ navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [email, setEmail] = useState('');
    const [emailNum, setEmailNum] = useState('');
    const [cemailNum, setCEmailNum] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [checked, setChecked] = useState(false);
    const pwRef = useRef(null);
    const cpwRef = useRef(null);

    //비밀번호 확인 변수
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isPasswordVisible2, setPasswordVisibility2] = useState(false);
    //이메일 인증번호 확인 변수
    const [isShown, setIsShown] = useState(false);

    //오류 확인
    const [idError, setIdError] = useState(false);          //아이디
    const [pwError, setPwError] = useState(false);          //비밀번호
    const [cpwError, setCpwError] = useState(false);        //비밀번호 확인
    const [emailError, setEmailError] = useState(false);    //이메일
    const [emailNumError, setEmailNumError] = useState(false);//이메일 인증번호
    const [nickError, setNickError] = useState(false);      //닉네임
    const [birthError, setBirthError] = useState(false);    //생일

    //유효성 검사
    const [regId, setRegId] = useState(false);              //아이디
    const [regPw, setRegPw] = useState(false);              //비밀번호
    const [regEmail, setRegEmail] = useState(false);        //이메일
    const [regNickName, setRegNickName] = useState(false);  //닉네임
    const [regBirth, setRegBirth] = useState(false);        //생년월일

    //오류 메세지
    const [mIdError, setMIdError] = useState("");           //아이디 오류 메세지
    const [mPwError, setMPwError] = useState("");           //비번 오류 메세지
    const [mCpwError, setMCpwError] = useState("");         //비번확인 오류 메세지
    const [mEmailError, setMEmailError] = useState("");     //이메일 오류 메세지
    const [mEmailNumError, setMEmailNumError] = useState(false); //이메일 인증 번호 오류 메세지
    const [mNickError, setMNickError] = useState("");       //닉네임 오류 메세지
    const [mBirthError, setMBirthError] = useState("");     //생년월일 오류 메세지

    const customTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#51868C',
        },
      };

      React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableRipple onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
                    <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
                </TouchableRipple>
            ),
            headerTitle: "회원가입",
            headerStyle: {
                elevation: 10, // 안드로이드 그림자 효과
                shadowOpacity: 0.5, // iOS 그림자 효과
                shadowColor: 'black', // 그림자 색상 설정
                shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
                shadowRadius: 4, // 그림자 반경 설정
            },
        });
    }, [])

    //유효성 검사
    const handleInputId = () => {
        const regExp1 = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,16}$/;
        if (id === '') {
            setIdError(false);
            setMIdError('아이디를 입력해 주세요');
            return;
        }
        if (regExp1.test(id)) {
            setRegId(true);
            setIdError(true);
            idDupCheck(id);
        } else {
            setRegId(false);
            setIdError(false);
            setMIdError('아이디 형식에 맞춰 입력해 주세요');
        }
    }
    const handleInputPw = () => {
        const regExp2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*?.])[a-zA-Z\d!~!@#$%^&*?.]{8,16}$/
        if (pw === "") {
            setPwError(false);
            setMPwError('비밀번호를 입력해 주세요');
            return;
        }
        if (regExp2.test(pw)) {
            setRegPw(true);
            setPwError(true);
            setMPwError('');
        } else {
            setRegPw(false);
            setPwError(false);
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
        if (email === "") {
            setEmailError(false);
            setMEmailError('이메일을 입력해 주세요');
            return;
        }
        if (regExp3.test(email)) {
            setRegEmail(true);
            setEmailError(true);
            setMEmailError('');
        } else {
            setRegEmail(false);
            setEmailError(false);
            setMEmailError('이메일 형식에 맞춰 입력해 주세요');
            return;
        }
    }
    const handleInputEmailNum = () => {
        if (emailNum === "") {
            setEmailNumError(false);
            setMEmailNumError('인증번호를 입력해 주세요');
            return;
        } else {
            setMEmailNumError('');
        }
    }
    const handleCheckEmailNum = () => {
        console.log("emailNum : ", emailNum);
        console.log("cemailNum : ", cemailNum);
        if (emailNum === cemailNum) {
            setIsShown(false);
            setEmailNumError(true);
            Alert.alert(
                '',
                '확인되었습니다',
                [
                    { text: '확인' }
                ]
            )
        } else {
            setIsShown(true);
            setEmailNumError(false);
            Alert.alert(
                '',
                '다시 입력해 주세요',
                [
                    { text: '확인' }
                ]
            )
        }
    }
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
    const handleInputBirth = () => {
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

    // 엑시오스 통신
    const idDupCheck = async () => { // 아이디 중복 검사
        await axios.post(`${IP}/user/idcheck`, {
            uid: id
        })
            .then(res => {
                if (res.data === false) {
                    setIdError(false);
                    setMIdError('이미 존재하는 아이디 입니다');
                } else {
                    setIdError(true);
                    setMIdError('');
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    const emailCheck = async () => { //이메일 중복
        if (regEmail === true) {
            await axios.post(`${IP}/user/emailcheck`, {
                email: email
            })
                .then(res => {
                    if (res.data === false) {
                        setEmailError(false);
                        setMEmailError('이미 존재하는 이메일 입니다.');
                    } else {
                        setEmailError(true);
                        setMEmailError('');
                        emailNumCheck();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        } else {
            Alert.alert(
                '',
                '이메일 유효성 검사에 맞게 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        }
    }
    const emailNumCheck = async () => { // 이메일 인증
        setIsShown(true);
        await axios.post(`${IP}/user/sendemail`, {
            email: email
        })
            .then(res => {
                const parsedEmailNum = res.data; // 숫자를 문자열로 변환
                const num = parsedEmailNum.toString();
                setCEmailNum(num);
            })
            .catch(function (err) {
                console.log(err);
            });
    };
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

    //서버에 값 송신
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${IP}/user/register`, {
                uid: id,
                upw: pw,
                email: email,
                nickname: nickname,
                birth: birth,
                gender: gender
            })
            console.log("res.data : ", res.data);
            if (res.data === false) {
                // 회원가입 실패 시 실행할 코드
                console.log("안됨");
                Alert.alert(
                    '회원가입에 실패하였습니다',
                    '다시 시도해 주세요',
                    [{ text: "확인" }],
                    { cancelable: false }
                );
            } else {
                // 회원가입 성공 시 실행할 코드
                Alert.alert(
                    '',
                    '회원가입 성공하였습니다',
                    [
                        {
                            text: '확인',
                            onPress: ()=>{ navigation.navigate("bottom") }
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
        if(id===''||pw===''||email===''||nickname===''||gender===''||birth==='') {
            Alert.alert(
                '',
                '값을 모두 입력해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        }
        if (idError == false || regId == false) {
            Alert.alert(
                '',
                '아이디를 확인해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (pwError == false || regPw == false) {
            Alert.alert(
                '',
                '비밀번호를 확인해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (cpwError == false) {
            Alert.alert(
                '',
                '비밀번호가 일치하지 않습니다',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (emailError == false || regEmail == false) {
            Alert.alert(
                '',
                '이메일을 확인해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (emailNumError == false) {
            Alert.alert(
                '',
                '이메일 인증을 완료해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (nickError == false || regNickName == false) {
            Alert.alert(
                '',
                '닉네임을 확인해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (birthError == false) {
            Alert.alert(
                '',
                '생년월일을 확인해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else if (gender === '') {
            Alert.alert(
                '',
                '성별을 선택해 주세요',
                [{ text: "확인" }],
                { cancelable: false }
            );
            return;
        } else {
            handleSubmit();
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                    <View style={styles.box}>
                        <Text style={styles.text}>계정 만들기</Text>
                        <TextInput
                            accessibilityLabel="아이디"
                            accessibilityHint="아이디는 영문 소문자 또는 숫자로 이루어진 6~14자를 입력하세요."        
                            label={"아이디"}
                            style={styles.input}
                            theme={customTheme}
                            placeholder="영문 소문자/숫자, 6~14자"
                            onChangeText={setId}
                            onEndEditing={handleInputId}
                            maxLength={14}
                        />
                        <Text style={styles.error}>{mIdError}</Text>
                        <TextInput
                            accessibilityLabel="비밀번호"
                            accessibilityHint="비밀번호는 영문 대소문자와 숫자, 특수문자로 이루어진 8자에서 16자를 입력하세요."             
                            label={"비밀번호"}
                            style={styles.input}
                            theme={customTheme}
                            ref={pwRef}
                            placeholder="영문 대소문자/숫자/특수문자, 8자~16자"
                            onChangeText={setPw}
                            onEndEditing={handleInputPw}
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                            textContentType="password"
                            right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisibility(!isPasswordVisible)} />}
                            maxLength={16}
                        />
                        <Text style={styles.error}>{mPwError}</Text>
                        <TextInput
                            accessibilityLabel="비밀번호 확인"
                            ref={cpwRef}
                            style={styles.input}
                            theme={customTheme}
                            placeholder="비밀번호 확인"
                            onChangeText={setCpw}
                            onEndEditing={handleInputCpw}
                            secureTextEntry={!isPasswordVisible2}
                            autoCapitalize="none"
                            textContentType="password"
                            right={<TextInput.Icon icon="eye" onPress={() => setPasswordVisibility2(!isPasswordVisible2)} />}
                            maxLength={16}
                        />
                        <Text style={styles.error}>{mCpwError}</Text>
                        <View style={[styles.row]}>
                            <TextInput
                                accessibilityLabel="이메일"
                                label={"이메일"}
                                style={[styles.dateInput, styles.input]}
                                theme={customTheme}
                                onChangeText={setEmail}
                                onEndEditing={handleInputEmail}
                                maxLength={40}
                            />
                            <Button
                                mode="outlined"
                                contentStyle={{ height: 50, alignItems: 'center' }}
                                labelStyle={{ fontSize: 15 }}
                                theme={customTheme}
                                onPress={emailCheck}
                            >인증</Button>
                        </View>
                        <Text style={styles.error}>{mEmailError}</Text>

                        {isShown && (
                            <View>
                                <View style={[styles.row]}>
                                    <TextInput
                                        accessibilityLabel="이메일 인증번호"
                                        accessibilityHint="이메일 인증번호는 숫자 6자리를 입력하세요." 
                                        label={"이메일 인증번호"}
                                        style={[styles.dateInput, styles.input]}
                                        theme={customTheme}
                                        onChangeText={setEmailNum}
                                        onEndEditing={handleInputEmailNum}
                                        keyboardType="numeric"
                                        maxLength={6}
                                    />
                                    <Button
                                        mode="outlined"
                                        contentStyle={{ height: 50, alignItems: 'center' }}
                                        labelStyle={{ fontSize: 15 }}
                                        theme={customTheme}
                                        onPress={handleCheckEmailNum}
                                    >확인</Button>
                                </View>
                                <Text style={styles.error}>{mEmailNumError}</Text>
                            </View>
                        )}
                        <TextInput
                            accessibilityLabel="닉네임"
                            accessibilityHint="닉네임은 영어 소문자 혹은 한글 혹은 숫자를 2~12자를 입력하세요." 
                            label={"닉네임"}
                            style={styles.input}
                            theme={customTheme}
                            placeholder="영문 소문자/한글/숫자, 2~12자"
                            onChangeText={setNickname}
                            onEndEditing={handleInputNickName}
                            maxLength={12}
                        />
                        <Text style={[styles.error]}>{mNickError}</Text>
                        <TextInput
                            accessibilityLabel="생년월일"
                            accessibilityHint="생년월일 8자를 입력하되 -으로 구분해 주세요." 
                            label={"생년월일"}
                            style={styles.input}
                            theme={customTheme}
                            placeholder="예시) 1990-01-01"
                            onChangeText={setBirth}
                            onEndEditing={handleInputBirth}
                            keyboardType='numeric'
                            maxLength={10}
                        />
                        <Text style={[styles.error]}>{mBirthError}</Text>
                        <View style={[styles.row, styles.down]}>
                            <Text style={{ fontSize: 16, marginLeft: 20, marginRight: 40 }}>성별</Text>
                            <RadioButton
                                value="남성"
                                theme={customTheme}
                                status={checked === '남성' ? 'checked' : 'unchecked'}
                                onPress={() => { { setChecked('남성'); setGender('남성'); } }}
                            />
                            <Text style={{ fontSize: 16, marginRight: 40 }}>남자</Text>
                            <RadioButton
                                value="여성"
                                theme={customTheme}
                                status={checked === '여성' ? 'checked' : 'unchecked'}
                                onPress={() => { { setChecked('여성'); setGender('여성'); } }}
                            />
                            <Text style={{ fontSize: 16 }}>여자</Text>
                        </View>
                        <Button
                            mode="outlined"
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                            onPress={onFinish}
                            theme={customTheme}
                        >확인</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    dateInput: {
        flex: 1,
        marginRight: 10,
        color: 'black'
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
    },
    error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 5,
    },
    buttonContent: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 15,
    },
    down: {
        marginBottom: 15
    }
});