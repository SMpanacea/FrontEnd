// 앱 들어가면 제일 먼저 보이는 화면
import axios from 'axios';
import React, { useState, useEffect, useRef, } from 'react';
import { Image, StyleSheet, View, ImageBackground, TouchableOpacity, InteractionManager, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MainButtonStyle } from '../css/MainButtonCSS'
// import pillDetectionMain from '../PillDetection/PillDetectionMain';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
export default function Main({ navigation }) {

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

            <TouchableOpacity ref={screanReaderFocus} style={[MainButtonStyle.button, MainButtonStyle.down, styles.button]} onPress={() => navigation.navigate('CameraSearchMain')}>
                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>알약 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}></Text>
                </View>
                <LottieView
                    source={require('../../assets/pills.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.mainSerachImage}
                    autoPlay loop
                />
            </TouchableOpacity>

            <TouchableOpacity style={[MainButtonStyle.button, MainButtonStyle.down, styles.button]} onPress={() => navigation.navigate('BarcodeMain')}>
                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>바코드 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}></Text>
                </View>
                <LottieView
                    source={require('../../assets/Barcode Scan.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.mainSerachImage}
                    autoPlay loop
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 10,
    }
});