// 앱 들어가면 제일 먼저 보이는 화면
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, ImageBackground, TouchableOpacity, InteractionManager, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MainButtonStyle } from '../css/MainButtonCSS'
// import pillDetectionMain from '../PillDetection/PillDetectionMain';
import LottieView from 'lottie-react-native';
export default function Main({ navigation }) {
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
            <TouchableOpacity ref={screanReaderFocus} style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => navigation.navigate('CameraSearchMain')}>

                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>알약 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}></Text>
                </View>
                {/* <Image
                    source={require('../../assets/barcodeImage.gif')}
                    style={MainButtonStyle.image}
                /> */}
                <LottieView
                    source={require('../../assets/pills.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.barcodeImage}
                    autoPlay loop
                />
            </TouchableOpacity>
            <TouchableOpacity ref={screanReaderFocus} style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => navigation.navigate('BarcodeCamera')}>

                <View style={MainButtonStyle.textContainer}>
                    <Text style={MainButtonStyle.text}>바코드 검색 &gt; </Text>
                    <Text style={MainButtonStyle.subText}></Text>
                </View>
                <LottieView
                    source={require('../../assets/Barcode Scan.json') /** 움직이는 LottieView */}
                    style={MainButtonStyle.barcodeImage}
                    autoPlay loop
                />
            </TouchableOpacity>
        </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={styles.button}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("카머라 버튼 눌림")}>카메라로 알약 검색</Button>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={styles.button}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("얼역 버튼 눌림")}>이름으로 알약 검색</Button>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={[styles.button]}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("카머라 버튼 눌림")}>카메라로 알약 검색</Button>
        // </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 130,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    down: {
        marginBottom: 60
    }
});