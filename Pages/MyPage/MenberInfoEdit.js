// 회원정보 확인 화면
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, TextInput, Button, Title, RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker'; //이미지 등록
// import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';

export default function MemberInfoEdit({ navigation, route }) {
    const { userData } = route.params;
    
    const [img, setImg] = useState(userData.img);
    const [id, setId] = useState(userData.id);
    const [email, setEmail] = useState(userData.email);
    const [nickname, setNickname] = useState(userData.nickname);
    const [birth, setBirth] = useState(userData.birth);
    const [gender, setGender] = useState(userData.gender);

    const [checked, setChecked] = useState(gender);  //라디오버튼 체크 여부

    const handleEmailChange = (text) => {
        const regExp3 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        if (regExp3.test(text)) {
            emailCheck(text);
        } else {
            Alert.alert(
                '',
                '이메일 형식에 맞춰 입력해 주세요',
                [
                    {
                        text: '확인',
                    },
                ],
                { cancelable: false }
            );
        }
    }
    const emailCheck = async (text) => { //이메일 중복
        if (regEmail === true) {
            await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/emailcheck', {
                email: text
            })
                .then(res => {
                    if (res.data === false) {
                        Alert.alert(
                            '',
                            '이미 존재하는 이메일 입니다',
                            [
                                {
                                    text: '확인',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        setEmail(text);
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
    const handleNicknameChange = (text) => {
        const regExp4 = /^[a-zA-Z0-9가-힣]{2,12}$/
        if (regExp4.test(text)) {
            nickDupCheck(text);
        } else {
            Alert.alert(
                '',
                '닉네임 형식에 맞춰 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
            return;
        }
    }
    const nickDupCheck = async (text) => { // 닉네임 중복 검사
        await axios.post('https://port-0-flask-test-p8xrq2mlfullttm.sel3.cloudtype.app/user/nicknamecheck', {
            nickname: text
        })
            .then(res => {
                if (res.data === false) {
                    Alert.alert(
                        '',
                        '이미 존재하는 닉네임 입니다',
                        [
                            {
                                text: '확인',
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    setNickname(text);
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    const handleBirthChange = (text) => {
        const regExp5 = /^(19\d{2}|200[0-9])-(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-9]|3[0-1])$/;
        if (regExp5.test(text)) {
            setBirth(text);
        } else {
            Alert.alert(
                '',
                '생년월일 형식에 맞춰 입력해 주세요',
                [
                    {
                        text: '확인',
                    }
                ],
                { cancelable: false }
            );
        }
    }

    // const regImg = () => {
    //     Alert.alert(
    //         '',
    //         '이미지 등록하기',
    //         [
    //             {
    //                 text: '카메라로 찍기',
    //                 onPress: () => handleCameraPicker(),
    //             },
    //             {
    //                 text: '앨범에서 선택',
    //                 onPress: () => handleLibraryPicker(),
    //             },
    //             {
    //                 text: '닫기',
    //                 style: 'cancel',
    //             },
    //         ],
    //         {
    //             cancelable: false,
    //         }
    //     );
    // }

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
    //   const resizeImage = async (url, maxWidth, maxHeight) => {
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

      //서버에 값 송신
      const handleSubmit = async (base64Image) => {
        try {
          const res = await axios.post('http://172.16.36.15:5000/user/update', {
                uid : id,
                image: base64Image
          });
          console.log("userinfo res.data : ", res.data);
          if(res.data) {
            console.log("사진 저장 성공");
          } else {
            Alert.alert(
                '',
                '다시 시도해 주세요',
                [
                    { text: '확인' }
                ]
            )
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
            const res = await axios.post('http://172.16.36.15:5000/user/update', {
                uid : id,
                email: email,
                nickname: nickname,
                birth: birth,
                gender:gender,
            })
            console.log("res.data : ", res.data);
            if (res.data) {
                // 회원가입 성공 시 실행할 코드
                navigation.navigate("bottom");
            } else {
                // 회원가입 실패 시 실행할 코드
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleImagePicker}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={{ uri: img }} />
                </View>
            </TouchableOpacity>

            <View style={styles.userInfoContainer}>
                <View style={styles.userInfoItem}>
                    <Text style={styles.label}>아이디</Text>
                    <Text style={styles.content}>{id}</Text>
                </View>

                <View style={styles.userInfoItem}>
                    <Text style={styles.label}>이메일</Text>
                    <TextInput
                        style={{ width: 270 }}
                        value={email}
                        maxLength={40}
                        onChangeText={setEmail}
                        onEndEditing={handleEmailChange}
                    />
                </View>

                <View style={styles.userInfoItem}>
                    <Text style={styles.label}>닉네임</Text>
                    <TextInput
                        style={{ width: 270 }}
                        value={nickname}
                        onChangeText={setNickname}
                        onEndEditing={handleNicknameChange}
                        maxLength={12}
                    />
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.label}>생년월일</Text>
                    <TextInput
                        style={{ width: 270 }}
                        value={birth}
                        onChangeText={setBirth}
                        onEndEditing={handleBirthChange}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                </View>

                <View style={styles.userInfoItem}>
                    <Text style={styles.label2}>성별</Text>
                    <RadioButton
                        value="남성"
                        status={checked === '남성' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked('남성');
                            setGender('남성');
                        }}
                    />
                    <Text style={{ fontSize: 18, marginRight: 50 }}>남자</Text>
                    <RadioButton
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
                    mode="contained"
                    style={{ marginRight: 30 }}
                    contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                    labelStyle={{ fontSize: 19 }}
                    onPress={() => { navigation.navigate("ResetPw", {id}); }}>비밀번호 변경</Button>
                <Button
                    mode="contained"
                    contentStyle={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                    labelStyle={{ fontSize: 19 }}
                    onPress={handleSubmit2}
                >완료</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
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
        marginBottom: 40
    },
    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        flex: 1,
        fontSize: 18,
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