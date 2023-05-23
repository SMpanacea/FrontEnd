// main에서 알약 검색 누르면 보이는 화면
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, ImageBackground, TouchableOpacity, InteractionManager, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MainButtonStyle } from '../css/MainButtonCSS'
import LottieView from 'lottie-react-native';
export default function CameraSearchMain({ navigation }) {
    const screanReaderFocus = useRef(null);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                console.log("findNodeHandle")
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        })
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => navigation.navigate('PillDetectionMain')}>
                {/* <ImageBackground
                    source={require('../../assets/animation_640_lhwuc4ir.gif')}
                    style={[styles.imageBackground,StyleSheet.absoluteFill]}
                > */}
                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>카메라로 알약 검색하기 &gt; </Text>
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
            <TouchableOpacity ref={screanReaderFocus} style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => navigation.navigate('TextSearch')}>

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

