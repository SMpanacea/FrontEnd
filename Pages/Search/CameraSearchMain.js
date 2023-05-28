// main에서 알약 검색 누르면 보이는 화면
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, ImageBackground, TouchableOpacity, InteractionManager, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MainButtonStyle } from '../css/MainButtonCSS'
import LottieView from 'lottie-react-native';
import {
    ImageUtil
} from 'react-native-pytorch-core';
import ImagePicker from 'react-native-image-crop-picker';
import ServerPort from '../../Components/ServerPort';
import { useFocusEffect } from '@react-navigation/native';
export default function CameraSearchMain({ navigation }) {
    const IP = ServerPort();
    // const screanReaderFocus = useRef(null);
    const decodeFromAlbum = async () => {
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true
        }).then(async (images) => {
            console.log("images[0]", images[0].data);
            console.log("images[1]", images[1].data);
            const frontValue = { front: images[0].data, back: images[1].data };
            fetch(`${IP}/medicine/image`, {  // 여기에 보내고a자 하는 URL을 넣습니다.
                method: 'POST',                   // 메서드를 'POST'로 설정합니다.
                headers: {
                    'Content-Type': 'application/json',  // JSON 형태로 데이터를 보낼 것이기 때문에 'Content-Type'을 'application/json'으로 설정합니다.
                },
                body: JSON.stringify(frontValue),
            })
                .then((response) => {
                    return response.json();  // Promise 반환
                })  // 서버에서 돌아온 응답을 JSON 형태로 파싱합니다.
                .then((json) => {
                    navigation.navigate('Main', { json: json })
                    console.log(json)
                })  // 파싱된 결과를 콘솔에 출력합니다.
                .catch((error) => console.error(error));  // 에러가 발생하면 콘솔에 에러를 출력합니다.
        });
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
                    <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            headerTitle: "알약 검색",
            headerStyle: {
                elevation: 10, // 안드로이드 그림자 효과
                shadowOpacity: 0.5, // iOS 그림자 효과
                shadowColor: 'black', // 그림자 색상 설정
                shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
                shadowRadius: 4, // 그림자 반경 설정
              },
        });
    }, [])
    const screanReaderFocus = useRef(null);

    useFocusEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                console.log("findNodeHandle")
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        })
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>

            <TouchableOpacity ref={screanReaderFocus} style={[MainButtonStyle.buttonThree, MainButtonStyle.down]} onPress={() => navigation.navigate('PillDetectionMain')}>
                {/* <ImageBackground
                    source={require('../../assets/animation_640_lhwuc4ir.gif')}
                    style={[styles.imageBackground,StyleSheet.absoluteFill]}
                > */}
                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>카메라로 촬영하여 알약 검색하기 &gt; </Text>
                    <Text style={MainButtonStyle.subText}>카메라를 알약을 촬영하여 검색</Text>
                </View>
                {/* <Image
                    source={require('../../assets/animation_640_lhwuujpi.gif')}
                    style={MainButtonStyle.image}
                /> */}
                <LottieView
                    source={require('../../assets/68430-camera.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.CameraSerachMainButton}
                    autoPlay loop
                />
            </TouchableOpacity>
            <TouchableOpacity style={[MainButtonStyle.buttonThree, MainButtonStyle.down]} onPress={() => decodeFromAlbum()}>

                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>사진으로 알약 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}>갤러리에서 사진 선택</Text>
                </View>
                <LottieView
                    source={require('../../assets/album_icon.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.CameraSerachMainButton_album}
                    autoPlay loop
                />
            </TouchableOpacity>
            <TouchableOpacity style={[MainButtonStyle.buttonThree, MainButtonStyle.down]} onPress={() => navigation.navigate('TextSearch')}>

                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>이름으로 알약 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}>의약품이름으로 검색</Text>
                </View>
                <LottieView
                    source={require('../../assets/77218-search-imm.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.CameraSerachMainButton}
                    autoPlay loop
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 3,
    }
});