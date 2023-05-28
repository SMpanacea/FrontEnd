// 회원정보 수정 화면
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import {
    KeyboardAvoidingView, ScrollView, StyleSheet, View, TouchableOpacity, Image, Alert,
    InteractionManager, findNodeHandle, AccessibilityInfo
} from 'react-native';
import { Text, TextInput, Button, DefaultTheme, RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker'; //이미지 등록
// import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

export default function MemberInfoEdit({ navigation, route }) {
    const { userData } = route.params;

    const [img, setImg] = useState(userData.img);
    const [email, setEmail] = useState(userData.email);
    const [nickname, setNickname] = useState(userData.nickname);
    const [birth, setBirth] = useState(userData.birth);
    const [gender, setGender] = useState(userData.gender);

    const [checked, setChecked] = useState(gender);  //라디오버튼 체크 여부

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

    const handleImagePicker = () => {
        Alert.alert(
            '',
            '이미지 등록하기',
            [
                {
                    text: '앨범에서 선택',
                    onPress: () => handleLibraryPicker(),
                },
                {
                    text: '닫기',
                    style: 'cancel',
                },
            ],
            {
                cancelable: false,
                contentContainerStyle: { justifyContent: 'space-between' },
            }
        );
    };
    const handleLibraryPicker = () => {     //갤러리로 사진 선택
        const options = {
            title: 'Select Profile Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo', // 이미지 타입 제한
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                // 이미지 선택 취소
                console.log('User cancelled image picker');
            } else if (response.error) {
                // 이미지 선택 오류
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log("data : ", response);
                // 이미지 선택 완료
                const url = response.assets[0].uri;
                console.log("url : ", url);
                if (response.assets[0].uri) {
                    //   const source = { uri: response.assets[0].uri };
                    //   setImg(source);
                    try {
                        // const resizedImage = await resizeImage(url, 500, 500); // 이미지 리사이징 수행
                        const base64Image = await readAndEncodeFile(url);
                        handleSubmit(base64Image);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    };
    //   const resizeImage = async (url, maxWidth, maxHeight) => {  //이미지 리사이징
    //     try {
    //       const resizedImage = await ImageResizer.createResizedImage(
    //         url,
    //         maxWidth,
    //         maxHeight,
    //         'JPEG',
    //         80
    //       );
    //       console.log('Resized image URI:', resizedImage.uri);
    //       console.log('Resized image width:', resizedImage.width);
    //       console.log('Resized image height:', resizedImage.height);
    //       return resizedImage.uri;
    //     } catch (error) {
    //       throw new Error('Failed to resize image: ' + error.message);
    //     }
    //   };

    const readAndEncodeFile = async (addr) => {
        try {
            const fileContent = await fs.readFile(addr, 'base64');
            return fileContent;
        } catch (error) {
            throw new Error('Failed to read and encode file: ' + error.message);
        }
    };

    //서버에 이미지 송신
    const handleSubmit = async (base64Image) => {
        try {
            const res = await axios.post(`${IP}/user/update`, {
                uid: id,
                image: base64Image
            });
            const response = res.data;
            console.log("userinfo response : ", response);
            console.log("userinfo response : ", response.profile);
            console.log("userinfo response type : ", typeof (response));
            if (response == false) {
                Alert.alert(
                    '',
                    '사진 변경을 실패하였습니다',
                    [
                        {
                            text: '확인',
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                setImg(response.profile);
            }
        } catch (error) {
            // 에러 처리
            console.log("user/update error : ", error);
        }
    };
    const handleSubmit2 = async () => {
        if (email === '' || nickname === '' || birth === '') {
            Alert.alert(
                '',
                '값을 모두 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
            return;
        }

        try {
            const res = await axios.post(`${IP}/user/update`, {
                uid: id,
                email: email,
                nickname: nickname,
                birth: birth,
                gender: gender,
            })
            console.log("res.data : ", res.data);
            if (res.data == false) {
                // 유저 수정 실패 시 실행할 코드
                Alert.alert(
                    '회원 정보 수정에 실패하였습니다',
                    '다시 시도해 주세요',
                    [
                        {
                            text: '확인',
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                //유저 수정 성공 시 실행할 코드
                Alert.alert(
                    '',
                    '변경되었습니다',
                    [
                        {
                            text: '확인',
                            onPress: () => {
                                navigation.navigate("MyPage", {
                                    data: {
                                        id,
                                        email,
                                        nickname,
                                        birth,
                                        gender,
                                        img
                                    }
                                });
                            }
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                    
                    <TouchableOpacity onPress={handleImagePicker}
                        ref={screanReaderFocus} accessibilityLabel="프로필 사진 수정">
                        <View style={styles.profileContainer}>
                            <Image style={styles.profileImage} source={{ uri: img }} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.label}>아이디</Text>
                            <Text style={styles.content}>{userData.id}</Text>
                        </View>

                        <View style={styles.userInfoItem}>
                            <Text style={styles.label}>이메일</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                maxLength={40}
                                onChangeText={setEmail}
                            // onEndEditing={handleEmailChange}
                            />
                        </View>

                        <View style={styles.userInfoItem}>
                            <Text style={styles.label}>닉네임</Text>
                            <TextInput
                                style={styles.input}
                                value={nickname}
                                onChangeText={setNickname}
                                // onEndEditing={handleNicknameChange}
                                maxLength={12}
                            />
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.label}>생년월일</Text>
                            <TextInput
                                style={styles.input}
                                value={birth}
                                onChangeText={setBirth}
                                // onEndEditing={handleBirthChange}
                                keyboardType='numeric'
                                maxLength={10}
                            />
                        </View>

                        <View style={styles.userInfoItem}>
                            <Text style={styles.label2}>성별</Text>
                            <RadioButton
                                theme={customTheme}
                                value="남성"
                                status={checked === '남성' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('남성');
                                    setGender('남성');
                                }}
                            />
                            <Text style={{ fontSize: 18, marginRight: 50 }}>남자</Text>
                            <RadioButton
                                theme={customTheme}
                                value="여성"
                                status={checked === '여성' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('여성');
                                    setGender('여성');
                                }}
                            />
                            <Text style={{ fontSize: 18 }}>여자</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Button
                            accessibilityLabel='수정 완료하기'
                            mode="outlined"
                            style={{ marginRight: 30 }}
                            contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                            labelStyle={{ fontSize: 19, color: '#51868C' }}
                            theme={customTheme}
                            onPress={() => { navigation.navigate("ResetPw", { id }); }}>비밀번호 변경</Button>

                        <Button
                            accessibilityLabel='수정 완료하기'
                            mode="outlined"
                            contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                            labelStyle={{ fontSize: 19, color: '#51868C' }}
                            theme={customTheme}
                            onPress={handleSubmit2}>완료</Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomColor: '#ECECEC',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    profileInfo: {
        alignItems: 'center',
    },
    id: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30,
    },
    userInfoContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 10
    },
    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    input: {
        fontSize: 18,
        width: 270,
        backgroundColor: 'transparent'
    },
    label: {
        flex: 1,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginLeft: 5
    },
    label2: {
        // flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginLeft: 5,
        marginRight: 75
    },
    content: {
        flex: 3,
        fontSize: 18,
        color: '#4A4A4A',
        marginLeft: 25
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
});